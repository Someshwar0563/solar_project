'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Chart component with proper scale registration
const Chart = dynamic(() => {
  return import('chart.js/auto').then(() => {
    return import('react-chartjs-2').then((mod) => mod.Line)
  })
}, {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 text-gray-500">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold mx-auto mb-2"></div>
        <p>Loading chart...</p>
      </div>
    </div>
  )
})

// Fallback component for when Chart fails to load
const ChartFallback = () => (
  <div className="flex items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
    <div className="text-center">
      <p className="text-lg font-semibold mb-2">Chart Unavailable</p>
      <p className="text-sm">Chart.js failed to load. Please refresh the page.</p>
    </div>
  </div>
)

export default function CalculatorPage() {
  const [bill, setBill] = useState('')
  const [roofSize, setRoofSize] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [chartError, setChartError] = useState(false)
  const [results, setResults] = useState({
    systemSize: 0,
    systemCost: 0,
    roi: 0,
    currentBill: 0,
    solarBill: 300,
    panelRecommendation: '',
    sellBackInfo: '',
    chartData: null as any
  })
  const [timeOfDay, setTimeOfDay] = useState(12)
  const [powerOutput, setPowerOutput] = useState(100)
  const houseCanvasRef = useRef<HTMLDivElement>(null)

  const calculateSolar = () => {
    try {
      setChartError(false) // Reset chart error for new calculation
      const billValue = parseFloat(bill)
      const roofSizeValue = parseFloat(roofSize)
      
      if (!billValue || billValue <= 0 || !roofSizeValue || roofSizeValue <= 0) {
        alert("Please enter a valid monthly bill and roof size.")
        return
      }
    
    const AVG_RATE_PER_KWH = 8
    const PANEL_WATTAGE = 540
    const PANEL_AREA_SQFT = 24
    const SUNLIGHT_HOURS = 5
    const PERFORMANCE_FACTOR = 0.75
    const COST_PER_KW = 60000
    const NEW_FIXED_CHARGE = 300
    const GOVT_SELL_RATE = 3.5

    const monthlyUnitsNeeded = billValue / AVG_RATE_PER_KWH
    const dailyUnitsNeeded = monthlyUnitsNeeded / 30
    
    const maxPanels = Math.floor(roofSizeValue / PANEL_AREA_SQFT)
    const finalSystemSize = (maxPanels * PANEL_WATTAGE) / 1000
    
    const dailyGeneration = finalSystemSize * SUNLIGHT_HOURS * PERFORMANCE_FACTOR

    const systemCost = finalSystemSize * COST_PER_KW
    const annualSavings = (billValue * 12) - (NEW_FIXED_CHARGE * 12)
    const roiYears = annualSavings > 0 ? Math.round((systemCost / annualSavings) * 10) / 10 : Infinity
    
    let sellBackInfo = ''
    if (dailyGeneration < dailyUnitsNeeded) {
      const unitsDeficit = dailyUnitsNeeded - dailyGeneration
      const additionalKWNeeded = unitsDeficit / (SUNLIGHT_HOURS * PERFORMANCE_FACTOR)
      const additionalPanelsNeeded = Math.ceil((additionalKWNeeded * 1000) / PANEL_WATTAGE)
      sellBackInfo = `There is no surplus electricity with this system. To generate a surplus, you would need space for approximately ${additionalPanelsNeeded} more panels.`
    } else {
      const dailySurplus = dailyGeneration - dailyUnitsNeeded
      const monthlySurplus = dailySurplus * 30
      const monthlyEarnings = monthlySurplus * GOVT_SELL_RATE
      sellBackInfo = `You could generate a surplus of ${Math.round(monthlySurplus)} units per month, potentially earning you ₹${Math.round(monthlyEarnings).toLocaleString('en-IN')} monthly by selling back to the grid!`
    }

    const panelRecommendation = `Your roof can fit ${maxPanels} high-efficiency 540W Monocrystalline PERC panels.`

    // Chart data
    const annualBill = billValue * 12
    const annualSolarBill = NEW_FIXED_CHARGE * 12
    const labels = Array.from({length: 25}, (_, i) => `Year ${i + 1}`)
    const oldCosts = labels.map((_, i) => annualBill * Math.pow(1.03, i))
    const newCosts = Array(25).fill(annualSolarBill)

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Projected Utility Cost',
          data: oldCosts,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Solar Cost',
          data: newCosts,
          borderColor: 'var(--accent-green)',
          backgroundColor: 'rgba(32, 201, 151, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    }

      setResults({
        systemSize: finalSystemSize,
        systemCost: systemCost,
        roi: roiYears,
        currentBill: billValue,
        solarBill: NEW_FIXED_CHARGE,
        panelRecommendation,
        sellBackInfo,
        chartData
      })
      setShowResults(true)
    } catch (error) {
      console.error('Error calculating solar data:', error)
      alert('An error occurred while calculating. Please try again.')
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setTimeOfDay(time)
    
    const angle = (time - 6) / 12 * Math.PI // 6am to 6pm
    const power = Math.max(0, Math.round(Math.sin(angle) * 100))
    setPowerOutput(power)
  }

  const formatTime = (time: number) => {
    const hour = Math.floor(time)
    const minutes = Math.round((time - hour) * 60)
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`
  }

  return (
    <div id="calculator">
      <section className="py-20 bg-primary fade-in-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold">See Your Future with Solar</h2>
            <p className="mt-4 text-lg font-sans">
              Enter your details to instantly get a realistic estimate of your required system, costs, savings, and potential earnings.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-secondary p-8 rounded-lg shadow-xl mb-12">
            <h3 className="text-2xl font-bold mb-4 text-center">Solar Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="Avg. Monthly Bill (₹)"
                className="form-input w-full px-4 py-3 border rounded-lg bg-primary focus:outline-none focus:ring-2"
                style={{'--tw-ring-color': 'var(--accent-gold)'} as React.CSSProperties}
              />
              <input
                type="number"
                value={roofSize}
                onChange={(e) => setRoofSize(e.target.value)}
                placeholder="Roof Size (sq. ft.)"
                className="form-input w-full px-4 py-3 border rounded-lg bg-primary focus:outline-none focus:ring-2"
                style={{'--tw-ring-color': 'var(--accent-gold)'} as React.CSSProperties}
              />
              <button
                onClick={calculateSolar}
                className="w-full md:col-span-1 btn-elegant font-bold py-3 px-8 rounded-lg flex-shrink-0"
              >
                Visualize Now
              </button>
            </div>
          </div>

          {showResults && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-secondary p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-center">Your Custom Solution</h3>
                  <div className="text-center">
                    <p className="font-sans mb-2">{results.panelRecommendation}</p>
                  </div>
                </div>
                <div className="bg-secondary p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold mb-4 text-center">Sell Back to the Grid</h3>
                  <div className="text-center">
                    <p className="font-sans mb-2">{results.sellBackInfo}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 text-center">
                <div className="bg-secondary p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">Recommended System</h3>
                  <p className="text-4xl font-bold" style={{color: 'var(--accent-cyan)'}}>
                    {results.systemSize.toFixed(1)} kW
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">Estimated Cost</h3>
                  <p className="text-4xl font-bold" style={{color: 'var(--accent-orange)'}}>
                    ₹{Math.round(results.systemCost).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">Payback Period</h3>
                  <p className="text-4xl font-bold" style={{color: 'var(--accent-green)'}}>
                    {results.roi === Infinity ? 'N/A' : `${results.roi} Years`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="comparison-card before-card bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-4 text-center">
                    Your Home Now 😥
                  </h3>
                  <p className="text-center text-5xl font-bold text-red-600 dark:text-red-400 mb-2">
                    ₹{results.currentBill.toLocaleString('en-IN')}
                  </p>
                  <p className="text-center text-gray-600 dark:text-gray-400 mb-4">/ month utility bill</p>
                </div>
                <div className="comparison-card after-card bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4 text-center">
                    With Radiwrit Solar! ✨
                  </h3>
                  <p className="text-center text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                    ~ ₹{results.solarBill.toLocaleString('en-IN')}
                  </p>
                  <p className="text-center text-gray-600 dark:text-gray-400 mb-4">/ month solar bill</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-secondary p-8 rounded-lg shadow-xl">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Interactive Solar Simulator</h3>
                  <div ref={houseCanvasRef} id="house-canvas" className="bg-primary">
                    {/* 3D House visualization will be rendered here */}
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <p>3D Solar House Visualization</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="time-slider" className="block font-sans text-center mb-2">
                      Time of Day: <span>{formatTime(timeOfDay)}</span>
                    </label>
                    <input
                      id="time-slider"
                      type="range"
                      min="6"
                      max="18"
                      value={timeOfDay}
                      onChange={handleTimeChange}
                      className="w-full"
                    />
                  </div>
                  <div className="text-center mt-2 font-sans">
                    Live Power Output: <strong className="text-accent-green">{powerOutput}%</strong>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">25-Year Savings Projection</h3>
                  {results.chartData ? (
                    <div className="h-64 w-full relative">
                      {chartError ? (
                        <ChartFallback />
                      ) : (
                        <div onError={() => setChartError(true)}>
                          <Chart
                            data={results.chartData}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  display: true,
                                  position: 'top'
                                }
                              },
                              scales: {
                                x: {
                                  type: 'category',
                                  display: true,
                                  title: {
                                    display: true,
                                    text: 'Years'
                                  }
                                },
                                y: {
                                  type: 'linear',
                                  display: true,
                                  title: {
                                    display: true,
                                    text: 'Cost (₹)'
                                  },
                                  ticks: {
                                    callback: function(value) {
                                      return '₹' + value.toLocaleString('en-IN');
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <p className="text-lg font-semibold mb-2">Chart Ready</p>
                        <p className="text-sm">Enter your details and click "Visualize Now" to see the savings projection</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
