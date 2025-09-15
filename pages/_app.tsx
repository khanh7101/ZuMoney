// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "../src/features/auth/context/AuthContext";
import BottomNav from "../src/shared/nav/BottomNav";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNav = router.pathname === "/login";

  return (
    <AuthProvider>
      <main className="mx-auto max-w-3xl px-4 py-4 md:max-w-6xl md:pb-8">
        <Component {...pageProps} />
      </main>

      {!hideNav && <BottomNav />}
    </AuthProvider>
  );
}
