import styles from './Login.module.css';
import PhonoLogo from '../../assets/PhonoLogo';
import LoginButton from '../../components/LoginButton/LoginButton';

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={`${styles.outerCircle} ${styles.circle}`}></div>
      <div className={`${styles.middleCircle} ${styles.circle}`}></div>
      <div className={`${styles.innerCircle} ${styles.circle}`}></div>
      <div className={styles.components}>
        <PhonoLogo />
        <LoginButton />
      </div>
    </div>
  );
}
