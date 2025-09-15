import RequireAuth from "@auth/components/RequireAuth";
import { CategoriesProvider } from "@categories/context/CategoriesContext";
import CategoryGroupForm from "@categories/components/CategoryGroupForm";
import CategoryForm from "@categories/components/CategoryForm";

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
