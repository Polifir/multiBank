import type { ITransaction } from '@/customComponents/TableOperation';
import { useMutation } from '@tanstack/react-query';


export interface TransactionsResponse {
  content: ITransaction[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface ISearchFilters {
  bankIds: string[];
  transactionTypes: string[];
  recent_transactions: any,
  dateFrom: string | null;
  dateTo: string | null;
  page?: number;
  size?: number;
}

const searchTransactions = async (filters: ISearchFilters): Promise<TransactionsResponse> => {
  const requestBody = {
    bankIds: filters.bankIds.length > 0 ? filters.bankIds : undefined,
    transactionTypes: filters.transactionTypes.length > 0 ? filters.transactionTypes : undefined,
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    page: filters.page || 0,
    size: filters.size || 10,
  };

  const response = await fetch('http://localhost:8080/api/v1/transactions/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка поиска: ${response.status} - ${errorText}`);
  }

  return response.json();
};

export const useTransactionSearch = () => {
  return useMutation({
    mutationFn: searchTransactions,
    onError: (error: Error) => {
      console.error('Transaction search error:', error.message);
    },
  });
};