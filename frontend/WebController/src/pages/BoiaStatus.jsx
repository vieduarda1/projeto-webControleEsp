import { useState, useEffect} from "react";
import { enderecoServidor } from "../../utils";

export default function BoiaStatus(){
    const [statusBoia, setstatusBoia] = useState("");

    const buscarStatus = async() =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/api/statusBoia`);
            const dados = await resposta.json();
            setstatusBoia(dados.statusBoia);
        }catch (error){
            console.log('Erro ao buscar status');
            
        }
    }
       useEffect(() =>{
            buscarStatus();
            const intervalo = setInterval(buscarStatus, 5000);
            return () => clearInterval(intervalo);
        })

        return(
            <div className="max-w-xs mx-auto p-">
                <h1 className="text-xl font-bold text-center mb-4">Nível de Água</h1>
                <div className="relative h-48 w-32 mx-auto 
                border-2 border-gray-400 rounded bg-gray-100">
                    <div className={`abslute bottom-0 w-full ${
                        statusBoia ==="ALTO" ?'h-full bg-blue-500' //cheio
                         :'h-1/2 bg-blue-400' //metade
                    }`}></div>
                </div>
                <p className="text-center mt-4 font-medium mb-10">
                    Status: {statusBoia === 'ALTO' ? (
                        <span className="text-red-600">ALTO</span>)
                        :(<span className="text-blue-600">BAIXO</span>)
                    }

                </p>

                  <a
                href="https://wokwi.com/projects/439347390163143681"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white mt-5 items-center rounded xl-3">
                    Acessar Wokwi da tela Boia
            </a>
            </div>
        )
    
}