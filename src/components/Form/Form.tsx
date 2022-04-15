import { styled } from "@mui/material/styles";
import { Form as FormikForm } from "formik";

export const Form = styled(FormikForm)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: theme.spacing(3),
}));
