
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ChartAreaInteractive } from "./areaGraph"
import { ChartBarStacked } from "./graphBar"
import { ChartRadialSimple } from "./radial"

export function CustomMenu() {
  return (
    // <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="aGraph">
        <div className="flex justify-center">
            <TabsList defaultValue='aGraph'>
              <TabsTrigger value="aGraph">area </TabsTrigger>
              <TabsTrigger value="bGraph">bar </TabsTrigger> 
              <TabsTrigger value="rGraph">radial</TabsTrigger>
            </TabsList>
          </div>
            <TabsContent value="aGraph">
              <div style={{width: '300px'}}>
            <ChartAreaInteractive/>
          </div>
            </TabsContent>
        <TabsContent value="bGraph">
               <div style={{width: '300px'}}>
        <ChartBarStacked/>
      </div>
        </TabsContent>
        <TabsContent value="rGraph">

        <div style={{width: '300px'}}>
        <ChartRadialSimple/>
      </div>
      
        </TabsContent>
      </Tabs>
    // </div>
  )
}
