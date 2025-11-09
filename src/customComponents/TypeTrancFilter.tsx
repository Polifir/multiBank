import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TransactionTypeFilterProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
}

const transactionTypeOptions = [
  { value: "CREDIT", label: "Зачисление" },
  { value: "DEBIT", label: "Списание" },
];

export const TransactionTypeFilter = ({
  selectedTypes,
  onTypeChange,
}: TransactionTypeFilterProps) => {
  const handleTypeChange = (type: string, checked: boolean) => {
    const newSelectedTypes = checked
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    
    onTypeChange(newSelectedTypes);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">Тип транзакции</h3>
        
        <div className="space-y-3">
          {transactionTypeOptions.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.value}`}
                checked={selectedTypes.includes(type.value)}
                onCheckedChange={(checked) =>
                  handleTypeChange(type.value, checked as boolean)
                }
              />
              <Label
                htmlFor={`type-${type.value}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};