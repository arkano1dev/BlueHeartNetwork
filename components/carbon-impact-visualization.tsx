import { motion } from "framer-motion"
import { Coffee, Battery, Car, TreePine, Zap, Droplets } from "lucide-react"

export default function CarbonImpactVisualization() {
  // Updated data from websitecarbon.com
  const carbonData = {
    annualCO2: 11.26, // kg CO2 per year
    teaCups: 1526, // cups of tea that could be boiled with the same CO2
    energyKwh: 25, // kWh of energy
    phoneCharges: 2124, // full charges of an average smartphone
    bubbles: 12, // billion bubbles
    trees: 1, // trees needed to offset
    carDistance: 163, // km an electric car could drive with the same energy
  }

  const items = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      value: carbonData.energyKwh,
      unit: "kWh",
      description: "of energy used annually",
    },
    {
      icon: <Coffee className="h-8 w-8 text-amber-400" />,
      value: carbonData.teaCups,
      unit: "cups",
      description: "of tea could be boiled",
    },
    {
      icon: <Battery className="h-8 w-8 text-green-400" />,
      value: carbonData.phoneCharges,
      unit: "charges",
      description: "of an average smartphone",
    },
    {
      icon: <Car className="h-8 w-8 text-blue-400" />,
      value: carbonData.carDistance,
      unit: "km",
      description: "an electric car could drive",
    },
    {
      icon: <Droplets className="h-8 w-8 text-blue-300" />,
      value: carbonData.bubbles,
      unit: "billion",
      description: "bubbles equivalent",
    },
    {
      icon: <TreePine className="h-8 w-8 text-emerald-400" />,
      value: carbonData.trees,
      unit: "tree",
      description: "needed to offset annually",
    },
  ]

  return (
    <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50">
      <h2 className="text-xl font-bold text-blue-100 mb-6 text-center">
        Our Annual Carbon Footprint: {carbonData.annualCO2} kg CO₂
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-blue-800/30 rounded-lg p-4 flex flex-col items-center text-center"
          >
            <div className="bg-blue-800/50 p-3 rounded-full mb-3">{item.icon}</div>
            <div className="text-2xl font-bold text-blue-100">
              {typeof item.value === "number" && item.value >= 1000 ? item.value.toLocaleString() : item.value}
            </div>
            <div className="text-sm text-blue-300">
              {item.unit} {item.description}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-blue-300 mt-6">
        These figures are based on 10,000 monthly page views with 0.09g CO₂ per view.
      </p>
    </div>
  )
}

