import styles from "./TextArea.module.css"

export function TextArea({className = "", ref, ...props}) {
    return <textarea ref={ref} className={`${styles.textarea} ${className}`} {...props}/>
}