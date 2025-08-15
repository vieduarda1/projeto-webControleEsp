import mqtt from "mqtt";

//Configurações do broker
const MQTT_BROKER_HOST = '9d19cc700cc44018b16cc529b323fc9d.s1.eu.hivemq.cloud';
const MQTT_BROKER_PORT = 8883;
const MQTT_USERNAME = 'ricardodias';
const MQTT_PASSWORD = 'TesteSenai1';

//topicos mqtt
const TOPICO_STATUS = 'aulaLed/31/status';
const TOPICO_COMANDO_LED = 'aulaLed/31/estadoLed';
const STATUS_BOIA ="projeto/31/statusBoia";

let mqttClient;
let subscriptions = {};

//conexao
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
};

function conectarMqtt(){
    console.log('Tentando conectar ao broker MQTT...');
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);

    mqttClient.on('connect', () =>{
        console.log('Conectado com sucesso!');
        mqttClient.subscribe(TOPICO_STATUS, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${TOPICO_STATUS}`);
            }
        })
         mqttClient.subscribe(TOPICO_COMANDO_LED, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${TOPICO_COMANDO_LED}`);
            }
        })
           mqttClient.subscribe(STATUS_BOIA, (err) =>{
            if(!err)
            {
                console.log(`Inscrito no tópico ${STATUS_BOIA}`);
            }
        })
    })
    
    mqttClient.on('message', (topic, message) =>{
        //verificar se existe uma topio na lista de assinaturas
        if(subscriptions[topic]){
            subscriptions[topic](message.toString());
        }
    });

    mqttClient.on('error', (error) => console.error('Erro de conexao', error));
    mqttClient.on('close', () => console.log('Conexão MQTT fechada'));
}

//REgistrar função de callback para um topico especifico
function onMessage(topic, callback){
    subscriptions[topic] = callback;
}

function publicar(topic, message){
    if(mqttClient && mqttClient.connected){
        mqttClient.publish(topic, message, {retain: true});
        console.log(`Publicado no topico ${topic}: ${message}`);
    }
    else{
        console.error('Erro ao publicar, cliente nao esta conectado');
    }
}

conectarMqtt();

export{publicar,onMessage, TOPICO_STATUS, TOPICO_COMANDO_LED,STATUS_BOIA}
