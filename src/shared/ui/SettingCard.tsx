import type { ReactNode } from "react";

export default function SettingCard({
  title,
  titleClassName,
  bgColor,
  children,
}: { title?: string; titleClassName?: string;bgColor?: string; children: ReactNode }) {
  return (
    <div className={`rounded-2xl border ${bgColor ?? "bg-white"} p-4 shadow-sm`}>
      {title && (
        <h2
          className={` ${titleClassName ?? ""}`}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
