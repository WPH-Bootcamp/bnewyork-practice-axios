import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import "./index.css";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading Website...
      </div>
    );
  }
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </main>
  );
}

export default App;
