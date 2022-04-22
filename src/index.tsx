import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import {
  FirebaseAppProvider,
  useFirebaseApp,
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
} from "reactfire";
import firebaseConfig from "./app/firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { AppProvider, ColorModeProvider, UIContextProvider } from "./context";
import { AppRouter } from "./app/router";

const root = createRoot(document.getElementById("root")!);

const Root: React.FC = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>
          <ColorModeProvider>
            <CssBaseline />
            {children}
          </ColorModeProvider>
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

root.render(
  <React.StrictMode>
    <UIContextProvider>
      <AppProvider>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <Root>
            <AppRouter />
          </Root>
        </FirebaseAppProvider>
      </AppProvider>
    </UIContextProvider>
  </React.StrictMode>
);
