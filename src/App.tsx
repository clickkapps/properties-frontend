import {Outlet, ScrollRestoration} from "react-router";
import {Toaster} from "@/components/ui/toaster.tsx";


function App() {

  return (

          <>
              <ScrollRestoration />
              <Outlet />
              <Toaster />
          </>
  )
}

export default App
