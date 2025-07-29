import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import logo from "../assets/logo.png";

export default function JogarToken() {
  const { token } = useParams();
  const [status, setStatus] = useState<"carregando" | "valido" | "expirado" | "usado" | "erro">("carregando");
  const [escolha, setEscolha] = useState<number | null>(null);
  const [ganhou, setGanhou] = useState<boolean | null>(null);

  useEffect(() => {
  const verificarToken = async () => {
    if (!token) {
      console.log("Token ausente na URL");
      return;
    }

    const ref = doc(db, "jogosPendentes", token);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.log("Token não encontrado no Firestore.");
      return setStatus("erro");
    }

    const data = snap.data();
    const agora = Timestamp.now();

    console.log("Dados do documento:", data);

    if (data.usado) {
      console.log("Token já foi usado.");
      return setStatus("usado");
    }

    if (!data.expiraEm || typeof data.expiraEm.toMillis !== "function") {
      console.log("expiraEm não é um Timestamp válido:", data.expiraEm);
      return setStatus("erro");
    }

    if (data.expiraEm.toMillis() < agora.toMillis()) {
      console.log("Token expirado.");
      return setStatus("expirado");
    }

    console.log("Token válido. Marcando como usado...");
    await updateDoc(ref, { usado: true });
    setStatus("valido");
  };

  verificarToken();
}, [token]);


  const premioIndex = Math.floor(Math.random() * 3);

  const escolher = (index: number) => {
    if (escolha !== null) return;
    setEscolha(index);
    setGanhou(index === premioIndex);
  };

  if (status !== "valido") {
    const mensagens = {
      carregando: "Verificando link...",
      erro: "❌ Link inválido.",
      expirado: "⏰ Link expirado. Finalize outra corrida para tentar novamente.",
      usado: "🚫 Este link já foi usado.",
    };
    return <p className="text-center mt-20 text-xl">{mensagens[status]}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 text-center p-4 gap-6">
      <img src={logo} alt="Lubber Logo" className="w-32 h-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-800">Ganhe até R$ 500!</h1>
      <p className="text-gray-600">Escolha uma opção e descubra se ganhou.</p>

      <div className="flex gap-6 mt-6">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => escolher(i)}
            disabled={escolha !== null}
            className={`w-24 h-24 rounded-2xl text-white text-3xl font-bold shadow-lg transition ${
              escolha === i ? "bg-blue-600" : "bg-gray-500"
            } ${escolha !== null && escolha !== i ? "opacity-50" : ""}`}
          >
            {escolha === i ? (ganhou ? "💰" : "❌") : "?"}
          </button>
        ))}
      </div>

      {ganhou !== null && (
        <p className={`mt-6 text-lg font-medium max-w-sm ${ganhou ? "text-green-600" : "text-gray-600"}`}>
          {ganhou
            ? "😢 Que pena, não foi desta vez. Continue usando a Lubber Driver e tente novamente."
            : "😢 Que pena, não foi desta vez. Continue usando a Lubber Driver e tente novamente!"}
        </p>
      )}
    </div>
  );
}
