import * as Yup from "yup";

export const Schema = Yup.object({
  email: Yup.string()
    .email("Please satisfy correct Email pattern.")
    .required("This field can not be empty! Please fill it in."),
  password: Yup.string()
    .min(12, "Minimum password length is 12 symbols.")
    .required("This field is required"),
});
