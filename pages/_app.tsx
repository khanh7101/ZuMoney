import type { AppProps } from "next/app";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../src/context/AuthContext";
import RequireAuth from "../components/auth/RequireAuth";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNavbar = router.pathname === "/login";

  // Những route cần đăng nhập
  const PROTECTED_PREFIXES = ["/wallets", "/transactions", "/categories", "/accounts"];
  const isProtected = PROTECTED_PREFIXES.some((p) => router.pathname.startsWith(p));

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {isProtected ? (
          <RequireAuth>
            <Component {...pageProps} />
          </RequireAuth>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </AuthProvider>
  );
}