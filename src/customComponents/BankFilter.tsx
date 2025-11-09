import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface BankFilterProps {
  selectedBanks: string[];
  onBankChange: (banks: string[]) => void;
}

const bankOptions = [
  { value: "sbank", label: "Потрясающий банк" },
  { value: "abank", label: "Умный банк" },
  { value: "vbank", label: "Виртуальный банк" },
];

export const BankFilter = ({ selectedBanks, onBankChange }: BankFilterProps) => {
  const handleBankChange = (bankId: string, checked: boolean) => {
    const newSelectedBanks = checked
      ? [...selectedBanks, bankId]
      : selectedBanks.filter(bank => bank !== bankId);
    console.log(newSelectedBanks, 'selected')
    onBankChange(newSelectedBanks);
  };

  const handleSelectAll = () => {
    onBankChange(bankOptions.map(bank => bank.value));
  };

  const handleClearAll = () => {
    onBankChange([]);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Банки</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              disabled={selectedBanks.length === bankOptions.length}
            >
              Все
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              disabled={selectedBanks.length === 0}
            >
              Очистить
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {bankOptions.map((bank) => (
            <div key={bank.value} className="flex items-center space-x-2">
              <Checkbox
                id={`bank-${bank.value}`}
                checked={selectedBanks.includes(bank.value)}
                onCheckedChange={(checked) =>
                  handleBankChange(bank.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`bank-${bank.value}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {bank.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};