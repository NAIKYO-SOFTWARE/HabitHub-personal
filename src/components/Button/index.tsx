import React, { useCallback } from "react";
import classNames from "classnames";

interface Props {
  /** Manually set the visual state of the button to active */
  active?: boolean;
  /** Aria label */
  "aria-label"?: string;
  block?: boolean;
  /** Pass children so this component can wrap them */
  children?: React.ReactNode;
  /** Add custom class */
  className?: string;
  /** Change existing className with a new className */
  close?: boolean;
  /** Change color of Button to one of the available colors */
  color?: string;
  disabled?: boolean;
  /** Function to be triggered on click */
  onClick?: (e: Event) => void;
  /** Adds outline to the button */
  outline?: boolean;
  /** Make the button bigger or smaller */
  size?: string;
  /** Set a custom element for this component */
  tag?: React.ElementType;
  href?: string;
}

function Button(props: Props) {
  const onClick = useCallback(
    (e: Event) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }

      if (props.onClick) {
        return props.onClick(e);
      }
    },
    [props.onClick, props.disabled]
  );

  const {
    active,
    "aria-label": ariaLabel,
    block,
    className,
    color = "secondary",
    outline,
    size,
    tag = "button",
    ...attributes
  } = props;

  let Tag = tag;
  const btnOutlineColor = `btn${outline ? "-outline" : ""}-${color}`;

  const classes = classNames(
    className,
    "btn",
    btnOutlineColor,
    size ? `btn-${size}` : false,
    block ? "d-block w-100" : false,
    { active, disabled: props.disabled }
  );

  if (attributes.href && Tag === "button") {
    Tag = "a";
  }

  return (
    <Tag
      type={Tag === "button" && attributes.onClick ? "button" : undefined}
      {...attributes}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    />
  );
}

export default Button;
