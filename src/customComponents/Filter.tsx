import { useState } from "react";
import { BankFilter } from "./BankFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TransactionTypeFilter } from "./TypeTrancFilter";
import type { ISearchFilters } from "@/hooks/useTranc";

interface TransactionFiltersProps {
  onSearch: (filters: ISearchFilters) => void;
  isLoading?: boolean;
}

export const TransactionFilters = ({ onSearch, isLoading = false }: TransactionFiltersProps) => {
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSearch = () => {
     console.log(selectedTypes)
    const filters = {
      bankIds: selectedBanks,
      transactionTypes: selectedTypes,
      dateFrom: dateFrom || null,
      dateTo: dateTo || null,
    };

    onSearch(filters);
  };

  const clearAllFilters = () => {
    setSelectedBanks([]);
    setSelectedTypes([]);
    setDateFrom("");
    setDateTo("");
  };

  const hasActiveFilters = selectedBanks.length > 0 || 
                          selectedTypes.length > 0 || 
                          dateFrom || 
                          dateTo;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Фильтр по банкам */}
        <BankFilter
          selectedBanks={selectedBanks}
          onBankChange={setSelectedBanks}
        />

        {/* Фильтр по типам транзакций */}
        <TransactionTypeFilter
          selectedTypes={selectedTypes}
          onTypeChange={setSelectedTypes}
        />

        {/* Фильтр по дате */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Период</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">Дата с</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">Дата по</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <div className="space-y-3">
              <Button 
                onClick={handleSearch} 
                className="w-full"
                disabled={!hasActiveFilters}
              >
                Применить фильтры
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearAllFilters}
                className="w-full"
                disabled={!hasActiveFilters}
              >
                Очистить все
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};