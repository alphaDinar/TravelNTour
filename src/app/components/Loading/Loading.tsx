import styles from './loading.module.css';

const Loading = () => {
  return ( 
    <div className={styles.loaderBox}>
      <legend>
        <sub></sub>
        <sub></sub>
        <sub></sub>
      </legend>
    </div>
   );
}
 
export default Loading;