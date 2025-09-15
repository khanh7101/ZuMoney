// import SeoHead from "@shared/seo/SeoHead";
import HeaderClose from "@shared/layout/HeaderClose";
import SettingCard from "@shared/ui/SettingCard";
import { useAuth } from "@auth/context/AuthContext";
import { ROUTES } from "@shared/nav/routes";

export default function AccountInfo() {
  const { user } = useAuth();
  const name  = (user?.user_metadata as any)?.full_name || (user?.user_metadata as any)?.name || "—";
  const email = user?.email || "—";

  return (
    <section className="space-y-5">
      <HeaderClose title="Thông tin tài khoản" />

      <SettingCard title="Chi tiết tài khoản">
        <div className="space-y-4 text-[15px]">
          <div>
            <div className="text-gray-500">Tên</div>
            <div className="font-medium">{name}</div>
          </div>
          <div>
            <div className="text-gray-500">Email</div>
            <div className="font-medium">{email}</div>
          </div>
        </div>
      </SettingCard>

      <p className="text-sm text-gray-600">
        Để xóa hoàn toàn dữ liệu của mình, bạn có thể <a className="underline" href="#">Đóng tài khoản</a>
      </p>
    </section>
  );
}
