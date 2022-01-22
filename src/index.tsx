import ReactDOM, {render} from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListDetail from './pages/ListDetail';
import LocalStorageProvider from './components/LocalStorageProvider';
import useLocalStorage from "use-local-storage";

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);