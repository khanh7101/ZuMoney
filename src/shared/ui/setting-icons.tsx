export const InfoIcon    = (p: any) => <span {...p}>ℹ️</span>;
export const WalletIcon  = (p: any) => <span {...p}>💼</span>;
export const LangIcon    = (p: any) => <span {...p}>🌐</span>;
export const MailIcon    = (p: any) => <span {...p}>✉️</span>;
export const CloseIcon = (p: any) => (
  <svg
    {...p}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-6 h-6"
  >
    <mask id="x-cutout">
      {/* nền mask trắng = giữ lại */}
      <rect width="24" height="24" fill="white" />
      {/* vẽ X bằng đen = khoét đi */}
      <line x1="18" y1="6" x2="6" y2="18" stroke="black" strokeWidth="2" />
      <line x1="6" y1="6" x2="18" y2="18" stroke="black" strokeWidth="2" />
    </mask>
    {/* vòng tròn xám, nhưng áp dụng mask để X trong suốt */}
    <circle cx="12" cy="12" r="12" fill="#9CA3AF" mask="url(#x-cutout)" />
  </svg>
);
export const BackIcon    = (p: any) => <span {...p}>←</span>;
export const CheckIcon   = (p: any) => <span {...p}>✔️</span>;