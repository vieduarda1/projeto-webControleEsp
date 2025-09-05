import { onMessage, SENSOR_SOLO, CONDICAO_SOLO } from "../services/mqttClient.JS";

let CondicaoSolo = "";
let SensorUmidade = "";

onMessage(SENSOR_SOLO, (mensagem) => {
    SensorUmidade = mensagem;
});

// Registra função de escuta para o tópico de umidade
onMessage(CONDICAO_SOLO, (mensagem) => {
   CondicaoSolo = mensagem;
   
});

class rotaSensorSolo{
     static lerSensorSolo(req, res) {
        try {
            console.log(`📊 Obtendo dados do sensor - Umidade Solo: ${SensorUmidade}%, CondicaoSolo: ${CondicaoSolo}`);
           
            res.status(200).json({
                CondicaoSolo: CondicaoSolo,
                SensorUmidade: SensorUmidade
            });
        } catch (error) {
            console.error('Erro ao obter dados do sensor:', error);
            res.status(500).json({ message: 'Erro interno ao obter dados do sensor.' });
        }
    }
}

export default rotaSensorSolo;