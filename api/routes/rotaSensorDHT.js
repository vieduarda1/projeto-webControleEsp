import { onMessage, TEMPERATURA, UMIDADE } from "../services/mqttClient.js";

let ultimaTemperatura = "";
let ultimaUmidade = "";

// Registra função de escuta para o tópico de temperatura
onMessage(TEMPERATURA, (mensagem) => {
    ultimaTemperatura = mensagem;
    console.log(`🌡️ Temperatura recebida: ${ultimaTemperatura}°C`);
});

// Registra função de escuta para o tópico de umidade
onMessage(UMIDADE, (mensagem) => {
    ultimaUmidade = mensagem;
    console.log(`💧 Umidade recebida: ${ultimaUmidade}%`);
});

class rotaSensor {
    /**
     * Rota GET para retornar os dados do sensor (temperatura e umidade)
     */
    static lerDadosSensor(req, res) {
        try {
            console.log(`📊 Obtendo dados do sensor - Temp: ${ultimaTemperatura}°C, Umidade: ${ultimaUmidade}%`);
            
            res.status(200).json({
                temperatura: ultimaTemperatura,
                umidade: ultimaUmidade
            });
        } catch (error) {
            console.error('Erro ao obter dados do sensor:', error);
            res.status(500).json({ message: 'Erro interno ao obter dados do sensor.' });
        }
    }
}

export default rotaSensor;