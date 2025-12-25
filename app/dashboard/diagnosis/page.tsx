'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DiagnosisPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState('')
  const [collectedData, setCollectedData] = useState<any>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  const startDiagnosis = async () => {
    setIsProcessing(true)
    setCurrentStep(1)
    setDiagnosisResult('')

    // Step 1: Collect data
    await new Promise(resolve => setTimeout(resolve, 2000))
    const data = collectSystemData()
    setCollectedData(data)

    setCurrentStep(2)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Step 2: Call Deepseek API
    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })

      const result = await response.json()

      setCurrentStep(3)
      await new Promise(resolve => setTimeout(resolve, 1000))

      setDiagnosisResult(result.diagnosis)
      setCurrentStep(0)
    } catch (error) {
      console.error('Diagnosis error:', error)
      setDiagnosisResult('诊断过程中出现错误，请稍后重试。')
      setCurrentStep(0)
    }

    setIsProcessing(false)
  }

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
        { name: '科研楼', value: 36.12, emission: 25543 },
        { name: '宿舍楼', value: 32.05, emission: 22678 },
        { name: '图书馆', value: 11.95, emission: 8456 },
        { name: '教学楼', value: 9.67, emission: 6845 },
        { name: '食堂', value: 5.74, emission: 4067 },
        { name: '体育馆', value: 4.47, emission: 3167 }
      ],
      energySource: [
        { name: '电力', value: 95.47 },
        { name: '天然气', value: 3.20 },
        { name: '用水', value: 1.19 }
      ]
    }
  }

  const downloadReport = () => {
    const reportContent = `
# 校园碳排放智能诊断报告

生成时间: ${currentTime}

## 一、数据概览

- 年度总碳排放: ${collectedData.yearEmission} 吨CO₂
- 月度碳排放: ${collectedData.monthEmission} 吨CO₂
- 人均碳排放: ${collectedData.perCapita} kg/人·年
- 单位面积碳排放: ${collectedData.areaIntensity} kg/m²·年

## 二、诊断分析

${diagnosisResult}

## 三、建议措施

请根据诊断结果采取相应的节能减排措施。
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `碳排放诊断报告_${new Date().getTime()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900">


      {/* 顶部导航栏 */}
      <nav className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-md border-b border-cyan-500/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              🌿 智慧校园碳排放监测系统
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-cyan-300 text-sm">
              <span className="opacity-70">当前时间：</span>
              <span className="font-mono ml-2">{currentTime}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg"
            >
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 主体内容 */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard/overview')}
            className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-all duration-300 flex items-center space-x-2 border border-cyan-500/30"
          >
            <span>← 返回概览</span>
          </button>
        </div>

        {/* 标题区域 */}
        <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-cyan-300 mb-3 flex items-center">
            <svg className="w-10 h-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            碳排放智能诊断系统
          </h1>
          <p className="text-gray-400 text-lg">基于AI大模型的校园碳排放深度分析与优化建议</p>
        </div>

        {/* 诊断流程 */}
        <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-cyan-300 mb-6">诊断流程</h2>

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
              <p className="mt-3 text-center text-sm text-gray-300 font-semibold">数据收集</p>
              <p className="text-xs text-gray-500 mt-1">收集系统监测数据</p>
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
                {currentStep > 2 ? '✓' : '2'}
              </div>
              <p className="mt-3 text-center text-sm text-gray-300 font-semibold">AI分析</p>
              <p className="text-xs text-gray-500 mt-1">智能模型深度分析</p>
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
              <p className="text-xs text-gray-500 mt-1">输出诊断结果</p>
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

        {/* 诊断结果 */}
        {diagnosisResult && (
          <div className="bg-gradient-to-br from-gray-900/90 via-blue-900/50 to-gray-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-cyan-300">诊断结果</h2>
              <button
                onClick={downloadReport}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>下载报告</span>
              </button>
            </div>

            <div className="bg-black/30 rounded-lg p-6 border border-cyan-500/20">
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {diagnosisResult}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}