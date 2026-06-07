interface IconProps {
  size?: number;
  className?: string;
}

export function MicrosoftIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
      <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
      <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
    </svg>
  );
}

export function SlackIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M5.04 15.165a2.521 2.521 0 0 1-2.52 2.52A2.521 2.521 0 0 1 0 15.165a2.52 2.52 0 0 1 2.52-2.52h2.52v2.52Zm1.271 0a2.521 2.521 0 0 1 2.52-2.52 2.521 2.521 0 0 1 2.521 2.52v6.314A2.521 2.521 0 0 1 8.831 24a2.521 2.521 0 0 1-2.52-2.521v-6.314Z"
        fill="#E01E5A"
      />
      <path
        d="M8.831 5.04a2.521 2.521 0 0 1-2.52-2.52A2.521 2.521 0 0 1 8.831 0a2.52 2.52 0 0 1 2.521 2.52v2.52H8.831Zm0 1.271a2.521 2.521 0 0 1 2.521 2.52 2.521 2.521 0 0 1-2.521 2.521H2.521A2.521 2.521 0 0 1 0 8.831a2.52 2.52 0 0 1 2.52-2.52h6.311Z"
        fill="#36C5F0"
      />
      <path
        d="M18.956 8.831a2.521 2.521 0 0 1 2.52-2.52A2.521 2.521 0 0 1 24 8.831a2.52 2.52 0 0 1-2.521 2.521h-2.52V8.831Zm-1.272 0a2.521 2.521 0 0 1-2.52 2.521 2.521 2.521 0 0 1-2.521-2.521V2.521A2.521 2.521 0 0 1 15.165 0a2.52 2.52 0 0 1 2.52 2.52v6.311Z"
        fill="#2EB67D"
      />
      <path
        d="M15.165 18.956a2.521 2.521 0 0 1 2.52 2.52A2.521 2.521 0 0 1 15.165 24a2.52 2.52 0 0 1-2.521-2.521v-2.52h2.521Zm0-1.272a2.521 2.521 0 0 1-2.521-2.52 2.521 2.521 0 0 1 2.521-2.521h6.314a2.521 2.521 0 0 1 2.52 2.521 2.52 2.52 0 0 1-2.52 2.52h-6.314Z"
        fill="#ECB22E"
      />
    </svg>
  );
}

export function TelegramIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="tg-grad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#37BBFE" />
          <stop offset="1" stopColor="#007DBB" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#tg-grad)" />
      <path
        d="M5.45 11.74c3.7-1.62 6.18-2.7 7.42-3.21 3.55-1.48 4.28-1.74 4.76-1.75.11 0 .35.02.5.15.13.1.17.25.18.36.02.1.05.34.03.53-.18 1.92-.96 6.6-1.36 8.75-.17.92-.5 1.22-.83 1.25-.7.07-1.24-.47-1.92-.91-1.07-.7-1.68-1.13-2.72-1.82-1.2-.79-.42-1.23.26-1.94.18-.18 3.27-3 3.34-3.25.01-.03.02-.15-.06-.21a.27.27 0 0 0-.24-.03c-.1.02-1.81 1.15-5.1 3.39-.49.33-.93.5-1.32.49-.43-.01-1.27-.24-1.89-.45-.76-.25-1.36-.38-1.31-.8.03-.21.32-.42.85-.65Z"
        fill="#fff"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M.05 24l1.7-6.2A11.94 11.94 0 0 1 12.05 0a12 12 0 0 1 0 24h-.01a12 12 0 0 1-5.74-1.46L.05 24Zm6.6-3.83.36.21a9.97 9.97 0 0 0 5.08 1.39 9.97 9.97 0 1 0-8.45-15.27 9.94 9.94 0 0 0 1.53 13.06l.24.22-1 3.67 3.74-.98ZM18 14.3c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.6.14-.18.27-.7.88-.85 1.06-.16.18-.31.2-.58.07a7.4 7.4 0 0 1-2.18-1.35 8.18 8.18 0 0 1-1.51-1.88c-.16-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.83-1.99-.22-.52-.44-.45-.6-.46l-.52-.01a.99.99 0 0 0-.72.34c-.25.27-.95.93-.95 2.25 0 1.33.97 2.61 1.1 2.79.14.18 1.91 2.92 4.63 4.1.65.28 1.15.45 1.55.57.65.2 1.24.18 1.7.1.52-.07 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.06-.11-.24-.18-.51-.31Z"
        fill="#25D366"
      />
    </svg>
  );
}

export function MailIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="mail-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7dc4ff" />
          <stop offset="1" stopColor="#0d99ff" />
        </linearGradient>
      </defs>
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="15"
        rx="2.2"
        fill="url(#mail-grad)"
        opacity="0.95"
      />
      <path
        d="m3 6.5 9 6.2 9-6.2"
        stroke="#fff"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
