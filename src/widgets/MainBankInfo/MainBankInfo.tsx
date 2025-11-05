import { fetchSummary } from "@/service/summary";
import { CardBank } from "../CardBank/CardBank";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Card, CardTitle } from "@/components/ui/card";


export const MainBankInfo = () => {

    const { data: summary, isLoading, error, refetch } = useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    });

    if(error){
        return <Card className="ml-2 mr-5 mb-2">
            <CardTitle className="text-2xl font-semibold ml-2 mr-5 mb-2">
            Ошибка
            </CardTitle>
          </Card>
    }    

    if(isLoading){
        return (<div className="grid grid-cols-4 gap-2 items-center ml-2 mr-5 mb-2">
            <Skeleton className="h-[150px] w-[100] rounded-xl" />
            <Skeleton className="h-[150px] w-[100] rounded-xl" />
            <Skeleton className="h-[150px] w-[100] rounded-xl" />
            <Skeleton className="h-[150px] w-[100] rounded-xl" />
        </div>)
    }

    if(summary){
        const {abank, vbank, sbank } = summary.balance_by_bank
        return(
        <div className="grid grid-cols-4 gap-2 items-center ml-2 mr-5 mb-2">
            <CardBank 
                title="Общий счёт" 
                value={summary.total_balance} 
                color='relative bg-linear-to-br from-balck-500/10 to-purple-500/10'
            />
            <CardBank 
                title="Виртуальный банк" 
                value={vbank}
                color='relative bg-linear-to-br from-black-500/10 to-blue-500/10'
            />
            <CardBank             
                title="Потрясающий банк" 
                value={abank}
                color='relative bg-linear-to-br from-black-500/10 to-yellow-500/10'
            />
            <CardBank 
                title="Умный банк" 
                value={sbank}
                color='relative bg-linear-to-br from-black-500/10 to-red-500/10'
            />
        </div>
    )
        
    }

}