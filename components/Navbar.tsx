import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Wallets", href: "/wallets" },
  { label: "Transactions", href: "/transactions" },
  { label: "Categories", href: "/categories" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + "/");

  useEffect(() => setOpen(false), [router.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        {/* <Link href="/" className="font-semibold tracking-tight">ZuMoney</Link> */}

        {/* Desktop */}
        <ul className="hidden gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  "rounded-lg px-3 py-2 text-sm transition " +
                  (isActive(item.href)
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100")
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center rounded-lg border px-3 py-2 text-sm md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          ☰ Menu
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    "block rounded-lg px-3 py-2 text-sm transition " +
                    (isActive(item.href)
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100")
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
