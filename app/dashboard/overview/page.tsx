'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const yearlyData = [
  { year: '2021', emissions: 4500, growthRate: 1.8 },
  { year: '2022', emissions: 4800, growthRate: 6.7 },
  { year: '2023', emissions: 5200, growthRate: 8.3 },
  { year: '2024', emissions: 4900, growthRate: -5.8 },
  { year: '2025', emissions: 5100, growthRate: 4.1 },
]

const monthlyData = [
  { month: '1月', emissions: 380, growthRate: -5.2 },
  { month: '2月', emissions: 350, growthRate: -7.9 },
  { month: '3月', emissions: 420, growthRate: 20.0 },
  { month: '4月', emissions: 400, growthRate: -4.8 },
  { month: '5月', emissions: 450, growthRate: 12.5 },
  { month: '6月', emissions: 480, growthRate: 6.7 },
  { month: '7月', emissions: 520, growthRate: 8.3 },
  { month: '8月', emissions: 500, growthRate: -3.8 },
  { month: '9月', emissions: 460, growthRate: -8.0 },
  { month: '10月', emissions: 440, growthRate: -4.3 },
  { month: '11月', emissions: 410, growthRate: -6.8 },
  { month: '12月', emissions: 390, growthRate: -4.9 },
]

const scopeData = [
  { name: 'Scope 1 (直接排放)', value: 3252, percentage: 4.6, color: '#3b82f6' },
  { name: 'Scope 2 (间接排放-电力)', value: 67446, percentage: 95.4, color: '#ef4444' },
  { name: 'Scope 3 (其他间接)', value: 841, percentage: 1.19, color: '#22c55e' },
]

const areaData = [
  { name: '科研楼', value: 36.12, emission: 25543, area: 138000, equipment: '大型实验仪器', color: '#3B82F6' },
  { name: '宿舍楼', value: 32.05, emission: 22678, area: 239000, equipment: '空调系统', color: '#8B5CF6' },
  { name: '图书馆', value: 11.95, emission: 8456, area: 95000, equipment: '照明系统', color: '#6366F1' },
  { name: '教学楼', value: 9.67, emission: 6845, area: 88000, equipment: '多媒体设备', color: '#10B981' },
  { name: '食堂', value: 5.74, emission: 4067, area: 26000, equipment: '厨房设备', color: '#F59E0B' },
  { name: '体育馆', value: 4.47, emission: 3167, area: 16000, equipment: '音响设备', color: '#EF4444' },
]

const seasonData = [
  { season: '春季', value: 1270, fullMark: 1500 },
  { season: '夏季', value: 1500, fullMark: 1500 },
  { season: '秋季', value: 1340, fullMark: 1500 },
  { season: '冬季', value: 990, fullMark: 1500 },
]

// Diagnosis Tab Component
function DiagnosisTab() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState('')
  const [collectedData, setCollectedData] = useState<any>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const collectSystemData = () => {
    return {
      totalEmission: 70697.83,
      yearEmission: 65432.15,
      monthEmission: 5265.68,
      carbonSink: 1823.47,
      perCapita: 987,
      areaIntensity: 81.73,
      scopeData: [
        { name: 'Scope 1', value: 3252, percentage: 4.6 },
        { name: 'Scope 2', value: 67446, percentage: 95.4 },
        { name: 'Scope 3', value: 841, percentage: 1.19 }
      ],
      functionalStructure: [
        { name: 'Research Building', value: 36.12, emission: 25543 },
        { name: 'Dormitory Building', value: 32.05, emission: 22678 },
        { name: 'Library', value: 11.95, emission: 8456 },
        { name: 'Teaching Building', value: 9.67, emission: 6845 },
        { name: 'Canteen', value: 5.74, emission: 4067 },
        { name: 'Gymnasium', value: 4.47, emission: 3167 }
      ],
      energySource: [
        { name: 'Electricity', value: 95.47 },
        { name: 'Natural Gas', value: 3.20 },
        { name: 'Water', value: 1.19 }
      ]
    }
  }

  const startDiagnosis = async () => {
    setIsProcessing(true)
    setCurrentStep(1)
    setDiagnosisResult('')
    setIsStreaming(false)
    setSearchResults([])
    setIsSearching(false)

    // Step 1: Data Collection
    await new Promise(resolve => setTimeout(resolve, 2000))
    const data = collectSystemData()
    setCollectedData(data)

    // Step 2: Information Retrieval with Web Search
    setCurrentStep(2)
    setIsSearching(true)

    try {
      // Perform web search for carbon emission information
      const searchResponse = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queries: [
            'campus carbon emission reduction strategies 2024',
            'university building energy efficiency best practices',
            'renewable energy solar PV campus installation',
            'carbon neutrality higher education case studies'
          ]
        }),
      })

      if (searchResponse.ok) {
        const searchData = await searchResponse.json()

        // Stream search results
        for (const result of searchData.results || []) {
          setSearchResults(prev => [...prev, result])
          await new Promise(resolve => setTimeout(resolve, 300))
        }
      }

      setIsSearching(false)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Step 3: Generate Report with Streaming
      setCurrentStep(3)
      setIsStreaming(true)

      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, stream: true }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body')
      }

      let accumulatedText = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)

            if (data === '[DONE]') {
              continue
            }

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content || ''

              if (content) {
                accumulatedText += content
                setDiagnosisResult(accumulatedText)

                // Auto scroll to bottom
                if (resultRef.current) {
                  resultRef.current.scrollTop = resultRef.current.scrollHeight
                }
              }
            } catch (e) {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }

      setIsStreaming(false)
      setCurrentStep(0)
      setIsProcessing(false)
    } catch (error) {
      console.error('Diagnosis error:', error)
      setDiagnosisResult('诊断过程中出现错误，请稍后重试。\n\nError: ' + (error as Error).message)
      setIsStreaming(false)
      setIsSearching(false)
      setCurrentStep(0)
      setIsProcessing(false)
    }
  }

  const downloadReport = () => {
    if (!collectedData) {
      alert('No data available. Please run the diagnosis first.')
      return
    }

    const timestamp = new Date().toLocaleString('zh-CN')

    // Extract HTML content from diagnosisResult
    const reportContent = diagnosisResult || `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>校园碳排放智能诊断报告</title>
</head>
<body>
    <h1>校园碳排放智能诊断报告</h1>
    <p>生成时间: ${timestamp}</p>
    <p>暂无诊断结果</p>
</body>
</html>
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `校园碳排放诊断报告_${new Date().getTime()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="p-6 space-y-6">
      {/* Diagnosis Process */}
      <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center">
          <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          智能诊断流程
        </h2>

        <div className="flex items-center justify-around mb-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-500 ${
              currentStep === 1
                ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/50 animate-pulse scale-110'
                : currentStep > 1
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <p className="mt-3 text-center text-sm text-gray-300 font-semibold">收集数据</p>
            <p className="text-xs text-gray-500 mt-1">采集系统监测数据</p>
          </div>

          <div className="flex-1 mx-4">
            <div className={`h-1 rounded transition-all duration-500 ${
              currentStep >= 2 ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gray-700'
            }`}></div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-500 ${
              currentStep === 2
                ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/50 animate-pulse scale-110'
                : currentStep > 2
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}>
              {currentStep > 2 ? '✓' : isSearching ? <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> : '2'}
            </div>
            <p className="mt-3 text-center text-sm text-gray-300 font-semibold">查找信息</p>
            <p className="text-xs text-gray-500 mt-1">{isSearching ? '正在联网检索...' : '检索碳排放知识库'}</p>
          </div>

          <div className="flex-1 mx-4">
            <div className={`h-1 rounded transition-all duration-500 ${
              currentStep >= 3 ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gray-700'
            }`}></div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-500 ${
              currentStep === 3
                ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/50 animate-pulse scale-110'
                : currentStep > 3
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}>
              {currentStep > 3 ? '✓' : '3'}
            </div>
            <p className="mt-3 text-center text-sm text-gray-300 font-semibold">生成报告</p>
            <p className="text-xs text-gray-500 mt-1">{isStreaming ? '实时生成中...' : '输出诊断结果'}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={startDiagnosis}
            disabled={isProcessing}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 ${
              isProcessing
                ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/50'
            }`}
          >
            <svg className={`w-6 h-6 ${isProcessing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{isProcessing ? '诊断进行中...' : '开始智能诊断'}</span>
          </button>
        </div>
      </div>

      {/* Combined Results Section */}
      {(searchResults.length > 0 || diagnosisResult) && (
        <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-300 flex items-center">
              智能诊断报告
              {isStreaming && (
                <span className="ml-3 flex items-center text-sm text-cyan-400">
                  <svg className="w-4 h-4 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  实时生成中...
                </span>
              )}
            </h2>
            <button
              onClick={downloadReport}
              disabled={isStreaming || !diagnosisResult}
              className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg ${
                isStreaming || !diagnosisResult
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>下载报告</span>
            </button>
          </div>

          <div
            ref={resultRef}
            className="bg-black/30 rounded-lg p-6 border border-cyan-500/20 max-h-[600px] overflow-y-auto scroll-smooth"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#22d3ee #1e293b'
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                width: 8px;
              }
              div::-webkit-scrollbar-track {
                background: #1e293b;
                border-radius: 4px;
              }
              div::-webkit-scrollbar-thumb {
                background: #22d3ee;
                border-radius: 4px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: #06b6d4;
              }
            `}</style>

            {/* Search Results Section */}
            {searchResults.length > 0 && (
              <div className="mb-6 pb-6 border-b border-cyan-500/20">
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  参考信息检索
                  {isSearching && (
                    <span className="ml-2 text-sm text-cyan-400 animate-pulse">检索中...</span>
                  )}
                </h3>
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="bg-black/30 rounded p-3 border border-cyan-500/10 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 text-xs font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed flex-1">{result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Diagnosis Result Section */}
            {diagnosisResult && (
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  AI诊断分析
                </h3>
                <div className="text-gray-300 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: diagnosisResult }} />
                  {isStreaming && (
                    <span className="inline-block w-2 h-5 ml-1 bg-cyan-400 animate-pulse"></span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

const areaMonthlyData = [
  { name: '科研楼', emissions: 1275 },
  { name: '宿舍楼', emissions: 1530 },
  { name: '图书馆', emissions: 510 },
  { name: '教学楼', emissions: 1020 },
  { name: '食堂', emissions: 510 },
  { name: '体育馆', emissions: 255 },
]

// 人均碳排放数据
const perCapitaData = {
  years: ['2018', '2019', '2020', '2021', '2022', '2023'],
  values: [1023, 1045, 987, 1012, 995, 987],
  standards: [1020, 1020, 1020, 1020, 1020, 1020],
}

// 单位面积碳排放数据
const areaIntensityData = {
  years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
  values: [56.32, 61.59, 70.53, 44.40, 77.76, 82.58, 81.73],
  standard: 80,
}

// 能源来源结构
const energySourceData = [
  { name: '电力', value: 95.47, color: '#ef4444', trend: 1.42 },
  { name: '天然气', value: 3.20, color: '#f59e0b', trend: -0.85 },
  { name: '汽油', value: 0.08, color: '#3b82f6', trend: 0.02 },
  { name: '柴油', value: 0.06, color: '#6b7280', trend: -0.01 },
  { name: '用水', value: 1.19, color: '#22c55e', trend: 0.19 }
]

// 季节分布数据
const seasonalData = [
  { name: '春季', value: 20, color: '#86efac' },
  { name: '夏季', value: 30, color: '#fdba74' },
  { name: '秋季', value: 15, color: '#fbbf24' },
  { name: '冬季', value: 35, color: '#60a5fa' }
]

// 月度详细数据
const monthlyDetailedData = {
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  values: [10760, 8521, 6543, 5432, 7654, 8521, 9876, 8765, 6543, 5432, 7654, 10760],
  seasons: ['冬季', '冬季', '春季', '春季', '春季', '夏季', '夏季', '夏季', '秋季', '秋季', '秋季', '冬季']
}

// 可再生能源利用率数据
const renewableEnergyData = {
  current: 35,
  target: 50,
  trend: [
    { year: '2021', value: 28 },
    { year: '2022', value: 32 },
    { year: '2023', value: 35 },
    { year: '2024Q1', value: 35 }
  ]
}

// 外购绿电绿证数据
const greenElectricityData = {
  years: ['2021', '2022', '2023'],
  values: [2, 3.5, 5],
  target: 10
}

// 光伏电量数据
const photovoltaicData = {
  totalGeneration: 2450000,
  consumption: 2156000,
  percentage: 18,
  yearOverYear: 3
}

// 建筑物详细数据
const buildingData: any = {
  'research-building': {
    name: '科研楼',
    yearlyTrend: {
      years: ['2019', '2020', '2021', '2022', '2023'],
      values: [23456, 21876, 25678, 26843, 25543]
    },
    monthlyEmission: {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      values: [2100, 1800, 2000, 1950, 2300, 2450, 2200, 2150, 2050, 2100, 2200, 2243]
    }
  },
  'dormitory-building': {
    name: '宿舍楼',
    yearlyTrend: {
      years: ['2019', '2020', '2021', '2022', '2023'],
      values: [21456, 20876, 22678, 23843, 22678]
    },
    monthlyEmission: {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      values: [2050, 1750, 1900, 1850, 1980, 2100, 1950, 1900, 1850, 1920, 2000, 2128]
    }
  },
  'teaching-building': {
    name: '教学楼',
    yearlyTrend: {
      years: ['2019', '2020', '2021', '2022', '2023'],
      values: [6234, 5876, 6845, 7123, 6845]
    },
    monthlyEmission: {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      values: [550, 480, 570, 600, 650, 680, 520, 450, 590, 620, 600, 535]
    }
  },
  'library-building': {
    name: '图书馆',
    yearlyTrend: {
      years: ['2019', '2020', '2021', '2022', '2023'],
      values: [7890, 7456, 8456, 8923, 8456]
    },
    monthlyEmission: {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      values: [680, 620, 710, 720, 750, 780, 650, 600, 700, 730, 710, 706]
    }
  },
  'canteen-building': {
    name: '食堂',
    yearlyTrend: {
      years: ['2019', '2020', '2021', '2022', '2023'],
      values: [3890, 3756, 4067, 4323, 4067]
    },
    monthlyEmission: {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      values: [330, 290, 340, 350, 360, 380, 320, 280, 340, 350, 340, 337]
    }
  },
  'gymnasium-building': {
    name: '体育馆',
    yearlyTrend: {
      years: ['2019', '2020', '2021', '2022', '2023'],
      values: [2890, 2756, 3167, 3423, 3167]
    },
    monthlyEmission: {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      values: [260, 230, 270, 280, 290, 300, 250, 220, 270, 280, 270, 247]
    }
  }
}

export default function OverviewPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [activeSection, setActiveSection] = useState('total-emission')
  const [expandedMenus, setExpandedMenus] = useState({
    'total-metrics': true,
    'intensity-metrics': false,
    'structure-metrics': false,
    'efficiency-metrics': false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loginStatus = localStorage.getItem('isLoggedIn')
    if (loginStatus !== 'true') {
      router.push('/login')
    }

    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      setCurrentTime(timeStr)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }))
  }

  const handleSectionClick = (section: string) => {
    setActiveSection(section)
  }

  return (
    <div className="h-screen bg-[#0a0e1a] text-white overflow-hidden flex flex-col">
      {/* 科技感背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-black">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <header className="bg-gradient-to-r from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-pulse">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-wide">
                    校园碳排放监测系统
                  </h1>
                  <p className="text-xs text-cyan-400/60 mt-0.5">Campus Carbon Emission Monitoring System</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex space-x-2 bg-black/30 p-1 rounded-xl border border-cyan-500/20">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'overview'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    综合概览
                  </button>
                  <button
                    onClick={() => setActiveTab('statistics')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'statistics'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    指标统计
                  </button>
                  <button
                    onClick={() => setActiveTab('diagnosis')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'diagnosis'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    智能诊断
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right bg-black/30 px-4 py-2 rounded-lg border border-cyan-500/20">
                    <div className="text-sm text-cyan-300 font-mono font-semibold">{currentTime}</div>
                    <div className="text-xs text-gray-400">欢迎, admin</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-gradient-to-r from-red-500/30 to-red-600/30 text-red-300 rounded-lg hover:from-red-500/50 hover:to-red-600/50 transition-all duration-300 border border-red-500/30"
                  >
                    退出
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <main className="flex-1 p-4 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 h-full">
              {/* 左侧：近5年碳排放总量和2025年月度碳排放 */}
              <div className="col-span-3 flex flex-col gap-4 h-full">
                {/* 近5年碳排放总量 */}
                <div className="flex-1 bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30">
                    <h3 className="text-base font-bold text-cyan-300 flex items-center">
                      <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 mr-2 rounded-full shadow-lg shadow-cyan-500/50"></span>
                      近5年碳排放总量
                      <span className="ml-2 text-xs text-gray-400 font-normal">ANNUAL EMISSIONS</span>
                    </h3>
                  </div>
                  <div className="flex-1 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={yearlyData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                        <XAxis
                          dataKey="year"
                          stroke="#64748b"
                          fontSize={12}
                          tick={{ fill: '#94a3b8' }}
                          axisLine={{ stroke: '#1e3a5f' }}
                        />
                        <YAxis
                          stroke="#64748b"
                          fontSize={11}
                          tick={{ fill: '#94a3b8' }}
                          width={50}
                          axisLine={{ stroke: '#1e3a5f' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.98)',
                            border: '1px solid #06b6d4',
                            borderRadius: '10px',
                            boxShadow: '0 8px 16px rgba(6, 182, 212, 0.3)',
                            padding: '10px'
                          }}
                          itemStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                          formatter={(value: any) => [`${value} 吨CO₂`, '排放量']}
                          labelStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="emissions" fill="url(#barGradient1)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2025年月度碳排放 */}
                <div className="flex-1 bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30">
                    <h3 className="text-base font-bold text-cyan-300 flex items-center">
                      <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 mr-2 rounded-full shadow-lg shadow-cyan-500/50"></span>
                      2025年月度碳排放
                      <span className="ml-2 text-xs text-gray-400 font-normal">MONTHLY 2025</span>
                    </h3>
                  </div>
                  <div className="flex-1 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6} />
                          </linearGradient>
                          <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                            <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                        <XAxis
                          dataKey="month"
                          stroke="#64748b"
                          fontSize={11}
                          tick={{ fill: '#94a3b8' }}
                          axisLine={{ stroke: '#1e3a5f' }}
                          ticks={['2月', '4月', '6月', '8月', '10月', '12月']}
                        />
                        <YAxis
                          stroke="#64748b"
                          fontSize={11}
                          tick={{ fill: '#94a3b8' }}
                          width={50}
                          axisLine={{ stroke: '#1e3a5f' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.98)',
                            border: '1px solid #06b6d4',
                            borderRadius: '10px',
                            boxShadow: '0 8px 16px rgba(6, 182, 212, 0.3)',
                            padding: '10px'
                          }}
                          itemStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                          formatter={(value: any) => [`${value} 吨CO₂`, '排放量']}
                          labelStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="emissions" radius={[8, 8, 0, 0]}>
                          {monthlyData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.growthRate > 0 ? 'url(#barGradient3)' : 'url(#barGradient2)'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* 中间：场景监测区 */}
              <div className="col-span-6 flex flex-col h-full">
                <div className="flex-1 bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30">
                    <h3 className="text-base font-bold text-cyan-300 flex items-center">
                      <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 mr-2 rounded-full shadow-lg shadow-cyan-500/50"></span>
                      场景监测区
                      <span className="ml-2 text-xs text-gray-400 font-normal">SCENE MONITORING</span>
                    </h3>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-center">
                    <div className="w-full h-full rounded-lg overflow-hidden border-2 border-cyan-500/20 shadow-inner relative">
                      <img
                        src="/background.webp"
                        alt="Campus Scene"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-cyan-300 text-sm font-medium">实时校园场景监测</p>
                        <p className="text-gray-400 text-xs mt-1">Real-time Campus Scene Monitoring</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：分范围碳排放结构和功能区结构占比 */}
              <div className="col-span-3 flex flex-col gap-4 h-full">
                {/* 分范围碳排放结构 */}
                <div className="flex-1 bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30">
                    <h3 className="text-base font-bold text-cyan-300 flex items-center">
                      <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 mr-2 rounded-full shadow-lg shadow-cyan-500/50"></span>
                      分范围碳排放结构
                      <span className="ml-2 text-xs text-gray-400 font-normal">SCOPE</span>
                    </h3>
                  </div>
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={scopeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="#0a0e1a"
                            strokeWidth={2}
                            label={false}
                          >
                            {scopeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              boxShadow: '0 8px 16px rgba(6, 182, 212, 0.3)',
                              padding: '10px'
                            }}
                            itemStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                            formatter={(value: any, name: any, props: any) => {
                              const data = props.payload;
                              return [`${data.value} 吨 (${data.percentage}%)`, data.name];
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-1.5 px-2 pb-2">
                      {scopeData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-xs bg-black/20 rounded-lg px-3 py-1.5">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                            <span className="text-gray-300 text-[10px] truncate leading-tight">{item.name}</span>
                          </div>
                          <span className="text-cyan-400 font-semibold ml-2 text-[10px]">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 功能区结构占比 */}
                <div className="flex-1 bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col">
                  <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30">
                    <h3 className="text-base font-bold text-cyan-300 flex items-center">
                      <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 mr-2 rounded-full shadow-lg shadow-cyan-500/50"></span>
                      功能区结构占比
                      <span className="ml-2 text-xs text-gray-400 font-normal">AREA</span>
                    </h3>
                  </div>
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={areaData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="#0a0e1a"
                            strokeWidth={2}
                            label={false}
                          >
                            {areaData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              boxShadow: '0 8px 16px rgba(6, 182, 212, 0.3)',
                              padding: '10px'
                            }}
                            itemStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                            formatter={(value: any, name: any, props: any) => {
                              const data = props.payload;
                              return [`${data.value}% | ${data.emission} 吨`, data.name];
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 px-2 pb-2">
                      {areaData.map((item, index) => (
                        <div key={index} className="flex items-center gap-1.5 text-[10px] bg-black/20 rounded px-2 py-1">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                          <span className="text-gray-300 truncate">{item.name}</span>
                          <span className="text-cyan-400 font-semibold ml-auto">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {activeTab === 'statistics' && (
          <main className="flex-1 flex overflow-hidden">
            {/* 左侧导航栏 */}
            <div className="w-64 bg-gradient-to-b from-gray-900/90 to-gray-900/70 backdrop-blur-md border-r border-cyan-500/20 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-base font-bold text-cyan-300 mb-4 flex items-center">
                  <i className="fas fa-chart-line mr-2"></i>
                  校园整体监测
                </h3>

                {/* 总量类指标 */}
                <div className="mb-4">
                  <div
                    className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-cyan-500/10 transition-all"
                    onClick={() => toggleMenu('total-metrics')}
                  >
                    <span className="font-medium text-gray-300 text-sm">总量类指标</span>
                    <svg
                      className={`w-4 h-4 text-cyan-400 transition-transform ${expandedMenus['total-metrics'] ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {expandedMenus['total-metrics'] && (
                    <div className="mt-2 space-y-1 pl-2">
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'total-emission'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('total-emission')}
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        综合碳排放量
                      </div>
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'scope-emission'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('scope-emission')}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        分范围碳排放量
                      </div>
                    </div>
                  )}
                </div>

                {/* 强度类指标 */}
                <div className="mb-4">
                  <div
                    className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-cyan-500/10 transition-all"
                    onClick={() => toggleMenu('intensity-metrics')}
                  >
                    <span className="font-medium text-gray-300 text-sm">强度类指标</span>
                    <svg
                      className={`w-4 h-4 text-cyan-400 transition-transform ${expandedMenus['intensity-metrics'] ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {expandedMenus['intensity-metrics'] && (
                    <div className="mt-2 space-y-1 pl-2">
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'per-capita'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('per-capita')}
                      >
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        人均碳排放量
                      </div>
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'area-intensity'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('area-intensity')}
                      >
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        单位面积碳排放量
                      </div>
                    </div>
                  )}
                </div>

                {/* 结构类指标 */}
                <div className="mb-4">
                  <div
                    className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-cyan-500/10 transition-all"
                    onClick={() => toggleMenu('structure-metrics')}
                  >
                    <span className="font-medium text-gray-300 text-sm">结构类指标</span>
                    <svg
                      className={`w-4 h-4 text-cyan-400 transition-transform ${expandedMenus['structure-metrics'] ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {expandedMenus['structure-metrics'] && (
                    <div className="mt-2 space-y-1 pl-2">
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'functional-structure'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('functional-structure')}
                      >
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        功能区结构占比
                      </div>
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'source-structure'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('source-structure')}
                      >
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        来源结构占比
                      </div>
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'time-distribution'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('time-distribution')}
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        时间结构分布
                      </div>
                    </div>
                  )}
                </div>

                {/* 效率类指标 */}
                <div className="mb-4">
                  <div
                    className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-cyan-500/10 transition-all"
                    onClick={() => toggleMenu('efficiency-metrics')}
                  >
                    <span className="font-medium text-gray-300 text-sm">效率类指标</span>
                    <svg
                      className={`w-4 h-4 text-cyan-400 transition-transform ${expandedMenus['efficiency-metrics'] ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {expandedMenus['efficiency-metrics'] && (
                    <div className="mt-2 space-y-1 pl-2">
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'renewable-energy'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('renewable-energy')}
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        可再生能源利用率
                      </div>
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'green-electricity'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('green-electricity')}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        外购绿电绿证占比
                      </div>
                      <div
                        className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                          activeSection === 'photovoltaic'
                            ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                        }`}
                        onClick={() => handleSectionClick('photovoltaic')}
                      >
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        校园消纳光伏电量占比
                      </div>
                    </div>
                  )}
                </div>

                <hr className="my-4 border-cyan-500/20" />

                {/* 功能区详细分析 */}
                <h3 className="text-base font-bold text-cyan-300 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  功能区数据
                </h3>
                <div className="space-y-1">
                  <div
                    className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                      activeSection === 'research-building'
                        ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                    }`}
                    onClick={() => handleSectionClick('research-building')}
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    科研楼
                  </div>
                  <div
                    className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                      activeSection === 'dormitory-building'
                        ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                    }`}
                    onClick={() => handleSectionClick('dormitory-building')}
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    宿舍楼
                  </div>
                  <div
                    className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                      activeSection === 'teaching-building'
                        ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                    }`}
                    onClick={() => handleSectionClick('teaching-building')}
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    教学楼
                  </div>
                  <div
                    className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                      activeSection === 'library-building'
                        ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                    }`}
                    onClick={() => handleSectionClick('library-building')}
                  >
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    图书馆
                  </div>
                  <div
                    className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                      activeSection === 'canteen-building'
                        ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                    }`}
                    onClick={() => handleSectionClick('canteen-building')}
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    食堂
                  </div>
                  <div
                    className={`p-2 rounded cursor-pointer text-sm transition-all flex items-center ${
                      activeSection === 'gymnasium-building'
                        ? 'text-cyan-300 bg-cyan-500/20 border-l-2 border-cyan-400'
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                    }`}
                    onClick={() => handleSectionClick('gymnasium-building')}
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    体育馆
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧内容区 */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-cyan-300 mb-2">
                  {activeSection === 'total-emission' && '综合碳排放量'}
                  {activeSection === 'scope-emission' && '分范围碳排放量'}
                  {activeSection === 'per-capita' && '人均碳排放量'}
                  {activeSection === 'area-intensity' && '单位面积碳排放量'}
                  {activeSection === 'functional-structure' && '功能区结构占比'}
                  {activeSection === 'source-structure' && '来源结构占比'}
                  {activeSection === 'time-distribution' && '时间结构分布'}
                  {activeSection === 'renewable-energy' && '可再生能源利用率'}
                  {activeSection === 'green-electricity' && '外购绿电绿证占比'}
                  {activeSection === 'photovoltaic' && '校园消纳光伏电量占比'}
                  {activeSection === 'research-building' && '科研楼碳排放监测'}
                  {activeSection === 'dormitory-building' && '宿舍楼碳排放监测'}
                  {activeSection === 'teaching-building' && '教学楼碳排放监测'}
                  {activeSection === 'library-building' && '图书馆碳排放监测'}
                  {activeSection === 'canteen-building' && '食堂碳排放监测'}
                  {activeSection === 'gymnasium-building' && '体育馆碳排放监测'}
                </h2>
                <p className="text-gray-400">实时监控校园碳排放数据，助力绿色低碳转型</p>
              </div>

              {/* 综合碳排放量 */}
              {activeSection === 'total-emission' && (
                <>
                  {/* 年/月/碳汇三栏图表 */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 shadow-2xl">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4">年碳排放总量</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={yearlyData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="yearBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} />
                      <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.98)',
                          border: '1px solid #22c55e',
                          borderRadius: '10px',
                          padding: '10px'
                        }}
                        itemStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                      />
                      <Bar dataKey="emissions" fill="url(#yearBar)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 shadow-2xl">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4">月碳排放总量</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyData.slice(0, 7)} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="monthBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} />
                      <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.98)',
                          border: '1px solid #3b82f6',
                          borderRadius: '10px',
                          padding: '10px'
                        }}
                        itemStyle={{ color: '#e2e8f0', fontWeight: 600 }}
                      />
                      <Bar dataKey="emissions" fill="url(#monthBar)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 shadow-2xl">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4">校园年度生态碳汇</h3>
                  <div className="flex items-center justify-center h-[250px]">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-400 mb-2">2,453</div>
                      <div className="text-gray-400 text-sm">吨CO₂</div>
                      <div className="mt-4 text-green-400 text-sm">↑ 1.8% 同比2022年</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 关键指标卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">2023年总排放量</p>
                      <p className="text-3xl font-bold text-green-400 mt-1">70,698</p>
                      <p className="text-sm text-green-300">吨CO₂</p>
                    </div>
                    <svg className="w-12 h-12 text-green-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-green-400">↓ 1.02% 同比2022年</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">2024年3月排放</p>
                      <p className="text-3xl font-bold text-red-400 mt-1">3,915</p>
                      <p className="text-sm text-red-300">吨CO₂</p>
                    </div>
                    <svg className="w-12 h-12 text-red-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-red-400">↑ 19.2% 同比2月</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">净碳排放量</p>
                      <p className="text-3xl font-bold text-orange-400 mt-1">68,245</p>
                      <p className="text-sm text-orange-300">吨CO₂</p>
                    </div>
                    <svg className="w-12 h-12 text-orange-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-gray-400">扣除碳汇后</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">碳汇总量</p>
                      <p className="text-3xl font-bold text-emerald-400 mt-1">2,453</p>
                      <p className="text-sm text-emerald-300">吨CO₂</p>
                    </div>
                    <svg className="w-12 h-12 text-emerald-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-green-400">绿地固碳量</span>
                  </div>
                </div>
              </div>
                </>
              )}

              {/* 分范围碳排放量 */}
              {activeSection === 'scope-emission' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">分范围碳排放量监测 (Scope 1/2/3)</h3>
                    <p className="text-gray-400 text-sm">核算边界：南湖校区地界范围内所有学校建筑及设施</p>
                  </div>

                  {/* Scope卡片 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-l-4 border-blue-500 rounded-xl p-6 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-200">Scope 1 (直接排放)</h4>
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="text-3xl font-bold text-blue-400 mb-2">3,252 吨</div>
                      <div className="text-sm text-gray-300 mb-3">占比 4.6%</div>
                      <div className="text-xs text-gray-400 mb-3">主要来源：食堂天然气炉灶</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-400">↓ -2.1% 同比2022年</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-l-4 border-red-500 rounded-xl p-6 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-200">Scope 2 (间接排放-电力)</h4>
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="text-3xl font-bold text-red-400 mb-2">67,446 吨</div>
                      <div className="text-sm text-gray-300 mb-3">占比 95.4%</div>
                      <div className="text-xs text-gray-400 mb-3">主要来源：外购电力</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-red-400">↑ +0.4% 同比2022年</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-l-4 border-green-500 rounded-xl p-6 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-200">Scope 3 (其他间接)</h4>
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-3xl font-bold text-green-400 mb-2">841 吨</div>
                      <div className="text-sm text-gray-300 mb-3">占比 1.19%</div>
                      <div className="text-xs text-gray-400 mb-3">主要来源：用水等</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-400">↓ -1.8% 同比2022年</span>
                      </div>
                    </div>
                  </div>

                  {/* Scope结构图表 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">分范围碳排放结构</h3>
                      <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                          <Pie
                            data={scopeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="#0a0e1a"
                            strokeWidth={2}
                            label={({ name, percentage }) => `${percentage}%`}
                          >
                            {scopeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                            formatter={(value: any, name: any, props: any) => {
                              const data = props.payload;
                              return [`${data.value} 吨 (${data.percentage}%)`, data.name];
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">详细信息</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-400 font-semibold">Scope 1 来源构成</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">天然气</span>
                              <span className="text-gray-300">86.1%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">汽油</span>
                              <span className="text-gray-300">9.8%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">柴油</span>
                              <span className="text-gray-300">4.1%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-red-400 font-semibold">Scope 2 说明</span>
                          </div>
                          <p className="text-gray-400 text-sm">主要因科研设备用电量增加，占总排放量的95.4%</p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-400 font-semibold">Scope 3 说明</span>
                          </div>
                          <p className="text-gray-400 text-sm">主要为校园用水产生的间接排放</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 人均碳排放量 */}
              {activeSection === 'per-capita' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">人均碳排放量监测（2023-2024）</h3>
                    <p className="text-gray-400 text-sm">核算标准 - 参考 T/TJKZS 0001-2024（夏热冬冷地区高校人均限值 1020kgCO₂/人·年）</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">人均碳排放量趋势</h3>
                      <div className="mb-4 flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">标准限值: <span className="font-semibold text-red-400">1020kg/人·年</span></span>
                        <span className="text-gray-400">当前值: <span className="font-semibold text-blue-400">987kg/人·年</span></span>
                      </div>
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={perCapitaData.years.map((year, index) => ({
                          year,
                          value: perCapitaData.values[index],
                          standard: perCapitaData.standards[index]
                        }))} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                          <XAxis dataKey="year" stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} />
                          <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                          <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                          <Bar dataKey="standard" fill="#ef4444" radius={[8, 8, 0, 0]} opacity={0.3} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">人均排放详细分析</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-300 mb-2">师生总数</h4>
                          <p className="text-3xl font-bold text-blue-400">71,632</p>
                          <p className="text-sm text-gray-400 mt-2">学生: 65,432人 | 教职工: 6,200人</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="font-semibold text-green-300 mb-2">达标情况</h4>
                          <p className="text-3xl font-bold text-green-400">良好</p>
                          <p className="text-sm text-gray-400 mt-2">低于标准限值3.2%</p>
                        </div>
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-300 mb-2">改进空间</h4>
                          <p className="text-3xl font-bold text-orange-400">15%</p>
                          <p className="text-sm text-gray-400 mt-2">通过管理优化可进一步降低</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 单位面积碳排放量 */}
              {activeSection === 'area-intensity' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">单位面积碳排放量监测</h3>
                    <p className="text-gray-400 text-sm">核算标准 - 参考限值 80kgCO₂/m²·年</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">单位面积碳排放趋势</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={areaIntensityData.years.map((year, index) => ({
                          year,
                          value: areaIntensityData.values[index],
                          standard: areaIntensityData.standard
                        }))} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                          <XAxis dataKey="year" stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} />
                          <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                          <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                          <Bar dataKey="standard" fill="#ef4444" radius={[8, 8, 0, 0]} opacity={0.3} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">关键指标</h3>
                      <div className="space-y-4">
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                          <h4 className="font-semibold text-cyan-300 mb-2">2023年单位面积排放</h4>
                          <p className="text-3xl font-bold text-cyan-400">81.73</p>
                          <p className="text-sm text-gray-400 mt-2">kgCO₂/m²·年</p>
                        </div>
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-300 mb-2">与标准对比</h4>
                          <p className="text-3xl font-bold text-orange-400">+2.16%</p>
                          <p className="text-sm text-gray-400 mt-2">高于标准限值80kgCO₂/m²</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="font-semibold text-green-300 mb-2">同比变化</h4>
                          <p className="text-3xl font-bold text-green-400">-1.03%</p>
                          <p className="text-sm text-gray-400 mt-2">同比2022年下降</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 功能区结构占比 */}
              {activeSection === 'functional-structure' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">2023年碳排放功能区结构占比</h3>
                    <p className="text-gray-400 text-sm">功能区范围 - 教学楼/科研楼/图书馆/食堂/体育馆/宿舍</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">功能区碳排放占比</h3>
                      <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                          <Pie
                            data={areaData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="#0a0e1a"
                            strokeWidth={2}
                            label={({ name, value }) => `${name} ${value}%`}
                          >
                            {areaData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">功能区详情</h3>
                      <div className="space-y-3 max-h-[350px] overflow-y-auto">
                        {areaData.map((area, index) => (
                          <div key={index} className="bg-black/20 rounded-lg p-3 border border-cyan-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-300 font-semibold">{area.name}</span>
                              <span className="text-cyan-400 font-bold">{area.value}%</span>
                            </div>
                            <div className="text-xs text-gray-400 space-y-1">
                              <div>排放量: {area.emission} 吨CO₂</div>
                              <div>建筑面积: {area.area.toLocaleString()} m²</div>
                              <div>主要设备: {area.equipment}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 来源结构占比 */}
              {activeSection === 'source-structure' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">碳排放来源结构占比</h3>
                    <p className="text-gray-400 text-sm">各类能源消耗产生的碳排放占比分析</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">能源来源结构</h3>
                      <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                          <Pie
                            data={energySourceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="#0a0e1a"
                            strokeWidth={2}
                            label={({ name, value }) => `${name} ${value}%`}
                          >
                            {energySourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">来源详情</h3>
                      <div className="space-y-3">
                        {energySourceData.map((source, index) => (
                          <div key={index} className="bg-black/20 rounded-lg p-4 border border-cyan-500/20">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></span>
                                <span className="text-gray-300 font-semibold">{source.name}</span>
                              </div>
                              <span className="text-cyan-400 font-bold">{source.value}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">同比变化</span>
                              <span className={source.trend > 0 ? 'text-red-400' : 'text-green-400'}>
                                {source.trend > 0 ? '↑' : '↓'} {Math.abs(source.trend)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 时间结构分布 */}
              {activeSection === 'time-distribution' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">碳排放时间结构分布</h3>
                    <p className="text-gray-400 text-sm">季节性、月度碳排放模式分析</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">季节分布占比</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={seasonalData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="#0a0e1a"
                            strokeWidth={2}
                            label={({ name, value }) => `${name} ${value}%`}
                          >
                            {seasonalData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">月度碳排放分布</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyDetailedData.months.map((month, index) => ({
                          month,
                          value: monthlyDetailedData.values[index]
                        }))} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} />
                          <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                          <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}

              {/* 可再生能源利用率 */}
              {activeSection === 'renewable-energy' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">可再生能源利用率监测</h3>
                    <p className="text-gray-400 text-sm">校园可再生能源使用情况及目标达成进度</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6">
                      <h4 className="font-semibold text-green-300 mb-2">当前利用率</h4>
                      <p className="text-5xl font-bold text-green-400 mb-2">{renewableEnergyData.current}%</p>
                      <p className="text-sm text-gray-400">目标: {renewableEnergyData.target}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
                      <h4 className="font-semibold text-blue-300 mb-2">目标完成度</h4>
                      <p className="text-5xl font-bold text-blue-400 mb-2">{((renewableEnergyData.current / renewableEnergyData.target) * 100).toFixed(1)}%</p>
                      <p className="text-sm text-gray-400">距离目标还需 {renewableEnergyData.target - renewableEnergyData.current}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-6">
                      <h4 className="font-semibold text-orange-300 mb-2">年度增长</h4>
                      <p className="text-5xl font-bold text-orange-400 mb-2">+3%</p>
                      <p className="text-sm text-gray-400">同比2022年</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-4">利用率趋势</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={renewableEnergyData.trend} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                        <XAxis dataKey="year" stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} />
                        <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.98)',
                            border: '1px solid #22c55e',
                            borderRadius: '10px',
                            padding: '10px'
                          }}
                        />
                        <Bar dataKey="value" fill="#22c55e" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}

              {/* 外购绿电绿证占比 */}
              {activeSection === 'green-electricity' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">外购绿电绿证占比</h3>
                    <p className="text-gray-400 text-sm">校园外购绿色电力和绿色证书使用情况</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">绿电占比趋势</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={greenElectricityData.years.map((year, index) => ({
                          year,
                          value: greenElectricityData.values[index]
                        }))} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                          <XAxis dataKey="year" stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} />
                          <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #3b82f6',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                          <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">关键指标</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-300 mb-2">2023年绿电占比</h4>
                          <p className="text-4xl font-bold text-blue-400 mb-2">5%</p>
                          <p className="text-sm text-gray-400">同比增长43%</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <h4 className="font-semibold text-green-300 mb-2">目标占比</h4>
                          <p className="text-4xl font-bold text-green-400 mb-2">10%</p>
                          <p className="text-sm text-gray-400">预计2025年达成</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 校园消纳光伏电量占比 */}
              {activeSection === 'photovoltaic' && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">校园消纳光伏电量占比</h3>
                    <p className="text-gray-400 text-sm">校园光伏发电及自用情况统计</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
                      <h4 className="font-semibold text-yellow-300 mb-2">总发电量</h4>
                      <p className="text-3xl font-bold text-yellow-400 mb-2">{(photovoltaicData.totalGeneration / 10000).toFixed(0)}</p>
                      <p className="text-sm text-gray-400">万kWh/年</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6">
                      <h4 className="font-semibold text-green-300 mb-2">校园消纳量</h4>
                      <p className="text-3xl font-bold text-green-400 mb-2">{(photovoltaicData.consumption / 10000).toFixed(0)}</p>
                      <p className="text-sm text-gray-400">万kWh/年</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
                      <h4 className="font-semibold text-blue-300 mb-2">消纳占比</h4>
                      <p className="text-3xl font-bold text-blue-400 mb-2">{photovoltaicData.percentage}%</p>
                      <p className="text-sm text-gray-400">同比+{photovoltaicData.yearOverYear}%</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-4">光伏发电分布</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/20 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-2">总发电量</p>
                        <div className="w-full bg-gray-700 rounded-full h-4">
                          <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <p className="text-right text-gray-300 text-sm mt-1">245万kWh</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-2">校园消纳</p>
                        <div className="w-full bg-gray-700 rounded-full h-4">
                          <div className="bg-green-500 h-4 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <p className="text-right text-gray-300 text-sm mt-1">215.6万kWh (88%)</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 功能区建筑详细监测 */}
              {['research-building', 'dormitory-building', 'teaching-building', 'library-building', 'canteen-building', 'gymnasium-building'].includes(activeSection) && (
                <>
                  <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">{buildingData[activeSection].name}碳排放监测</h3>
                    <p className="text-gray-400 text-sm">年度趋势及月度碳排放量分析</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">年度碳排放趋势</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={buildingData[activeSection].yearlyTrend.years.map((year: string, index: number) => ({
                          year,
                          value: buildingData[activeSection].yearlyTrend.values[index]
                        }))} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                          <defs>
                            <linearGradient id="buildingBar" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                              <stop offset="100%" stopColor="#0891b2" stopOpacity={0.6} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                          <XAxis dataKey="year" stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} />
                          <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #06b6d4',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                          <Bar dataKey="value" fill="url(#buildingBar)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4">2023年月度碳排放量</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={buildingData[activeSection].monthlyEmission.months.map((month: string, index: number) => ({
                          month,
                          value: buildingData[activeSection].monthlyEmission.values[index]
                        }))} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                          <defs>
                            <linearGradient id="monthlyBar" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.6} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" opacity={0.2} />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} />
                          <YAxis stroke="#64748b" fontSize={11} tick={{ fill: '#94a3b8' }} width={50} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(15, 23, 42, 0.98)',
                              border: '1px solid #3b82f6',
                              borderRadius: '10px',
                              padding: '10px'
                            }}
                          />
                          <Bar dataKey="value" fill="url(#monthlyBar)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}

              {/* 其他section的占位内容 */}
              {!['total-emission', 'scope-emission', 'per-capita', 'area-intensity', 'functional-structure', 'source-structure', 'time-distribution', 'renewable-energy', 'green-electricity', 'photovoltaic', 'research-building', 'dormitory-building', 'teaching-building', 'library-building', 'canteen-building', 'gymnasium-building'].includes(activeSection) && (
                <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">功能开发中</h3>
                  <p className="text-gray-400">该模块正在开发中，敬请期待...</p>
                </div>
              )}
            </div>
          </main>
        )}

        {activeTab === 'diagnosis' && (
          <DiagnosisTab />
        )}
      </div>
    </div>
  )
}
