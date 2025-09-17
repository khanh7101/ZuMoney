import type { ReactNode } from "react";

export default function SettingCard({
  title,
  children,
}: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      {title && <h2 className="mb-2 font-semibold text-xl text-black">{title}</h2>}
      {children}
    </div>
  );
}
