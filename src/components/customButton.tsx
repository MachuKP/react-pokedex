
import styles from "./customButton.module.scss"
interface propType {
    label: string;
    handleOnclick: () => void;
}


const CustomButton = ({label, handleOnclick}: propType) => {
    return (
        <div className={styles.button} onClick={handleOnclick}>
            <label>{label}</label>
        </div>
    )
}

export default CustomButton;