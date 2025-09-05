import express from "express";
import cors from 'cors';
import rotaLed from "./routes/rotaLed.js";
import rotaBoia from "./routes/rotaBoia.js";
import rotaSensor from "./routes/rotaSensorDHT.js";
import rotaSensorSolo from "./routes/rotaSensorSolo.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.json('API no ar');
})

//rota para leitura do status
app.get('/api/status', rotaLed.lerStatus);
app.post('/api/comando', rotaLed.enviaComando);

//rotaboia
app.get('/api/statusBoia', rotaBoia.lerStatus);

app.get('/api/sensorDHT', rotaSensor.lerDadosSensor);
app.get('/api/sensorUmidade', rotaSensorSolo.lerSensorSolo);

const porta = 3000;
app.listen(porta, () =>{
    console.log(`Servidor iniciado http://localhost:${porta}`);
})