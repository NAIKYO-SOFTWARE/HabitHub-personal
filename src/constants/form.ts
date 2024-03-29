import { Path, PathValue } from "react-hook-form";

export enum FormInputEnum {
  INPUT = "input",
  MULTILINE = "multiline",
  NUMBER = "number",
  SELECT = "select",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  PASSWORD = "password",
  DATE = "date",
  FILE = "file",
  COLOR = "color",
}

export type Control<T> = {
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  type: FormInputEnum;
  required?: { value: boolean; message: string };
  role?: string[];
  label?: string;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  isShowPassword?: boolean;
  //data for Dropdown
  dropdownURL?: string;
  data?: string | Array<unknown>;
  isLabelInline?: boolean;
  copy?: boolean;
  disabled?: boolean;
  keyDropdown?: string;
  fileConfigure?: {
    allowedExtensions?: Array<string>;
    maxSize?: number;
  };
};
