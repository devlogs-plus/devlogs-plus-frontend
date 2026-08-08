import styles from "./Input.module.css";

export function Input({ className = "", ref, ...props }) {
    return <input ref={ref} className={`${styles.input} ${className}`} {...props} />;
}
//id, onCLick, disabled