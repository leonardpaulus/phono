import styles from './LoginButton.module.css';

function LoginButton(): JSX.Element {
  return (
    <a className={styles.loginButton} href={'/api/oauth/request_token'}>
      Login with Discogs
    </a>
  );
}

export default LoginButton;
