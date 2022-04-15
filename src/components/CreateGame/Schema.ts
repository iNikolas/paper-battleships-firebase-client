import * as Yup from "yup";

export const Schema = Yup.object({
  description: Yup.string().required("").max(20, "10 symbols maximum."),
});
