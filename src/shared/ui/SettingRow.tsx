import type { ReactNode } from "react";

export default function SettingRow({
  label,
  description,
  onClick,
  icon,
}: {
  label: string;
  description?: string;
  onClick: () => void;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left hover:bg-black/[0.02]"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-xl">{icon}</div>}
        <div>
          <div className="text-[15px]">{label}</div>
          {description && (
            <div className="text-xs text-gray-500">{description}</div>
          )}
        </div>
      </div>
      <span className="text-gray-400">›</span>
      
    </button>
  );
}
