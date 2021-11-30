export default function Home(
  props: React.SVGProps<SVGPathElement & SVGCircleElement>
): JSX.Element {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 41C31.8218 41 41 31.8218 41 20.5C41 9.17816 31.8218 0 20.5 0C9.17816 0 0 9.17816 0 20.5C0 31.8218 9.17816 41 20.5 41ZM20.8307 29.7581C25.7611 29.7581 29.7581 25.7611 29.7581 20.8306C29.7581 15.9002 25.7611 11.9032 20.8307 11.9032C15.9002 11.9032 11.9032 15.9002 11.9032 20.8306C11.9032 25.7611 15.9002 29.7581 20.8307 29.7581Z"
        {...props}
      />
      <circle cx="20.6508" cy="20.6508" r="0.650794" {...props} />
    </svg>
  );
}
