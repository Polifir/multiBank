import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar} from "./components/SideBarComponent"
import { SidebarProvider } from "./components/ui/sidebar"
import { Header } from "./widgets/Header/Header"
import { MainGraphRadial } from "./widgets/MainGraphRadial/MainGraphRadial"
import { MainBankInfo } from "./widgets/MainBankInfo/MainBankInfo"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"
function App() {


  return (
       <QueryClientProvider client={queryClient}>
              <SidebarProvider>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                  <AppSidebar/>
                  <div style={{width: '100%'}}>
                    <Header/>
                    <div style={{margin: '10px auto', gap: '10px'}}>
                      <MainBankInfo/>
                      <MainGraphRadial/>
                    </div>
                  </div>
                </ThemeProvider>
            </SidebarProvider>
       </QueryClientProvider>

  )
    

}

export default App