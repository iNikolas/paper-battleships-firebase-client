import * as Yup from "yup";

const Schema = Yup.object({
  email: Yup.string()
    .email("Please satisfy correct Email pattern.")
    .required("This field can not be empty! Please fill it in."),
  displayName: Yup.string()
    .matches(
      /^([A-ZА-Я][a-zа-я]*\s){1,2}[A-ZА-Я][a-zа-я]*$/,
      "At least two words, capitalized. Only letters."
    )
    .required("This field can not be empty."),
  password: Yup.string()
    .min(12, "Minimum password length is 12 symbols.")
    .required("This field can not be empty."),
  passwordConfirm: Yup.string()
    .min(12, "Minimum password length is 12 symbols.")
    .when("password", {
      is: (val: string) => !!val,
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password confirmation failed!"
      ),
    })
    .required("This field can not be empty."),
});

export default Schema;
