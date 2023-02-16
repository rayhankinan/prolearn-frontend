import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styles from "@/styles/Modal.module.css"
import { DirtyLensSharp } from "@mui/icons-material";
import { Grid, Paper } from '@material-ui/core';



export default function Modal({ show, onClose, children }) {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}>
                        <button className="btn">Close</button>
                    </a>
                </div>
                <div className={styles.body}>{children}</div>
                <div className="flex justify-center mt-5">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4">Save</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        )
    } else {
        return null;
    }
}