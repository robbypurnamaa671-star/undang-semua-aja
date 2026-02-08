import { BankAccount } from "@/lib/invitation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Wallet } from "lucide-react";

interface BankAccountsEditorProps {
  value: BankAccount[];
  onChange: (accounts: BankAccount[]) => void;
}

export function BankAccountsEditor({ value, onChange }: BankAccountsEditorProps) {
  const updateAccount = (index: number, field: keyof BankAccount, val: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  const addAccount = () => {
    onChange([...value, { bankName: '', accountNumber: '', accountHolder: '' }]);
  };

  const removeAccount = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" />
          Amplop Digital
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={addAccount}>
          <Plus className="w-3 h-3 mr-1" />
          Tambah
        </Button>
      </div>

      {value.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Tambahkan rekening bank atau e-wallet untuk menerima hadiah digital dari tamu.
        </p>
      )}

      {value.map((account, index) => (
        <div key={index} className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Rekening {index + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={() => removeAccount(index)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Input
            placeholder="Nama Bank / E-Wallet (misal: BCA, Mandiri, GoPay)"
            value={account.bankName}
            onChange={(e) => updateAccount(index, 'bankName', e.target.value)}
          />
          <Input
            placeholder="Nomor Rekening / Nomor E-Wallet"
            value={account.accountNumber}
            onChange={(e) => updateAccount(index, 'accountNumber', e.target.value)}
          />
          <Input
            placeholder="Atas Nama"
            value={account.accountHolder}
            onChange={(e) => updateAccount(index, 'accountHolder', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
