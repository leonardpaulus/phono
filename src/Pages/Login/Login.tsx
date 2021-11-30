import styles from './Login.module.css';
import Phono_Logo from '../../assets/Phono_Logo';
import LoginButton from '../../components/LoginButton/LoginButton';

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.components}>
        <Phono_Logo />
        <LoginButton />
      </div>
    </div>
  );
}
