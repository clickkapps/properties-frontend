import LandingPage from "@/presentation/website/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SignInPage from "@/presentation/website/SignInPage.tsx";
import ScrollToTop from "@/lib/custom-hooks/ScrollToTop.ts";
import PropertyDetailPage from "@/presentation/website/PropertyDetailPage.tsx";
import AgentsPage from "@/presentation/website/AgentsPage.tsx";
import AgentDetailPage from "@/presentation/website/AgentDetailPage.tsx";
import PropertyListPage from "@/presentation/website/PropertyListPage.tsx";
// import AgentCard from "./components/website/AgentCard";
// import AgentInfoCard from "./components/website/AgentInfoCard";


function App() {


  return (
      <BrowserRouter>
          <ScrollToTop />
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/signup" element={<SignInPage />} />
              <Route path="/properties/:type" element={<PropertyListPage />} />
              <Route path="/property-detail" element={<PropertyDetailPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/agent-detail" element={<AgentDetailPage />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
