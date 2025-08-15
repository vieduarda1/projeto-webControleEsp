import { onMessage, STATUS_BOIA } from "../services/mqttClient.js";

let statusBoia = "";

onMessage(STATUS_BOIA, (mensagem) => {
    statusBoia = mensagem
});

class rotaBoia{
    static lerStatus(req, res){
        try{
            res.status(200).json({
                statusBoia
            })
        }catch(error){
            res.status(500).json({mensagem: 'Erro interno ao obter status'});
        }
    }
}

export default rotaBoia