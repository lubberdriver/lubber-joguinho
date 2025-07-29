import { Routes, Route } from "react-router-dom";
import JogarToken from "./pages/JogarToken";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="text-center p-8">Página inicial</div>} />
      <Route path="/jogar/:token" element={<JogarToken />} />
    </Routes>
  );
}
