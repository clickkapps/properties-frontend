import {createBrowserRouter, RouterProvider} from "react-router";
import App from "@/App.tsx";
import ErrorPage from "@/presentation/website/ErrorPage.tsx";
import LandingPage from "@/presentation/website/LandingPage.tsx";
import {accountLoader, loginLoader, propertyDetailLoader, registrationLoader} from "@/lib/loaders.ts";
import SignInPage from "@/presentation/auth/SignInPage.tsx";
import AdminSignInPage from "@/presentation/auth/AdminSignInPage.tsx";
import PropertyListPage from "@/presentation/website/PropertyListPage.tsx";
import PropertyDetailPage from "@/presentation/website/PropertyDetailPage.tsx";
import AgentsPage from "@/presentation/website/AgentsPage.tsx";
import AgentDetailPage from "@/presentation/website/AgentDetailPage.tsx";
import RegistrationPage from "@/presentation/auth/RegistrationPage.tsx";
import AgentLayout from "@/components/agent-dashboard/AgentLayout.tsx";
import AgentHomePage from "@/presentation/agent-dashboard/AgentHomePage.tsx";
import MyPropertiesPage from "@/presentation/agent-dashboard/MyPropertiesPage.tsx";
import AddPropertyOptionPage from "@/presentation/agent-dashboard/AddPropertyOptionPage.tsx";
import AddPropertyPage from "@/presentation/agent-dashboard/AddPropertyPage.tsx";
import AddNewAdvertisementPage from "@/presentation/agent-dashboard/AddNewAdvertisementPage.tsx";
import AdvertisementsPage from "@/presentation/agent-dashboard/AdvertisementsPage.tsx";
import MembershipPage from "@/presentation/agent-dashboard/MembershipPage.tsx";
import OfficeLayout from "@/components/office-dashboard/OfficeLayout.tsx";
import OfficeHomePage from "@/presentation/office-dashboard/OfficeHomePage.tsx";
import PropertiesPage from "@/presentation/office-dashboard/PropertiesPage.tsx";
import OfficeAgentsPage from "@/presentation/office-dashboard/OfficeAgentsPage.tsx";
import ApprovalsPage from "@/presentation/office-dashboard/ApprovalsPage.tsx";
import PropertyShowingsPage from "@/presentation/office-dashboard/PropertyShowingsPage.tsx";
import PhotographyPage from "@/presentation/office-dashboard/PhotographyPage.tsx";
import LegalPage from "@/presentation/office-dashboard/LegalPage.tsx";
import ConveyancePage from "@/presentation/office-dashboard/ConveyancePage.tsx";
import VirtualTourPage from "@/presentation/office-dashboard/VirtualTourPage.tsx";
import FinancialsPage from "@/presentation/office-dashboard/FinancialsPage.tsx";
import AdminPage from "@/presentation/office-dashboard/AdminPage.tsx";

const router = createBrowserRouter([

    {   path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {   index: true, element: <LandingPage /> },
            {   path: "login", loader: loginLoader, element: <SignInPage />,},
            {   path: "admin/login", loader: loginLoader, element: <AdminSignInPage />,},
            {   path: "properties", element: <PropertyListPage />},
            {   path: "property-detail/:propertyId", loader: propertyDetailLoader, element: <PropertyDetailPage />},
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
                            { path: "listings", element: <MyPropertiesPage />},
                            { path: "add-listing-option", element: <AddPropertyOptionPage />},
                            { path: "add-listing", element: <AddPropertyPage /> },
                            { path: "create-ads", element: <AddNewAdvertisementPage /> },
                            { path: "adverts", element: <AdvertisementsPage /> },
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
                            { path: "viewings", element: <PropertyShowingsPage /> },
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

function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter;