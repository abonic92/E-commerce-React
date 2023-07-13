import styles from "./styles.module.css";

const Loader = () => {
  return (
    <>
    <div>
      <img src='./loaderr.gif' alt="Loader" className={styles.loader} />
    </div>
    <span>Loading...</span>
    </>

  );
};

export default Loader;
