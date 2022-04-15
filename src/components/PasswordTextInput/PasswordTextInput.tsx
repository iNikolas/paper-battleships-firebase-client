import React, { useState } from "react";
import { useField } from "formik";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { PasswordTextInputProps } from "./PasswordTextInputProps";

export const PasswordTextInput = ({
  label,
  ...props
}: PasswordTextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <FormControl sx={{ width: (theme) => theme.spacing(30) }} variant="filled">
      <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
      <FilledInput
        error={meta.touched && !!meta.error}
        inputProps={{ ...field }}
        id={props.id || props.name}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  );
};
