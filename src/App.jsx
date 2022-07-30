import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="snippet" element={<Home />} />
          <Route path="snippet/:id" element={<Home />} />
          <Route path="user/:id" element={<Home />} />
          <Route path="tag" element={<Home />} />
          <Route path="tag/:id" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
