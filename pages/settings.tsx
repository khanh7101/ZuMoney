export default function SettingsPage() {
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

      <button className="text-sm text-rose-600 underline">Đăng xuất</button>
    </section>
  );
}
