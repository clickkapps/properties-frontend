import LandingPage from "@/presentation/website/LandingPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SignIn from "@/components/website/SignIn.tsx";


function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignIn />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
