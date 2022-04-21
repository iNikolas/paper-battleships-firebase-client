import { FieldInputProps } from "formik/dist/types";

export interface EmojiPickerProps {
  getFieldProps: <Value = any>(props: any) => FieldInputProps<Value>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}
