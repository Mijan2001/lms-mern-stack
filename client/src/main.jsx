import { Children, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { appStore } from './app/store';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './components/theme-provider.jsx';
import { useLoadUserQuery } from './features/api/authApi.js';
import { Loader2 } from 'lucide-react';
import LoadingSpinner from './components/LoadingSpinner.jsx';

// Loading component============
const Custom = ({ children }) => {
    const { isLoading } = useLoadUserQuery();
    return <>{isLoading ? <LoadingSpinner /> : <> {children}</>}</>;
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={appStore}>
            <Custom>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <App />
                </ThemeProvider>

                <Toaster />
            </Custom>
        </Provider>
    </StrictMode>
);
