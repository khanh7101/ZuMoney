// components/nav/BottomNav.tsx
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { BudgetIcon, WalletIcon, PlusIcon, ChartIcon, SettingsIcon } from "./icons";
import AddTransactionSheet from "../../shared/nav/AddTransactionSheet";

type Item = { label: string; href?: string; icon: (p: any) => JSX.Element; };

const ITEMS: Item[] = [
  { label: "Ngân sách", href: "/budgets", icon: BudgetIcon },
  { label: "Ví",        href: "/wallets", icon: WalletIcon },
  { label: "Thêm",                   icon: PlusIcon }, // giữa: không href -> mở sheet
  { label: "Phân tích", href: "/analytics", icon: ChartIcon },
  { label: "Cài đặt",   href: "/settings",  icon: SettingsIcon },
];

export default function BottomNav() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = useState(false);
  const path = router.asPath;

  const isActive = useMemo(
    () => (href?: string) => !!href && (path === href || path.startsWith(href + "/")),
    [path]
  );

  // đóng sheet khi route chuyển
  useEffect(() => { setOpenAdd(false); }, [path]);

  return (
    <>
      {/* thanh nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur md:hidden"
        style={{ paddingBottom: `env(safe-area-inset-bottom, 0px)` }}
      >
        <div className="relative mx-auto grid max-w-3xl grid-cols-5 px-3 py-2">
          {ITEMS.map((it, idx) => {
            const Icon = it.icon;
            const active = isActive(it.href);
            const common =
              "flex flex-col items-center justify-center gap-0.5 text-[11px]";
            // ô giữa: nút nổi
            if (idx === 2) {
              return (
                <div key={idx} className="relative flex items-center justify-center">
                  <button
                    type="button"
                    aria-label="Thêm giao dịch"
                    onClick={() => setOpenAdd(true)}
                    className="grid h-14 w-14 -translate-y-6 place-items-center rounded-full bg-amber-400 text-gray-900 shadow-[0_8px_24px_rgba(0,0,0,.18)] ring-8 ring-white"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                </div>
              );
            }
            return (
              <button
                key={idx}
                type="button"
                onClick={() => it.href && router.push(it.href)}
                className={`${common} ${active ? "text-amber-600" : "text-gray-500"}`}
              >
                <Icon className="h-5 w-5" />
                <span>{it.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* chừa chỗ để nội dung không bị che */}
      <div className="h-20 md:hidden" aria-hidden />

      {/* bottom sheet thêm giao dịch */}
      <AddTransactionSheet open={openAdd} onClose={() => setOpenAdd(false)} />
    </>
  );
}
