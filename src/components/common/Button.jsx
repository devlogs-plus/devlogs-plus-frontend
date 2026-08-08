import styles from "./Button.module.css"

export function Button({onClick, disabled = false, type = "button", className = "", children, ...props}) {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${styles.button} ${className}`} {...props}>
            {children}
        </button>
    )
}