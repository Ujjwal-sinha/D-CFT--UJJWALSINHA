"use client"

import type React from "react"
import { useState, useEffect } from "react"

// Define the state data with emission levels
const stateData = {
  "Andhra Pradesh": { level: "medium", emissions: 85.3 },
  "Arunachal Pradesh": { level: "low", emissions: 12.1 },
  Assam: { level: "low", emissions: 42.7 },
  Bihar: { level: "medium", emissions: 78.2 },
  Chhattisgarh: { level: "high", emissions: 132.5 },
  Goa: { level: "low", emissions: 18.3 },
  Gujarat: { level: "very-high", emissions: 178.9 },
  Haryana: { level: "high", emissions: 105.6 },
  "Himachal Pradesh": { level: "low", emissions: 22.4 },
  Jharkhand: { level: "high", emissions: 118.7 },
  Karnataka: { level: "medium", emissions: 92.3 },
  Kerala: { level: "low", emissions: 45.8 },
  "Madhya Pradesh": { level: "high", emissions: 124.5 },
  Maharashtra: { level: "very-high", emissions: 195.2 },
  Manipur: { level: "low", emissions: 8.7 },
  Meghalaya: { level: "low", emissions: 10.2 },
  Mizoram: { level: "low", emissions: 5.3 },
  Nagaland: { level: "low", emissions: 7.1 },
  Odisha: { level: "high", emissions: 112.5 },
  Punjab: { level: "medium", emissions: 82.9 },
  Rajasthan: { level: "high", emissions: 128.7 },
  Sikkim: { level: "low", emissions: 3.2 },
  "Tamil Nadu": { level: "high", emissions: 145.3 },
  Telangana: { level: "medium", emissions: 87.6 },
  Tripura: { level: "low", emissions: 15.8 },
  "Uttar Pradesh": { level: "very-high", emissions: 182.4 },
  Uttarakhand: { level: "low", emissions: 32.1 },
  "West Bengal": { level: "high", emissions: 138.9 },
  // Union Territories
  Delhi: { level: "high", emissions: 110.2 },
  "Jammu and Kashmir": { level: "low", emissions: 28.5 },
  Ladakh: { level: "low", emissions: 4.3 },
  Puducherry: { level: "low", emissions: 12.7 },
  "Andaman and Nicobar Islands": { level: "low", emissions: 2.1 },
  Chandigarh: { level: "low", emissions: 8.9 },
  "Dadra and Nagar Haveli and Daman and Diu": { level: "low", emissions: 9.5 },
  Lakshadweep: { level: "low", emissions: 0.8 },
}

// Get color based on emission level
const getStateColor = (stateName: string) => {
  if (stateName === "Odisha") return "fill-blue-400 hover:fill-blue-500"

  const level = stateData[stateName]?.level || "low"
  switch (level) {
    case "very-high":
      return "fill-red-200 hover:fill-red-300"
    case "high":
      return "fill-orange-200 hover:fill-orange-300"
    case "medium":
      return "fill-yellow-200 hover:fill-yellow-300"
    case "low":
    default:
      return "fill-green-200 hover:fill-green-300"
  }
}

interface IndiaMapProps {
  activeState: string | null
  setActiveState: (state: string) => void
}

const IndiaMap: React.FC<IndiaMapProps> = ({ activeState, setActiveState }) => {
  const [pulse, setPulse] = useState(false)

  // Create pulsing effect for Odisha
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 650 700" className="w-full h-full max-w-[600px]" xmlns="http://www.w3.org/2000/svg">
        {/* This is a simplified representation of India's map */}
        {/* Each path represents a state */}

        {/* Northern States */}
        <path
          d="M250,100 L300,80 L350,90 L380,120 L350,150 L300,160 L250,150 L230,120 Z"
          className={`${getStateColor("Jammu and Kashmir")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Jammu and Kashmir")}
        />
        <path
          d="M380,120 L420,110 L450,130 L440,160 L410,170 L380,150 Z"
          className={`${getStateColor("Ladakh")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Ladakh")}
        />
        <path
          d="M350,150 L380,150 L410,170 L400,200 L370,210 L340,190 Z"
          className={`${getStateColor("Himachal Pradesh")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Himachal Pradesh")}
        />
        <path
          d="M340,190 L370,210 L360,240 L330,250 L310,230 L320,200 Z"
          className={`${getStateColor("Uttarakhand")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Uttarakhand")}
        />
        <path
          d="M310,230 L330,250 L320,280 L290,290 L270,270 L280,240 Z"
          className={`${getStateColor("Punjab")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Punjab")}
        />
        <path
          d="M290,290 L320,280 L350,290 L340,320 L310,330 L280,320 Z"
          className={`${getStateColor("Haryana")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Haryana")}
        />
        <path
          d="M310,330 L340,320 L360,340 L350,370 L320,380 L300,360 Z"
          className={`${getStateColor("Delhi")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Delhi")}
        />

        {/* Central States */}
        <path
          d="M280,320 L310,330 L300,360 L320,380 L350,370 L380,380 L400,400 L380,430 L340,440 L300,430 L270,400 L250,370 L270,340 Z"
          className={`${getStateColor("Uttar Pradesh")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Uttar Pradesh")}
        />
        <path
          d="M270,400 L300,430 L290,460 L260,470 L230,450 L240,420 Z"
          className={`${getStateColor("Bihar")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Bihar")}
        />
        <path
          d="M230,450 L260,470 L250,500 L220,510 L200,490 L210,460 Z"
          className={`${getStateColor("Jharkhand")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Jharkhand")}
        />
        <path
          d="M250,370 L270,400 L240,420 L210,460 L180,470 L150,450 L170,420 L200,390 L230,380 Z"
          className={`${getStateColor("Madhya Pradesh")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Madhya Pradesh")}
        />
        <path
          d="M150,450 L180,470 L210,460 L200,490 L170,500 L140,480 Z"
          className={`${getStateColor("Chhattisgarh")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Chhattisgarh")}
        />

        {/* Eastern States */}
        <path
          d="M290,460 L320,450 L350,460 L340,490 L310,500 L280,490 Z"
          className={`${getStateColor("West Bengal")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("West Bengal")}
        />
        <path
          d="M350,460 L380,450 L410,460 L400,490 L370,500 L340,490 Z"
          className={`${getStateColor("Assam")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Assam")}
        />
        <path
          d="M410,460 L440,450 L470,460 L460,490 L430,500 L400,490 Z"
          className={`${getStateColor("Arunachal Pradesh")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Arunachal Pradesh")}
        />
        <path
          d="M370,500 L400,490 L430,500 L420,530 L390,540 L360,530 Z"
          className={`${getStateColor("Nagaland")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Nagaland")}
        />
        <path
          d="M340,490 L370,500 L360,530 L330,540 L310,520 L320,500 Z"
          className={`${getStateColor("Manipur")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Manipur")}
        />
        <path
          d="M310,500 L340,490 L320,500 L310,520 L280,530 L270,510 Z"
          className={`${getStateColor("Tripura")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Tripura")}
        />
        <path
          d="M280,490 L310,500 L270,510 L240,520 L220,500 L250,480 Z"
          className={`${getStateColor("Mizoram")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Mizoram")}
        />
        <path
          d="M220,500 L250,480 L280,490 L270,510 L240,520 L210,510 Z"
          className={`${getStateColor("Meghalaya")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Meghalaya")}
        />

        {/* Odisha - with pulsing effect */}
        <path
          d="M200,490 L220,500 L210,510 L240,520 L230,550 L200,560 L170,550 L160,520 L170,500 Z"
          className={`${getStateColor("Odisha")} stroke-gray-400 cursor-pointer transition-colors ${
            activeState === "Odisha" ? "stroke-blue-600 stroke-[3px]" : ""
          } ${pulse && activeState !== "Odisha" ? "opacity-80" : "opacity-100"}`}
          onClick={() => setActiveState("Odisha")}
        />

        {/* Western States */}
        <path
          d="M170,420 L150,450 L120,440 L100,410 L120,380 L150,370 Z"
          className={`${getStateColor("Gujarat")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Gujarat")}
        />
        <path
          d="M120,380 L100,410 L70,400 L50,370 L70,340 L100,330 Z"
          className={`${getStateColor("Rajasthan")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Rajasthan")}
        />
        <path
          d="M150,450 L140,480 L110,490 L80,480 L90,450 L120,440 Z"
          className={`${getStateColor("Maharashtra")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Maharashtra")}
        />
        <path
          d="M80,480 L110,490 L100,520 L70,530 L50,510 L60,490 Z"
          className={`${getStateColor("Karnataka")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Karnataka")}
        />
        <path
          d="M110,490 L140,480 L170,500 L160,520 L130,530 L100,520 Z"
          className={`${getStateColor("Telangana")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Telangana")}
        />
        <path
          d="M130,530 L160,520 L170,550 L160,580 L130,590 L100,570 L70,530 L100,520 Z"
          className={`${getStateColor("Andhra Pradesh")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Andhra Pradesh")}
        />

        {/* Southern States */}
        <path
          d="M50,510 L70,530 L60,560 L30,570 L20,550 L30,520 Z"
          className={`${getStateColor("Kerala")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Kerala")}
        />
        <path
          d="M70,530 L100,570 L90,600 L60,610 L30,600 L30,570 L60,560 Z"
          className={`${getStateColor("Tamil Nadu")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Tamil Nadu")}
        />
        <path
          d="M120,440 L90,450 L80,480 L60,490 L40,470 L60,450 L90,430 Z"
          className={`${getStateColor("Goa")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Goa")}
        />

        {/* Small Union Territories */}
        <circle
          cx="280"
          cy="300"
          r="5"
          className={`${getStateColor("Chandigarh")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Chandigarh")}
        />
        <circle
          cx="100"
          cy="420"
          r="5"
          className={`${getStateColor("Dadra and Nagar Haveli and Daman and Diu")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Dadra and Nagar Haveli and Daman and Diu")}
        />
        <circle
          cx="130"
          cy="600"
          r="5"
          className={`${getStateColor("Puducherry")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Puducherry")}
        />
        <circle
          cx="20"
          cy="630"
          r="5"
          className={`${getStateColor("Lakshadweep")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Lakshadweep")}
        />
        <circle
          cx="350"
          cy="630"
          r="5"
          className={`${getStateColor("Andaman and Nicobar Islands")} stroke-gray-400 cursor-pointer transition-colors`}
          onClick={() => setActiveState("Andaman and Nicobar Islands")}
        />

        {/* State Labels - Only for major states */}
        <text x="170" y="525" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Odisha
        </text>
        <text x="100" y="470" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Maharashtra
        </text>
        <text x="80" y="510" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Karnataka
        </text>
        <text x="130" y="550" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Andhra
        </text>
        <text x="60" y="580" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Tamil Nadu
        </text>
        <text x="40" y="540" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Kerala
        </text>
        <text x="130" y="510" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Telangana
        </text>
        <text x="200" y="430" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          MP
        </text>
        <text x="160" y="480" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Chhattisgarh
        </text>
        <text x="120" y="400" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Gujarat
        </text>
        <text x="80" y="370" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Rajasthan
        </text>
        <text x="320" y="400" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          UP
        </text>
        <text x="250" y="460" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Bihar
        </text>
        <text x="220" y="490" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Jharkhand
        </text>
        <text x="310" y="480" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          WB
        </text>
        <text x="380" y="480" className="text-[8px] font-medium fill-gray-700 pointer-events-none">
          Assam
        </text>
      </svg>
    </div>
  )
}

export default IndiaMap

