export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HearHere logo"
    >
      <path
        d="M20 85V20C20 14.4772 24.4772 10 30 10H80C85.5228 10 90 14.4772 90 20V85L55 70L20 85Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M20 85V20C20 14.4772 24.4772 10 30 10H80C85.5228 10 90 14.4772 90 20V85L55 70L20 85Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M25 30C25 21.7157 31.7157 15 40 15H60C68.2843 15 75 21.7157 75 30V50"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <rect x="15" y="45" width="20" height="25" rx="5" fill="currentColor" />
      <rect x="65" y="45" width="20" height="25" rx="5" fill="currentColor" />
    </svg>
  );
}
