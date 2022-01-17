import ReactDOM, {render} from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import useLocalStorage from "use-local-storage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home useLocalStorage={useLocalStorage} />} />
      </Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);