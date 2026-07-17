import {StrictMode} from "react";
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

//import App from './App.jsx'
import {AuthProvider} from './context/AuthContext.jsx'


import { useState, useEffect } from 'react';
import { getMe } from './api/auth';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
})
function App() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        getMe()
            .then((data) => setResult({ success: true, data }))
            .catch((err) => setResult({ success: false, error: err.message }));
    }, []);

    return <pre>{JSON.stringify(result, null, 2)}</pre>;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
)