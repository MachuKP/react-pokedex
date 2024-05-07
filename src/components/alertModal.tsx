import Backdrop from "./backdrop";
import { motion } from "framer-motion";
import CustomButton from "./customButton";
import styles from "./alertModal.module.scss";
import { useAppSelector } from "../store/store";
interface propType {
  handleClose: () => void;
  configModal: {
    title: string;
    description: string;
    buttonConfirm: string;
  };
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const AlertModal = ({ handleClose, configModal }: propType) => {
  const { title, description, buttonConfirm } = configModal;
  const { error } = useAppSelector((state) => state.dataReducer);
  return (
    <>
      {error && (
        <Backdrop onClick={handleClose}>
          <motion.div
            className={styles.alertModal}
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3 className={styles.header}>
              {title ? title : "Title"} <label className={styles.icon} onClick={handleClose}>x</label>
            </h3>
            <div className={styles.body}>
              {description ? description : "Description"}
            </div>
            <div className={styles.footer}>
              <CustomButton
                label={buttonConfirm ? buttonConfirm : "Confirm"}
                handleOnclick={handleClose}
              />
            </div>
          </motion.div>
        </Backdrop>
      )}
    </>
  );
};

export default AlertModal;
