import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

export default function IrrigacaoStatus() {
  const [umidade, setUmidade] = useState(0);
  const [nivelAgua, setNivelAgua] = useState("");
  const [bomba, setBomba] = useState("");


  const buscarDados = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/api/statusIrrigacao`);
      const dados = await resposta.json();

      setUmidade(dados.umidade);
      setNivelAgua(dados.nivelAgua);
      setBomba(dados.bomba);
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    buscarDados();
    const intervalo = setInterval(buscarDados, 5000); // Atualiza a cada 5s
    return () => clearInterval(intervalo);
  }, []);

  const corUmidade = () => {
    if (umidade < 1400) return "bg-blue-500"; // Muito Úmido
    if (umidade < 2200) return "bg-gree-500";  // Ideal
    if (umidade < 3000) return "bg-yellow-500"; // Seco
    return "bg-red-500"; // Muito Seco
  };

  return (
    <div className="max-w-xs mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4">Status Irrigação</h1>

      {/* Umidade do Solo */}
      <div className="relative h-48 w-32 mx-auto border-2 border-gray-400 rounded bg-gray-100">
        <div
          className={`absolute bottom-0 w-full h-full ${corUmidade()}`}
          style={{ height: `${(umidade / 4095) * 100}%` }}
        ></div>
      </div>
      <p className="text-center mt-2 font-medium">
        Umidade: <span className="text-black">{umidade}</span>
      </p>

      {/* Nível da água */}
      <p className="text-center mt-4 font-medium">
        Nível da Água:{" "}
        <span className={nivelAgua === "ALTO" ? "text-red-600" : "text-blue-600"}>
          {nivelAgua}
        </span>
      </p>

      <p className="text-center mt-2 font-medium">
        Bomba:{" "}
        <span className={bomba === "LIGADA" ? "text-green-600" : "text-gray-600"}>
          {bomba}
        </span>
      </p>


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h5>Controle</h5>
        <a
          href="https://wokwi.com/projects/441191338547209217"
          className="bg-blue-400 mt-4 p-3 text-white w-50 flex text-center rounded-xl"
        >
          Acessar WokWi
        </a>
      </div>
    </div>
  );
}
