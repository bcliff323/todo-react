import { render } from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListDetail from './pages/ListDetail';
import NotFound from './pages/NotFound';
import LocalStorageProvider from './components/LocalStorageProvider';
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route path="*" element={
            <LocalStorageProvider>
              <NotFound />
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