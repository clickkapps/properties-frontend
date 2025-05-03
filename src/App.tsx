import {Outlet, ScrollRestoration} from "react-router";
import {Toaster} from "@/components/ui/toaster.tsx";
import ConfirmDialogProvider from "@/contexts/ConfirmDialogProvider.tsx";
import EntitlementSubscriptionDialog from "@/components/agent-dashboard/EntitlementSubscriptionDialog.tsx";


function App() {

  return (

          <ConfirmDialogProvider>
              <ScrollRestoration />
              <Outlet />
              <Toaster />
              <EntitlementSubscriptionDialog />
          </ConfirmDialogProvider>
  )
}

export default App
