import { styled } from "@mui/material/styles";
import { Form } from "formik";

export const GameForm = styled(Form)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  gap: theme.spacing(1),
  alignItems: "center",
}));
