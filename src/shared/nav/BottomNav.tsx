import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { BudgetIcon, WalletIcon, PlusIcon, ChartIcon, SettingsIcon } from "@nav/icons";
import AddTransactionSheet from "@nav/AddTransactionSheet";
import { ROUTES } from "@nav/routes";

type IconComp = (p: React.SVGProps<SVGSVGElement>) => JSX.Element;
type Item = { label: string; href?: string; icon: IconComp };

const ITEMS: Item[] = [
  { label: "Ngân sách", href: ROUTES.BUDGETS, icon: BudgetIcon },
  { label: "Ví",        href: ROUTES.WALLETS, icon: WalletIcon },
  { label: "Thêm",                           icon: PlusIcon }, // giữa: không href -> mở sheet
  { label: "Phân tích", href: ROUTES.ANALYTICS, icon: ChartIcon },
  { label: "Cài đặt",   href: ROUTES.SETTINGS,  icon: SettingsIcon },
];

export default function BottomNav() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = useState(false);
  const path = router.asPath;

  const isActive = useMemo(
    () => (href?: string) => !!href && (path === href || path.startsWith(href + "/")),
    [path]
  );

  // Đóng sheet khi đổi route
  useEffect(() => { setOpenAdd(false); }, [path]);

  return (
    <>
      {/* Thanh nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur md:hidden pb-safe"
        // style={{ paddingBottom: `env(safe-area-inset-bottom, 0px)` }}
      >
        <div className="relative mx-auto grid max-w-3xl grid-cols-5 px-3 py-2">
          {ITEMS.map((it, idx) => {
            const Icon = it.icon;
            const active = isActive(it.href);
            const common = "flex flex-col items-center justify-center gap-0.5 text-[11px]";

            // Ô giữa: nút nổi “Thêm”
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

      {/* chừa chỗ để nội dung không bị che
      <div className="h-20 md:hidden" aria-hidden /> */}

      {/* bottom sheet thêm giao dịch */}
      <AddTransactionSheet open={openAdd} onClose={() => setOpenAdd(false)} />
    </>
  );
}
