import {Outlet, ScrollRestoration} from "react-router";
import store from "@/store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";

// Create a client
const queryClient = new QueryClient()

function App() {

  return (
      <>
          <Provider store={store}>
              <QueryClientProvider client={queryClient} >
                  <ScrollRestoration />
                  <Outlet />
              </QueryClientProvider>
          </Provider>

      </>
  )
}

export default App
