import LandingPage from "@/presentation/website/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SignIn from "@/components/website/SignIn.tsx";
import ScrollToTop from "@/lib/custom-hooks/ScrollToTop.ts";
// import AgentCard from "./components/website/AgentCard";
import AgentInfoCard from "./components/website/AgentInfoCard";


function App() {


  return (
      <BrowserRouter>
          <ScrollToTop />
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignIn />} />
              <Route path="/agentcard" element={<AgentInfoCard />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
