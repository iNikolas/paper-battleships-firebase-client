import React from "react";
import { useField } from "formik";
import {
  FormControl,
  InputLabel,
  FilledInput,
  FormHelperText,
} from "@mui/material";
import { RegularTextInputProps } from "./RegularTextInputProps";

export const RegularTextInput = ({
  label,
  ...props
}: RegularTextInputProps) => {
  const [field, meta] = useField(props);
  return (
    <FormControl sx={{ width: (theme) => theme.spacing(30) }} variant="filled">
      <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
      <FilledInput
        inputProps={{ ...field }}
        error={meta.touched && !!meta.error}
        id={props.id || props.name}
        type="text"
      />
      <FormHelperText error>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  );
};
