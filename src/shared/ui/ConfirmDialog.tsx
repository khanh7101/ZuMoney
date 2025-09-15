import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  // icon/illustration ở trên cùng (tuỳ chọn)
  illustration?: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  // bấm backdrop có được đóng không
  dismissOnBackdrop?: boolean;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "ĐỒNG Ý",
  cancelText = "THUI, QUAY LẠI",
  loading = false,
  illustration,
  onConfirm,
  onCancel,
  dismissOnBackdrop = true,
}: Props) {
  // Khoá scroll nhẹ khi mở dialog
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);

  // ESC để đóng
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismissOnBackdrop ? onCancel : undefined}
        aria-hidden
      />
      {/* card */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
          {/* illustration */}
          {illustration && (
            <div className="mb-2 grid place-items-center">
              <div className="h-24 w-24">{illustration}</div>
            </div>
          )}

          <h2 className="mb-2 text-center text-xl font-semibold text-gray-900">{title}</h2>
          {description && (
            <p className="mb-4 text-center text-[15px] leading-relaxed text-gray-600">
              {description}
            </p>
          )}

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="block w-full rounded-xl bg-rose-600 py-3 text-center text-[15px] font-semibold text-white shadow hover:bg-rose-500 disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : confirmText}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="mt-3 block w-full rounded-xl py-3 text-center text-[13px] font-semibold text-amber-600 underline disabled:opacity-60"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
