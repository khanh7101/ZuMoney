// Chuẩn hoá đường dẫn + rule bảo vệ đăng nhập
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  BUDGETS: "/budgets",
  WALLETS: "/wallets",
  TRANSACTIONS: "/transactions",
  CATEGORIES: "/categories",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
} as const;

export const PROTECTED_PREFIXES = [
  ROUTES.BUDGETS,
  ROUTES.WALLETS,
  ROUTES.TRANSACTIONS,
  ROUTES.CATEGORIES,
  ROUTES.ANALYTICS,
  ROUTES.SETTINGS,
] as const;

export const isProtectedPath = (asPath: string) =>
  PROTECTED_PREFIXES.some((p) => asPath === p || asPath.startsWith(p + "/"));
