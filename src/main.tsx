// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import ReviewsPage from "@/presentation/agent-dashboard/ReviewsPage.tsx";
import store from "@/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AppRouter from "@/routes.tsx";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEARSUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);


// Create a client

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //     {/* store at the top level so that Error Page can also benefit from it*/}
  //
  // </StrictMode>,
    <Provider store={store}>
        <QueryClientProvider client={new QueryClient()} >
            <AppRouter />
        </QueryClientProvider>
    </Provider>
)
