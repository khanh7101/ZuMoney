// src/providers/AppProviders.tsx
import type { ReactNode } from "react";
import { AuthProvider } from "@auth/context/AuthContext";

// Sau này nếu bạn thêm React Query, ThemeProvider... thì bọc ở đây luôn.
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
