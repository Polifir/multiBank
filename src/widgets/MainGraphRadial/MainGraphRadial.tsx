import { ChartPieDonutText } from "@/customComponents/pieChart"
import { ChartRadialSimple } from "../../customComponents/radial"
import { fetchSummary } from "@/service/summary";
import { useQuery } from "@tanstack/react-query";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";



export const MainGraphRadial = () => {

    const { data: summary, isLoading, error, refetch } = useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    });

    const data = [
        {
            name: "ЖКХ",
            value: 1000
        },
        {
            name: "Рестораны",
            value: 10000
        },
        {
            name: "Тест",
            value: 100
        },
        {
            name: "Тест2",
            value: 1000
        },
]

    if(isLoading){
        return <Skeleton className="h-[150px] w-[100] rounded-xl ml-2 mr-5" ></Skeleton>
    }

    if(error){
        return (
        <div className="grid grid-cols-2 gap-2 items-center ml-2 mr-5">
                    <Card >
                        <CardTitle className="text-2xl font-semibold ml-2 mr-5 mb-2">
                        Ошибка
                        </CardTitle>
                    </Card>
                    <Card>
                        <CardTitle className="text-2xl font-semibold ml-2 mr-5 mb-2">
                        Ошибка
                        </CardTitle>
                    </Card>
        </div>

          )
    }    

    
    return (
            <div className="grid grid-cols-2 gap-2 items-center ml-2 mr-5">
                         < ChartPieDonutText/>
                          <ChartRadialSimple data={summary.spending_by_category}/>
            </div>
    )
}