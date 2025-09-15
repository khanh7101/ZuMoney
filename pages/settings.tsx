import { useState } from "react";
import { useRouter } from "next/router";
import { logout } from "@auth/services/authService";
import { ROUTES } from "@shared/nav/routes";

export default function SettingsPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleLogout = async () => {
    if (submitting) return;
    setErr(null);
    setSubmitting(true);
    try {

      await logout();

      // Chuyển về trang đăng nhập
      router.replace(ROUTES.LOGIN);
    } catch (e: any) {
      setErr(e?.message ?? "Đăng xuất thất bại, vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Cài đặt</h1>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="mb-2 font-medium">Cài đặt</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between">
            <span>Thông tin tài khoản</span>
            <span className="opacity-50">›</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Ví mặc định</span>
            <span className="opacity-50">›</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Ngôn ngữ</span>
            <span className="opacity-50">›</span>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="mb-2 font-medium">Trợ giúp</h2>
        <button className="w-full rounded-lg border px-3 py-2 text-left text-sm">
          Liên hệ chúng tôi
        </button>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleLogout}
          disabled={submitting}
          aria-busy={submitting}
          className="text-sm text-rose-600 underline disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Đang đăng xuất..." : "Đăng xuất"}
        </button>
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
      </div>
    </section>
  );
}
