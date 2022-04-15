import { FieldHookConfig } from "formik";

interface Values {
  label: string;
}

export type PasswordTextInputProps = FieldHookConfig<string> & Values;
