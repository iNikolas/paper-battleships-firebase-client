import React, { useContext, useState } from "react";
import { useFirestore, useUser } from "reactfire";
import { doc, updateDoc } from "firebase/firestore";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { Schema } from "../Chat/Schema";
import { GameForm } from "../GameForm";
import { Box, Button } from "@mui/material";
import { useGameData } from "../../utils";
import { UIContext } from "../../context";
import { ChatTextField, EmojiPicker } from "../";

export const SendMessageForm = () => {
  const firestore = useFirestore();
  const [showEmoji, setShowEmoji] = useState(false);
  const { data: user } = useUser();
  const { setAlert } = useContext(UIContext);
  const { data: playerGameState } = useGameData();
  const docRef = doc(firestore, `games/${playerGameState.host || user?.uid}`);

  const toggleEmojiView = () => {
    setShowEmoji((prevState) => !prevState);
  };

  const hideEmojiView = () => setShowEmoji(false);

  const handleSubmit = async (
    { message }: FormikValues,
    actions: FormikHelpers<{ message: string }>
  ) => {
    try {
      await updateDoc(docRef, {
        message: { text: message, name: user?.displayName },
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

  return (
    <Formik
      validationSchema={Schema}
      onSubmit={handleSubmit}
      initialValues={{
        message: "",
      }}
    >
      {({
        isSubmitting,
        isValid,
        getFieldProps,
        getFieldMeta,
        setFieldValue,
      }) => (
        <GameForm>
          <Box onMouseLeave={hideEmojiView} sx={{ position: "relative" }}>
            {showEmoji && (
              <EmojiPicker
                getFieldProps={getFieldProps}
                setFieldValue={setFieldValue}
              />
            )}
            <ChatTextField
              getFieldProps={getFieldProps}
              toggleEmojiView={toggleEmojiView}
            />
          </Box>
          <Button
            size="small"
            type="submit"
            variant="contained"
            sx={{ alignSelf: "stretch" }}
            disabled={
              isSubmitting || !isValid || !getFieldMeta("message").value
            }
          >
            SEND
          </Button>
        </GameForm>
      )}
    </Formik>
  );
};
