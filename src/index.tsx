import { render } from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListDetail from './pages/ListDetail';
import LocalStorageProvider from './components/LocalStorageProvider';
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorMessage from "./components/ErrorMessage";
import { ErrorTypes } from "./types";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route path="*" element={
            <LocalStorageProvider>
              <ErrorMessage errorType={ErrorTypes.PageNotFound} />
            </LocalStorageProvider>
          } />
          <Route path="/" element={
            <LocalStorageProvider>
              <Home />
            </LocalStorageProvider>
          } />
          <Route path="/list/:id" element={
            <LocalStorageProvider>
              <ListDetail />
            </LocalStorageProvider>
          } />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);