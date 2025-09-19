import React from "react";
import { ShowIcon, HideIcon } from "@/shared/nav/icons";

function fmt(n?: number) {
  if (n === undefined || n === null) return "0 ₫";
  const abs = Math.abs(n);
  const s = Math.floor(abs).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${n < 0 ? "-" : ""}${s} ₫`;
}

export default function TotalAssetCard({
  total,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  hideAmount,
  onToggleHide,
}: {
  total: number;
  leftLabel: string;
  leftValue: number;
  rightLabel: string;
  rightValue: number;
  hideAmount?: boolean;
  onToggleHide?: () => void;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-emerald-900 px-5 py-6 text-white  min-h-[190px]">
      <div className="flex justify-center">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={onToggleHide}
          title={hideAmount ? "Hiện số dư" : "Ẩn số dư"}
        >
          <p className="text-xs/3 opacity-90">Tổng tài sản</p>
          <span className="inline-block text-white">
            {hideAmount ? <HideIcon /> : <ShowIcon />}
          </span>
        </div>
 
      </div>
      <div className="flex justify-center  text-3xl font-medium tracking-tight mb-4">
        {hideAmount ? "*********" : fmt(total)}
      </div>  


      {!hideAmount && (
        <div
          className="flex text-sm/5 text-white w-full cursor-pointer select-none"
          title="Ẩn số dư"
        >
          {/* Bên trái */}
          <div className="flex flex-col flex-1 items-center text-xs">
            <div className="opacity-80">{leftLabel}</div>
            <div className="font-semibold">{fmt(leftValue)}</div>
          </div>

          {/* Vạch xám chia đôi */}
          <div className="w-px bg-white/20 mx-4"></div>

          {/* Bên phải */}
          <div className="flex flex-col flex-1 items-center text-xs">
            <div className="opacity-80">{rightLabel}</div>
            <div className="font-semibold">{fmt(rightValue)}</div>
          </div>
        </div>
      )}


    </section>
  );
}
