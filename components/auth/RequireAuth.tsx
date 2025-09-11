import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../src/context/AuthContext";

type RequireAuthProps = {
  children: ReactNode;
  redirectTo?: string;            // mặc định /login
  loadingFallback?: ReactNode;    // UI hiển thị khi kiểm tra session
};

export default function RequireAuth({
  children,
  redirectTo = "/login",
  loadingFallback,
}: RequireAuthProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Nếu chưa đăng nhập -> chuyển về /login?next=<đường dẫn hiện tại>
  useEffect(() => {
    if (!loading && !user) {
      const next = encodeURIComponent(router.asPath || "/");
      router.replace(`${redirectTo}?next=${next}`);
    }
  }, [loading, user, router, redirectTo]);

  if (loading) {
    return (
      <>
        {loadingFallback ?? (
          <p className="text-sm text-gray-500">Đang kiểm tra đăng nhập…</p>
        )}
      </>
    );
  }

  // Đang redirect về login
  if (!user) return null;

  return <>{children}</>;
}
