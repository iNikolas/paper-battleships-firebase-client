import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@mui/material";
import { Formik, FormikValues } from "formik";
import {
  Logo,
  RegularTextInput,
  Form,
  FormWrapper,
  FormTypography,
  FormButton,
  FormFooterWrapper,
  FormFooterTypography,
} from "../../../components";
import { PasswordTextInput } from "../../../components";
import { UIContext } from "../../../context";
import { Schema } from "./index";

export const LoginScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);

  const handleSignIn = async (values: FormikValues) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: error.message,
      });
    }
  };

  return (
    <>
      <FormWrapper>
        <Logo />
        <FormTypography variant="h5">Login</FormTypography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Schema}
          onSubmit={handleSignIn}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <RegularTextInput label="Email" name="email" />
              <PasswordTextInput label="Password" name="password" />
              <FormButton
                variant="contained"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                LOGIN
              </FormButton>
            </Form>
          )}
        </Formik>
      </FormWrapper>
      <FormFooterWrapper>
        <FormFooterTypography variant="subtitle2">
          Don&#39;t have an account?
        </FormFooterTypography>
        <Button component={Link} to="/register">
          REGISTER
        </Button>
      </FormFooterWrapper>
    </>
  );
};
