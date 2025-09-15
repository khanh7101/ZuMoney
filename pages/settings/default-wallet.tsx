// import SeoHead from "@shared/seo/SeoHead";
import HeaderClose from "@shared/layout/HeaderClose";
import SettingCard from "@shared/ui/SettingCard";
import { ROUTES } from "@shared/nav/routes";

export default function DefaultWallet() {
  return (
    <section className="space-y-5">
      <HeaderClose title="Ví mặc định" />
      <p className="text-gray-600">Ví mặc định là ví được tự động chọn mỗi khi bạn tạo giao dịch.</p>

      <SettingCard title="Ví mặc định">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-3 text-left"
        >
          <span>Chưa chọn</span>
          <span className="opacity-50">›</span>
        </button>
      </SettingCard>
    </section>
  );
}
