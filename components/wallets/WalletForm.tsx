import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { createWallet } from '../../src/services/wallets';

export default function WalletForm({ userId, onCreated }: { userId: string; onCreated: () => void }) {
  const [icon, setIcon] = useState('💳');
  const [amount, setAmount] = useState<number>(0);

  return (
    <Card title="Create Wallet">
      <div className="space-y-3">
        <input className="w-full p-2 rounded-lg" placeholder="Icon (emoji or name)" value={icon}
               onChange={(e)=>setIcon(e.target.value)} />
        <input type="number" className="w-full p-2 rounded-lg" placeholder="Initial amount" value={amount}
               onChange={(e)=>setAmount(Number(e.target.value||0))} />
        <Button onClick={async ()=>{
          await createWallet({ user_id: userId, icon_name: icon, amount });
          setAmount(0);
          onCreated();
        }}>Add Wallet</Button>
      </div>
    </Card>
  );
}
