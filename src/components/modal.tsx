import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styles from "@/styles/Modal.module.css"

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: any;
};

export default function Modal({ 
  show, 
  onClose, 
  children }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e: Event) => {
    e.preventDefault();
    onClose();
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    )
  } else {
    return null;
  }
}