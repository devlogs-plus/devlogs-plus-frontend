import styles from "./Select.module.css"

export function Select({className = "", ref, ...props}) {
    return <select ref={ref} className={`${styles.select} ${className}`} {...props}></select>
}