// components/categories/CategoryGroupForm.tsx
import { useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useAuth } from "../../src/context/AuthContext";
import { useCategories } from "../../src/context/CategoriesContext";
import { createCategoryGroup } from "../../src/services/categoryGroups"; // giữ nguyên service hiện có

export default function CategoryGroupForm() {
  const { user } = useAuth();
  const { reload } = useCategories();

  const [name, setName] = useState("Monthly Budget");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;
    if (!user?.id) return alert("Missing user");

    try {
      setLoading(true);
      await createCategoryGroup({ user_id: user.id, name });
      setName("");
      await reload(); // tự refetch sau khi tạo
    } catch (e: any) {
      alert(e.message ?? "Failed to create category group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create Category Group">
      <div className="space-y-3">
        <input
          className="w-full rounded-lg p-2"
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Add Group"}
        </Button>
      </div>
    </Card>
  );
}
