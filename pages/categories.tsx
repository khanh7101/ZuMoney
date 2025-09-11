// pages/categories.tsx
import RequireAuth from "../components/auth/RequireAuth";
import { CategoriesProvider } from "../src/context/CategoriesContext";
import CategoryGroupForm from "../components/categories/CategoryGroupForm";
import CategoryForm from "../components/categories/CategoryForm";

export default function CategoriesPage() {
  return (
    <RequireAuth>
      <CategoriesProvider>
        <section className="space-y-4">
          <h1 className="text-xl font-semibold">Categories</h1>
          <CategoryGroupForm />
          <CategoryForm />
        </section>
      </CategoriesProvider>
    </RequireAuth>
  );
}
