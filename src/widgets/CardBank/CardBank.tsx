import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ICardBank {
  title: string,
  value: number | null,
  color: string,
}

export const CardBank = ({title, value, color}: ICardBank) => {



    return (
      
     <Card className={color}>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value ? `₽${value}` : 'Нет данных('}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month
          </div> */}
          <div className="text-muted-foreground">
           информация актуальна на текущий момент
          </div>
        </CardFooter>
      </Card>
    )
}