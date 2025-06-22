import styles from './Loader.module.scss'; // or wherever you place it

export const Spinner = () => <div className={styles.spinner} />;

export const SpinnerWithBackdrop = ({}) => {
  return (
    <div className={styles.loaderBackdrop}>
      <Spinner />
    </div>
  );
};
