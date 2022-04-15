import * as Yup from "yup";

export const Schema = Yup.object({
  message: Yup.string().required("").max(250, "250 symbols maximum."),
});
