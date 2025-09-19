export default function QuickActions({
  onCreate,
  onFastReconcile,
}: {
  onCreate: () => void;
  onFastReconcile: () => void;
}) {
  return (
    <section className="mt-4 grid grid-cols-2 gap-3 text-center text-[15px]">
      <button
        type="button"
        onClick={onCreate}
        className="flex items-center justify-center gap-2 rounded-2xl bg-white py-3 shadow-sm"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-300">＋</span>
        <span>Tạo ví mới</span>
      </button>

      <button
        type="button"
        onClick={onFastReconcile}
        className="flex items-center justify-center gap-2 rounded-2xl bg-white py-3 shadow-sm"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-300">⚡</span>
        <span>Khớp số dư nhanh</span>
      </button>
    </section>
  );
}
