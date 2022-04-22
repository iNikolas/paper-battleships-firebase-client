import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useFirestore,
  useFirestoreDocData,
  useStorage,
  useUser,
} from "reactfire";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  useTheme,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { ProfileProps } from "./ProfileProps";
import { UIContext } from "../../context";
import { doc, updateDoc } from "firebase/firestore";

export const Profile: React.FC<ProfileProps> = ({ show, setShow }) => {
  const firestore = useFirestore();
  const storage = useStorage();
  const theme = useTheme();

  const { data: user } = useUser();
  const { setAlert } = useContext(UIContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [color, setColor] = useState("#aabbcc");
  const avatarURLRef = useRef("");

  const uid = user?.uid;
  const profileDocRef = doc(firestore, `profile/${uid}`);
  const { data: profile } = useFirestoreDocData(profileDocRef);
  const battleshipColor = profile?.battleshipColor || theme.palette.grey.A400;

  useEffect(() => {
    setColor(battleshipColor);
  }, [battleshipColor]);

  const handleClose = () => setShow(false);

  const handleAvatarSelection = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files?.length) return;
    if (avatarURLRef.current) URL.revokeObjectURL(avatarURLRef.current);

    const file = event.currentTarget.files[0];

    setSelectedAvatar(file);
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      if (color !== battleshipColor) {
        await updateDoc(profileDocRef, {
          battleshipColor: color,
        });
      }

      if (selectedAvatar) {
        const filePath = `${user?.uid}/avatar`;
        const newImageRef = ref(storage, filePath);
        await uploadBytesResumable(newImageRef, selectedAvatar);

        const publicImageUrl = await getDownloadURL(newImageRef);

        await updateProfile(user, { photoURL: publicImageUrl });
      }

      handleClose();
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    URL.revokeObjectURL(avatarURLRef.current);
    if (selectedAvatar)
      avatarURLRef.current = URL.createObjectURL(selectedAvatar);
    if (!selectedAvatar) avatarURLRef.current = "";
    return () => {
      if (avatarURLRef.current) URL.revokeObjectURL(avatarURLRef.current);
    };
  }, [selectedAvatar]);

  useEffect(() => {
    if (avatarURLRef.current) URL.revokeObjectURL(avatarURLRef.current);
    if (show) setSelectedAvatar(null);
  }, [show]);

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogContent>
        <Avatar
          sx={{
            width: (theme) => theme.spacing(14),
            height: (theme) => theme.spacing(14),
            mb: 1,
          }}
          src={avatarURLRef.current || user?.photoURL || ""}
        />
        <input onChange={handleAvatarSelection} accept="image/*" type="file" />
        <Typography sx={{ mt: 1 }}>Battleship color: </Typography>
        <HexColorPicker color={color} onChange={setColor} />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
