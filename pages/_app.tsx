// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";

import AppProviders from "@providers/AppProviders";
import BottomNav from "@shared/nav/BottomNav";
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
      <main className="mx-auto max-w-3xl px-4 py-4 md:max-w-6xl md:pb-8">
        {page}
      </main>
      {!hideNav && <BottomNav />}
    </AppProviders>
  );
}
