import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { useFirestore, useUser, useStorage } from "reactfire";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { Schema } from "./Schema";
import { GameForm } from "../GameForm";
import { Button, TextField } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { UIContext } from "../../context";
import { LOADING_IMAGE_URL } from "../../constants";

export const SendMessageArea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useContext(UIContext);
  const firestore = useFirestore();
  const storage = useStorage();
  const { data: user } = useUser();
  const fileEL = useRef<HTMLInputElement>(null);

  const handleSubmit = async (
    { message }: FormikValues,
    actions: FormikHelpers<{ message: string }>
  ) => {
    try {
      await addDoc(collection(firestore, "messages"), {
        name: user?.displayName,
        text: message,
        timestamp: serverTimestamp(),
      });
      actions.resetForm();
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: error.message,
      });
    }
  };

  const handleSubmitImageRequest = () => {
    fileEL.current?.click();
  };

  const handleSubmitImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files?.length) return;
    try {
      setIsLoading(true);
      const file = event.currentTarget.files[0];
      const messageRef = await addDoc(collection(firestore, "messages"), {
        name: user?.displayName,
        imageUrl: LOADING_IMAGE_URL,
        timestamp: serverTimestamp(),
      });

      const filePath = `${user?.uid}/${messageRef.id}/${file.name}`;
      const newImageRef = ref(storage, filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);

      const publicImageUrl = await getDownloadURL(newImageRef);

      await updateDoc(messageRef, {
        imageUrl: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
      });
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

  return (
    <>
      <Formik
        validationSchema={Schema}
        onSubmit={handleSubmit}
        initialValues={{
          message: "",
        }}
      >
        {({ isSubmitting, isValid, getFieldProps, getFieldMeta }) => (
          <GameForm>
            <TextField
              {...getFieldProps("message")}
              inputProps={{ maxLength: 250 }}
              sx={{ flexGrow: 1 }}
              size="small"
              name="message"
              label="Message"
              variant="filled"
            />
            <Button
              size="small"
              type="submit"
              variant="contained"
              sx={{ alignSelf: "stretch" }}
              disabled={
                isSubmitting ||
                !isValid ||
                !getFieldMeta("message").value ||
                isLoading
              }
            >
              SEND
            </Button>
            <AddPhotoAlternateIcon
              onClick={handleSubmitImageRequest}
              sx={{ fontSize: (theme) => theme.spacing(4) }}
            />
          </GameForm>
        )}
      </Formik>
      <input
        accept="image/*"
        onChange={handleSubmitImage}
        ref={fileEL}
        id="download-avatar"
        style={{ visibility: "hidden", position: "absolute" }}
        type="file"
      />
    </>
  );
};
