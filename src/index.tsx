import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListDetail from './pages/ListDetail';
import LocalStorageProvider from './components/LocalStorageProvider';

export default function App() {
  return (
    <BrowserRouter basename="/todo-manager">
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