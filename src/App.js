import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Description from "./pages/Description";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/listing" element={<Dashboard />} />
            <Route path="/description" element={<Description />} />
            <Route
              path="/detailPage/:id"
              element={<DetailPage />}
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
