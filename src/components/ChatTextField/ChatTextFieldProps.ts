import { FieldInputProps } from "formik";

export interface ChatTextFieldProps {
  getFieldProps: <Value = any>(props: any) => FieldInputProps<Value>;
  toggleEmojiView: () => void;
}
