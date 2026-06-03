import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import HistoryPage from "./pages/HistoryPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/history" replace />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
