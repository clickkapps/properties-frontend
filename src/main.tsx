// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import ReviewsPage from "@/presentation/agent-dashboard/ReviewsPage.tsx";
import store from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppRouter from "@/routes.tsx";


// Create a client

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //     {/* store at the top level so that Error Page can also benefit from it*/}
  //
  // </StrictMode>,
    <Provider store={store}>
        <QueryClientProvider client={new QueryClient()} >
            <AppRouter />
        </QueryClientProvider>
    </Provider>
)
