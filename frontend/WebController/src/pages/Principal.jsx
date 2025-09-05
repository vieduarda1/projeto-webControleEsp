import React,{useState} from "react";
import {Routes,Route,Link} from "react-router-dom";
import {PiHouseBold,PiUserFill} from "react-icons/pi";
import {MdSettings,MdMenu,MdClose} from "react-icons/md";
import TelaLed from "./TelaLed";
import BoiaStatus from "./BoiaStatus"
import SensorDHT from "./SensorDHT"
import IrrigacaoStatus from "./irrigaçaoAutomotica";


  
export default function Principal(){
    const [menuAberto, setMenuAberto] = useState(false);

    return(
        <div className="flex h-screen font-sans">
            <section className={`fixed z-30 inset-y-0 left-0 transform w-64
                 bg-gray-900 text-white p-4 transition-transform duration-300
                  ease-in-out md:relative md:translate-x-0 ${menuAberto ? '-translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold">Menu</span>
                        <button className="md:hidden" onClick={() => setMenuAberto(false)}><MdClose className="w-5 h-5"/></button>
                    </div>
                    <nav className="space-y-4">
                        <Link to='/TelaLed' onClick={() => setMenuAberto(false)} className="flex item items-center gap-4 p-2 rounded hover:text-gray-700">
                            <PiHouseBold /><span>Tela Led</span>
                        </Link>
                        <Link to='/BoiaStatus' onClick={() => setMenuAberto(false)} className="flex item items-center gap-4 p-2 rounded hover:text-gray-700">
                            <PiHouseBold /><span>Status Boia</span>
                        </Link>
                        <Link to='/SensorDht' onClick={() => setMenuAberto(false)} className="flex item items-center gap-4 p-2 rounded hover:text-gray-700">
                            <PiHouseBold /><span>Sensor DHT</span>
                        </Link>
                          <Link to='/SensorDht' onClick={() => setMenuAberto(false)} className="flex item items-center gap-4 p-2 rounded hover:text-gray-700">
                            <PiHouseBold /><span>Irrigação Status</span>
                        </Link>
                    </nav>
            </section>
            <section className="flex-1 p-6 bg-gray-100 text-black w-full overflow-auto">
                <header>
                    <button className="text-gray-900 md:hidden" onClick={() => setMenuAberto(true)}>
                        <MdMenu className="w-6 h-6" />
                    </button>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<TelaLed />} />
                        <Route path="/TelaLed" element={<TelaLed />} />
                        <Route path="/BoiaStatus" element={<BoiaStatus />} />
                        <Route path="/SensorDHT" element={<SensorDHT />} />
                        <Route path="/irrigacaoStatus" element={<IrrigacaoStatus />} />
                    </Routes>
                </main>
            </section>
        </div>
    )
}