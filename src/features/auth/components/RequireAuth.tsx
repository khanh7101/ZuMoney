// src/features/auth/components/RequireAuth.tsx
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@auth/context/AuthContext";
import { ROUTES } from "@shared/nav/routes";

type RequireAuthProps = {
  children: ReactNode;
  /** Mặc định chuyển về /login */
  redirectTo?: string;
  /** UI hiển thị khi đang kiểm tra session */
  loadingFallback?: ReactNode;
};

export default function RequireAuth({
  children,
  redirectTo = ROUTES.LOGIN,
  loadingFallback,
}: RequireAuthProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Nếu chưa đăng nhập -> chuyển về /login (không kèm ?next)
  useEffect(() => {
    if (!loading && !user) {
      router.replace(redirectTo);
    }
  }, [loading, user, redirectTo, router]);

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
