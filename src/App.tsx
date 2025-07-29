// App.tsx (corrigido)
import JogarToken from "./pages/JogarToken";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="text-center p-8">Página inicial</div>} />
      <Route path="/jogar/:token" element={<JogarToken />} />
    </Routes>
  );
}
