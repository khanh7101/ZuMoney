// Các loại giao dịch hợp lệ
export const TRANSACTION_TYPES = ['income', 'expense'] as const;
export type TransactionType = typeof TRANSACTION_TYPES[number];

/** Type guard tiện kiểm tra dữ liệu runtime (ví dụ khi parse từ URL/query) */
export function isTransactionType(x: unknown): x is TransactionType {
  return typeof x === 'string' && (TRANSACTION_TYPES as readonly string[]).includes(x);
}

// Một vài hằng số UI nhẹ (tuỳ chọn)
export const DEFAULT_WALLET_ICON = '💳';
export const DEFAULT_CATEGORY_ICON = '📁';
