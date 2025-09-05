import { useState, useEffect } from 'react';
import { enderecoServidor } from '../../utils';

export default function SensorDisplay() {
  const [dados, setDados] = useState({ temperatura: '', umidade: '' });
  const [loading, setLoading] = useState(false);

  const buscarDados = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${enderecoServidor}/api/SensorDht`);
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarDados();
    const intervalo = setInterval(buscarDados, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-6 border border-gray-200">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM12 9h.01M12 15h.01" />
          </svg>
          Dados do Sensor
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
            <p className="text-gray-600 font-medium">Carregando dados...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Card Temperatura */}
            <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-400 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl">🌡️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Temperatura</h3>
                    <p className="text-2xl font-bold text-red-600">
                      {dados.temperatura || '--'}°C
                    </p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${parseFloat(dados.temperatura) > 30 ? 'bg-red-500' : 'bg-green-500'}`}></div>
              </div>
            </div>

            {/* Card Umidade */}
            <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-400 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl">💧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Umidade</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {dados.umidade || '--'}%
                    </p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${parseFloat(dados.umidade) > 70 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span>Normal</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                <span>Alerta</span>
              </div>
            </div>
          </div>
        )}

        {/* Botão de atualizar */}
        <button
          onClick={buscarDados}
          disabled={loading}
          className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Atualizando...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Atualizar Dados
            </>
          )}
        </button>
      </div>
        <a href="https://wokwi.com/projects/439915701256713217" className="bg-blue-400 mt-4 p-3 text-white w-50 flex text-center rounded xl-8">Acessar WokWi</a>
    </div>
  );
}