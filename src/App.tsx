import LandingPage from "@/presentation/website/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SignIn from "@/components/website/SignIn.tsx";
import ScrollToTop from "@/lib/custom-hooks/ScrollToTop.ts";
import SearchResults from "./components/website/SearchResults";
import MobileSearchBar from "./components/website/MobileSearchBar";


function App() {


  return (
      <BrowserRouter>
          <ScrollToTop />
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignIn />} />
              <Route path="mobilesearch" element={<MobileSearchBar />} />
              <Route path="searchresults" element={<SearchResults />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
