import { ForwardedRef, forwardRef, MutableRefObject, useEffect } from "react";
import {
  FieldValues,
  Path,
  useForm,
  UseFormReturn,
  ValidationMode,
} from "react-hook-form";
import debounce from "debounce";
import { FormTextInput } from "./FormControl";
import { FormInputEnum } from "../../constants/form";
import { isObjectEmpty } from "../../utils";

export type BaseFormInputs = Record<string, any>;

export type UseFormProvider<T extends FieldValues = any> = UseFormReturn<T>;

export type Control<T> = {
  name: Path<T>;
  defaultValue?: any;
  type: FormInputEnum;
  required?: { value: boolean; message: string };
  role?: string[];
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  className?: string;
  //data for Dropdown
  dropdownURL?: string;
  isLabelInline?: boolean;
  copy?: boolean;
  disabled?: boolean;
  keyDropdown?: string;
  fileConfigure?: {
    allowedExtensions?: Array<string>;
    maxSize?: number;
  };
};

interface Props<T extends FieldValues = FieldValues> {
  inputs: Array<Control<T>>;
  mode?: keyof ValidationMode;
  className?: string;
  handleErrors?: (error?: boolean) => void;
  handleFieldsChange?: (value?: Record<string, unknown>) => void;
}

const FormWrapper = <T extends FieldValues>(
  props: Props<T>,
  ref: ForwardedRef<UseFormReturn<T>>
) => {
  const { inputs, mode = "onSubmit", handleErrors, handleFieldsChange } = props;
  const form = useForm<T>({ mode: mode });
  useEffect(() => {
    handleErrors && handleErrors(!isObjectEmpty(form.formState.errors));
  }, [form.formState]);

  useEffect(() => {
    if (ref) (ref as MutableRefObject<UseFormReturn<T>>).current = form;
  }, []);

  const handleChange = debounce(() => {
    handleFieldsChange && handleFieldsChange(form.getValues());
  }, 2000);

  return (
    <form onChange={handleChange} className={props.className}>
      {inputs.map((i) => {
        switch (i.type) {
          case FormInputEnum.INPUT:
          case FormInputEnum.PASSWORD:
          case FormInputEnum.NUMBER:
            return <FormTextInput key={i.name} control={i} form={form} />;
          default:
            break;
        }
      })}
    </form>
  );
};

export const FormProvider = forwardRef<any, Props>(FormWrapper);
