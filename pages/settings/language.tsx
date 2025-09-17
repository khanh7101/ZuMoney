import HeaderClose from "@shared/layout/HeaderClose";
import { ROUTES } from "@shared/nav/routes";

export default function LanguagePage() {
  return (
    <section className="space-y-5">
      <HeaderClose title="Chọn ngôn ngữ"/>

      <div className="rounded-2xl border bg-white p-2 shadow-sm">
        <button className="flex w-full items-center justify-between rounded-xl px-4 py-4 text-left hover:bg-black/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇻🇳</span>
            <span>Tiếng Việt</span>
          </div>
          <span className="text-emerald-500">✓</span>
        </button>
        <hr className="mx-4 border-gray-100" />
        <button className="flex w-full items-center justify-between rounded-xl px-4 py-4 text-left hover:bg-black/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇺🇸</span>
            <span>English</span>
          </div>
        </button>
      </div>
    </section>
  );
}
