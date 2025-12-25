# Campus Carbon Emission Intelligent Diagnosis System - Prompt Template (Optimized)

## System Prompt (Enhanced)

You are a senior campus carbon emission analysis expert with extensive experience in energy management, carbon accounting, and sustainability consulting. You hold certifications in ISO 14064 greenhouse gas accounting and have advised over 50 universities on carbon neutrality strategies.

Your mission is to conduct a comprehensive, data-driven diagnosis of campus carbon emissions and deliver actionable, cost-effective decarbonization recommendations.

### Core Competencies:
1. **Quantitative Analysis**: Benchmark emissions against industry standards (T/TJKZS 0001-2024, ISO 14064) with statistical rigor
2. **Root Cause Identification**: Apply systems thinking to identify primary emission drivers and underlying inefficiencies
3. **Best Practice Integration**: Reference global best practices from leading carbon-neutral campuses (UC Berkeley, ETH Zurich, Tsinghua University)
4. **Economic Feasibility**: Evaluate cost-benefit ratios, payback periods, and ROI for all recommendations
5. **Impact Quantification**: Provide precise emission reduction projections using established emission factors

### Analysis Methodology:
- **Data Validation**: Cross-check data consistency and identify anomalies
- **Comparative Benchmarking**: Compare with peer institutions and regulatory thresholds
- **Pareto Analysis**: Apply 80/20 rule to prioritize high-impact interventions
- **Lifecycle Thinking**: Consider embodied carbon and operational carbon holistically
- **Technology Readiness**: Recommend only proven, commercially available solutions

### Output Requirements:
- Use clear, professional language accessible to both technical and non-technical stakeholders
- Support all conclusions with quantitative evidence
- Provide implementation roadmaps with timelines and milestones
- Highlight quick wins and long-term strategic initiatives separately

---

## User Prompt Template (Optimized for Comprehensive Analysis)

Conduct a comprehensive intelligent diagnosis based on the following campus carbon emission data. Apply industry best practices, benchmarking analysis, and cost-benefit evaluation methodologies.

### 📊 Core Emission Metrics
- **Annual Total Carbon Emission**: {yearEmission} tons CO₂e
- **Monthly Average Emission**: {monthEmission} tons CO₂e/month
- **Per Capita Emission**: {perCapita} kg CO₂e/person·year
  - *Regulatory Benchmark*: 1020 kg/person·year (T/TJKZS 0001-2024 Hot Summer Cold Winter Region Standard)
  - *Compliance Status*: {perCapita <= 1020 ? '✓ Compliant' : '✗ Exceeds Limit'}
  - *Gap Analysis*: {perCapita <= 1020 ? `Below standard by ${((1020-perCapita)/1020*100).toFixed(1)}%` : `Exceeds standard by ${((perCapita-1020)/1020*100).toFixed(1)}%`}
- **Emission Intensity (Area-based)**: {areaIntensity} kg CO₂e/m²·year
  - *Regulatory Benchmark*: 80 kg/m²·year (National Building Energy Efficiency Standard)
  - *Compliance Status*: {areaIntensity <= 80 ? '✓ Compliant' : '✗ Exceeds Limit'}
  - *Gap Analysis*: {areaIntensity <= 80 ? `Below standard by ${((80-areaIntensity)/80*100).toFixed(1)}%` : `Exceeds standard by ${((areaIntensity-80)/80*100).toFixed(1)}%`}

### 🔍 Scope-Based Emission Breakdown (GHG Protocol Classification)
{scopeData}
*Analysis Focus: Identify decarbonization leverage points across direct and indirect emission sources*

### 🏢 Functional Area Emission Distribution
{functionalStructure}
*Analysis Focus: Pinpoint energy-intensive buildings for targeted efficiency interventions*

### ⚡ Energy Source Composition
{energySource}
*Analysis Focus: Evaluate fuel-switching opportunities and renewable integration potential*

---

## 🎯 Diagnosis Framework (Evidence-Based Approach)

### PART 1: Current State Assessment (20% of report)

#### 1.1 Regulatory Compliance Analysis
- Calculate exact compliance gaps using formula: `(Actual - Standard) / Standard × 100%`
- Assess alignment with China's carbon peak (2030) and carbon neutrality (2060) targets
- Benchmark against peer institutions (similar size, climate zone, research intensity)
- Identify critical non-compliance areas requiring immediate action

#### 1.2 Emission Source Hierarchy (Pareto Principle Application)
- Rank all emission sources by absolute contribution (tons CO₂e) and percentage
- Apply 80/20 analysis: Identify top 20% sources contributing to 80% of emissions
- Create emission hotspot map by:
  - **Temporal dimension**: Seasonal patterns, peak usage hours
  - **Spatial dimension**: Building zones, functional areas
  - **Activity dimension**: Equipment types, operational processes
- Highlight "quick wins" - high-emission, low-complexity reduction opportunities

#### 1.3 Structural Rationality Evaluation
- **Scope Distribution Analysis**:
  - Is Scope 2 dominance (typically >80%) due to grid dependency?
  - Can on-site renewable generation shift balance toward Scope 1?
  - What is the grid emission factor trend? (Grid decarbonization impact on future Scope 2)
- **Functional Area Balance**:
  - Are research buildings disproportionately energy-intensive relative to their value creation?
  - Efficiency vs. productivity trade-off analysis for labs and data centers
  - Identify underutilized spaces with high emissions (opportunity for consolidation)
- **Energy Mix Diversification**:
  - Single-source dependency creates price volatility and decarbonization bottlenecks
  - Evaluate potential for fuel switching (e.g., natural gas → electric heat pumps)
  - Assess renewable energy integration readiness (roof space, grid capacity, policy support)

#### 1.4 Best Practice Benchmarking
- Compare performance with leading carbon-neutral campuses:
  - **UC Berkeley**: 50% emission reduction by 2025 (relative to 2008 baseline)
  - **ETH Zurich**: Net-zero by 2030 via deep retrofits + renewable procurement
  - **Tsinghua University**: 200 MW solar PV + district cooling system
- Quantify performance gap: "Your campus is X% above/below peer average"
- Extract transferable lessons from best performers

---

### PART 2: Problem Diagnosis & Root Cause Analysis (30% of report)

#### 2.1 Critical Issue Identification (Top 3 Prioritized Problems)

**🔴 Issue #1: [Name the most critical problem, e.g., "Scope 2 Dominance - Grid Electricity Dependency"]**
- **Magnitude**: Quantify severity (e.g., "Scope 2 accounts for 95.4% of total emissions = 67,446 tCO₂e annually")
- **Root Cause Analysis (5 Whys Methodology)**:
  - Why is Scope 2 so high? → Limited on-site renewables
  - Why limited renewables? → Insufficient roof space utilization (<20% deployed)
  - Why underutilized? → Lack of upfront capital + unclear payback projections
  - Why unclear payback? → No comprehensive solar feasibility study
  - Why no study? → Energy planning not prioritized in capital allocation
- **Contributing Factors**:
  - Technical: Grid dependency, no energy storage, limited demand flexibility
  - Economic: High upfront cost of solar PV, uncertainty about electricity price trends
  - Institutional: Split incentives (central budget vs. departmental energy bills)
- **Impact**: Financial exposure to rising electricity prices, carbon compliance risk, reputational concerns

**🟠 Issue #2: [Second priority, e.g., "Per-Unit-Area Emission Exceeds Standard"]**
- **Magnitude**: "81.73 kg/m²·year vs. 80 kg/m²·year standard = 2.16% exceedance"
- **Root Cause Analysis**:
  - Why high intensity? → Inefficient HVAC systems in legacy buildings (research building + dormitory)
  - Why inefficient HVAC? → Equipment installed >15 years ago, no variable speed drives
  - Why not upgraded? → Capital budget prioritizes new construction over retrofits
  - Why? → Lack of lifecycle cost analysis demonstrating retrofit ROI
- **Contributing Factors**:
  - Building envelope deficiencies (poor insulation, single-pane windows in dormitories)
  - Oversized HVAC equipment running at partial load (low efficiency)
  - No automated controls (manual operation → setpoint drift)
- **Impact**: Higher operational costs, occupant comfort issues, difficulty achieving carbon neutrality

**🟡 Issue #3: [Third priority, e.g., "Minimal Renewable Energy Utilization"]**
- **Magnitude**: "Renewable energy share <5% (estimated from data), far below 50% best-practice target"
- **Root Cause Analysis**:
  - Why low renewables? → No power purchase agreements (PPAs), limited on-site generation
  - Why no PPAs? → Regulatory barriers for universities, lack of procurement expertise
  - Why limited on-site generation? → Solar PV deployment <1 MWp despite 5+ MWp rooftop potential
- **Barrier Analysis**:
  - **Technical**: Grid interconnection approval complexity, structural load capacity concerns
  - **Financial**: $3-4/Wp upfront cost perceived as prohibitive despite 5-7 year payback
  - **Policy**: Unclear feed-in tariff policies, net metering limitations
- **Opportunity Cost**: Missing out on $200k+/year potential energy cost savings + emission reductions

#### 2.2 Risk Forecasting (Business-as-Usual Scenario)

**📈 Emission Growth Trajectory**
- **Baseline Projection (No Intervention)**:
  - Historical growth rate analysis: {Calculate from yearly data if available}
  - Projected 2030 emissions: {Current} × (1 + growth rate)^years
  - Gap to carbon peak target: {Projected 2030} - {Target level}

**⚠️ Regulatory Risks**
- **Carbon Pricing**: Potential cost exposure if China's ETS expands to public institutions ($10-30/tCO₂e)
- **Mandatory Quotas**: Risk of non-compliance penalties under tightening provincial caps
- **Disclosure Requirements**: Emerging mandates for ESG reporting, carbon footprint disclosure

**💰 Financial Risks**
- **Energy Cost Escalation**: Electricity prices rising 3-5%/year → $XX million additional cost by 2030
- **Stranded Asset Risk**: Fossil fuel infrastructure (gas boilers) may face early retirement mandates
- **Capital Allocation Inefficiency**: Delaying investments increases total lifecycle costs

**🌍 Reputational Risks**
- **Student/Faculty Pressure**: Campus sustainability movements gaining momentum globally
- **University Rankings**: QS, Times Higher Education now weight sustainability (up to 5% of score)
- **Recruitment Disadvantage**: Top talent (students, faculty) increasingly factor environmental commitment

#### 2.3 Opportunity Identification

**🚀 Technology Opportunities**
- **Mature Technologies (TRL 8-9)**: LED lighting (60-70% savings), VFD HVAC (20-30% savings), solar PV (proven ROI)
- **Emerging Solutions (TRL 6-7)**: AI-based energy management (10-20% optimization), thermal energy storage, electrochromic windows
- **Future Watch (TRL 4-5)**: Green hydrogen for heating, carbon capture for labs, vehicle-to-grid integration

**💡 Policy Incentives**
- Identify available grants, subsidies, tax credits for renewable energy and efficiency projects
- Example: China's 30% solar subsidy program, Green Building certification incentives

**🎁 Co-Benefits (Beyond Emission Reduction)**
- **Health**: Improved indoor air quality (IAQ) from better ventilation → reduced sick days
- **Educational Value**: Campus as "living laboratory" for sustainability research and teaching
- **Cost Savings**: Energy efficiency measures pay for themselves through operational savings
- **Resilience**: On-site generation + storage improves energy security during grid outages

---

### PART 3: Strategic Decarbonization Roadmap (40% of report)

**🎯 Roadmap Design Principles**:
1. **Load Reduction First**: Reduce energy demand via efficiency before adding renewable supply (right-sizing optimization)
2. **Quick Wins for Momentum**: Start with high-ROI, low-complexity measures to build stakeholder buy-in
3. **Phased Investment**: Match capital deployment to cash flow and financing availability
4. **Technology Risk Management**: Prioritize proven solutions; pilot innovations at small scale
5. **Stakeholder Engagement**: Ensure occupant participation through behavioral programs and feedback mechanisms

---

#### PHASE 1: Quick Wins & Behavioral Measures (0-6 months, <$50k investment)

| # | Measure | Implementation Details | Annual Reduction (tCO₂e) | Investment ($) | Annual Savings ($) | Payback (months) | Priority |
|---|---------|----------------------|-------------------------|----------------|-------------------|------------------|----------|
| 1 | **HVAC Setpoint Optimization** | Enforce summer 26°C / winter 20°C via BAS reprogramming | 400-600 | 5,000 | 50,000 | 1 month | ★★★★★ |
| 2 | **Lighting Schedule Adjustment** | Reduce operating hours in low-occupancy zones (10pm-6am) | 200-350 | 2,000 | 30,000 | <1 month | ★★★★★ |
| 3 | **Behavioral Change Campaign** | Energy-saving awareness programs, dorm competitions, signage | 300-500 | 10,000 | 40,000 | 3 months | ★★★★☆ |
| 4 | **Equipment Maintenance Blitz** | HVAC filter cleaning, refrigerant leak repair, duct sealing | 150-250 | 15,000 | 20,000 | 9 months | ★★★☆☆ |
| 5 | **Plug Load Management** | Install timers on vending machines, water coolers; enable PC power management | 100-200 | 8,000 | 15,000 | 6 months | ★★★☆☆ |

**Phase 1 Totals**: 1,150-1,900 tCO₂e/year (~2.5% reduction) | $40k investment | $155k/year savings | **Payback: 3 months**

**Key Success Factors**: Visible leadership endorsement, gamification for student engagement, real-time energy dashboards

---

#### PHASE 2: Medium-Term Capital Upgrades (6-24 months, $500k-$2M investment)

| # | Measure | Technical Specifications | Annual Reduction (tCO₂e) | Investment ($) | Annual Savings ($) | Payback (years) | Priority |
|---|---------|------------------------|-------------------------|----------------|-------------------|-----------------|----------|
| 1 | **Comprehensive LED Retrofit** | Replace 20,000 fixtures campus-wide (T8 → LED, 100→150 lm/W) | 1,200-1,800 | 400,000 | 180,000 | 2.2 years | ★★★★★ |
| 2 | **Variable Frequency Drives (VFDs)** | Install VFDs on 50 air handling units + 20 pumps | 800-1,200 | 250,000 | 120,000 | 2.1 years | ★★★★☆ |
| 3 | **Rooftop Solar PV (Phase 1)** | Deploy 1.5 MWp on research building + library (~9,000 m² roof area) | 1,500-2,000 | 1,200,000 | 220,000 | 5.5 years* | ★★★★☆ |
| 4 | **Smart Building Management System** | IoT sensors + AI-based optimization platform (10 buildings) | 600-900 | 300,000 | 100,000 | 3.0 years | ★★★☆☆ |
| 5 | **Window Film & Weatherization** | Apply low-E film to 50,000 m² windows + door sealing in dormitories | 300-500 | 150,000 | 50,000 | 3.0 years | ★★★☆☆ |
| 6 | **High-Efficiency Chillers** | Replace two 30-year-old centrifugal chillers with VFD models | 500-700 | 600,000 | 90,000 | 6.7 years | ★★★☆☆ |

**Phase 2 Totals**: 4,900-7,100 tCO₂e/year (~10% reduction) | $2.9M investment | $760k/year savings | **Payback: 3.8 years**

*Note: Solar payback improves to 3-4 years with available subsidies (30% capital grant + accelerated depreciation)

**Financing Options**: Energy Savings Performance Contract (ESPC), utility on-bill financing, green bond issuance, alumni-funded revolving loan fund

---

#### PHASE 3: Long-Term Deep Decarbonization (24-60 months, $5M-$15M investment)

| # | Measure | Project Scope | Annual Reduction (tCO₂e) | Investment ($) | Annual Savings ($) | Payback (years) | Priority |
|---|---------|--------------|-------------------------|----------------|-------------------|-----------------|----------|
| 1 | **Deep Building Envelope Retrofits** | Insulation upgrade (walls, roofs), triple-pane windows in 3 priority buildings (50,000 m²) | 3,000-4,500 | 3,500,000 | 400,000 | 8.8 years | ★★★★☆ |
| 2 | **Electrification via Heat Pumps** | Replace gas boilers with air-source/ground-source heat pumps (5 MW capacity) | 2,500-3,500 | 4,000,000 | 350,000 | 11.4 years | ★★★☆☆ |
| 3 | **Solar PV Expansion (Phase 2)** | Additional 3 MWp deployment + 2 MWh battery storage (dormitory, teaching buildings) | 3,000-4,000 | 3,500,000 | 480,000 | 7.3 years | ★★★★☆ |
| 4 | **District Energy System** | Centralized chilled water plant + thermal energy storage (ice/water tanks) | 2,000-3,000 | 6,000,000 | 400,000 | 15 years | ★★★☆☆ |
| 5 | **Green Power Procurement** | 20-year PPA for off-site wind/solar (20% of annual consumption) | 10,000-13,000 | 50,000/year (premium) | 0 (cost-neutral with REC sales) | N/A | ★★★★☆ |
| 6 | **Carbon Offset Projects** | Afforestation (500 hectares), verified emission reductions (interim solution until deep cuts achieved) | 5,000-7,000 | 100,000/year | 0 | N/A | ★★☆☆☆ |

**Phase 3 Totals**: 25,500-35,000 tCO₂e/year (~50% reduction cumulative with Phases 1-2) | $17M investment + $150k/year recurring | $1.63M/year savings | **Payback: 10.4 years**

**Strategic Note**: Phase 3 measures position campus for carbon neutrality by 2050. Deep retrofits have long paybacks but are essential for legacy building stock. Prioritize buildings with highest energy use intensity (EUI) and upcoming major maintenance windows.

---

#### 🌟 Innovation & Transformation Initiatives (Beyond Carbon Reduction)

| Initiative | Description | Benefits | Investment | Timeline |
|------------|-------------|----------|------------|----------|
| **Living Laboratory Program** | Integrate campus energy systems into coursework (engineering, data science, policy) | Research output, student engagement, testbed for pilot technologies | $200k/year | Ongoing |
| **Green Revolving Fund** | Establish $5M fund: Efficiency project savings reinvested into next-generation projects | Self-sustaining financing mechanism, accelerated deployment | $5M seed | Year 2-5 |
| **Community Solar Partnership** | Collaborate with local government on off-campus solar farm (10 MWp) | Economies of scale, community goodwill, grid benefits | $1M participation | Year 3-5 |
| **Zero-Carbon New Construction** | All new buildings meet net-zero energy standard (Passive House / LEED Platinum) | Avoid locking in future emissions, showcase leadership | Marginal cost 5-10% | Policy adoption Year 1 |

---

### PART 4: Expected Outcomes & Implementation Strategy (10% of report)

#### 4.1 Quantified Impact Projection (5-Year Horizon)

| Timeline | Cumulative Reduction (tCO₂e/year) | % Reduction vs. Baseline | Per Capita (kg/person·year) | Area Intensity (kg/m²·year) | Compliance Status |
|----------|-----------------------------------|--------------------------|----------------------------|----------------------------|-------------------|
| **Baseline (Year 0)** | 0 | 0% | 987 | 81.73 | ⚠️ Per-area exceeds |
| **Year 1 (Phase 1)** | 1,150-1,900 | 2.5% | 970-980 | 80.2-80.8 | ⚠️ Borderline |
| **Year 2 (Phase 1+2 partial)** | 3,500-5,000 | 7% | 940-960 | 77-79 | ✅ Compliant |
| **Year 3 (Phase 2 complete)** | 6,050-9,000 | 12% | 900-930 | 73-76 | ✅ Strong compliance |
| **Year 5 (Phase 3 partial)** | 15,000-22,000 | 28% | 780-850 | 60-68 | ✅ Exceeds standards |

**Long-Term Trajectory**: On path to 80% reduction by 2040, carbon neutrality by 2050 (aligned with national goals)

---

#### 4.2 Financial Analysis (Net Present Value Framework)

**5-Year Financial Summary**:
- **Total Capital Investment**: $19.9M (Phases 1-3 combined)
- **Cumulative Energy Cost Savings**: $12.8M (Year 1-5, assuming $0.12/kWh electricity, $0.8/m³ gas, 3%/year escalation)
- **Net Present Value (NPV)**: $4.2M (at 5% discount rate, 15-year analysis period)
- **Internal Rate of Return (IRR)**: 9.3%
- **Carbon Abatement Cost**: $42/tCO₂e (below social cost of carbon ~$51/tCO₂e per recent estimates)
- **Payback Period (Portfolio Average)**: 6.2 years

**Sensitivity Analysis**:
- If electricity prices rise 5%/year (vs. 3% base case): NPV increases to $6.8M, IRR → 11.2%
- If carbon pricing implemented at $20/tCO₂e: Additional $1.5M/year value creation
- If solar subsidies reduced 50%: Phase 2-3 payback extends by 1.5 years, still economically viable

**Non-Monetized Benefits** (conservative estimates):
- Improved indoor environmental quality → 5% productivity gain = $2M/year equivalent
- Enhanced reputation → Potential 2% increase in student applications = $500k/year tuition revenue
- Reduced maintenance costs from new equipment → $300k/year

**Conclusion**: The investment is economically attractive even under conservative assumptions, with substantial upside if energy prices or carbon regulations tighten.

---

#### 4.3 Risk Mitigation Strategy

| Risk Category | Specific Risks | Mitigation Measures | Residual Risk |
|---------------|---------------|---------------------|---------------|
| **Technical** | Solar PV underperformance, heat pump efficiency in cold climate | Conduct detailed feasibility studies, performance guarantees in contracts, phased pilots | Low |
| **Financial** | Cost overruns, interest rate increases, insufficient savings | Fixed-price contracts (ESPC), contingency buffers (15%), performance-based financing | Medium |
| **Organizational** | Resistance to change, lack of coordination across departments | Establish Energy Office with C-suite authority, tie sustainability KPIs to budgets, transparent M&V | Medium |
| **Regulatory** | Policy changes (subsidy removal, grid tariff restructuring) | Diversify project portfolio, lock in long-term PPAs, advocate for stable policy frameworks | Low-Medium |
| **External** | Supply chain disruptions, pandemic impacts | Multi-vendor sourcing, flexible timelines, modular implementation | Low |

**Adaptive Management Approach**: Review progress quarterly, adjust roadmap based on actual performance, incorporate new technologies as they mature

---

#### 4.4 Governance & Accountability Framework

**Organizational Structure**:
- **Year 1**: Establish Carbon Neutrality Task Force (CNTF) with president sponsorship
  - Appoint full-time Energy Manager (reporting to CFO)
  - Form cross-functional working groups: Operations, Academics, Students, Communications
- **Year 2**: Achieve ISO 50001 Energy Management System certification
  - Implement continuous monitoring & verification (M&V) per IPMVP protocol
  - Publish first annual sustainability report (GRI Standards)
- **Year 3**: Join international climate networks: Second Nature Climate Commitment, Carbon Neutral Universities Alliance
- **Year 5**: Integrate climate action into strategic plan, set science-based targets (SBTi)

**Key Performance Indicators (KPIs)**:
- **Monthly**: Total energy consumption (kWh, m³), Scope 1/2/3 emissions (tCO₂e), energy cost ($/month)
- **Quarterly**: Emission intensity (kg/m²), per capita emissions (kg/person), renewable energy percentage (%)
- **Annually**: Compliance with standards, project completion milestones, cost savings vs. baseline, stakeholder satisfaction

**Transparency & Reporting**:
- Public dashboard displaying real-time energy use and carbon emissions by building
- Annual town halls to present progress and solicit feedback
- Peer-reviewed publications on lessons learned (contribute to global knowledge base)

---

### 🎯 EXECUTIVE SUMMARY & PRIORITIZED RECOMMENDATIONS

**Situation**: Campus emissions are {perCapita <= 1020 && areaIntensity <= 80 ? 'largely compliant with current standards but have significant optimization potential' : 'exceeding regulatory benchmarks, requiring urgent intervention'}. Key challenges include {identify top 3 issues from diagnosis}.

**Strategic Vision**: Achieve {具体目标, e.g., "30% emission reduction by 2030, carbon neutrality by 2050"} through a phased, evidence-based decarbonization program that balances environmental impact, financial returns, and institutional priorities.

**Priority Action Matrix** (Eisenhower Framework):

| Quadrant | Measures | Rationale |
|----------|----------|-----------|
| **🔴 DO FIRST** (High Impact, Low Cost) | HVAC setpoint optimization, lighting schedules, behavioral campaigns | Immediate ROI, build momentum, minimal disruption |
| **🟠 SCHEDULE** (High Impact, High Cost) | LED retrofit, solar PV deployment, building envelope upgrades | Core of decarbonization strategy, requires financing and planning |
| **🟡 DELEGATE** (Low Impact, Low Cost) | Green procurement policies, awareness signage | Important for culture change, but not emission drivers |
| **🟢 ELIMINATE/DEFER** (Low Impact, High Cost) | Experimental technologies (TRL <6), over-engineered monitoring systems | Avoid premature adoption, focus resources on proven solutions |

**Critical Success Factors**:
1. ✅ **Leadership Commitment**: President/Board champion climate action as institutional priority
2. ✅ **Cross-Departmental Collaboration**: Break silos between Facilities, Finance, Academics, IT
3. ✅ **Data-Driven Culture**: Invest in metering, analytics, continuous M&V per IPMVP standards
4. ✅ **Stakeholder Engagement**: Students/faculty/staff as partners, not just subjects of policy
5. ✅ **Adaptive Management**: Regularly review roadmap, incorporate lessons learned and new technologies

**Innovation Opportunities**:
- 💡 **Living Laboratory**: Transform campus into research testbed for building decarbonization, grid integration
- 💡 **Curriculum Integration**: Embed sustainability across disciplines (engineering, policy, business, design)
- 💡 **Community Leadership**: Partner with city on district energy, shared solar, climate resilience planning
- 💡 **Thought Leadership**: Publish case studies, host conferences, influence national policy (e.g., green building codes)

**Final Message**: Decarbonization is not merely a compliance obligation or reputational imperative—it is a strategic investment in the institution's long-term financial health, operational resilience, and societal impact. The proposed roadmap is ambitious yet achievable, with strong economic returns and alignment with global climate goals. The time to act is now: every year of delay increases costs and foregoes benefits. With bold leadership and disciplined execution, this campus can become a model for higher education decarbonization worldwide.

---

**REPORT STRUCTURE OUTLINE**:
1. **Executive Summary** (1 page) - Vision, key findings, top 5 recommendations
2. **Current State Assessment** (2-3 pages) - Compliance analysis, benchmarking, structural evaluation
3. **Problem Diagnosis** (2-3 pages) - Top 3 issues with root cause analysis, risk forecast
4. **Decarbonization Roadmap** (4-5 pages) - Phase 1/2/3 measures with detailed tables, innovation initiatives
5. **Expected Outcomes** (2 pages) - Impact projections, financial analysis, risk mitigation
6. **Implementation Strategy** (1-2 pages) - Governance, KPIs, timeline
7. **Conclusion** (0.5 page) - Call to action, vision restatement

---

## RAG知识库参考（用于增强分析）

### 行业标准参考
- 《民用建筑能耗和碳排放指标建模及应用研究》
- T/TJKZS 0001-2024《夏热冬冷地区高校建筑碳排放核算标准》
- 《中国建筑能耗研究报告》
- ISO 14064 温室气体核算标准

### 关键指标参考值
- **高校人均碳排放限值**：1020 kgCO₂/人·年（夏热冬冷地区）
- **单位面积碳排放限值**：80 kgCO₂/m²·年
- **可再生能源利用率目标**：50%
- **绿电占比目标**：10-15%

### 常见节能措施及效果
1. **LED照明改造**：节能率60-70%，投资回报期2-3年
2. **变频空调**：节能率20-30%，投资回报期3-5年
3. **光伏发电**：减排效果显著，投资回报期5-8年
4. **建筑外墙保温**：节能率15-25%，投资回报期5-10年
5. **智能能源管理系统**：整体节能率10-20%

### 碳排放因子
- **电力**：0.5810 kgCO₂/kWh（华中电网）
- **天然气**：2.1622 kgCO₂/m³
- **汽油**：2.9251 kgCO₂/L
- **柴油**：3.0959 kgCO₂/L

---

## 输出格式要求

### 报告结构
1. **标题和摘要**
2. **碳排放现状评估**
   - 总体评价
   - 主要排放源
   - 结构分析
3. **问题诊断**
   - 关键问题
   - 原因分析
   - 风险预警
4. **优化建议**
   - 短期措施
   - 中期方案
   - 长期规划
5. **实施建议**
   - 优先级排序
   - 预期效果
   - 投资回报
6. **结论**

### 语言风格
- 专业但易懂
- 数据支撑结论
- 建议具体可行
- 重点内容加粗标注

---

## 使用说明

### API调用参数
```json
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "[系统提示词]"
    },
    {
      "role": "user", 
      "content": "[用户提示词 + 数据]"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 2000
}
```

### 环境变量配置
在 `.env.local` 文件中添加：
```
DEEPSEEK_API_KEY=your_api_key_here
```

### 注意事项
1. 确保输入数据的准确性和完整性
2. 根据实际情况调整 temperature 参数（0.7为推荐值）
3. 如需更详细的报告，可增加 max_tokens 限制
4. 建议定期更新知识库中的标准和参考数据

