import styles from './Loader.module.scss'; // or wherever you place it

export const Spinner = ({ size = 50 }: { size?: number }) => (
  <div className={styles.spinner} style={{ width: size, height: size }} />
);

export const SpinnerWithBackdrop = ({}) => {
  return (
    <div className={styles.loaderBackdrop}>
      <Spinner />
    </div>
  );
};
