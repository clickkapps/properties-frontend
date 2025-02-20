import LandingPage from "@/presentation/website/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SignIn from "@/components/website/SignIn.tsx";
import ScrollToTop from "@/lib/custom-hooks/ScrollToTop.ts";
import PropertyDetailsTable from "./components/website/PropertyDetailsTable";
import MarketedBy from "./components/website/MarketedBy";
import SafetyTips from "./components/website/SafetyTips";
import ReportListing from "./components/website/ReportListing";
import PropertyDetail from "./components/website/PropertyDetail";


function App() {


  return (
      <BrowserRouter>
          <ScrollToTop />
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignIn />} />
              <Route path="/details"
              element={<PropertyDetailsTable />} />
              <Route path="market" element={<MarketedBy />} />
              <Route path="safety" element={<SafetyTips />} />
              <Route path="report" element={<ReportListing />} />
              <Route path="detail" element={<PropertyDetail />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
