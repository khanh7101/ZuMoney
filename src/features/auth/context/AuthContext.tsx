import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@lib/supabaseClient"; // chỉnh path nếu khác

// Giá trị context đã kiểu hóa rõ ràng
type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

// Dùng `| undefined` để ép buộc phải nằm trong Provider (giúp TS an toàn hơn)
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Lấy session hiện tại
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    // Lắng nghe thay đổi đăng nhập/đăng xuất
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ session, user: session?.user ?? null, loading }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook dùng trong component: luôn trả về value đã kiểu hóa
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}

export { AuthContext };
