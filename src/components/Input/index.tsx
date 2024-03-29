import React, { ReactNode } from "react";
import classNames from "classnames";
import { FormInputEnum } from "../../constants/form";

interface InputProps {
  children?: React.ReactNode;
  size?: number | string;
  placeholder?: string;
  valid?: boolean;
  invalid?: boolean;
  tag?: React.ElementType;
  innerRef?:
    | React.RefObject<HTMLInputElement>
    | ((instance: HTMLInputElement | null) => void)
    | null;
  plaintext?: boolean;
  helperText?: ReactNode;
  className?: string;
  type?: string;
  value?: any;
  id: string;
  onChange?: () => void;
  onBlur?: ({ target }: { target: { value: string } }) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  type = "text",
  valid,
  invalid,
  tag,
  plaintext,
  innerRef,
  helperText,
  ...attributes
}: InputProps) => {
  let Tag = tag || type || "input";

  let formControlClass = "outline-none";

  if (plaintext) {
    formControlClass = `${formControlClass}-plaintext`;
    Tag = tag || "input";
  }

  if (type === FormInputEnum.PASSWORD) {
    Tag = "input";
  }

  const classes = classNames(
    className,
    invalid && "border-[3px] border-solid border-[red]",
    valid && "border-[3px] border-solid border-[blue]",
    formControlClass
  );

  return (
    <div className="w-full">
      <Tag
        {...attributes}
        type={type}
        ref={innerRef}
        className={classes}
        aria-invalid={invalid}
      />
      {helperText && <div className="text-red-500">{helperText}</div>}
    </div>
  );
};

export default Input;
