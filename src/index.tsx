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
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { AppProvider, UIContextProvider } from "./context";
import { AppRouter } from "./app/router";
import theme from "./theme";

const firebaseConfig = {
  apiKey: "AIzaSyC8haVNMqFqYlWrnFzPfymghrc_xMgLlTw",
  authDomain: "paper-battleships.firebaseapp.com",
  projectId: "paper-battleships",
  storageBucket: "paper-battleships.appspot.com",
  messagingSenderId: "25715122652",
  appId: "1:25715122652:web:c226d0c04af17f3ac9ef19",
  measurementId: "G-R0E96WC4SD",
};

const root = createRoot(document.getElementById("root")!);

const Root: React.FC = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

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
