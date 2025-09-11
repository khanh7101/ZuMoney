import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createCategoryGroup } from '../../src/services/categoryGroups';

export default function CategoryGroupForm({
  userId,
  onCreated,
}: {
  userId: string;
  onCreated: () => void;
}) {
  const [name, setName] = useState('Monthly Budget');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;
    try {
      setLoading(true);
      await createCategoryGroup({ user_id: userId, name });
      setName('');
      onCreated();
    } catch (e: any) {
      alert(e.message ?? 'Failed to create category group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create Category Group">
      <div className="space-y-3">
        <input
          className="w-full p-2 rounded-lg"
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={submit} disabled={loading}>
          {loading ? 'Saving...' : 'Add Group'}
        </Button>
      </div>
    </Card>
  );
}
