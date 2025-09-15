// components/categories/CategoryForm.tsx
import { useState } from "react";
import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";
import { useCategories } from "../context/CategoriesContext";
import { createCategory } from "../services/categories"; // giữ nguyên service hiện có

export default function CategoryForm() {
  // Lấy groups để đổ select + reload để refetch sau khi tạo
  const { groups, reload } = useCategories();

  const [groupId, setGroupId] = useState<number | "">("");
  const [target, setTarget] = useState("Groceries");
  const [allocated, setAllocated] = useState<number>(0);
  const [icon, setIcon] = useState("🧺");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!groupId) return alert("Pick a group");
    try {
      setLoading(true);
      await createCategory({
        category_group_id: Number(groupId),
        allocated_amount: Number(allocated) || 0,
        target,
        icon_name: icon || null,
      });

      // reset form
      setAllocated(0);
      setTarget("");
      setIcon("🧺");
      setGroupId("");

      // tự reload dữ liệu group/category từ context
      await reload();
    } catch (e: any) {
      alert(e.message ?? "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create Category">
      <div className="space-y-3">
        <select
          className="w-full rounded-lg p-2"
          value={groupId}
          onChange={(e) =>
            setGroupId(e.target.value ? Number(e.target.value) : "")
          }
        >
          <option value="">Select group</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <input
          className="w-full rounded-lg p-2"
          placeholder="Target (text)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <input
          type="number"
          className="w-full rounded-lg p-2"
          placeholder="Allocated amount"
          value={allocated}
          onChange={(e) => setAllocated(Number(e.target.value || 0))}
        />

        <input
          className="w-full rounded-lg p-2"
          placeholder="Icon (emoji or name)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />

        <Button onClick={submit} disabled={loading}>
          {loading ? "Saving..." : "Add Category"}
        </Button>
      </div>
    </Card>
  );
}
