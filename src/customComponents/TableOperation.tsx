import { Card,} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchSummary } from "@/service/summary";
import { useQuery } from "@tanstack/react-query";
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

 const { data: summary} = useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    });


  return (

    <Card className="items-center ml-2 mr-5 mt-2" >

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
       { summary ? summary.recent_transactions ? summary.recent_transactions .map((e: ITransaction) => (
          <TableRow key={e.id}>
            <TableCell className="font-medium">{bankname[e.bankId]}</TableCell>
            <TableCell>{formatDate(e.date)}</TableCell>
            <TableCell>{currency[e.currency]} {e.amount}</TableCell>
            <TableCell>{transactionValue[e.type]}</TableCell>
            <TableCell>{e.description}</TableCell>
            <TableCell className="text-right">{transaction[e.status]}</TableCell>
          </TableRow>
        )) : <></>: <></>}
      </TableBody>
    </Table>
    </Card>
  )
}
