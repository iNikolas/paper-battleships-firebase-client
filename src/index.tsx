import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  FirebaseAppProvider,
  useFirebaseApp,
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
} from "reactfire";
import firebaseConfig from "./app/firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { AppProvider, UIContextProvider } from "./context";
import { AppRouter } from "./app/router";
import theme from "./theme";

const root = createRoot(document.getElementById("root")!);

const Root: React.FC = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  connectFirestoreEmulator(firestore, 'localhost', 8080)

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>{children}</StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <CssBaseline />
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <UIContextProvider>
            <Root>
              <AppRouter />
            </Root>
          </UIContextProvider>
        </FirebaseAppProvider>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
