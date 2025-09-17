import { useState } from "react";
import HeaderClose from "@shared/layout/HeaderClose";
import SettingCard from "@shared/ui/SettingCard";
import { useAuth } from "@auth/context/AuthContext";
import ConfirmDialog from "@ui/ConfirmDialog";
import { ROUTES } from "@shared/nav/routes";

export default function AccountInfo() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const name  = (user?.user_metadata as any)?.full_name || (user?.user_metadata as any)?.name || "—";
  const email = user?.email || "—";

  const onConfirmDelete = async () => {
    try {
      setSubmitting(true);
      // TODO: gọi API xoá tài khoản & dữ liệu của user.
      // Ví dụ: await deleteMyAccount();
      // Rồi chuyển về /login hoặc trang cảm ơn...
      // router.replace(ROUTES.LOGIN);
      setOpen(false);
      alert("Đã giả lập xoá tài khoản. Gắn API thật ở TODO.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-5">
      <HeaderClose title="Thông tin tài khoản" />


      <SettingCard title="Chi tiết tài khoản">
        <div className="space-y-4 text-[15px]">
          <div>
            <div className="text-black">Tên</div>
            <div className="font-normal text-gray-500">{name}</div>
          </div>
          <div>
            <div className="text-black">Email</div>
            <div className="font-normal text-gray-500">{email}</div>
          </div>
        </div>
      </SettingCard>

      <p className="text-sm text-gray-600">
        Để xóa hoàn toàn dữ liệu của mình, bạn có thể{" "}
        <button type="button" className="underline text-black   " onClick={() => setOpen(true)}>
          Đóng tài khoản
        </button>
      </p>

      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={onConfirmDelete}
        loading={submitting}
        title="Xóa tài khoản"
        description="Bạn có chắc chắn muốn xóa tài khoản này không? Nếu bạn xóa nó, tất cả thông tin bạn đã tạo sẽ bị mất. Những thông tin này sẽ không thể khôi phục lại được."
        // illustration={
          // minh họa đơn giản — bạn có thể thay bằng <img src="/..." />
          // <div className="grid h-24 w-24 place-items-center rounded-full bg-amber-300 text-5xl">
          //   😮
          // </div>
        // }
        confirmText="ĐỒNG Ý"
        cancelText="THUI, QUAY LẠI"
      />
    </section>
  );
}
