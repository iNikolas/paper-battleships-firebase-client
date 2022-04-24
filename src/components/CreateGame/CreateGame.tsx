import React, { useEffect } from "react";
import { useUser } from "reactfire";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { Button, TextField } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CancelIcon from "@mui/icons-material/Cancel";
import { Schema } from "./";
import { GameForm } from "../";
import API from "../../api";
import { useStore } from "../../context";
import { checkIfSearchIsActive } from "../../utils";
import { GameActions } from "../../store/actions/game";

export const CreateGame = () => {
  const { dispatch } = useStore();
  const { data: user } = useUser();
  const {
    state: {
      lobby: { gameRequests },
    },
  } = useStore();

  const isActiveSearch = checkIfSearchIsActive(gameRequests, user);

  const handleSubmit = async (
    { description }: FormikValues,
    actions: FormikHelpers<{ description: string }>
  ) => {
    API.doSend({ description, type: "create-game" });
    actions.resetForm();
  };

  const handleClick = () => API.doSend({ type: "cancel-game" });

  useEffect(() => dispatch({ type: GameActions.RESET_GAME_STATE }), [dispatch]);

  return (
    <Formik
      validationSchema={Schema}
      onSubmit={handleSubmit}
      initialValues={{
        description: "",
      }}
    >
      {({ isSubmitting, isValid, getFieldProps, getFieldMeta }) => (
        <GameForm>
          <TextField
            {...getFieldProps("description")}
            disabled={isActiveSearch}
            inputProps={{ maxLength: 20 }}
            error={!!getFieldMeta("description").error}
            sx={{ flexGrow: 1 }}
            size="small"
            name="description"
            label="Description"
            variant="outlined"
            helperText={getFieldMeta("description").error}
          />
          {!isActiveSearch && (
            <Button
              size="small"
              sx={{
                alignSelf: "stretch",
                minWidth: (theme) => theme.spacing(17),
              }}
              type="submit"
              variant="contained"
              disabled={
                isSubmitting || !isValid || !getFieldMeta("description").value
              }
              startIcon={<SportsEsportsIcon />}
            >
              CREATE GAME
            </Button>
          )}
          {isActiveSearch && (
            <Button
              onClick={handleClick}
              size="small"
              sx={{
                alignSelf: "stretch",
                minWidth: (theme) => theme.spacing(17),
              }}
              type="button"
              variant="contained"
              startIcon={<CancelIcon />}
            >
              CANCEL
            </Button>
          )}
        </GameForm>
      )}
    </Formik>
  );
};
