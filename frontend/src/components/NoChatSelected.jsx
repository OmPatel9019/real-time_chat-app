export const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-4">
        {/* Friendly Doodle SVG */}
        <div className="flex justify-center mb-2">
          <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-auto">
            <defs>
              <linearGradient id="bubble-left-grad" x1="20" y1="20" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00A3FF" />
                <stop offset="100%" stopColor="#0066FF" />
              </linearGradient>
              <linearGradient id="bubble-right-grad" x1="90" y1="50" x2="170" y2="130" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>
            </defs>
            {/* Left speech bubble (brand color) with cute face */}
            <path d="M65 20C40.1 20 20 37.9 20 60C20 72.8 26.8 84.1 37.3 91.2L32.5 107.5C32.1 108.9 33.5 110.1 34.7 109.6L52.8 103.5C56.7 104.5 60.8 105 65 105C89.9 105 110 87.1 110 60C110 37.9 89.9 20 65 20Z" fill="url(#bubble-left-grad)" />
            {/* Cute eyes & smile on left bubble */}
            <circle cx="53" cy="58" r="4.5" fill="white" />
            <circle cx="77" cy="58" r="4.5" fill="white" />
            <circle cx="54" cy="57" r="1.5" fill="black" />
            <circle cx="76" cy="57" r="1.5" fill="black" />
            <path d="M61 68C61 70.2 62.8 72 65 72C67.2 72 69 70.2 69 68" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Right speech bubble (soft blue) with cute face */}
            <path d="M135 50C113.5 50 96 65.7 96 85C96 96.2 101.9 106.1 111 112.3L106.8 126.5C106.5 127.7 107.7 128.8 108.8 128.3L124.5 123C127.8 123.7 131.3 124 135 124C156.5 124 174 108.3 174 85C174 65.7 156.5 50 135 50Z" fill="url(#bubble-right-grad)" />
            {/* Cute eyes & smile on right bubble */}
            <circle cx="123" cy="83" r="4" fill="#0F172A" />
            <circle cx="147" cy="83" r="4" fill="#0F172A" />
            <path d="M131 92C131 94 132.8 95.5 135 95.5C137.2 95.5 139 94 139 92" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

            {/* Little floating hearts/notes */}
            <path d="M92 35C92 33.3 93.3 32 95 32C96.7 32 98 33.3 98 35C98 37.5 95 40 95 40C95 40 92 37.5 92 35Z" fill="#EF4444" />
            <path d="M110 25C110 23.9 110.9 23 112 23C113.1 23 114 23.9 114 25C114 26.7 112 28.3 112 28.3C112 28.3 110 26.7 110 25Z" fill="#F43F5E" />
            <path d="M152 35L154 39L158 40L154 41L152 45L150 41L146 40L150 39L152 35Z" fill="#FFAE00" opacity="0.8" />
          </svg>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-base-content tracking-tight">Welcome to Charcha!</h2>
          <p className="text-base-content/60 text-sm">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};
