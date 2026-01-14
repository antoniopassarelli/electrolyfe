import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import IngredientProvider from "@/app/Context/IngredientProvider.tsx";

const isRootBase = import.meta.env.BASE_URL === '/';
const Router = isRootBase ? BrowserRouter : HashRouter;
const routerProps = isRootBase ? { basename: import.meta.env.BASE_URL } : undefined;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <IngredientProvider>
            <Router {...routerProps}>
                <App/>
            </Router>
        </IngredientProvider>
    </React.StrictMode>
);
