export const Logo = ({ className = "size-8" }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="charcha-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A3FF" />
          <stop offset="100%" stopColor="#0066FF" />
        </linearGradient>
      </defs>
      {/* Outer speech bubble container matching the brand logo */}
      <path 
        d="M50 8C26.8 8 8 26.8 8 50C8 58.7 10.7 66.8 15.3 73.5L10.3 87.7C9.9 88.9 11.1 90.1 12.3 89.7L26.5 84.7C33.2 89.3 41.3 92 50 92C73.2 92 92 73.2 92 50C92 26.8 73.2 8 50 8Z" 
        fill="url(#charcha-logo-grad)" 
      />
      {/* Stylized white inner 'C' crescent with pointed lighting tips */}
      <path 
        d="M68 31C63.5 35 56.5 38 49 38C39.5 38 34.5 44 34.5 51.5C34.5 59 39.5 65 49 65C56.5 65 63.5 68 68 72C61.5 78.5 50.5 80 40 76C30.5 72 24.5 61.5 25.5 50.5C26.5 39.5 35.5 30 46.5 28C54.5 26.5 62.5 27.5 68 31Z" 
        fill="white" 
      />
    </svg>
  );
};
