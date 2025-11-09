import { Card,} from "@/components/ui/card"
import {Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TransactionFilters } from "./Filter";
import { useState } from "react";
import { useTransactionSearch, type ISearchFilters } from "@/hooks/useTranc";
import { Skeleton } from "@/components/ui/skeleton";
export type BankId = 'sbank' |'abank' | 'vbank';
  const bankname = {
    sbank: 'Умный', 
    abank: 'Потрясающий',
    vbank: 'Виртуальный' 
  }
export type TransactionType = 'CREDIT' | 'DEBIT'
 const transactionValue = {
  CREDIT: 'Зачисление',
  DEBIT: 'Списание'
 }
export type  TransactionStatus =  'Booked' | 'Pending'
const transaction = {
  Booked: 'Проведена',
  Pending: 'Ожидание',
}
type CurrencyType ='RUB';
const currency = {
  'RUB': '₽'
}
export interface ITransaction {
    id: string;
    accountId: string | null;
    date: string; // ISO 8601
    amount: number;
    currency: CurrencyType;
    description: string;
    type: TransactionType;
    status: TransactionStatus;
    bankId: BankId;
    category: string;
}
const data: ITransaction[]= [
          {
            "id": "tx-team219-4-m0-1",
            "accountId": null,
            "date": "2025-10-28T18:00:16.685534Z",
            "amount": 143650.92,
            "currency": 'RUB',
            "description": "💼 Зарплата",
            "type": 'CREDIT',
            "status": "Booked",
            "bankId": 'sbank',
            "category": "Зачисления"
        },
        {
            "id": "tx-team219-4-m0-1",
            "accountId": null,
            "date": "2025-10-28T18:00:16.685534Z",
            "amount": 143650.92,
            "currency": 'RUB',
            "description": "💼 Зарплата",
            "type": 'CREDIT',
            "status": "Booked",
            "bankId": 'sbank',
            "category": "Зачисления"
        },
    
  ]


const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
};


export const TableOperation =() => {
  const [searchResults, setSearchResults] = useState<any| null>(null);
    const [currentFilters, setCurrentFilters] = useState<ISearchFilters>({
        bankIds: [],
        transactionTypes: [],
        dateFrom: null,
        dateTo: null,
        page: 0,
        size: 10,
    });
    
  
const { mutate, isPending, error, reset } = useTransactionSearch();

    const handleSearch = (filters: ISearchFilters) => {
        mutate(filters, {
            onSuccess: (data) => {
                setSearchResults(data);
            },
            onError: () => {
                setSearchResults(null);
            }
        });
    };
        const handlePageChange = (newPage: number) => {
        const newFilters = {
            ...currentFilters,
            page: newPage,
        };
        setCurrentFilters(newFilters);
        mutate(newFilters, {
            onSuccess: (data) => {
                setSearchResults(data);
            },
            onError: () => {
                setSearchResults(null);
            }
        });
    };


    const handleClearError = () => {
        reset();
    };

    const displayData = searchResults?.content || [];

  if(isPending){
    return(
      <div>Загрузка</div>
    )
  }

  return (

    <Card className="items-center ml-2 mr-5 mt-2" >
     <TransactionFilters  onSearch={handleSearch} 
        isLoading={isPending}/>
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Банк</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead>Сумма</TableHead>
          <TableHead>Действие</TableHead>
          <TableHead>Описание</TableHead>
          <TableHead className="text-right">Статус</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
       { searchResults.map((e: ITransaction) => (
          <TableRow key={e.id}>
            <TableCell className="font-medium">{bankname[e.bankId]}</TableCell>
            <TableCell>{formatDate(e.date)}</TableCell>
            <TableCell>{currency[e.currency]} {e.amount}</TableCell>
            <TableCell>{transactionValue[e.type]}</TableCell>
            <TableCell>{e.description}</TableCell>
            <TableCell className="text-right">{transaction[e.status]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
   {searchResults && searchResults.totalPages > 1 && (
    <div className="p-4 border-t">
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (searchResults.currentPage > 0) {
                                handlePageChange(searchResults.currentPage - 1);
                            }
                        }}
                        className={searchResults.currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
                
                {/* Простые номера страниц */}
                {Array.from({ length: Math.min(5, searchResults.totalPages) }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            isActive={i === searchResults.currentPage}
                            className="cursor-pointer"
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                
                <PaginationItem>
                    <PaginationNext 
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (searchResults.currentPage < searchResults.totalPages - 1) {
                                handlePageChange(searchResults.currentPage + 1);
                            }
                        }}
                        className={searchResults.currentPage >= searchResults.totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
)}
    </Card>
  )
}
