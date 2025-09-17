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
      className="flex w-full items-center justify-between px-1 py-[6px] text-left text-gray-500"
    >
      <div className="flex items-center gap-3">
        {/* Icon wrapper */}
        {icon && (
          <div className="flex items-center justify-center w-6 h-6">
            {icon}
          </div>
        )}

        {/* Text block */}
        <div className="flex flex-col">
          <div className="text-[15px] ">{label}</div>
          {description && (
            <div className="text-xs ">{description}</div>
          )}
        </div>
      </div>

      {/* Mũi tên bên phải */}
      <span>›</span>
    </button>
  );
}
