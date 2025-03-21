import LandingPage from "@/presentation/website/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SignInPage from "@/presentation/auth/SignInPage.tsx";
import ScrollToTop from "@/lib/custom-hooks/ScrollToTop.ts";
import PropertyDetailPage from "@/presentation/website/PropertyDetailPage.tsx";
import AgentsPage from "@/presentation/website/AgentsPage.tsx";
import AgentDetailPage from "@/presentation/website/AgentDetailPage.tsx";
import PropertyListPage from "@/presentation/website/PropertyListPage.tsx";
import AgentHomePage from "@/presentation/agent-dashboard/HomePage.tsx";
import AgentLayout from "@/components/agent-dashboard/AgentLayout.tsx";
import MyListingsPage from "@/presentation/agent-dashboard/MyListingsPage.tsx";
import OfficeLayout from "@/components/office-dashboard/OfficeLayout.tsx";
import MembershipPage from "@/presentation/agent-dashboard/MembershipPage.tsx";
import ReviewsPage from "@/presentation/agent-dashboard/ReviewsPage.tsx";
import OfficeHomePage from "@/presentation/office-dashboard/OfficeHomePage.tsx";
import AddListingOptionPage from "@/presentation/agent-dashboard/AddListingOptionPage.tsx";
import AddListingPage from "@/presentation/agent-dashboard/AddListingPage.tsx";
import PropertiesPage from "@/presentation/office-dashboard/PropertiesPage.tsx";
import ApprovalsPage from "@/presentation/office-dashboard/ApprovalsPage.tsx";
import ViewingsPage from "@/presentation/office-dashboard/ViewingsPage.tsx";
import PhotographyPage from "@/presentation/office-dashboard/PhotographyPage.tsx";
import LegalPage from "@/presentation/office-dashboard/LegalPage.tsx";
import ConveyancePage from "@/presentation/office-dashboard/ConveyancePage.tsx";
import VirtualTourPage from "@/presentation/office-dashboard/VirtualTourPage.tsx";
import FinancialsPage from "@/presentation/office-dashboard/FinancialsPage.tsx";
import OfficeAgentsPage from "@/presentation/office-dashboard/OfficeAgentsPage.tsx";
import AdminPage from "@/presentation/office-dashboard/AdminPage.tsx";
// import TotalPropertiesCard from "./components/agent-dashboard/TotalPropertiesCard";
// import AdvertiseCard from "./components/agent-dashboard/AdvertiseCard";
// import AddListingsCard from "./components/agent-dashboard/AddListingsCard";
// import RecentMessages from "./components/agent-dashboard/RecentMessages";
// import PropertyViewChart from "./components/agent-dashboard/PropertyViewChart";

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
              <Route path="/agent" element={<AgentLayout />} >
                  <Route index element={<AgentHomePage />} />
                  <Route path="listings" element={<MyListingsPage />} />
                  <Route path="add-listing-option" element={ <AddListingOptionPage />} />
                  <Route path="add-listing" element={ <AddListingPage /> } />
                  <Route path="reviews" element={<ReviewsPage />} />
                  <Route path="membership" element={<MembershipPage />} />
              </Route>
              <Route path="/office" element={<OfficeLayout />} >
                  <Route index element={<OfficeHomePage />} />
                  <Route path='properties' element={<PropertiesPage />} />
                  <Route path='agents' element={<OfficeAgentsPage />} />
                  <Route path='approvals' element={<ApprovalsPage />} />
                  <Route path='viewings' element={<ViewingsPage />} />
                  <Route path='photography' element={<PhotographyPage />} />
                  <Route path='legal' element={<LegalPage />} />
                  <Route path='conveyance' element={<ConveyancePage />} />
                  <Route path='virtual-tour' element={<VirtualTourPage />} />
                  <Route path='financials' element={<FinancialsPage />} />
                  <Route path='admins' element={<AdminPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
