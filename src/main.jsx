import {StrictMode} from "react";
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import App from './App.jsx'
import {AuthProvider} from './context/AuthContext.jsx'

import '@fontsource-variable/stack-sans-text';
import './styles/theme.css'
import './styles/base.css'
import {ComponentPreviews, useInitial} from "./dev/index.js";
import {DevSupport} from "@react-buddy/ide-toolbox";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <App/>
                    </DevSupport>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
)