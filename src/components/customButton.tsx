import styles from "./customButton.module.scss";
interface propType {
  label: string;
  handleOnclick: () => void;
  disable?: boolean;
}

const CustomButton = ({ label, handleOnclick, disable }: propType) => {
  const onClick = () => {
    if (!disable) {
      handleOnclick()
    }
  }
  return (
    <div
      className={`${styles.button} ${disable && styles.disable}`}
      onClick={onClick}
    >
      <label>{label}</label>
    </div>
  );
};

export default CustomButton;
