import { ReactNode } from "react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";

import { Control } from "../../constants/form";
import Input from "../Input";
import classNames from "classnames";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  control: Control<T>;
  onChange?: (target?: string) => void;
}
export const FormTextInput = <T extends FieldValues>(props: Props<T>) => {
  const { form, control, onChange } = props;
  const error = form.formState.errors[control.name];

  return (
    <Controller
      defaultValue={control.defaultValue}
      name={control.name}
      control={form.control}
      rules={{
        required: control.required,
        minLength: control.minLength,
        maxLength: control.maxLength,
        pattern: control.pattern,
        max: control.max,
        min: control.min,
      }}
      render={({ field, fieldState }) => {
        return (
          <Input
            value={field.value}
            id={control.name}
            onChange={field.onChange}
            onBlur={({ target }: { target: { value: string } }) => {
              target.value &&
                form.setValue(field.name, target.value.trim() as any);
              field.onBlur();
              onChange && onChange(target.value);
            }}
            type={control.type}
            invalid={!!fieldState.error}
            className={classNames(control.className)}
            placeholder={control.placeholder}
            innerRef={field.ref}
            helperText={error?.message as ReactNode}
          />
        );
      }}
    />
  );
};
