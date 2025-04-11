import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import LandingPage from "@/presentation/website/LandingPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import SignInPage from "@/presentation/auth/SignInPage.tsx";
import PropertyDetailPage from "@/presentation/website/PropertyDetailPage.tsx";
import AgentsPage from "@/presentation/website/AgentsPage.tsx";
import AgentDetailPage from "@/presentation/website/AgentDetailPage.tsx";
import PropertyListPage from "@/presentation/website/PropertyListPage.tsx";
import AgentHomePage from "@/presentation/agent-dashboard/AgentHomePage.tsx";
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
import RegistrationPage from "@/presentation/auth/RegistrationPage.tsx";
import ErrorPage from "@/presentation/website/ErrorPage.tsx";
import App from "@/App.tsx";
import {accountLoader, loginLoader, registrationLoader} from "@/lib/loaders.ts";

const router = createBrowserRouter([

    {   path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {   index: true, element: <LandingPage /> },
            {   path: "login", loader: loginLoader, element: <SignInPage />,},
            {   path: "properties/:type", element: <PropertyListPage />},
            {   path: "property-detail",  element: <PropertyDetailPage />},
            {   path: "agents", element: <AgentsPage />},
            {   path: "agent-detail", element: <AgentDetailPage /> },
            {   path: 'register', loader: registrationLoader, element: <RegistrationPage />},
            {   path: "account",
                id: 'account',
                loader: accountLoader,
                children: [
                    {
                        path: 'agent',
                        element: <AgentLayout />,
                        children: [
                            { index: true, element: <AgentHomePage /> },
                            { path: "listings", element: <MyListingsPage />},
                            { path: "add-listing-option", element: <AddListingOptionPage />},
                            { path: "add-listing", element: <AddListingPage /> },
                            { path: "reviews", element: <ReviewsPage /> },
                            { path: "membership", element: <MembershipPage /> },
                        ]
                    },
                    {
                        path: "office",
                        element: <OfficeLayout />,
                        children: [
                            { index: true, element: <OfficeHomePage /> },
                            { path: "properties", element: <PropertiesPage />},
                            { path: "agents", element: <OfficeAgentsPage /> },
                            { path: "approvals", element: <ApprovalsPage /> },
                            { path: "viewings", element: <ViewingsPage /> },
                            { path: "photography", element: <PhotographyPage /> },
                            { path: "legal", element: <LegalPage /> },
                            { path: "conveyance", element: <ConveyancePage /> },
                            { path: "virtual-tour", element: <VirtualTourPage /> },
                            { path: "financials", element: <FinancialsPage /> },
                            { path: "admins", element: <AdminPage /> },
                        ]
                    }
                ]
            }
        ]
    },

])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
