import React from "react";
import styles from "./style/button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "delete" | "add" | "edit" | "cancel";
}

const Button: React.FC<ButtonProps> = ({
  variant = "add",
  children,
  ...props
}) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
