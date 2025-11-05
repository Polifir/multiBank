import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
  return (
    <header className=" shrink-0 items-center gap-2 border-b pb-2">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">МТВ</h1>
       
        <div className="ml-auto flex items-center gap-2">
             <ModeToggle/>
          <Button variant={'outline'}>
              Выход
          </Button>
        </div>
      </div>
    </header>
  )
}
