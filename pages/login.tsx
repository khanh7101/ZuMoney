// pages/login.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@auth/context/AuthContext";
import {
  signUpWithEmailPasswordAndUsername,
  loginWithUsername,
} from "@auth/services/authService";
import { ROUTES } from "@shared/nav/routes";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("signin");

  // Sign in fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Sign up fields
  const [regEmail, setRegEmail] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (user) router.replace(ROUTES.BUDGETS);
  }, [user, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setSubmitting(true);
    try {
      await loginWithUsername(username.trim(), password);
      router.replace(ROUTES.BUDGETS);
    } catch (error: any) {
      const m = error?.message?.toLowerCase?.() ?? "";
      if (m.includes("invalid") || m.includes("credentials")) {
        setErr("Sai username hoặc mật khẩu.");
      } else if (m.includes("confirm")) {
        setErr("Email chưa xác thực. Hãy xác thực email đã đăng ký trước.");
      } else {
        setErr(error?.message ?? "Đăng nhập thất bại");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    if (!regEmail || !regUsername || !regPassword) {
      setErr("Vui lòng nhập username, email và mật khẩu.");
      return;
    }
    if (regPassword.length < 6) {
      setErr("Mật khẩu tối thiểu 6 ký tự.");
      return;
    }
    if (regPassword !== regPassword2) {
      setErr("Xác nhận mật khẩu không khớp.");
      return;
    }

    setSubmitting(true);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : undefined;
      await signUpWithEmailPasswordAndUsername(
        regEmail.trim(),
        regPassword,
        regUsername.trim(),
        origin
      );
      setMsg(
        "Đăng ký thành công! Hãy kiểm tra email để XÁC THỰC (1 lần). Sau đó bạn có thể đăng nhập bằng username + password."
      );
      setMode("signin");
    } catch (error: any) {
      setErr(error?.message ?? "Đăng ký thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  // Có thể hiển thị loading nhẹ khi đang kiểm tra session
  // if (loading) return <div className="min-h-screen grid place-items-center">Đang tải…</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="mb-2 text-2xl font-bold">ZuMoney</h1>
        <p className="mb-4 text-sm text-[var(--muted)]">
          Đăng nhập bằng username & mật khẩu
        </p>

        {/* Tabs */}
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            className={`px-3 py-1 rounded ${
              mode === "signin" ? "bg-white/10" : "bg-white/5"
            }`}
            onClick={() => setMode("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded ${
              mode === "signup" ? "bg-white/10" : "bg-white/5"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        {mode === "signin" ? (
          <form onSubmit={handleSignIn}>
            <input
              className="mb-3 w-full rounded p-3"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              className="mb-3 w-full rounded p-3"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button className="btn w-full" type="submit" disabled={submitting}>
              {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <input
              className="mb-3 w-full rounded p-3"
              type="text"
              placeholder="Username (duy nhất)"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              required
            />
            <input
              className="mb-3 w-full rounded p-3"
              type="email"
              placeholder="Email (để xác thực 1 lần)"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input
              className="mb-3 w-full rounded p-3"
              type="password"
              placeholder="Mật khẩu (>= 6 ký tự)"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <input
              className="mb-3 w-full rounded p-3"
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={regPassword2}
              onChange={(e) => setRegPassword2(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button className="btn w-full" type="submit" disabled={submitting}>
              {submitting ? "Đang tạo tài khoản..." : "Đăng ký"}
            </button>
          </form>
        )}

        {msg && <p className="mt-3 text-sm text-emerald-400">{msg}</p>}
        {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
      </div>
    </div>
  );
}
