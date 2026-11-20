import { type ReactNode, useEffect, useRef } from "react";

import styles from "./Modal.module.scss";

export default function Modal({
  children,
  label,
  onClose,
  labelledBy,
}: {
  children: ReactNode;
  label: string;
  onClose: () => void;
  labelledBy?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      className={styles.modal}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.modal__container}>
        <button type="button" aria-label="Close dialog" className={styles["modal__close-button"]} onClick={onClose}>
          <img
            src="/svg/icon-cross.svg"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            loading="lazy"
            decoding="async"
          />
        </button>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </dialog>
  );
}
