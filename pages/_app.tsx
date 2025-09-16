// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import AppProviders from "@providers/AppProviders";
import BottomNav from "@nav/BottomNav";
import { ROUTES, isProtectedPath } from "@shared/nav/routes";
import RequireAuth from "@auth/components/RequireAuth";

import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNav = router.pathname === ROUTES.LOGIN;
  const needAuth = isProtectedPath(router.asPath);

  const page = needAuth ? (
    <RequireAuth>
      <Component {...pageProps} />
    </RequireAuth>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <AppProviders>
      {/* MAIN là phần tử cuộn, đã chừa chỗ cho bottom nav */}
      <main className="min-h-dvh pt-safe pb-nav overflow-auto no-scrollbar mx-auto max-w-3xl px-4 md:max-w-6xl">
        {page}
      </main>

      {!hideNav && <BottomNav />}
    </AppProviders>
  );
}
