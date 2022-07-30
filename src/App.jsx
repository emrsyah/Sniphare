import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/Explore";
import Snippet from "./pages/Snippet";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="snippet" element={<Explore />} />
          <Route path="snippet/:id" element={<Snippet />} />
          <Route path="user/:id" element={<Home />} />
          <Route path="tag" element={<Home />} />
          <Route path="tag/:id" element={<Home />} />
          <Route path="search" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
