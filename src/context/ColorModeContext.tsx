import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { UIContext } from "./UIContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const ColorModeProvider: React.FC = ({ children }) => {
  const firestore = useFirestore();
  const { setAlert } = useContext(UIContext);
  const { data: user } = useUser();
  const [isWorking, setIsWorking] = useState(false);

  const uid = user?.uid;
  const profileDocRef = doc(firestore, `profile/${uid}`);
  const { data: profile } = useFirestoreDocData(profileDocRef);

  const mode = profile?.theme || "light";
  const colorMode = {
    toggleColorMode: async () => {
      if (isWorking) return;
      try {
        await updateDoc(profileDocRef, {
          theme: mode === "light" ? "dark" : "light",
        });
        setIsWorking(false);
      } catch (error) {
        setAlert({
          show: true,
          severity: "error",
          message: error.message,
        });
        setIsWorking(false);
      }
    },
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#f50057",
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    if (!user) return;
    getDoc(profileDocRef).then((snapshot) => {
      if (!snapshot.exists()) {
        setDoc(profileDocRef, { theme: "light" }).catch((error) => {
          setAlert({
            show: true,
            severity: "error",
            message: error.message,
          });
        });
      }
    });
  }, [profileDocRef, user]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
