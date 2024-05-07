import styles from "./customButton.module.scss";
interface propType {
  label: string;
  handleOnclick: () => void;
  disable: boolean;
}

const CustomButton = ({ label, handleOnclick, disable }: propType) => {
  return (
    <div
      className={`${styles.button} ${disable && styles.disable}`}
      onClick={handleOnclick}
    >
      <label>{label}</label>
    </div>
  );
};

export default CustomButton;
