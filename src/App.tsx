import {Outlet, ScrollRestoration} from "react-router";
import {Toaster} from "@/components/ui/toaster.tsx";
import ConfirmDialogProvider from "@/contexts/ConfirmDialogProvider.tsx";
import EntitlementSubscriptionModal from "@/components/agent-dashboard/EntitlementSubscriptionModal.tsx";


function App() {

  return (

          <ConfirmDialogProvider>
              <ScrollRestoration />
              <Outlet />
              <Toaster />
              <EntitlementSubscriptionModal />
          </ConfirmDialogProvider>
  )
}

export default App
