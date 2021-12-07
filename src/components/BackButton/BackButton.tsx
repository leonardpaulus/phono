import styles from './BackButton.module.css';
import { BackButtonProps } from '../../lib/types';

export default function BackButton({ goBack }: BackButtonProps): JSX.Element {
  return (
    <svg
      width="21"
      height="38"
      viewBox="0 0 21 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => goBack('back')}
      className={styles.backButton}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.0532 1.20888C18.6626 0.818354 18.0295 0.818354 17.639 1.20888L1.29328 17.5545C1.28156 17.5652 1.27002 17.5762 1.25869 17.5876L0.551579 18.2947C0.356877 18.4894 0.259244 18.7444 0.258686 18.9996C0.257715 19.2568 0.355344 19.5142 0.551572 19.7105L1.25868 20.4176C1.27006 20.429 1.28166 20.44 1.29344 20.4507L17.639 36.7963C18.0295 37.1868 18.6626 37.1868 19.0532 36.7963L19.7603 36.0892C20.1508 35.6986 20.1508 35.0655 19.7603 34.6749L4.79501 19.7097C4.40449 19.3191 4.40449 18.686 4.79501 18.2955L19.7603 3.3302C20.1508 2.93967 20.1508 2.30651 19.7603 1.91599L19.0532 1.20888Z"
        fill="#FBD2A2"
      />
    </svg>
  );
}
