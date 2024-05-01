import styles from "./radioButton.module.scss";

interface propType {
  handleClick: (option: React.ChangeEvent<HTMLInputElement>) => void;
  checked: string;
}

const RadioButton = ({handleClick, checked}: propType) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="radio"
          id="name"
          name="sort_by"
          value="Name"
          checked={checked === 'Name' ? true : false}
          onChange={(e) => handleClick(e)}
        />
        <label htmlFor="name">Sort Name</label>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="radio"
          id="id"
          name="sort_by"
          value="ID"
          checked={checked === 'ID' ? true : false}
          onChange={(e) => handleClick(e)}
        />
        <label htmlFor="id">Sort ID</label>
      </div>
    </div>
  );
};

export default RadioButton;
