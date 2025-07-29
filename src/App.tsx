import { useState } from "react";
import logo from "./assets/logo.png"; // certifique-se que este caminho existe

export default function App() {
  const [escolha, setEscolha] = useState<number | null>(null);
  const [ganhou, setGanhou] = useState<boolean | null>(null);

  const premioIndex = Math.floor(Math.random() * 3);

  const escolher = (index: number) => {
    if (escolha !== null) return;
    setEscolha(index);
    setGanhou(index === premioIndex);
  };

  const mensagens = {
    vitoria: "😢 Que pena, não foi desta vez. Continue usando a Lubber Driver e tente novamente!",
    derrota: "😢 Que pena, não foi desta vez. Continue usando a Lubber Driver e tente novamente!",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 text-center p-4 gap-6">
      <img src={logo} alt="Lubber Logo" className="w-32 h-auto mb-4" />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Agora é a sua chance e do seu motorista de faturar até <span className="text-green-600">R$ 500</span>!
      </h1>
      <p className="text-md text-gray-600 max-w-md">
        Escolha a opção premiada e receba o valor direto na sua carteira do app Lubber Driver.
      </p>

      <div className="flex gap-6 mt-6">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => escolher(i)}
            disabled={escolha !== null}
            className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl text-white text-3xl font-bold shadow-lg transition
              ${escolha === i ? "bg-blue-600" : "bg-gray-500"}
              ${escolha !== null && escolha !== i ? "opacity-50" : ""}
            `}
          >
            {escolha === i ? (ganhou ? "💰" : "❌") : "?"}
          </button>
        ))}
      </div>

      {ganhou !== null && (
        <p className={`mt-6 text-lg font-medium max-w-sm ${ganhou ? "text-green-600" : "text-gray-600"}`}>
          {ganhou ? mensagens.vitoria : mensagens.derrota}
        </p>
      )}
    </div>
  );
}
