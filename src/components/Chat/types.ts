import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

export interface MessageProps {
  message: DocumentData;
}
