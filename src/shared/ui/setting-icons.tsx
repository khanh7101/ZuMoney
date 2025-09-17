export const InfoIcon = (p: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    className={`w-[19px] h-[19px]   ${p.className ?? ""}`}
  >
    <circle cx="12" cy="12" r="10" fill="#6B7280"/>
    <line x1="12" x2="12" y1="8" y2="12" stroke="white" strokeWidth="2" />
    <line x1="12" x2="12.01" y1="16" y2="16" stroke="white" strokeWidth="2" />
  </svg>
);
export const WalletIcon = (p: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    className={`w-[19px] h-[19px] ${p.className ?? ""}`}
  >
    {/* Nửa dưới tô đỏ */}
    <rect x="2" y="12" width="20" height="7" fill="gray" rx="0" />

    {/* Viền card */}
    <rect width="20" height="14" x="2" y="5" rx="2" stroke="gray" fill="none" />

    {/* Đường kẻ ngang */}
    <line x1="2" x2="22" y1="10" y2="10" stroke="gray" />
  </svg>
);
export const LangIcon = (p: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[15px] h-[15px] text-white bg-gray-500 rounded-sm p-[1px]"
  >
    <path d="m5 8 6 6"/>
    <path d="m4 14 6-6 2-3"/>
    <path d="M2 5h12"/>
    <path d="M7 2h1"/>
    <path d="m22 22-5-10-5 10"/>
    <path d="M14 18h6"/>
  </svg>
);
export const MailIcon = (p: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-[17px] h-[17px] ${p.className ?? ""}`}
  >
    <path d="M18 20a6 6 0 0 0-12 0" />
    <circle cx="12" cy="10" r="4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);
export const CloseIcon = (p: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" 
    className={`w-6 h-6 ${p.className ?? ""}`}
   >
    <mask id="x-cutout">
      <rect width="24" height="24" fill="white" />
      <line x1="16" y1="8" x2="8" y2="16" stroke="black" strokeWidth="2" />
      <line x1="8" y1="8" x2="16" y2="16" stroke="black" strokeWidth="2" />  
    </mask>
    <circle cx="12" cy="12" r="12" fill="gray" mask="url(#x-cutout)" />
  </svg>
);
// export const BackIcon    = (p: any) => <span>←</span>;
// export const CheckIcon   = (p: any) => <span>✔️</span>;