import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Formik, FormikValues } from "formik";
import { Button } from "@mui/material";
import { UIContext } from "../../../context";
import {
  RegularTextInput,
  PasswordTextInput,
  FormWrapper,
  FormTypography,
  Form,
  FormButton,
  FormFooterWrapper,
  Logo,
  FormFooterTypography,
} from "../../../components";
import Schema from "./Schema";

export const RegisterScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);

  const handleSignUp = async (values: FormikValues) => {
    const { password, displayName, email } = values;

    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      await updateProfile(user, { displayName });

      setAlert({
        show: true,
        severity: "success",
        message: "Welcome on board 🚀",
      });
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
        <FormTypography variant="h5">Register</FormTypography>
        <Formik
          initialValues={{
            email: "",
            displayName: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={Schema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <RegularTextInput label="Email" name="email" />
              <RegularTextInput label="Full name" name="displayName" />
              <PasswordTextInput label="Password" name="password" />
              <PasswordTextInput
                label="Confirm password"
                name="passwordConfirm"
              />
              <FormButton
                variant="contained"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                REGISTER
              </FormButton>
            </Form>
          )}
        </Formik>
      </FormWrapper>
      <FormFooterWrapper>
        <FormFooterTypography variant="subtitle2">
          Already have account?
        </FormFooterTypography>
        <Button component={Link} to="/login">
          LOGIN
        </Button>
      </FormFooterWrapper>
    </>
  );
};
