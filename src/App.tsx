import LandingPage from "@/presentation/website/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SignInPage from "@/presentation/website/SignInPage.tsx";
import ScrollToTop from "@/lib/custom-hooks/ScrollToTop.ts";
import PropertyDetailPage from "@/presentation/website/PropertyDetailPage.tsx";
import AgentsPage from "@/presentation/website/AgentsPage.tsx";
import AgentDetailPage from "@/presentation/website/AgentDetailPage.tsx";
import PropertyListPage from "@/presentation/website/PropertyListPage.tsx";
import HomePage from "@/presentation/agent-dashboard/HomePage.tsx";
import AgentLayout from "@/components/agent-dashboard/AgentLayout.tsx";
import MyListingsPage from "@/presentation/agent-dashboard/MyListingsPage.tsx";
import OfficeLayout from "@/components/office-dashboard/OfficeLayout.tsx";
import MembershipPage from "@/presentation/agent-dashboard/MembershipPage.tsx";
import ReviewsPage from "@/presentation/agent-dashboard/ReviewsPage.tsx";
import TotalPropertiesCard from "./components/agent-dashboard/TotalPropertiesCard";
import AdvertiseCard from "./components/agent-dashboard/AdvertiseCard";
import AddListingsCard from "./components/agent-dashboard/AddListingsCard";
import RecentMessages from "./components/agent-dashboard/RecentMessages";
import PropertyViewChart from "./components/agent-dashboard/PropertyViewChart";
import MembershipCard from "./components/agent-dashboard/MembershipCard";
import ReviewCard from "./components/agent-dashboard/ReviewCard";
import MembershipPackages from "./components/agent-dashboard/MembershipPackages";
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
                  <Route index element={<HomePage />} />
                  <Route path="listings" element={<MyListingsPage />} />
                  <Route path="add-listing-decision" element={ <MyListingsPage />} />
                  <Route path="add-listing" element={ <MyListingsPage />} />
                  <Route path="reviews" element={<ReviewsPage />} />
                  <Route path="membership" element={<MembershipPage />} />
              </Route>
              <Route path="/office" element={<OfficeLayout />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
