// src/context/CategoriesContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@lib/supabaseClient";
import { useAuth } from "@auth/context/AuthContext";

/**
 * Tối thiểu cho CategoryGroup.
 * Nếu bạn đã có type chuẩn trong src/types, có thể:
 *   import type { CategoryGroup } from "../types";
 * và xoá interface bên dưới.
 */
export interface CategoryGroup {
  id: string | number;
  name: string;
  user_id?: string | null;
  // Nếu schema của bạn dùng household, thêm:
  // household_id?: string | null;
}

type CategoriesContextValue = {
  groups: CategoryGroup[];
  loading: boolean;
  error: string | null;
  /**
   * Tải lại danh sách nhóm (gọi sau khi tạo/sửa/xoá).
   */
  reload: () => Promise<void>;
};

const CategoriesContext = createContext<CategoriesContextValue | undefined>(
  undefined
);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    // Nếu chưa có user thì trả rỗng
    if (!user?.id) {
      setGroups([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // ⚠️ ĐỔI tên bảng/cột filter cho đúng schema của bạn.
    // Nếu bạn lưu theo household_id, hãy thay .eq("user_id", user.id)
    // thành .eq("household_id", currentHouseholdId).
    const { data, error } = await supabase
      .from("category_groups")
      .select("id,name,user_id")
      .eq("user_id", user.id)
      .order("name", { ascending: true });

    if (error) {
      setError(error.message);
      setGroups([]);
    } else {
      setGroups((data ?? []) as CategoryGroup[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    // user thay đổi -> refetch
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const value = useMemo<CategoriesContextValue>(
    () => ({ groups, loading, error, reload }),
    [groups, loading, error]
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

/**
 * Hook tiện dụng để dùng trong component:
 * const { groups, loading, error, reload } = useCategories();
 */
export function useCategories(): CategoriesContextValue {
  const ctx = useContext(CategoriesContext);
  if (!ctx) {
    throw new Error("useCategories must be used within <CategoriesProvider>");
  }
  return ctx;
}
