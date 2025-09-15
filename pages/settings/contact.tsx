// import SeoHead from "@shared/seo/SeoHead";
import HeaderClose from "@shared/layout/HeaderClose";
import SettingCard from "@shared/ui/SettingCard";
import { MailIcon } from "@shared/ui/setting-icons";
import { ROUTES } from "@shared/nav/routes";

export default function ContactPage() {
  return (
    <section className="space-y-5">
      <HeaderClose title="Liên hệ chúng tôi" />

      <SettingCard>
        <p className="mb-4 text-[15px] text-gray-700">
          Đừng ngần ngại liên hệ với chúng tôi nếu bạn có đề xuất, khiếu nại hoặc vấn đề gì cần giải quyết.
        </p>

        <a
          href="mailto:kingdom.dn2000@gmail.com"
          className="mb-4 flex items-center justify-between rounded-xl bg-amber-50 px-4 py-4 text-amber-800 hover:bg-amber-100"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl"><MailIcon /></span>
            <div>
              <div className="font-medium">Gửi mail cho chúng tôi</div>
              <div className="text-sm">kingdom.dn2000@gmail.com</div>
            </div>
          </div>
          <span>↗</span>
        </a>

        
      </SettingCard>
    </section>
  );
}
