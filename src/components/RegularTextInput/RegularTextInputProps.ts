import { FieldHookConfig } from "formik";

interface Values {
  label: string;
}

export type RegularTextInputProps = FieldHookConfig<string> & Values;
