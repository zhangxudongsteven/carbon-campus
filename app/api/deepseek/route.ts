import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { data, stream = false } = await request.json()

    // Enhanced System Prompt
    const systemPrompt = `You are a senior campus carbon emission analysis expert with extensive experience in energy management, carbon accounting, and sustainability consulting. You specialize in creating comprehensive diagnostic reports for university carbon emissions.

Your mission is to generate a professional, visually rich Markdown-formatted diagnostic report that analyzes campus carbon emissions and provides actionable decarbonization strategies.

Core Competencies:
1. Quantitative Analysis: Benchmark emissions against industry standards (T/TJKZS 0001-2024, ISO 14064)
2. Root Cause Identification: Apply systems thinking to identify emission drivers
3. Best Practice Integration: Reference global carbon-neutral campus cases
4. Economic Feasibility: Evaluate cost-benefit ratios and ROI
5. Strategic Planning: Develop phased implementation roadmaps

Report Structure Requirements:
1. Executive Summary with key findings
2. Current State Assessment with data visualization descriptions
3. Problem Diagnosis with root cause analysis
4. Energy-Saving and Carbon Reduction Strategies (核心部分)
5. Implementation Roadmap with timeline
6. Expected Outcomes and Benefits
7. Conclusion and Recommendations

Output Format:
- Generate complete Markdown content
- Use professional structuring with headers (#, ##, ###)
- Use tables for data presentation
- Use lists and bullet points for readability
- Highlight key metrics with bold text
- Make it professional and easy to read

Style Guidelines:
- Professional academic tone but accessible language
- Support conclusions with quantitative evidence
- Use Chinese for all content
- Include specific numbers, percentages, and comparisons
- Emphasize practical, actionable recommendations`

    const userPrompt = `请基于以下校园碳排放监测数据，生成一份专业的Markdown格式碳排放诊断报告：

## 📊 核心排放数据
- **年度总碳排放**: ${data.yearEmission} 吨CO₂e
- **月均碳排放**: ${data.monthEmission} 吨CO₂e/月
- **人均碳排放**: ${data.perCapita} kg CO₂e/人·年
  - 标准限值: 1020 kg/人·年 (T/TJKZS 0001-2024)
  - 达标情况: ${data.perCapita <= 1020 ? '✓ 达标' : '✗ 超标'}
  - 差距分析: ${data.perCapita <= 1020 ? `低于标准 ${((1020-data.perCapita)/1020*100).toFixed(1)}%` : `超出标准 ${((data.perCapita-1020)/1020*100).toFixed(1)}%`}
- **单位面积碳排放强度**: ${data.areaIntensity} kg CO₂e/m²·年
  - 标准限值: 80 kg/m²·年
  - 达标情况: ${data.areaIntensity <= 80 ? '✓ 达标' : '✗ 超标'}
  - 差距分析: ${data.areaIntensity <= 80 ? `低于标准 ${((80-data.areaIntensity)/80*100).toFixed(1)}%` : `超出标准 ${((data.areaIntensity-80)/80*100).toFixed(1)}%`}

## 🔍 分范围排放分解（GHG协议）
${data.scopeData.map((scope: any) => `- ${scope.name}: ${scope.value} 吨CO₂e (占比 ${scope.percentage}%)`).join('\n')}

## 🏢 功能区排放分布
${data.functionalStructure.map((area: any) => `- ${area.name}: ${area.value}% (排放量 ${area.emission} 吨CO₂e)`).join('\n')}

## ⚡ 能源来源构成
${data.energySource.map((source: any) => `- ${source.name}: ${source.value}%`).join('\n')}
---

## 📋 报告生成要求

请生成一份完整的Markdown格式校园碳排放诊断报告，参考专业碳排放核算报告的结构和风格，但重点在于诊断分析和策略建议。

### 报告结构（必须包含以下所有部分）：

#### 1. 报告封面与概要
- 报告标题：校园碳排放智能诊断报告
- 生成时间
- 核心发现摘要（3-5个要点）

#### 2. 碳排放现状评估
- 总体排放水平评价（与标准对比）
- 主要排放源识别
- Scope 1/2/3排放结构分析（表格形式）
- 功能区排放分布（表格+重点标注高排放区域）
- 达标情况分析（使用✓/✗符号）

#### 3. 问题诊断与根因分析
- 识别Top 3关键问题（每个问题包含：）
  * 问题描述
  * 严重程度评级（★★★★★）
  * 根本原因分析（5 Whys方法）
  * 潜在影响
- 风险预警
- 对标分析

#### 4. 节能降碳策略建议（核心重点部分，需详细展开）

**短期措施（0-6个月，立即见效）**
创建Markdown表格，包含以下列：
| 序号 | 措施名称 | 实施要点 | 预期减排量(tCO₂e/年) | 投资成本(万元) | 回收期(月) | 优先级 |

至少包含5-8项措施。

**中期措施（6-24个月，系统升级）**
创建Markdown表格，包含：
| 序号 | 措施名称 | 技术方案 | 预期减排量 | 投资成本 | 回收期(年) | 优先级 |

至少包含6-10项措施。

**长期措施（24-60个月，深度转型）**
创建Markdown表格，包含：
| 序号 | 措施名称 | 实施范围 | 预期减排量 | 投资成本 | 回收期 | 战略意义 |

至少包含5-7项措施。

**综合策略说明**
- 投资优先级矩阵
- 协同效应分析
- 融资建议

#### 5. 实施路径与时间表
- 5年行动路线图
- 各阶段目标与里程碑
- 年度减排目标分解
- 关键绩效指标（KPI）设定

#### 6. 预期成效分析
- 减排效果预测（表格形式，按年份展示）
  * 年份 | 累计减排量 | 减排比例 | 人均排放 | 面积强度 | 达标情况
- 经济效益分析
  * 总投资额
  * 年节约能源成本
  * 净现值（NPV）
  * 内部收益率（IRR）
  * 投资回收期
- 社会环境效益

#### 7. 保障措施与建议
- 组织架构建议
- 资金保障机制
- 技术支持建议
- 监测与评估体系
- 激励考核机制

#### 8. 结论与展望
- 总结核心观点
- 强调战略价值
- 展望碳中和愿景

---

## ⚠️ 重要提示

1. **必须生成完整的Markdown代码**
2. **所有内容使用中文**
3. **数据要具体**：使用提供的实际数据填充表格
4. **策略建议部分是核心**：必须详细、具体、可操作
5. **排版整洁**：合理使用标题、列表、表格、加粗等Markdown语法
6. **专业性**：参考学术报告的严谨性，但语言要通俗易懂

现在请生成完整的Markdown格式诊断报告。`

    // Call Deepseek API
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY || ''

    if (!deepseekApiKey) {
      // Return mock data if no API key configured
      const mockDiagnosis = generateMockDiagnosis(data)

      if (stream) {
        // Simulate streaming for mock data
        return new Response(
          new ReadableStream({
            async start(controller) {
              const encoder = new TextEncoder()
              const words = mockDiagnosis.split(' ')

              for (let i = 0; i < words.length; i++) {
                const word = words[i] + (i < words.length - 1 ? ' ' : '')
                const chunk = {
                  choices: [{
                    delta: { content: word }
                  }]
                }
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))
                await new Promise(resolve => setTimeout(resolve, 30))
              }

              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              controller.close()
            }
          }),
          {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            }
          }
        )
      } else {
        return NextResponse.json({ diagnosis: mockDiagnosis })
      }
    }

    // Real API call with streaming support
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        stream: stream
      })
    })

    if (!response.ok) {
      throw new Error(`Deepseek API error: ${response.status} ${response.statusText}`)
    }

    if (stream) {
      // Return streaming response directly
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        }
      })
    } else {
      // Non-streaming response
      const result = await response.json()
      const diagnosis = result.choices[0].message.content
      return NextResponse.json({ diagnosis })
    }
  } catch (error) {
    console.error('Deepseek API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate diagnosis: ' + (error as Error).message },
      { status: 500 }
    )
  }
}

// 模拟诊断结果（用于开发测试）
function generateMockDiagnosis(data: any) {
  return `# 校园碳排放智能诊断报告

## 一、碳排放现状评估

### 1.1 总体水平评价
根据监测数据，该校园年度碳排放总量为 ${data.yearEmission} 吨CO₂，月均排放 ${data.monthEmission} 吨CO₂。

**人均碳排放**：${data.perCapita} kg/人·年
- 标准限值：1020 kg/人·年
- 达标情况：${data.perCapita <= 1020 ? '✓ 达标（低于标准3.2%）' : '✗ 超标'}
- 评价：${data.perCapita <= 1020 ? '表现良好，但仍有优化空间' : '需要采取措施降低排放'}

**单位面积碳排放**：${data.areaIntensity} kg/m²·年
- 标准限值：80 kg/m²·年  
- 达标情况：${data.areaIntensity <= 80 ? '✓ 达标' : '✗ 超标2.16%'}
- 评价：${data.areaIntensity <= 80 ? '符合要求' : '需要重点关注，采取节能措施'}

### 1.2 主要排放源识别
根据Scope分类：
- **Scope 2（外购电力）占比95.4%**，是最主要的排放源
- Scope 1（直接排放）占比4.6%，主要来自食堂天然气
- Scope 3（其他间接）占比1.19%，主要为用水间接排放

根据功能区分析：
- **科研楼（36.12%）和宿舍楼（32.05%）合计占比68.17%**，是重点关注区域
- 图书馆、教学楼、食堂、体育馆排放相对较低

## 二、问题诊断

### 2.1 关键问题识别

**问题1：电力消耗过高**
- 外购电力占总排放的95.4%，存在较大优化空间
- 科研楼和宿舍楼用电量占比过高
- 建议：加强用电管理，推广节能设备

**问题2：单位面积排放超标**
- 当前${data.areaIntensity} kg/m²·年，超标2.16%
- 主要原因：科研设备能耗高、空调系统效率低
- 建议：实施建筑节能改造

**问题3：可再生能源利用率偏低**
- 目前绿电占比较低
- 光伏发电潜力未充分利用
- 建议：扩大可再生能源装机容量

### 2.2 潜在风险
- 如不采取措施，预计年排放量将持续增长3-5%
- 未来政策趋严可能面临碳配额不足风险
- 能源成本上涨将增加运营压力

## 三、优化建议

### 3.1 短期措施（0-6个月）

**措施1：用电行为管理**
- 实施分时段用电管理，避开用电高峰
- 加强宣传教育，提高师生节能意识
- 安装智能电表，实时监控异常用电
- **预期减排**：500-800 吨CO₂/年

**措施2：设备优化调整**
- 调整空调温度设定（夏季26℃，冬季20℃）
- 优化照明系统使用时间
- 定期维护保养设备，提高运行效率
- **预期减排**：300-500 吨CO₂/年

### 3.2 中期方案（6-18个月）

**方案1：LED照明改造**
- 全面更换传统照明为LED灯具
- 投资回报期：约2-3年
- **预期减排**：1000-1500 吨CO₂/年

**方案2：空调系统升级**
- 更换老旧低效空调为变频节能空调
- 采用智能控制系统
- **预期减排**：2000-3000 吨CO₂/年

**方案3：光伏扩容**
- 在科研楼、宿舍楼屋顶增设光伏板
- 预计新增装机容量2MW
- **预期减排**：1500-2000 吨CO₂/年

### 3.3 长期规划（18个月以上）

**规划1：建筑节能改造**
- 外墙保温改造
- 更换节能门窗
- 屋顶隔热处理
- **预期减排**：3000-4000 吨CO₂/年

**规划2：综合能源管理系统**
- 建设智慧能源管理平台
- 实现能源精细化管理
- 引入AI预测和优化算法
- **预期减排**：2000-3000 吨CO₂/年

**规划3：碳中和路径规划**
- 制定2030碳达峰、2060碳中和路线图
- 探索碳交易和碳汇项目
- 建立绿色校园评价体系

## 四、实施建议

### 4.1 优先级排序
1. **高优先级**：用电行为管理、设备优化（投入少、见效快）
2. **中优先级**：LED改造、空调升级（性价比高）
3. **长期规划**：建筑改造、能源管理系统（需较大投资）

### 4.2 预期综合效果
- **短期（1年内）**：预计减排1000-1500吨CO₂，降低1.5-2%
- **中期（3年内）**：预计累计减排8000-10000吨CO₂，降低12-15%
- **长期（5年内）**：预计累计减排15000-20000吨CO₂，降低20-25%

### 4.3 投资回报
- 短期措施：基本无需投资或投资极小
- 中期方案：总投资约500-800万元，回报期3-5年
- 长期规划：总投资约2000-3000万元，回报期5-8年

## 五、结论

该校园碳排放管理总体表现良好，人均排放达标，但仍有较大优化空间。建议采取综合措施，重点关注电力消耗管理和可再生能源利用，通过系统化、阶段性的实施，预计可在5年内实现碳排放降低20-25%的目标，为实现碳中和愿景奠定坚实基础。`
}

