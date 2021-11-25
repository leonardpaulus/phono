import styles from './LoginButton.module.css';

function LoginButton(): JSX.Element {
  return <button className={styles.loginButton}>Login with Discogs</button>;
}

export default LoginButton;
