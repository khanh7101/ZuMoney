import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@auth/context/AuthContext";
import { logout } from "@auth/services/authService";
import { ROUTES } from "@nav/routes";

import SettingCard from "@ui/SettingCard";
import SettingRow from "@ui/SettingRow";
import { InfoIcon, WalletIcon, LangIcon, MailIcon } from "@ui/setting-icons";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const name  = (user?.user_metadata as any)?.full_name || (user?.user_metadata as any)?.name || "—";
  const email = user?.email || "—";

  const go = (href: string) => () => router.push(href);

  const onLogout = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await logout();
      router.replace(ROUTES.LOGIN);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-5 pt-10">

      <h1 className="text-4xl font-semibold text-black ">Cài đặt</h1>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-amber-300 text-lg font-bold text-gray-800">
            {name?.[0]?.toUpperCase?.() || "U"}
          </div>
          <div>
            <div className="text-[15px] font-medium">{name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      </div>

        <h2 className="text-2xl text-black ">Cài đặt</h2>
      <SettingCard>
        <div className="space-y-1">
          <SettingRow label="Thông tin tài khoản" onClick={go("/settings/account")} icon={<InfoIcon />} />
          <SettingRow label="Ví mặc định"          onClick={go("/settings/default-wallet")} icon={<WalletIcon />} />
          <SettingRow label="Ngôn ngữ"             onClick={go("/settings/language")} icon={<LangIcon />} />
        </div>
      </SettingCard>
        <h2 className="text-2xl text-black ">Trợ giúp</h2>

      <SettingCard >
        <SettingRow label="Liên hệ chúng tôi" onClick={go("/settings/contact")} icon={<MailIcon />} />
      </SettingCard>

      <button
        onClick={onLogout}
        disabled={submitting}
        className="text-xs text-black  underline disabled:opacity-60"
      >
        {submitting ? "Đang đăng xuất..." : "Đăng xuất"}
      </button>
    </section>
  );
}
