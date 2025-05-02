import {Outlet, ScrollRestoration} from "react-router";
import {Toaster} from "@/components/ui/toaster.tsx";
import ConfirmDialogProvider from "@/contexts/ConfirmDialogProvider.tsx";


function App() {

  return (

          <ConfirmDialogProvider>
              <ScrollRestoration />
              <Outlet />
              <Toaster />
          </ConfirmDialogProvider>
  )
}

export default App
