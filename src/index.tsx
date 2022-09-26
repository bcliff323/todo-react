import { render } from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListDetail from './pages/ListDetail';
import LocalStorageProvider from './components/LocalStorageProvider';

export default function App() {
  return (
    <HashRouter>
      <Routes>
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
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);