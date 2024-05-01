// store
import Backdrop from "./backdrop";
import { easeInOut, motion } from "framer-motion";
import { useAppSelector } from "../store/store";
import styles from "./loader.module.scss";

const spinTransition = {
  repeat: Infinity,
  duration: 1,
  easeInOut,
};

const Loader = () => {
    const { showLoader } = useAppSelector((state) => state.loaderReducer);
  return (
    <>
      {showLoader && (
        <Backdrop onClick={() => undefined}>
          <motion.span
            className={styles.loader}
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
        </Backdrop>
      )}
    </>
  );
};

export default Loader;
