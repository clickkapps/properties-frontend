import LandingPage from "@/presentation/website/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SignInPage from "@/presentation/website/SignInPage.tsx";
import ScrollToTop from "@/lib/custom-hooks/ScrollToTop.ts";
import PropertyDetailPage from "@/presentation/website/PropertyDetailPage.tsx";
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
              <Route path="/property-detail" element={<PropertyDetailPage />} />
              {/*<Route path="/pd" element={<PropertyDetailsPage />} />*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App
