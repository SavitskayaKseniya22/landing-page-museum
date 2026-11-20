import { ReactNode } from "react";
import styles from "./Button.module.scss";

import { ButtonType } from "./types";

function Button({
  children,
  buttonType,
  className = "",
  globalType = "button",
  isDisabled = false,
}: {
  children: ReactNode;
  buttonType: ButtonType;
  className?: string;
  globalType?: "submit" | "button" | "reset" | undefined;
  isDisabled?: boolean;
}) {
  return (
    <button
      type={globalType}
      className={`${styles.button} ${styles[buttonType === ButtonType.MAIN ? "button--primary" : "button--secondary"]} ${className}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
