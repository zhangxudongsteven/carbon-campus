// 全局变量
let currentSection = 'total-emission';
let charts = {};

// 建筑数据（从campus_buildings_with_carbon.json导入）
const buildingsData = {
    // 实验楼（科研楼）
    laboratory: [
        { name: "化学生院楼1", carbonEmission: 2850 },
        { name: "化学生院楼2", carbonEmission: 2680 },
        { name: "工科综合实验楼", carbonEmission: 2920 },
        { name: "大创园（立心楼）", carbonEmission: 1560 },
        { name: "大创园（立行楼）", carbonEmission: 1480 },
        { name: "大创园（立言楼）", carbonEmission: 1630 },
        { name: "大创园（立功楼）", carbonEmission: 1510 },
        { name: "大创园（立德楼）", carbonEmission: 1390 }
    ],
    // 宿舍楼
    dormitory: [
        { name: "智园7舍", carbonEmission: 1850 },
        { name: "智园6舍", carbonEmission: 1620 },
        { name: "智园5舍", carbonEmission: 1980 },
        { name: "智园4舍", carbonEmission: 1450 },
        { name: "智园3舍", carbonEmission: 1730 },
        { name: "智园2舍", carbonEmission: 1580 },
        { name: "智园1舍", carbonEmission: 1690 },
        { name: "学生公寓附2栋", carbonEmission: 1320 },
        { name: "南湖校区服务楼", carbonEmission: 1250 },
        { name: "智园8舍", carbonEmission: 1770 },
        { name: "智园11舍", carbonEmission: 1810 },
        { name: "智园10舍", carbonEmission: 1540 },
        { name: "智园9舍", carbonEmission: 1490 },
        { name: "慧园1舍", carbonEmission: 1630 },
        { name: "慧园2舍", carbonEmission: 1750 },
        { name: "慧园3舍", carbonEmission: 1510 },
        { name: "慧园4舍", carbonEmission: 1380 },
        { name: "慧园5舍", carbonEmission: 1420 },
        { name: "慧园6舍", carbonEmission: 1290 },
        { name: "越园1舍", carbonEmission: 1920 },
        { name: "越园2舍", carbonEmission: 2050 },
        { name: "越园3舍", carbonEmission: 1880 },
        { name: "越园4舍", carbonEmission: 1760 },
        { name: "越园5舍", carbonEmission: 1640 },
        { name: "越园6舍", carbonEmission: 1570 },
        { name: "越园7舍", carbonEmission: 1430 },
        { name: "卓园1舍", carbonEmission: 1360 },
        { name: "卓园2舍", carbonEmission: 1270 },
        { name: "卓园3舍", carbonEmission: 1190 },
        { name: "卓园4舍", carbonEmission: 1080 },
        { name: "卓园5舍", carbonEmission: 950 }
    ],
    // 教学楼
    teaching: [
        { name: "博学西楼", carbonEmission: 850 },
        { name: "博学主楼", carbonEmission: 980 },
        { name: "博学北楼", carbonEmission: 790 },
        { name: "博学东楼", carbonEmission: 920 },
        { name: "经管楼群（管理学院楼）", carbonEmission: 880 },
        { name: "理学院楼群（办公楼）", carbonEmission: 760 },
        { name: "理学院楼群（数学楼）", carbonEmission: 710 },
        { name: "理学院楼群（力学楼）", carbonEmission: 680 },
        { name: "理学院楼群（物理楼）", carbonEmission: 730 }
    ],
    // 图书馆
    library: [
        { name: "图书馆（心智楼）", carbonEmission: 1200 }
    ],
    // 食堂
    canteen: [
        { name: "智苑食堂", carbonEmission: 650 },
        { name: "越苑食堂", carbonEmission: 720 }
    ],
    // 体育馆
    gymnasium: [
        { name: "南湖校区南院体育场", carbonEmission: 480 },
        { name: "篮球场1", carbonEmission: 320 },
        { name: "篮球场2", carbonEmission: 290 },
        { name: "南湖体育场", carbonEmission: 580 },
        { name: "南湖体育馆", carbonEmission: 610 },
        { name: "南湖游泳馆", carbonEmission: 550 },
        { name: "文化大厦", carbonEmission: 420 }
    ]
};

// 模拟数据
const mockData = {
    yearlyEmission: {
        years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        values: [68320, 69543, 71456, 65432, 68975, 71423, 70698],
        growthRates: [1.8, 1.8, 2.7, -8.4, 5.4, 3.5, -1.02]
    },
    monthlyEmission: {
        months: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07'],
        values: [4285, 3285, 3915, 3654, 3421, 3897, 4123],
        growthRates: [-5.2, -23.3, 19.2, -6.7, -6.4, 13.9, 5.8]
    },
    carbonSink: {
        years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        values: [2100, 2180, 2250, 2300, 2380, 2410, 2453]
    },
    scopeEmission: [
        { 
            name: 'Scope 1 (直接排放)', 
            value: 3252, 
            percentage: 4.6,
            detail: {
                sources: [
                    { name: '天然气', value: 2800, percentage: 86.1 },
                    { name: '汽油', value: 320, percentage: 9.8 },
                    { name: '柴油', value: 132, percentage: 4.1 }
                ],
                yearOverYear: -2.1,
                description: '主要来源于食堂天然气炉灶和备用发电机'
            }
        },
        { 
            name: 'Scope 2 (间接排放-电力)', 
            value: 67446, 
            percentage: 95.4,
            detail: {
                sources: [
                    { name: '外购电力', value: 67446, percentage: 100 }
                ],
                yearOverYear: 0.4,
                description: '主要因科研设备用电量增加，占总排放量的95.4%'
            }
        },
        { 
            name: 'Scope 3 (其他间接)', 
            value: 841, 
            percentage: 1.19,
            detail: {
                sources: [
                    { name: '用水', value: 841, percentage: 100 }
                ],
                yearOverYear: -1.8,
                description: '主要为校园用水产生的间接排放'
            }
        }
    ],
    functionalStructure: [
        { name: '科研楼', value: 36.12, color: '#3B82F6', emission: 25543, area: 138000, equipment: '大型实验仪器' },
        { name: '宿舍楼', value: 32.05, color: '#8B5CF6', emission: 22678, area: 239000, equipment: '空调系统' },
        { name: '图书馆', value: 11.95, color: '#6366F1', emission: 8456, area: 95000, equipment: '照明系统' },
        { name: '教学楼', value: 9.67, color: '#10B981', emission: 6845, area: 88000, equipment: '多媒体设备' },
        { name: '食堂', value: 5.74, color: '#F59E0B', emission: 4067, area: 26000, equipment: '厨房设备' },
        { name: '体育馆', value: 4.47, color: '#EF4444', emission: 3167, area: 16000, equipment: '音响设备' }
    ],
    perCapitaEmission: {
        years: ['2018', '2019', '2020', '2021', '2022', '2023'],
        values: [1023, 1045, 987, 1012, 995, 987],
        standards: [1020, 1020, 1020, 1020, 1020, 1020],
        growthRates: [0, 2.1, -5.5, 2.5, -1.7, -0.8]
    },
    areaIntensity: {
        years: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        values: [40.62, 42.95, 47.57, 46.80, 47.53, 48.33, 54.06, 56.32, 61.59, 70.53, 44.40, 77.76, 82.58, 81.73],
        totalEmissions: [33312.15, 35645.39, 39960.87, 39631.57, 40402.72, 41323.11, 46495.82, 48544.69, 53152.50, 60940.18, 38363.36, 67259.11, 71428.99, 70697.83],
        buildingAreas: [82.0, 83.0, 84.0, 84.5, 85.0, 85.5, 86.0, 86.2, 86.3, 86.4, 86.4, 86.5, 86.5, 86.5],
        growthRates: [null, 5.74, 10.76, -1.62, 1.56, 1.68, 11.86, 4.18, 9.36, 14.52, -37.05, 75.14, 6.20, -1.03],
        standard: 80, // GB/T 51356-2022推荐限值
        reasons: [
            '基准年份',
            '校园建设扩张期',
            '新增科研设备投入使用',
            '节能措施初见成效',
            '设备更新换代',
            '能源管理制度完善',
            '大型实验设备集中采购',
            '科研活动增加',
            '研究生规模扩大',
            '科研项目大幅增长',
            '疫情导致师生离校，能源消耗下降',
            '疫情后复学，设备重启导致能耗激增',
            '科研设备新增20台，能耗上升',
            '节能改造措施见效，排放量下降'
        ]
    },
    seasonalDistribution: [
        { name: '春季', value: 20, color: '#86efac' },
        { name: '夏季', value: 30, color: '#fdba74' },
        { name: '秋季', value: 15, color: '#fbbf24' },
        { name: '冬季', value: 35, color: '#60a5fa' }
    ],
    monthlyDetailed: {
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        values: [10760, 8521, 6543, 5432, 7654, 8521, 9876, 8765, 6543, 5432, 7654, 10760],
        seasons: ['冬季', '冬季', '春季', '春季', '春季', '夏季', '夏季', '夏季', '秋季', '秋季', '秋季', '冬季']
    },
    renewableEnergy: {
        current: 35,
        target: 50,
        trend: [
            { year: '2021', value: 28 },
            { year: '2022', value: 32 },
            { year: '2023', value: 35 },
            { year: '2024Q1', value: 35 }
        ]
    },
    greenElectricity: {
        years: ['2021', '2022', '2023'],
        values: [2, 3.5, 5],
        target: 10
    },
    photovoltaic: {
        totalGeneration: 2450000,
        consumption: 2156000,
        percentage: 18,
        yearOverYear: 3
    },
    researchBuilding: {
        yearlyTrend: {
            years: ['2019', '2020', '2021', '2022', '2023'],
            values: [23456, 21876, 25678, 26843, 25543]
        },
        equipmentDistribution: [
            { name: '大型实验仪器', value: 45 },
            { name: '空调系统', value: 25 },
            { name: '照明系统', value: 15 },
            { name: '通风设备', value: 10 },
            { name: '其他设备', value: 5 }
        ]
    },
    faultData: {
        distribution: [
            { name: '科研楼', value: 35 },
            { name: '宿舍楼', value: 28 },
            { name: '教学楼', value: 20 },
            { name: '图书馆', value: 10 },
            { name: '食堂', value: 5 },
            { name: '体育馆', value: 2 }
        ],
        trend: {
            months: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'],
            values: [12, 8, 15, 18, 22, 25]
        }
    },
    energySourceStructure: [
        { name: '电力', value: 95.47, color: '#ef4444', trend: 1.42 },
        { name: '天然气', value: 3.20, color: '#f59e0b', trend: -0.85 },
        { name: '汽油', value: 0.08, color: '#3b82f6', trend: 0.02 },
        { name: '柴油', value: 0.06, color: '#6b7280', trend: -0.01 },
        { name: '用水', value: 1.19, color: '#22c55e', trend: 0.19 }
    ],
    dormitoryBuilding: {
        yearlyTrend: {
            years: ['2019', '2020', '2021', '2022', '2023'],
            values: [21456, 20876, 22678, 23843, 22678]
        },
        equipmentDistribution: [
            { name: '空调系统', value: 55 },
            { name: '照明系统', value: 20 },
            { name: '热水器', value: 15 },
            { name: '电梯', value: 7 },
            { name: '其他设备', value: 3 }
        ]
    },
    teachingBuilding: {
        yearlyTrend: {
            years: ['2019', '2020', '2021', '2022', '2023'],
            values: [6234, 5876, 6845, 7123, 6845]
        },
        equipmentDistribution: [
            { name: '多媒体设备', value: 35 },
            { name: '空调系统', value: 30 },
            { name: '照明系统', value: 25 },
            { name: '电梯', value: 8 },
            { name: '其他设备', value: 2 }
        ]
    },
    libraryBuilding: {
        yearlyTrend: {
            years: ['2019', '2020', '2021', '2022', '2023'],
            values: [7890, 7456, 8456, 8923, 8456]
        },
        equipmentDistribution: [
            { name: '照明系统', value: 45 },
            { name: '空调系统', value: 35 },
            { name: '电脑设备', value: 15 },
            { name: '电梯', value: 4 },
            { name: '其他设备', value: 1 }
        ]
    },
    canteenBuilding: {
        yearlyTrend: {
            years: ['2019', '2020', '2021', '2022', '2023'],
            values: [3890, 3756, 4067, 4323, 4067]
        },
        equipmentDistribution: [
            { name: '厨房设备', value: 60 },
            { name: '空调系统', value: 25 },
            { name: '照明系统', value: 10 },
            { name: '冷藏设备', value: 4 },
            { name: '其他设备', value: 1 }
        ]
    },
    gymnasiumBuilding: {
        yearlyTrend: {
            years: ['2019', '2020', '2021', '2022', '2023'],
            values: [2890, 2756, 3167, 3423, 3167]
        },
        equipmentDistribution: [
            { name: '照明系统', value: 40 },
            { name: '空调系统', value: 35 },
            { name: '音响设备', value: 20 },
            { name: '其他设备', value: 5 }
        ]
    },

    // 科研楼详细功能区数据
    researchBuildingData: {
        // 基本信息
        basic: {
            totalEmission2023: 25543, // 吨
            campusPercentage: 36.12, // %
            growthRate2023: -4.8, // %
            areaIntensity: 75.2, // kgCO₂/m²·年
            perCapitaEmission: 212.9, // kgCO₂/人·年
            staffCount: 1200, // 师生总数
            buildingArea: 339600, // m² (A栋12200 + B栋12300 + C栋12600)
            fundingEfficiency: 0.8 // 吨CO₂/万元
        },

        // 年度排放数据 (2017-2023)
        yearlyEmission: {
            years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            values: [20800, 22100, 23456, 21876, 25678, 26843, 25543],
            growthRates: [null, 6.3, 6.1, -6.7, 17.4, 4.5, -4.8]
        },

        // 月度排放数据 (2024年1-7月)
        monthlyEmission: {
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            values: [2100, 1800, 2000, 1950, 2300, 2450, 2200],
            growthRates: [null, -14.3, 11.1, -2.5, 17.9, 6.5, -10.2]
        },

        // 日排放数据 (近7日)
        dailyEmission: {
            dates: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日', '8月7日'],
            values: [72, 68, 75, 70, 65, 73, 69],
            average: 70.3,
            peakHours: [
                { date: '8月1日', time: '14:00-18:00', percentage: 32, reason: '大型实验仪器运行' },
                { date: '8月2日', time: '15:00-17:00', percentage: 28, reason: '材料测试设备运行' },
                { date: '8月3日', time: '14:00-18:00', percentage: 35, reason: '大型实验仪器运行' },
                { date: '8月4日', time: '13:00-17:00', percentage: 30, reason: '化学分析设备运行' },
                { date: '8月5日', time: '14:00-16:00', percentage: 25, reason: '物理测量设备运行' },
                { date: '8月6日', time: '15:00-18:00', percentage: 33, reason: '综合实验设备运行' },
                { date: '8月7日', time: '14:00-17:00', percentage: 29, reason: '精密仪器校准' }
            ]
        },

        // 楼栋数据
        buildingData: {
            total: {
                A: { emission: 9200, percentage: 36.0, area: 12200, intensity: 75.2, function: 'A栋：材料实验室为主，含12台大型高温炉' },
                B: { emission: 8500, percentage: 33.3, area: 12300, intensity: 68.9, function: 'B栋：化学实验室为主，含15台分析仪器' },
                C: { emission: 7843, percentage: 30.7, area: 12600, intensity: 62.1, function: 'C栋：物理实验室为主，含8台精密测量设备' }
            },
            monthly2024: {
                A: 820, B: 760, C: 710
            }
        },

        // 人均排放数据 (2019-2023)
        perCapitaData: {
            years: ['2019', '2020', '2021', '2022', '2023'],
            values: [195.4, 182.3, 213.9, 223.7, 212.9],
            standard: 1020, // 夏热冬冷地区高校人均限值
            staffBreakdown: { teachers: 180, graduates: 1020 }
        },

        // 单位面积排放数据 (2010-2023)
        areaIntensityData: {
            years: ['2010', '2015', '2020', '2023'],
            values: [65, 70, 62, 75.2],
            campusAverage: 81.73,
            reason2023: '2023年新增5台大型实验设备，导致单位面积排放上升'
        },

        // 能源结构数据
        energyStructure: {
            // 一次能源占比
            primaryEnergy: [
                { name: '电力', value: 96.2, emission: 24572, color: '#ef4444' },
                { name: '天然气', value: 2.8, emission: 715, color: '#f59e0b' },
                { name: '柴油', value: 0.6, emission: 153, color: '#6b7280' },
                { name: '其他', value: 0.4, emission: 102, color: '#9ca3af' }
            ],
            // 电力用途细分
            electricityUsage: [
                { name: '实验设备', value: 58, emission: 14252, color: '#dc2626' },
                { name: '空调系统', value: 22, emission: 5406, color: '#ef4444' },
                { name: '照明', value: 10, emission: 2457, color: '#f87171' },
                { name: '通风设备', value: 7, emission: 1720, color: '#fca5a5' },
                { name: '其他', value: 3, emission: 737, color: '#fecaca' }
            ],
            // 月度趋势数据（用于点击扇区显示）
            monthlyTrends: {
                '电力': [2050, 1980, 2100, 2200, 2150, 2180, 2050, 2100, 2180, 2250, 2200, 2150],
                '天然气': [85, 95, 75, 55, 45, 35, 30, 35, 45, 65, 80, 90],
                '柴油': [15, 12, 13, 12, 11, 10, 12, 13, 14, 15, 16, 14],
                '其他': [10, 8, 9, 8, 7, 8, 9, 10, 9, 8, 9, 10]
            }
        },

        // 时段结构数据
        timeStructure: {
            // 时段划分
            timeSlots: [
                { name: '00:00-08:00', percentage: 5, color: '#22c55e' },
                { name: '08:00-12:00', percentage: 25, color: '#3b82f6' },
                { name: '12:00-14:00', percentage: 10, color: '#f59e0b' },
                { name: '14:00-18:00', percentage: 45, color: '#ef4444' },
                { name: '18:00-24:00', percentage: 15, color: '#8b5cf6' }
            ],
            // 设备类型细分（按时段）
            deviceBreakdown: {
                '00:00-08:00': [
                    { name: '实验仪器', value: 60 },
                    { name: '空调', value: 20 },
                    { name: '照明', value: 10 },
                    { name: '其他', value: 10 }
                ],
                '08:00-12:00': [
                    { name: '实验仪器', value: 50 },
                    { name: '空调', value: 25 },
                    { name: '照明', value: 15 },
                    { name: '其他', value: 10 }
                ],
                '12:00-14:00': [
                    { name: '实验仪器', value: 40 },
                    { name: '空调', value: 35 },
                    { name: '照明', value: 15 },
                    { name: '其他', value: 10 }
                ],
                '14:00-18:00': [
                    { name: '实验仪器', value: 45 },
                    { name: '空调', value: 30 },
                    { name: '照明', value: 15 },
                    { name: '其他', value: 10 }
                ],
                '18:00-24:00': [
                    { name: '实验仪器', value: 55 },
                    { name: '空调', value: 20 },
                    { name: '照明', value: 15 },
                    { name: '其他', value: 10 }
                ]
            },
            // 一周热力图数据
            heatmapData: [
                // 周一到周日，每天5个时段的排放强度
                [3, 20, 8, 35, 12], // 周一
                [3, 22, 9, 38, 13], // 周二
                [3, 24, 10, 40, 14], // 周三
                [3, 25, 11, 42, 15], // 周四
                [3, 23, 10, 39, 13], // 周五
                [2, 15, 7, 28, 10], // 周六
                [2, 12, 6, 25, 8]   // 周日
            ]
        },

        // 科研经费效率数据
        fundingEfficiency: {
            // 趋势数据 (2019-2023)
            trend: {
                years: ['2019', '2020', '2021', '2022', '2023'],
                values: [1.0, 0.9, 0.85, 0.82, 0.8],
                targetLine: 0.7 // 2025年目标
            },
            // 横向对比数据
            comparison: [
                { name: '科研楼', value: 0.8, color: '#22c55e' },
                { name: '化工学院', value: 1.1, color: '#ef4444' },
                { name: '材料学院', value: 0.9, color: '#f59e0b' },
                { name: '自动化学院', value: 0.75, color: '#3b82f6' }
            ],
            // 经费来源细分
            fundingSource: {
                vertical: { name: '纵向项目（国家基金）', value: 0.75 },
                horizontal: { name: '横向项目（企业合作）', value: 0.88 }
            },
            // 年度优化措施
            optimizationMeasures: {
                '2019': '基础设备更新，引入节能型实验设备',
                '2020': '疫情期间优化实验流程，减少设备空转',
                '2021': '引入12台一级能效离心机，单台年节电5200kWh',
                '2022': '推广智能断电系统，实现设备自动休眠',
                '2023': '3台老旧设备淘汰，节能型实验方案推广'
            },
            // 基础数据
            basic: {
                totalFunding2023: 32000, // 万元
                totalEmission2023: 25543, // 吨
                efficiency2023: 0.8, // 吨CO₂/万元
                growthRate2023: -2.4, // %
                benchmarkComparison: 15.8 // 高于985高校平均水平的百分比
            }
        }
    }
};

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initVantaBackground();
    initSidebar();
    initCharts();
    updateLastUpdateTime();
    
    // 默认显示综合碳排放量
    showSection('total-emission');
});

// 初始化Vanta.js背景动画
function initVantaBackground() {
    VANTA.BIRDS({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xffffff,
        color1: 0x22c55e,
        color2: 0x3b82f6,
        colorMode: "lerp",
        birdSize: 1.2,
        wingSpan: 25.00,
        speedLimit: 3.00,
        separation: 35.00,
        alignment: 25.00,
        cohesion: 15.00,
        quantity: 3.00
    });
}

// 初始化侧边栏交互
function initSidebar() {
    // 可折叠菜单
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const content = document.getElementById(target);
            const icon = this.querySelector('i');

            if (content.classList.contains('expanded')) {
                content.classList.remove('expanded');
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('expanded');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 菜单项点击事件
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const section = this.getAttribute('data-section');

            // 如果是指标分类（总量类、强度类、结构类、效率类），不切换页面，只展开/折叠
            const isIndicatorCategory = section && (
                section.endsWith('-total-indicators') ||
                section.endsWith('-intensity-indicators') ||
                section.endsWith('-structure-indicators') ||
                section.endsWith('-efficiency-indicators')
            );

            if (section && !isIndicatorCategory) {
                showSection(section);

                // 更新活动状态
                sidebarItems.forEach(si => si.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 初始化科研楼导航交互
    initResearchBuildingNavigation();
}

// 初始化科研楼导航交互
function initResearchBuildingNavigation() {
    // 功能区列表
    const buildings = ['research', 'dormitory', 'teaching', 'library', 'canteen', 'gymnasium'];
    const indicators = ['total', 'intensity', 'structure', 'efficiency'];

    // 科研楼多级折叠功能
    document.addEventListener('click', function(e) {
        // 处理各功能区主标签的折叠
        buildings.forEach(building => {
            const selector = building === 'research' ?
                `.sidebar-item.collapsible[data-section="${building}-building"]` :
                `.sidebar-item.collapsible[data-section="${building}-building"]`;

            if (e.target.closest(selector)) {
                const subItems = document.getElementById(`${building}-building-sub`);
                const chevron = document.getElementById(`${building}-chevron`);

                if (subItems && chevron) {
                    if (subItems.classList.contains('hidden')) {
                        subItems.classList.remove('hidden');
                        chevron.style.transform = 'rotate(180deg)';
                    } else {
                        subItems.classList.add('hidden');
                        chevron.style.transform = 'rotate(0deg)';
                    }
                }

                e.stopPropagation();
                return;
            }
        });

        // 处理各功能区的指标类别折叠
        buildings.forEach(building => {
            indicators.forEach(indicator => {
                if (e.target.closest(`.sidebar-item.collapsible[data-section="${building}-${indicator}-indicators"]`)) {
                    toggleSubCategory(`${building}-${indicator}-indicators-sub`, `${building}-${indicator}-chevron`);
                    e.stopPropagation();
                    return;
                }
            });
        });
    });
}

// 切换子类别显示/隐藏
function toggleSubCategory(subItemsId, chevronId) {
    const subItems = document.getElementById(subItemsId);
    const chevron = document.getElementById(chevronId);

    if (subItems && chevron) {
        if (subItems.classList.contains('hidden')) {
            subItems.classList.remove('hidden');
            chevron.style.transform = 'rotate(180deg)';
        } else {
            subItems.classList.add('hidden');
            chevron.style.transform = 'rotate(0deg)';
        }
    }
}









// 初始化科研楼面板图表
function initResearchPanelCharts(panelId) {
    // 延迟初始化，确保DOM元素已经可见
    setTimeout(() => {
        switch(panelId) {
            case 'research-emission-monitoring':
                initResearchEmissionCharts();
                break;
            case 'research-building-emission':
                initResearchBuildingEmissionNew();
                break;
            case 'research-per-capita':
                initResearchPerCapitaChart();
                break;
            case 'research-area-intensity':
                initResearchAreaIntensityChart();
                break;
            case 'research-energy-structure':
                initResearchEnergyStructureChart();
                break;
            case 'research-time-structure':
                initResearchTimeStructureChart();
                break;
            case 'research-funding-efficiency':
                initResearchFundingEfficiencyChart();
                break;
        }
    }, 100);
}

// 初始化科研楼排放监测图表
function initResearchEmissionCharts() {
    // 年度排放趋势图
    const yearlyChart = initChartIfNeeded('researchYearly', 'research-yearly-emission-chart');
    if (yearlyChart) {
        const yearlyOption = {
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    const dataIndex = params[0].dataIndex;
                    const year = params[0].name;
                    const value = params[0].value;
                    const growthRate = mockData.researchBuildingData.yearlyEmission.growthRates[dataIndex];

                    let result = `<div style="padding: 8px;">`;
                    result += `<div style="font-weight: bold; margin-bottom: 4px;">${year}年科研楼碳排放</div>`;
                    result += `<div>排放量: <span style="color: #3b82f6; font-weight: bold;">${value.toLocaleString()} 吨</span></div>`;
                    if (growthRate !== null) {
                        result += `<div>同比增长: <span style="color: ${growthRate > 0 ? '#ef4444' : '#22c55e'};">${growthRate > 0 ? '+' : ''}${growthRate}%</span></div>`;
                    }
                    result += `</div>`;
                    return result;
                }
            },
            xAxis: {
                type: 'category',
                data: mockData.researchBuildingData.yearlyEmission.years
            },
            yAxis: {
                type: 'value',
                name: '排放量 (吨)'
            },
            series: [{
                name: '年度排放量',
                type: 'bar',
                data: mockData.researchBuildingData.yearlyEmission.values,
                itemStyle: { color: '#3b82f6' },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    fontSize: 10
                }
            }]
        };
        yearlyChart.setOption(yearlyOption);
    }

    // 月度排放趋势图
    const monthlyChart = initChartIfNeeded('researchMonthly', 'research-monthly-emission-chart');
    if (monthlyChart) {
        const monthlyOption = {
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    const dataIndex = params[0].dataIndex;
                    const month = params[0].name;
                    const value = params[0].value;
                    const growthRate = mockData.researchBuildingData.monthlyEmission.growthRates[dataIndex];

                    let result = `<div style="padding: 8px;">`;
                    result += `<div style="font-weight: bold; margin-bottom: 4px;">2024年${month}科研楼碳排放</div>`;
                    result += `<div>排放量: <span style="color: #8b5cf6; font-weight: bold;">${value.toLocaleString()} 吨</span></div>`;
                    if (growthRate !== null) {
                        result += `<div>环比增长: <span style="color: ${growthRate > 0 ? '#ef4444' : '#22c55e'};">${growthRate > 0 ? '+' : ''}${growthRate}%</span></div>`;
                    }
                    result += `</div>`;
                    return result;
                }
            },
            xAxis: {
                type: 'category',
                data: mockData.researchBuildingData.monthlyEmission.months
            },
            yAxis: {
                type: 'value',
                name: '排放量 (吨)'
            },
            series: [{
                name: '月度排放量',
                type: 'bar',
                data: mockData.researchBuildingData.monthlyEmission.values,
                itemStyle: {
                    color: function(params) {
                        const value = params.value;
                        return value > 2200 ? '#f59e0b' : '#3b82f6'; // >2200吨标橙色，≤2200吨标蓝色
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    fontSize: 10
                }
            }]
        };
        monthlyChart.setOption(monthlyOption);
    }

    // 日排放趋势图 - 统一改为柱状图
    const dailyChart = initChartIfNeeded('researchDaily', 'research-daily-emission-chart');
    if (dailyChart) {
        const dailyOption = {
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    const dataIndex = params[0].dataIndex;
                    const date = params[0].name;
                    const value = params[0].value;
                    const peakInfo = mockData.researchBuildingData.dailyEmission.peakHours[dataIndex];
                    const average = mockData.researchBuildingData.dailyEmission.average;

                    let result = `<div style="padding: 8px;">`;
                    result += `<div style="font-weight: bold; margin-bottom: 4px;">${date}科研楼碳排放</div>`;
                    result += `<div>排放量: <span style="color: #22c55e; font-weight: bold;">${value} 吨</span></div>`;
                    result += `<div>日均排放量: ${average} 吨</div>`;
                    result += `<div>高排放时段: ${peakInfo.time}</div>`;
                    result += `<div>占当日比例: ${peakInfo.percentage}%</div>`;
                    result += `<div style="margin-top: 4px; font-size: 12px; color: #6b7280;">原因: ${peakInfo.reason}</div>`;
                    result += `</div>`;
                    return result;
                }
            },
            xAxis: {
                type: 'category',
                data: mockData.researchBuildingData.dailyEmission.dates,
                axisLabel: { fontSize: 11 }
            },
            yAxis: {
                type: 'value',
                name: '排放量 (吨)',
                axisLabel: { fontSize: 11 }
            },
            series: [
                {
                    name: '日排放量',
                    type: 'bar',
                    data: mockData.researchBuildingData.dailyEmission.values,
                    itemStyle: {
                        color: function(params) {
                            const value = params.value;
                            const average = mockData.researchBuildingData.dailyEmission.average;
                            return value > average ? '#f59e0b' : '#22c55e'; // 高于平均值标橙色，低于平均值标绿色
                        }
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}',
                        fontSize: 10
                    },
                    barWidth: '60%'
                },
                {
                    name: '日均排放量',
                    type: 'line',
                    data: new Array(mockData.researchBuildingData.dailyEmission.dates.length).fill(mockData.researchBuildingData.dailyEmission.average),
                    lineStyle: {
                        color: '#ef4444',
                        type: 'dashed',
                        width: 2
                    },
                    itemStyle: { color: '#ef4444' },
                    symbol: 'none',
                    label: {
                        show: true,
                        position: 'insideEndTop',
                        formatter: '日均排放量 70.3吨',
                        fontSize: 10,
                        color: '#ef4444'
                    },
                    labelLayout: {
                        hideOverlap: true
                    }
                }
            ],
            grid: {
                top: 40,
                right: 20,
                bottom: 40,
                left: 60
            }
        };
        dailyChart.setOption(dailyOption);
    }
}

// 初始化科研楼单楼栋图表
function initResearchBuildingCharts() {
    // 初始化全楼栋对比图表
    updateBuildingChart('all');
    updateBuildingDetails('all');
    updateBuildingEmissionDetails('all');

    // 添加楼栋选择器事件监听
    const buildingSelector = document.getElementById('building-selector');
    if (buildingSelector) {
        buildingSelector.addEventListener('change', function() {
            const selectedBuilding = this.value;
            updateBuildingChart(selectedBuilding);
            updateBuildingDetails(selectedBuilding);
            updateBuildingEmissionDetails(selectedBuilding);
        });
    }
}

// 更新楼栋图表
function updateBuildingChart(buildingType) {
    const buildingChart = initChartIfNeeded('researchBuilding', 'research-building-chart');
    if (!buildingChart) return;

    let chartOption;

    if (buildingType === 'all') {
        // 全楼栋对比 - 横向柱状图
        const buildingData = mockData.researchBuildingData.buildingData.total;
        const buildings = Object.keys(buildingData);
        const emissions = buildings.map(key => buildingData[key].emission);
        const percentages = buildings.map(key => buildingData[key].percentage);

        chartOption = {
            title: {
                text: '2023年各楼栋碳排放量对比',
                left: 'center',
                textStyle: { fontSize: 16 }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: function(params) {
                    const dataIndex = params[0].dataIndex;
                    const building = buildings[dataIndex];
                    const data = buildingData[building];

                    let result = `<div style="padding: 8px;">`;
                    result += `<div style="font-weight: bold; margin-bottom: 4px;">${building}栋排放情况</div>`;
                    result += `<div>排放量: <span style="color: #3b82f6; font-weight: bold;">${data.emission.toLocaleString()} 吨</span></div>`;
                    result += `<div>占比: ${data.percentage}%</div>`;
                    result += `<div>单位面积排放: ${data.intensity} kgCO₂/m²</div>`;
                    result += `<div style="margin-top: 4px; font-size: 12px; color: #6b7280;">${data.function}</div>`;
                    result += `</div>`;
                    return result;
                }
            },
            xAxis: {
                type: 'value',
                name: '排放量 (吨)',
                axisLabel: { fontSize: 11 }
            },
            yAxis: {
                type: 'category',
                data: buildings.map(key => key + '栋'),
                axisLabel: { fontSize: 11 }
            },
            series: [{
                name: '排放量',
                type: 'bar',
                data: emissions,
                itemStyle: {
                    color: function(params) {
                        const colors = ['#3b82f6', '#8b5cf6', '#22c55e'];
                        return colors[params.dataIndex];
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: function(params) {
                        const dataIndex = params.dataIndex;
                        return `${params.value}吨 (${percentages[dataIndex]}%)`;
                    },
                    fontSize: 10
                },
                barWidth: '60%'
            }],
            grid: {
                top: 60,
                right: 120,
                bottom: 40,
                left: 60
            }
        };
    } else {
        // 单栋详情 - 双Y轴设计：左轴排放量(柱状图) + 右轴同比增长率(折线图)
        const buildingData = mockData.researchBuildingData.buildingData.total[buildingType];

        // 模拟年度排放趋势数据 (2017-2023)
        const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
        const baseEmission = buildingData.emission;
        const yearlyEmissions = [
            Math.round(baseEmission * 0.82), // 2017
            Math.round(baseEmission * 0.87), // 2018
            Math.round(baseEmission * 0.92), // 2019
            Math.round(baseEmission * 0.86), // 2020 (疫情影响)
            Math.round(baseEmission * 1.01), // 2021
            Math.round(baseEmission * 1.05), // 2022
            baseEmission // 2023
        ];

        // 计算同比增长率
        const growthRates = [null]; // 2017年没有同比数据
        for (let i = 1; i < yearlyEmissions.length; i++) {
            const rate = ((yearlyEmissions[i] - yearlyEmissions[i-1]) / yearlyEmissions[i-1] * 100);
            growthRates.push(parseFloat(rate.toFixed(1)));
        }

        chartOption = {
            title: {
                text: `${buildingType}栋年度排放趋势 (2017-2023)`,
                left: 'center',
                textStyle: { fontSize: 16, fontWeight: 'bold' }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    let result = `<div style="padding: 8px;">`;
                    result += `<div style="font-weight: bold; margin-bottom: 4px;">${params[0].axisValue}年 ${buildingType}栋</div>`;

                    params.forEach(param => {
                        if (param.seriesName === '楼栋排放量') {
                            result += `<div>排放量: <span style="color: #3b82f6; font-weight: bold;">${param.value.toLocaleString()} 吨</span></div>`;
                        } else if (param.seriesName === '同比增长率' && param.value !== null) {
                            const color = param.value >= 0 ? '#ef4444' : '#22c55e';
                            result += `<div>同比增长率: <span style="color: ${color}; font-weight: bold;">${param.value}%</span></div>`;
                        }
                    });

                    result += `<div style="margin-top: 4px; font-size: 12px; color: #6b7280;">占比: ${buildingData.percentage}%</div>`;
                    result += `<div style="font-size: 12px; color: #6b7280;">${buildingData.function}</div>`;
                    result += `</div>`;
                    return result;
                }
            },
            legend: {
                data: ['楼栋排放量', '同比增长率'],
                top: '8%'
            },
            xAxis: {
                type: 'category',
                data: years,
                axisLabel: { fontSize: 11 }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '楼栋排放量 (吨)',
                    position: 'left',
                    axisLabel: { color: '#3b82f6', fontSize: 11 },
                    nameTextStyle: { color: '#3b82f6' }
                },
                {
                    type: 'value',
                    name: '同比增长率 (%)',
                    position: 'right',
                    axisLabel: { color: '#ef4444', fontSize: 11 },
                    nameTextStyle: { color: '#ef4444' }
                }
            ],
            series: [
                {
                    name: '楼栋排放量',
                    type: 'bar',
                    yAxisIndex: 0,
                    data: yearlyEmissions,
                    itemStyle: { color: '#3b82f6' },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}',
                        fontSize: 10
                    },
                    barWidth: '60%'
                },
                {
                    name: '同比增长率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: growthRates,
                    lineStyle: { color: '#ef4444', width: 2 },
                    itemStyle: { color: '#ef4444' },
                    symbol: 'circle',
                    symbolSize: 6,
                    connectNulls: false,
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function(params) {
                            return params.value !== null ? `${params.value}%` : '';
                        },
                        fontSize: 10,
                        color: '#ef4444'
                    }
                }
            ],
            grid: {
                top: 80,
                right: 80,
                bottom: 60,
                left: 80
            }
        };
    }

    buildingChart.setOption(chartOption);
}

// 更新楼栋详情卡片
function updateBuildingDetails(buildingType) {
    const detailsContainer = document.getElementById('building-details');
    if (!detailsContainer) return;

    if (buildingType === 'all') {
        // 显示全楼栋对比卡片
        const buildingData = mockData.researchBuildingData.buildingData.total;
        detailsContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-blue-800">A栋</h5>
                    <p class="text-2xl font-bold text-blue-600">${buildingData.A.emission.toLocaleString()}吨</p>
                    <p class="text-sm text-blue-700">占比${buildingData.A.percentage}%</p>
                    <p class="text-xs text-gray-600 mt-2">${buildingData.A.function}</p>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-purple-800">B栋</h5>
                    <p class="text-2xl font-bold text-purple-600">${buildingData.B.emission.toLocaleString()}吨</p>
                    <p class="text-sm text-purple-700">占比${buildingData.B.percentage}%</p>
                    <p class="text-xs text-gray-600 mt-2">${buildingData.B.function}</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-green-800">C栋</h5>
                    <p class="text-2xl font-bold text-green-600">${buildingData.C.emission.toLocaleString()}吨</p>
                    <p class="text-sm text-green-700">占比${buildingData.C.percentage}%</p>
                    <p class="text-xs text-gray-600 mt-2">${buildingData.C.function}</p>
                </div>
            </div>
        `;
    } else {
        // 显示单栋详情
        const buildingData = mockData.researchBuildingData.buildingData.total[buildingType];
        const monthlyData = mockData.researchBuildingData.buildingData.monthly2024[buildingType];
        const colorMap = { A: 'blue', B: 'purple', C: 'green' };
        const color = colorMap[buildingType];

        detailsContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-${color}-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-${color}-800">${buildingType}栋 - 2023年数据</h5>
                    <p class="text-2xl font-bold text-${color}-600">${buildingData.emission.toLocaleString()}吨</p>
                    <p class="text-sm text-${color}-700">占科研楼总排放${buildingData.percentage}%</p>
                    <p class="text-sm text-gray-600 mt-1">单位面积排放: ${buildingData.intensity} kgCO₂/m²·年</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800">${buildingType}栋 - 2024年7月</h5>
                    <p class="text-2xl font-bold text-gray-600">${monthlyData}吨</p>
                    <p class="text-sm text-gray-700">月度排放量</p>
                    <p class="text-xs text-gray-600 mt-2">${buildingData.function}</p>
                </div>
            </div>
        `;
    }
}

// 更新科研楼单楼栋碳排放量页面的数据卡片
function updateBuildingEmissionDetails(buildingType) {
    const currentValueEl = document.getElementById('building-emission-current-value');
    const growthRateEl = document.getElementById('building-emission-growth-rate');
    const calculationBasisEl = document.getElementById('building-emission-calculation-basis');

    if (buildingType === 'all') {
        // 全楼栋数据
        const totalEmission = mockData.researchBuildingData.basic.totalEmission2023;
        const growthRate = mockData.researchBuildingData.basic.growthRate2023;

        if (currentValueEl) currentValueEl.textContent = totalEmission.toLocaleString();
        if (growthRateEl) {
            growthRateEl.textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            growthRateEl.className = `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;
        }
        if (calculationBasisEl) {
            const buildingData = mockData.researchBuildingData.buildingData.total;
            calculationBasisEl.textContent = `科研楼总排放量：A栋${buildingData.A.emission.toLocaleString()}吨 + B栋${buildingData.B.emission.toLocaleString()}吨 + C栋${buildingData.C.emission.toLocaleString()}吨 = ${totalEmission.toLocaleString()}吨`;
        }
    } else {
        // 单栋数据
        const buildingData = mockData.researchBuildingData.buildingData.total[buildingType];
        const singleEmission = buildingData.emission;

        if (currentValueEl) currentValueEl.textContent = singleEmission.toLocaleString();
        if (growthRateEl) {
            growthRateEl.textContent = '-3.2%'; // 模拟单栋增长率
            growthRateEl.className = 'text-2xl font-bold text-green-600';
        }
        if (calculationBasisEl) {
            calculationBasisEl.textContent = `${buildingType}栋排放量：${singleEmission.toLocaleString()}吨，占科研楼总排放${buildingData.percentage}%，建筑面积${(buildingData.area / 10000).toFixed(1)}万㎡`;
        }
    }
}

// 初始化科研楼人均碳排放图表
function initResearchPerCapitaChart() {
    const chart = echarts.init(document.getElementById('research-per-capita-chart'));
    const buildings = buildingsData.laboratory;
    const avgPeople = 150; // 假设每栋科研楼平均150人

    const perCapitaData = buildings.map(b => ({
        name: b.name,
        value: parseFloat((b.carbonEmission / avgPeople).toFixed(2))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: perCapitaData.map(d => d.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: '吨CO₂/人' },
        series: [{
            data: perCapitaData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#3b82f6' }
        }]
    };
    chart.setOption(option);
    charts['research-per-capita'] = chart;

    const selector = document.getElementById('research-per-capita-building-selector');
    if (selector) {
        selector.addEventListener('change', function(e) {
            const value = e.target.value;
            if (value === 'all') {
                chart.setOption(option);
                document.getElementById('research-per-capita-value').textContent = '13.35';
                document.getElementById('research-per-capita-growth-rate').textContent = '-2.3%';
                document.getElementById('research-per-capita-calculation-basis').textContent =
                    '师生人数统计：教职工180人 + 研究生1020人 = 1200人，人均排放 = 16,020吨 ÷ 1200人 = 13.35吨/人';
                document.getElementById('research-per-capita-details').innerHTML = '';
            } else {
                const index = parseInt(value);
                const building = buildings[index];
                const perCapita = perCapitaData[index].value;

                const highlightOption = {
                    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                    xAxis: {
                        type: 'category',
                        data: perCapitaData.map(d => d.name),
                        axisLabel: { rotate: 45, interval: 0 }
                    },
                    yAxis: { type: 'value', name: '吨CO₂/人' },
                    series: [{
                        data: perCapitaData.map((d, i) => ({
                            value: d.value,
                            itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                        })),
                        type: 'bar'
                    }]
                };
                chart.setOption(highlightOption);

                document.getElementById('research-per-capita-value').textContent = perCapita;
                const growthRate = (Math.random() * 10 - 5).toFixed(1);
                document.getElementById('research-per-capita-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
                document.getElementById('research-per-capita-growth-rate').className =
                    `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

                const monthlyData = Array.from({length: 12}, () => (perCapita / 12 * (0.8 + Math.random() * 0.4)).toFixed(3));
                document.getElementById('research-per-capita-details').innerHTML = `
                    <div class="bg-white rounded-lg shadow p-4 mb-4">
                        <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度人均排放趋势</h5>
                        <div id="research-per-capita-monthly-chart" style="height: 250px;"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-blue-600">${(perCapita / 12).toFixed(3)}</div>
                            <div class="text-sm text-blue-800">月均人均排放 (吨/人)</div>
                        </div>
                        <div class="bg-indigo-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-indigo-600">${building.carbonEmission.toLocaleString()}</div>
                            <div class="text-sm text-indigo-800">楼栋总排放 (吨)</div>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-purple-600">${avgPeople}</div>
                            <div class="text-sm text-purple-800">预估人数</div>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    const monthlyChart = echarts.init(document.getElementById('research-per-capita-monthly-chart'));
                    monthlyChart.setOption({
                        tooltip: { trigger: 'axis' },
                        xAxis: {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        },
                        yAxis: { type: 'value', name: '吨CO₂/人' },
                        series: [{
                            data: monthlyData,
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#3b82f6' },
                            areaStyle: { color: 'rgba(59, 130, 246, 0.1)' }
                        }]
                    });
                }, 100);

                document.getElementById('research-per-capita-calculation-basis').textContent =
                    `${building.name}人均排放：${building.carbonEmission}吨 ÷ ${avgPeople}人 = ${perCapita}吨/人`;
            }
        });
    }
}

// 更新人均碳排放图表
function updatePerCapitaChart(buildingType) {
    const perCapitaChart = initChartIfNeeded('researchPerCapita', 'research-per-capita-chart');
    if (!perCapitaChart) return;

    // 使用科研楼人均排放数据
    const perCapitaData = mockData.researchBuildingData.perCapitaData;
    const standard = perCapitaData.standard; // 1020 kgCO₂/人·年限值

    // 计算同比增长率
    const growthRates = [];
    for (let i = 0; i < perCapitaData.values.length; i++) {
        if (i === 0) {
            growthRates.push(null);
        } else {
            const current = perCapitaData.values[i];
            const previous = perCapitaData.values[i - 1];
            const rate = ((current - previous) / previous * 100).toFixed(1);
            growthRates.push(parseFloat(rate));
        }
    }

    const chartOption = {
        title: {
            text: buildingType === 'all' ? '科研楼人均碳排放量趋势' : `${buildingType}栋人均碳排放量趋势`,
            left: 'center',
            textStyle: { fontSize: 16 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            formatter: function(params) {
                const dataIndex = params[0].dataIndex;
                const year = params[0].name;
                const perCapitaValue = params[0].value;
                const growthRate = growthRates[dataIndex];
                const isExceeded = perCapitaValue > standard;
                const totalEmission = mockData.researchBuildingData.yearlyEmission.values[dataIndex + 2]; // 对应2019-2023
                const staffCount = mockData.researchBuildingData.basic.staffCount;

                let result = `<div style="padding: 8px;">`;
                result += `<div style="font-weight: bold; margin-bottom: 4px;">${year}年人均排放</div>`;
                result += `<div>人均排放: <span style="color: #8b5cf6; font-weight: bold;">${perCapitaValue} kgCO₂/人</span></div>`;
                result += `<div>总排放量: ${totalEmission ? totalEmission.toLocaleString() : 'N/A'} 吨</div>`;
                result += `<div>师生人数: ${staffCount} 人</div>`;
                if (growthRate !== null) {
                    result += `<div>同比增长: <span style="color: ${growthRate > 0 ? '#ef4444' : '#22c55e'};">${growthRate > 0 ? '+' : ''}${growthRate}%</span></div>`;
                }
                result += `<div>状态: <span style="color: ${isExceeded ? '#ef4444' : '#22c55e'};">${isExceeded ? '超标' : '达标'}</span></div>`;
                result += `</div>`;
                return result;
            }
        },
        legend: {
            data: ['人均排放量', '同比增长率', '推荐限值'],
            top: 30
        },
        xAxis: {
            type: 'category',
            data: perCapitaData.years,
            axisLabel: { fontSize: 11 }
        },
        yAxis: [
            {
                type: 'value',
                name: '人均排放量 (kgCO₂/人·年)',
                position: 'left',
                axisLabel: {
                    fontSize: 11,
                    color: '#8b5cf6'
                },
                nameTextStyle: { color: '#8b5cf6' },
                min: 0,
                max: 1200
            },
            {
                type: 'value',
                name: '同比增长率 (%)',
                position: 'right',
                axisLabel: {
                    fontSize: 11,
                    color: '#ef4444'
                },
                nameTextStyle: { color: '#ef4444' }
            }
        ],
        series: [
            {
                name: '人均排放量',
                type: 'bar',
                yAxisIndex: 0,
                data: perCapitaData.values,
                itemStyle: {
                    color: function(params) {
                        const value = params.value;
                        return value > standard ? '#ef4444' : '#8b5cf6'; // 超标标红，正常标紫
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    fontSize: 10
                },
                barWidth: '60%'
            },
            {
                name: '同比增长率',
                type: 'line',
                yAxisIndex: 1,
                data: growthRates,
                lineStyle: { color: '#ef4444', width: 2 },
                itemStyle: { color: '#ef4444' },
                symbol: 'circle',
                symbolSize: 6,
                connectNulls: false
            },
            {
                name: '推荐限值',
                type: 'line',
                yAxisIndex: 0,
                data: new Array(perCapitaData.years.length).fill(standard),
                lineStyle: {
                    color: '#ef4444',
                    type: 'dashed',
                    width: 2
                },
                itemStyle: { color: '#ef4444' },
                symbol: 'none',
                label: {
                    show: true,
                    position: 'insideEndTop',
                    formatter: '推荐限值 1020kgCO₂/人·年',
                    fontSize: 10,
                    color: '#ef4444'
                },
                labelLayout: {
                    hideOverlap: true
                }
            }
        ],
        grid: {
            top: 80,
            right: 80,
            bottom: 60,
            left: 80
        }
    };

    perCapitaChart.setOption(chartOption);

    // 添加预警交互
    perCapitaChart.on('click', function(params) {
        if (params.seriesName === '人均排放量') {
            const year = params.name;
            const value = params.value;

            if (value > standard) {
                const exceedPercent = ((value - standard) / standard * 100).toFixed(1);
                showPerCapitaWarning(year, value, exceedPercent);
            }
        }
    });
}

// 显示人均排放预警
function showPerCapitaWarning(year, value, exceedPercent) {
    const warningHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="per-capita-warning-modal">
            <div class="bg-white rounded-lg p-6 max-w-md mx-4">
                <div class="flex items-center mb-4">
                    <i class="fas fa-exclamation-triangle text-red-500 text-2xl mr-3"></i>
                    <h3 class="text-lg font-bold text-red-800">人均排放超限预警</h3>
                </div>
                <div class="mb-4">
                    <p class="text-gray-700 mb-2">
                        <strong>${year}年人均排放量${value} kgCO₂/人，超过限值${exceedPercent}%</strong>
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                        推荐限值: 1020 kgCO₂/人·年（夏热冬冷地区高校标准）
                    </p>
                    <p class="text-sm text-red-600">
                        建议优化用电管理，推行节能措施，减少人均能耗
                    </p>
                </div>
                <button onclick="document.getElementById('per-capita-warning-modal').remove()"
                        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    确定
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', warningHtml);
}

// 更新人均排放详情
function updatePerCapitaDetails(buildingType) {
    const currentValueEl = document.getElementById('per-capita-current-value');
    const growthRateEl = document.getElementById('per-capita-growth-rate');
    const calculationBasisEl = document.getElementById('per-capita-calculation-basis');

    if (buildingType === 'all') {
        // 全楼栋数据
        const perCapitaData = mockData.researchBuildingData.perCapitaData;
        const currentValue = perCapitaData.values[perCapitaData.values.length - 1];
        const previousValue = perCapitaData.values[perCapitaData.values.length - 2];
        const growthRate = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
        const staffBreakdown = perCapitaData.staffBreakdown;

        if (currentValueEl) currentValueEl.textContent = currentValue;
        if (growthRateEl) {
            growthRateEl.textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            growthRateEl.className = `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;
        }
        if (calculationBasisEl) {
            calculationBasisEl.textContent = `师生人数统计：教职工${staffBreakdown.teachers}人 + 研究生${staffBreakdown.graduates}人 = ${staffBreakdown.teachers + staffBreakdown.graduates}人`;
        }
    } else {
        // 单栋数据（模拟）
        const buildingData = mockData.researchBuildingData.buildingData.total[buildingType];
        const estimatedStaff = Math.round(mockData.researchBuildingData.basic.staffCount * (buildingData.percentage / 100));
        const estimatedPerCapita = Math.round(buildingData.emission * 1000 / estimatedStaff);

        if (currentValueEl) currentValueEl.textContent = estimatedPerCapita;
        if (growthRateEl) {
            growthRateEl.textContent = '-2.1%'; // 模拟数据
            growthRateEl.className = 'text-2xl font-bold text-green-600';
        }
        if (calculationBasisEl) {
            calculationBasisEl.textContent = `${buildingType}栋估算师生人数：约${estimatedStaff}人（基于排放占比${buildingData.percentage}%推算）`;
        }
    }
}

// 初始化科研楼单位面积碳排放图表
function initResearchAreaIntensityChart() {
    // 初始化全楼栋面积强度图表
    updateAreaIntensityChart('all');

    // 添加楼栋选择器事件监听
    const buildingSelector = document.getElementById('area-intensity-building-selector');
    if (buildingSelector) {
        buildingSelector.addEventListener('change', function() {
            const selectedBuilding = this.value;
            updateAreaIntensityChart(selectedBuilding);
            updateAreaIntensityDetails(selectedBuilding);
        });
    }
}

// 更新单位面积碳排放图表
function updateAreaIntensityChart(buildingType) {
    const areaIntensityChart = initChartIfNeeded('researchAreaIntensity', 'research-area-intensity-chart');
    if (!areaIntensityChart) return;

    // 使用科研楼面积强度数据
    const areaIntensityData = mockData.researchBuildingData.areaIntensityData;
    const standard = areaIntensityData.standard; // 80 kgCO₂/㎡·年限值

    // 计算同比增长率
    const growthRates = [];
    for (let i = 0; i < areaIntensityData.values.length; i++) {
        if (i === 0) {
            growthRates.push(null);
        } else {
            const current = areaIntensityData.values[i];
            const previous = areaIntensityData.values[i - 1];
            const rate = ((current - previous) / previous * 100).toFixed(1);
            growthRates.push(parseFloat(rate));
        }
    }

    const chartOption = {
        title: {
            text: buildingType === 'all' ? '科研楼单位面积碳排放量趋势' : `${buildingType}栋单位面积碳排放量趋势`,
            left: 'center',
            textStyle: { fontSize: 16 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            formatter: function(params) {
                const dataIndex = params[0].dataIndex;
                const year = params[0].name;
                const areaIntensityValue = params[0].value;
                const growthRate = growthRates[dataIndex];
                const isExceeded = areaIntensityValue > standard;
                const totalEmission = mockData.researchBuildingData.yearlyEmission.values[dataIndex]; // 对应2010-2023
                const buildingArea = mockData.researchBuildingData.basic.buildingArea;

                let result = `<div style="padding: 8px;">`;
                result += `<div style="font-weight: bold; margin-bottom: 4px;">${year}年单位面积碳排放</div>`;
                result += `<div>单位面积排放: <span style="color: #16a34a; font-weight: bold;">${areaIntensityValue} kgCO₂/㎡·年</span></div>`;
                result += `<div>总排放量: ${totalEmission ? totalEmission.toLocaleString() : 'N/A'} 吨</div>`;
                result += `<div>建筑面积: ${(buildingArea / 10000).toFixed(1)} 万㎡</div>`;
                if (growthRate !== null) {
                    result += `<div>同比增长: <span style="color: ${growthRate > 0 ? '#ef4444' : '#22c55e'};">${growthRate > 0 ? '+' : ''}${growthRate}%</span></div>`;

                    // 添加差异原因分析
                    let reason = '';
                    if (year === '2020' && growthRate < -30) {
                        reason = '疫情导致师生离校，能源消耗下降';
                    } else if (year === '2021' && growthRate > 70) {
                        reason = '疫情后师生返校，实验活动恢复';
                    } else if (growthRate > 10) {
                        reason = '新增实验设备，能耗增加';
                    } else if (growthRate < -5) {
                        reason = '节能改造措施见效';
                    } else {
                        reason = '正常波动范围';
                    }
                    result += `<div style="font-size: 12px; color: #6b7280;">差异原因: ${reason}</div>`;
                }
                result += `<div>状态: <span style="color: ${isExceeded ? '#ef4444' : '#22c55e'};">${isExceeded ? '超标' : '达标'}</span></div>`;
                result += `</div>`;
                return result;
            }
        },
        legend: {
            data: ['单位面积排放量', '同比增长率', '推荐限值'],
            top: 30
        },
        xAxis: {
            type: 'category',
            data: areaIntensityData.years,
            axisLabel: { fontSize: 11 }
        },
        yAxis: [
            {
                type: 'value',
                name: '单位面积排放量 (kgCO₂/㎡·年)',
                position: 'left',
                axisLabel: {
                    fontSize: 11,
                    color: '#16a34a'
                },
                nameTextStyle: { color: '#16a34a' },
                min: 0,
                max: 120
            },
            {
                type: 'value',
                name: '同比增长率 (%)',
                position: 'right',
                axisLabel: {
                    fontSize: 11,
                    color: '#ef4444'
                },
                nameTextStyle: { color: '#ef4444' }
            }
        ],
        series: [
            {
                name: '单位面积排放量',
                type: 'bar',
                yAxisIndex: 0,
                data: areaIntensityData.values,
                itemStyle: {
                    color: function(params) {
                        const value = params.value;
                        return value > standard ? '#ef4444' : '#16a34a'; // 超标标红，正常标绿
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    fontSize: 10
                },
                barWidth: '60%'
            },
            {
                name: '同比增长率',
                type: 'line',
                yAxisIndex: 1,
                data: growthRates,
                lineStyle: { color: '#ef4444', width: 2 },
                itemStyle: { color: '#ef4444' },
                symbol: 'circle',
                symbolSize: 6,
                connectNulls: false
            },
            {
                name: '推荐限值',
                type: 'line',
                yAxisIndex: 0,
                data: new Array(areaIntensityData.years.length).fill(standard),
                lineStyle: {
                    color: '#ef4444',
                    type: 'dashed',
                    width: 2
                },
                itemStyle: { color: '#ef4444' },
                symbol: 'none',
                label: {
                    show: true,
                    position: 'insideEndTop',
                    formatter: '推荐限值 80kgCO₂/㎡·年',
                    fontSize: 10,
                    color: '#ef4444'
                },
                labelLayout: {
                    hideOverlap: true
                }
            }
        ],
        grid: {
            top: 80,
            right: 80,
            bottom: 60,
            left: 80
        }
    };

    areaIntensityChart.setOption(chartOption);

    // 添加预警交互
    areaIntensityChart.on('click', function(params) {
        if (params.seriesName === '单位面积排放量') {
            const year = params.name;
            const value = params.value;

            if (value > standard) {
                const exceedPercent = ((value - standard) / standard * 100).toFixed(1);
                showAreaIntensityWarning(year, value, exceedPercent);
            }
        }
    });
}

// 显示单位面积排放预警
function showAreaIntensityWarning(year, value, exceedPercent) {
    const warningHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="area-intensity-warning-modal">
            <div class="bg-white rounded-lg p-6 max-w-md mx-4">
                <div class="flex items-center mb-4">
                    <i class="fas fa-exclamation-triangle text-red-500 text-2xl mr-3"></i>
                    <h3 class="text-lg font-bold text-red-800">单位面积排放超限预警</h3>
                </div>
                <div class="mb-4">
                    <p class="text-gray-700 mb-2">
                        <strong>${year}年单位面积碳排放${value} kgCO₂/㎡·年，超过推荐限值${exceedPercent}%</strong>
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                        推荐限值: 80 kgCO₂/㎡·年（GB/T 51356-2022标准）
                    </p>
                    <p class="text-sm text-red-600">
                        建议优先核查高能耗功能区用能情况，推行节能改造措施
                    </p>
                </div>
                <button onclick="document.getElementById('area-intensity-warning-modal').remove()"
                        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    确定
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', warningHtml);
}

// 更新单位面积排放详情
function updateAreaIntensityDetails(buildingType) {
    const currentValueEl = document.getElementById('area-intensity-current-value');
    const growthRateEl = document.getElementById('area-intensity-growth-rate');
    const calculationBasisEl = document.getElementById('area-intensity-calculation-basis');

    if (buildingType === 'all') {
        // 全楼栋数据
        const areaIntensityData = mockData.researchBuildingData.areaIntensityData;
        const currentValue = areaIntensityData.values[areaIntensityData.values.length - 1];
        const previousValue = areaIntensityData.values[areaIntensityData.values.length - 2];
        const growthRate = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
        const buildingArea = mockData.researchBuildingData.basic.buildingArea;

        if (currentValueEl) currentValueEl.textContent = currentValue;
        if (growthRateEl) {
            growthRateEl.textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            growthRateEl.className = `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;
        }
        if (calculationBasisEl) {
            calculationBasisEl.textContent = `建筑面积统计：科研楼总建筑面积${(buildingArea / 10000).toFixed(1)}万㎡（不含地下车库、室外场地）`;
        }
    } else {
        // 单栋数据
        const buildingData = mockData.researchBuildingData.buildingData.total[buildingType];
        const singleBuildingArea = buildingData.area;
        const singleBuildingIntensity = buildingData.intensity;

        if (currentValueEl) currentValueEl.textContent = singleBuildingIntensity;
        if (growthRateEl) {
            growthRateEl.textContent = '-1.8%'; // 模拟数据
            growthRateEl.className = 'text-2xl font-bold text-green-600';
        }
        if (calculationBasisEl) {
            calculationBasisEl.textContent = `${buildingType}栋建筑面积：${(singleBuildingArea / 10000).toFixed(2)}万㎡，单位面积排放${singleBuildingIntensity} kgCO₂/㎡·年`;
        }
    }
}

// 显示指定部分
function showSection(sectionId) {
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // 显示目标区域
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        currentSection = sectionId;
        
        // 更新页面标题
        updatePageTitle(sectionId);
        
        // 初始化或更新图表
        setTimeout(() => {
            initSectionCharts(sectionId);
        }, 100);
    }
}

// 更新页面标题
function updatePageTitle(sectionId) {
    const titles = {
        'total-emission': { title: '综合碳排放量监测', subtitle: '2023-2024年监测数据' },
        'scope-emission': { title: '分范围碳排放量监测', subtitle: 'Scope 1/2/3 分类统计' },
        'per-capita': { title: '人均碳排放量监测', subtitle: '基于师生总数的强度指标' },
        'area-intensity': { title: '单位面积碳排放量', subtitle: '基于建筑面积的强度指标' },
        'functional-structure': { title: '功能区碳排放结构占比', subtitle: '各功能区排放分布' },
        'source-structure': { title: '碳排放来源结构占比', subtitle: '电力、天然气等能源结构' },
        'time-distribution': { title: '碳排放时间结构分布', subtitle: '月度、季度排放模式' },
        'renewable-energy': { title: '可再生能源利用率', subtitle: '光伏、风电等清洁能源' },
        'green-electricity': { title: '外购绿电绿证占比', subtitle: '绿色电力采购情况' },
        'photovoltaic': { title: '校园消纳光伏电量占比', subtitle: '分布式光伏发电' },
        'research-building': { title: '科研楼碳排放分析', subtitle: '详细功能区数据' },
        'research-emission-monitoring': { title: '科研楼碳排放量', subtitle: '多维度排放量监测' },
        'research-building-emission': { title: '科研楼单楼栋碳排放量', subtitle: '楼栋对比分析' },
        'research-per-capita': { title: '科研楼楼栋人均碳排放量', subtitle: '人均排放强度监测' },
        'research-area-intensity': { title: '科研楼单位面积碳排放量', subtitle: '面积排放强度监测' },
        'research-energy-structure': { title: '科研楼电力碳排占比', subtitle: '能源结构分析' },
        'research-time-structure': { title: '科研楼高能耗时段占比', subtitle: '时段结构分析' },
        'research-funding-efficiency': { title: '科研楼单位科研经费碳排放量', subtitle: '经费效率监测' },
        'dormitory-building': { title: '宿舍楼碳排放分析', subtitle: '详细功能区数据' },
        'dormitory-emission-monitoring': { title: '宿舍楼碳排放量', subtitle: '多维度排放量监测' },
        'dormitory-building-emission': { title: '宿舍楼单楼栋碳排放量', subtitle: '楼栋对比分析' },
        'dormitory-per-capita': { title: '宿舍楼楼栋人均碳排放量', subtitle: '人均排放强度监测' },
        'dormitory-area-intensity': { title: '宿舍楼单位面积碳排放量', subtitle: '面积排放强度监测' },
        'teaching-building': { title: '教学楼碳排放分析', subtitle: '详细功能区数据' },
        'teaching-emission-monitoring': { title: '教学楼碳排放量', subtitle: '多维度排放量监测' },
        'teaching-building-emission': { title: '教学楼单楼栋碳排放量', subtitle: '楼栋对比分析' },
        'teaching-per-capita': { title: '教学楼楼栋人均碳排放量', subtitle: '人均排放强度监测' },
        'teaching-area-intensity': { title: '教学楼单位面积碳排放量', subtitle: '面积排放强度监测' },
        'library-building': { title: '图书馆碳排放分析', subtitle: '详细功能区数据' },
        'library-emission-monitoring': { title: '图书馆碳排放量', subtitle: '多维度排放量监测' },
        'library-building-emission': { title: '图书馆单楼栋碳排放量', subtitle: '楼栋对比分析' },
        'library-per-capita': { title: '图书馆楼栋人均碳排放量', subtitle: '人均排放强度监测' },
        'library-area-intensity': { title: '图书馆单位面积碳排放量', subtitle: '面积排放强度监测' },
        'canteen-building': { title: '食堂碳排放分析', subtitle: '详细功能区数据' },
        'canteen-emission-monitoring': { title: '食堂碳排放量', subtitle: '多维度排放量监测' },
        'canteen-building-emission': { title: '食堂单楼栋碳排放量', subtitle: '楼栋对比分析' },
        'canteen-per-capita': { title: '食堂楼栋人均碳排放量', subtitle: '人均排放强度监测' },
        'canteen-area-intensity': { title: '食堂单位面积碳排放量', subtitle: '面积排放强度监测' },
        'gymnasium-building': { title: '体育馆碳排放分析', subtitle: '详细功能区数据' },
        'gymnasium-emission-monitoring': { title: '体育馆碳排放量', subtitle: '多维度排放量监测' },
        'gymnasium-building-emission': { title: '体育馆单楼栋碳排放量', subtitle: '楼栋对比分析' },
        'gymnasium-per-capita': { title: '体育馆楼栋人均碳排放量', subtitle: '人均排放强度监测' },
        'gymnasium-area-intensity': { title: '体育馆单位面积碳排放量', subtitle: '面积排放强度监测' }
    };

    const titleInfo = titles[sectionId] || { title: '校园碳排放监测', subtitle: '智能运维系统' };
    document.getElementById('page-title').textContent = titleInfo.title;
    document.getElementById('page-subtitle').textContent = titleInfo.subtitle;
}

// 初始化图表
function initCharts() {
    // 只初始化默认显示的综合碳排放量图表
    if (typeof echarts !== 'undefined') {
        charts.yearlyEmission = echarts.init(document.getElementById('yearly-emission-chart'));
        charts.monthlyEmission = echarts.init(document.getElementById('monthly-emission-chart'));
        charts.carbonSink = echarts.init(document.getElementById('carbon-sink-chart'));
    }
}

// 延迟初始化图表（当容器可见时）
function initChartIfNeeded(chartName, containerId) {
    if (!charts[chartName] && typeof echarts !== 'undefined') {
        const container = document.getElementById(containerId);
        if (container) {
            charts[chartName] = echarts.init(container);
        }
    }
    return charts[chartName];
}

// 初始化区域图表
function initSectionCharts(sectionId) {
    switch(sectionId) {
        case 'total-emission':
            initTotalEmissionCharts();
            break;
        case 'scope-emission':
            initScopeEmissionChart();
            break;
        case 'per-capita':
            initPerCapitaCharts();
            break;
        case 'area-intensity':
            initAreaIntensityCharts();
            break;
        case 'functional-structure':
            initFunctionalStructureChart();
            break;
        case 'source-structure':
            initSourceStructureChart();
            break;
        case 'time-distribution':
            initTimeDistributionCharts();
            break;
        case 'renewable-energy':
            initRenewableEnergyCharts();
            break;
        case 'green-electricity':
            initGreenElectricityChart();
            break;
        case 'photovoltaic':
            initPhotovoltaicChart();
            break;
        case 'research-building':
            // 科研楼概览页面，不需要初始化图表
            break;
        case 'research-emission-monitoring':
            initResearchPanelCharts('research-emission-monitoring');
            break;
        case 'research-building-emission':
            initResearchPanelCharts('research-building-emission');
            break;
        case 'research-per-capita':
            initResearchPanelCharts('research-per-capita');
            break;
        case 'research-area-intensity':
            initResearchPanelCharts('research-area-intensity');
            break;
        case 'research-energy-structure':
            initResearchPanelCharts('research-energy-structure');
            break;
        case 'research-time-structure':
            initResearchPanelCharts('research-time-structure');
            break;
        case 'research-funding-efficiency':
            initResearchPanelCharts('research-funding-efficiency');
            break;
        case 'dormitory-building':
            // 宿舍楼概览页面，不需要初始化图表
            break;
        case 'dormitory-emission-monitoring':
            initDormitoryEmissionMonitoring();
            break;
        case 'dormitory-building-emission':
            initDormitoryBuildingEmission();
            break;
        case 'dormitory-per-capita':
            initDormitoryPerCapita();
            break;
        case 'dormitory-area-intensity':
            initDormitoryAreaIntensity();
            break;
        case 'teaching-building':
            // 教学楼概览页面，不需要初始化图表
            break;
        case 'teaching-emission-monitoring':
            initTeachingEmissionMonitoring();
            break;
        case 'teaching-building-emission':
            initTeachingBuildingEmission();
            break;
        case 'teaching-per-capita':
            initTeachingPerCapita();
            break;
        case 'teaching-area-intensity':
            initTeachingAreaIntensity();
            break;
        case 'library-building':
            // 图书馆概览页面，不需要初始化图表
            break;
        case 'library-emission-monitoring':
            initLibraryEmissionMonitoring();
            break;
        case 'library-building-emission':
            initLibraryBuildingEmission();
            break;
        case 'library-per-capita':
            initLibraryPerCapita();
            break;
        case 'library-area-intensity':
            initLibraryAreaIntensity();
            break;
        case 'canteen-building':
            // 食堂概览页面，不需要初始化图表
            break;
        case 'canteen-emission-monitoring':
            initCanteenEmissionMonitoring();
            break;
        case 'canteen-building-emission':
            initCanteenBuildingEmission();
            break;
        case 'canteen-per-capita':
            initCanteenPerCapita();
            break;
        case 'canteen-area-intensity':
            initCanteenAreaIntensity();
            break;
        case 'gymnasium-building':
            // 体育馆概览页面，不需要初始化图表
            break;
        case 'gymnasium-emission-monitoring':
            initGymnasiumEmissionMonitoring();
            break;
        case 'gymnasium-building-emission':
            initGymnasiumBuildingEmission();
            break;
        case 'gymnasium-per-capita':
            initGymnasiumPerCapita();
            break;
        case 'gymnasium-area-intensity':
            initGymnasiumAreaIntensity();
            break;
    }
}

// 初始化综合碳排放图表
function initTotalEmissionCharts() {
    // 年碳排放总量图表
    const yearlyOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                const year = data.name;
                const value = data.value;
                const growthRate = mockData.yearlyEmission.growthRates[data.dataIndex];
                return `${year}年<br/>排放量: ${value} 吨<br/>同比增长: ${growthRate > 0 ? '+' : ''}${growthRate}%`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.yearlyEmission.years,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.yearlyEmission.values,
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#22c55e' },
                    { offset: 1, color: '#16a34a' }
                ])
            },
            label: {
                show: true,
                position: 'top',
                fontSize: 10,
                formatter: '{c}'
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.yearlyEmission.setOption(yearlyOption);

    // 月碳排放总量图表
    const monthlyOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                const month = data.name;
                const value = data.value;
                const growthRate = mockData.monthlyEmission.growthRates[data.dataIndex];
                return `${month}<br/>排放量: ${value} 吨<br/>环比增长率: ${growthRate > 0 ? '+' : ''}${growthRate}%`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.monthlyEmission.months,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.monthlyEmission.values,
            type: 'bar',
            itemStyle: {
                color: function(params) {
                    const growthRate = mockData.monthlyEmission.growthRates[params.dataIndex];
                    return growthRate > 0 ? '#ef4444' : '#22c55e';
                }
            },
            label: {
                show: true,
                position: 'top',
                fontSize: 10,
                formatter: '{c}'
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.monthlyEmission.setOption(monthlyOption);

    // 碳汇图表
    const carbonSinkOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}年<br/>碳汇量: ${data.value} 吨CO₂`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.carbonSink.years,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.carbonSink.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: '#22c55e', width: 3 },
            itemStyle: { color: '#22c55e' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
                    { offset: 1, color: 'rgba(34, 197, 94, 0.1)' }
                ])
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.carbonSink.setOption(carbonSinkOption);
}

// 初始化Scope排放饼图
function initScopeEmissionChart() {
    // 延迟初始化图表
    const scopeChart = initChartIfNeeded('scopePie', 'scope-pie-chart');
    if (!scopeChart) return;

    const scopeOption = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                const data = mockData.scopeEmission[params.dataIndex];
                return `${data.name}<br/>排放量: ${data.value} 吨<br/>占比: ${data.percentage}%`;
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: { fontSize: 12 }
        },
        series: [{
            name: '碳排放量',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '50%'],
            data: mockData.scopeEmission.map(item => ({
                value: item.value,
                name: item.name,
                itemStyle: {
                    color: item.name.includes('Scope 1') ? '#3b82f6' :
                           item.name.includes('Scope 2') ? '#ef4444' : '#22c55e'
                }
            })),
            itemStyle: {
                borderRadius: 8,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c} 吨\n({d}%)',
                fontSize: 11
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    scopeChart.setOption(scopeOption);

    // 添加点击事件
    scopeChart.off('click');
    scopeChart.on('click', function(params) {
        const data = mockData.scopeEmission[params.dataIndex];
        showScopeDetail(data);
    });
}

// 显示Scope详细信息
function showScopeDetail(data) {
    const detailContent = document.getElementById('scope-detail-content');
    
    let sourcesHtml = '';
    data.detail.sources.forEach(source => {
        sourcesHtml += `
            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">${source.name}</span>
                <div class="text-right">
                    <span class="text-sm font-semibold text-gray-800">${source.value} 吨</span>
                    <span class="text-xs text-gray-500 ml-2">${source.percentage}%</span>
                </div>
            </div>
        `;
    });
    
    const trendColor = data.detail.yearOverYear > 0 ? 'text-red-600' : 'text-green-600';
    const trendIcon = data.detail.yearOverYear > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
    
    detailContent.innerHTML = `
        <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 mb-2">${data.name}</h4>
                <div class="text-2xl font-bold text-blue-600 mb-2">${data.value} 吨</div>
                <div class="text-sm text-gray-600">占比: ${data.percentage}%</div>
            </div>
            
            <div>
                <h5 class="font-semibold text-gray-800 mb-3">排放源构成</h5>
                ${sourcesHtml}
            </div>
            
            <div class="bg-blue-50 rounded-lg p-4">
                <h5 class="font-semibold text-blue-800 mb-2">同比分析</h5>
                <div class="flex items-center space-x-2">
                    <i class="${trendIcon} ${trendColor}"></i>
                    <span class="${trendColor} font-semibold">${data.detail.yearOverYear > 0 ? '+' : ''}${data.detail.yearOverYear}%</span>
                    <span class="text-sm text-gray-600">vs 2022年</span>
                </div>
                <p class="text-sm text-blue-700 mt-2">${data.detail.description}</p>
            </div>
        </div>
    `;
}

// 初始化人均碳排放图表
function initPerCapitaCharts() {
    // 延迟初始化图表
    const perCapitaChart = initChartIfNeeded('perCapita', 'per-capita-chart');
    if (!perCapitaChart) return;

    // 人均碳排放趋势图
    const perCapitaOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const year = params[0].name;
                const value = params[0].value;
                const growthRate = mockData.perCapitaEmission.growthRates[params[0].dataIndex];
                const isExceeded = value > 1020;
                return `${year}年<br/>人均排放: ${value} kg/人<br/>增长率: ${growthRate > 0 ? '+' : ''}${growthRate}%<br/>状态: ${isExceeded ? '超标' : '达标'}`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.perCapitaEmission.years,
            axisLabel: { fontSize: 12 }
        },
        yAxis: {
            type: 'value',
            name: 'kg/人',
            axisLabel: { fontSize: 12 }
        },
        series: [
            {
                name: '人均排放',
                data: mockData.perCapitaEmission.values,
                type: 'line',
                smooth: true,
                lineStyle: { color: '#3b82f6', width: 3 },
                itemStyle: { color: '#3b82f6' },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                            { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
                        ]
                    }
                }
            },
            {
                name: '标准限值',
                data: mockData.perCapitaEmission.standards,
                type: 'line',
                lineStyle: { color: '#ef4444', type: 'dashed', width: 2 },
                itemStyle: { color: '#ef4444' },
                symbol: 'none'
            }
        ],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    perCapitaChart.setOption(perCapitaOption);

    // 人均排放对比分析
    const perCapitaComparisonChart = initChartIfNeeded('perCapitaComparison', 'per-capita-comparison-chart');
    if (perCapitaComparisonChart) {
        const comparisonOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            legend: {
                data: ['实际值', '标准值'],
                textStyle: { fontSize: 12 }
            },
            xAxis: {
                type: 'category',
                data: ['2019', '2020', '2021', '2022', '2023'],
                axisLabel: { fontSize: 12 }
            },
            yAxis: {
                type: 'value',
                name: 'kg/人',
                axisLabel: { fontSize: 12 }
            },
            series: [
                {
                    name: '实际值',
                    type: 'bar',
                    data: mockData.perCapitaEmission.values.slice(1),
                    itemStyle: { color: '#3b82f6' }
                },
                {
                    name: '标准值',
                    type: 'bar',
                    data: [1020, 1020, 1020, 1020, 1020],
                    itemStyle: { color: '#ef4444' }
                }
            ],
            grid: { top: 40, right: 20, bottom: 40, left: 60 }
        };
        perCapitaComparisonChart.setOption(comparisonOption);
    }
}

// 初始化单位面积碳排放图表
function initAreaIntensityCharts() {
    // 延迟初始化主图表
    const areaChart = initChartIfNeeded('areaIntensityMain', 'area-intensity-main-chart');
    if (!areaChart) return;

    // 柱状图+折线图双Y轴设计
    const areaIntensityOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            formatter: function(params) {
                const dataIndex = params[0].dataIndex;
                const year = params[0].name;
                const intensity = params[0].value;
                const growthRate = mockData.areaIntensity.growthRates[dataIndex];
                const totalEmission = mockData.areaIntensity.totalEmissions[dataIndex];
                const buildingArea = mockData.areaIntensity.buildingAreas[dataIndex];
                const reason = mockData.areaIntensity.reasons[dataIndex];
                const isExceeded = intensity > mockData.areaIntensity.standard;

                let result = `<div style="padding: 8px;">`;
                result += `<div style="font-weight: bold; margin-bottom: 4px;">${year}年单位面积碳排放</div>`;
                result += `<div>排放强度: <span style="color: #16a34a; font-weight: bold;">${intensity} kgCO₂/㎡·年</span></div>`;
                result += `<div>总排放量: ${totalEmission.toLocaleString()} 吨</div>`;
                result += `<div>建筑面积: ${buildingArea} 万㎡</div>`;
                if (growthRate !== null) {
                    result += `<div>同比增长: <span style="color: ${growthRate > 0 ? '#ef4444' : '#22c55e'};">${growthRate > 0 ? '+' : ''}${growthRate}%</span></div>`;
                }
                result += `<div>状态: <span style="color: ${isExceeded ? '#ef4444' : '#22c55e'};">${isExceeded ? '超标' : '达标'}</span></div>`;
                result += `<div style="margin-top: 4px; font-size: 12px; color: #6b7280;">差异原因: ${reason}</div>`;
                result += `</div>`;
                return result;
            }
        },
        legend: {
            data: ['单位面积排放量', '同比增长率', '推荐限值'],
            top: 10
        },
        xAxis: {
            type: 'category',
            data: mockData.areaIntensity.years,
            axisLabel: {
                fontSize: 11,
                rotate: 45
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '单位面积排放量 (kgCO₂/㎡·年)',
                position: 'left',
                axisLabel: {
                    fontSize: 11,
                    color: '#16a34a'
                },
                nameTextStyle: { color: '#16a34a' },
                min: 0,
                max: 90
            },
            {
                type: 'value',
                name: '同比增长率 (%)',
                position: 'right',
                axisLabel: {
                    fontSize: 11,
                    color: '#ef4444'
                },
                nameTextStyle: { color: '#ef4444' }
            }
        ],
        series: [
            {
                name: '单位面积排放量',
                type: 'bar',
                yAxisIndex: 0,
                data: mockData.areaIntensity.values,
                itemStyle: {
                    color: function(params) {
                        const value = params.value;
                        const standard = mockData.areaIntensity.standard;
                        return value > standard ? '#ef4444' : '#16a34a';
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    fontSize: 10
                },
                barWidth: '60%'
            },
            {
                name: '同比增长率',
                type: 'line',
                yAxisIndex: 1,
                data: mockData.areaIntensity.growthRates,
                lineStyle: { color: '#ef4444', width: 2 },
                itemStyle: { color: '#ef4444' },
                symbol: 'circle',
                symbolSize: 6,
                connectNulls: false
            },
            {
                name: '推荐限值',
                type: 'line',
                yAxisIndex: 0,
                data: new Array(mockData.areaIntensity.years.length).fill(mockData.areaIntensity.standard),
                lineStyle: {
                    color: '#ef4444',
                    type: 'dashed',
                    width: 2
                },
                itemStyle: { color: '#ef4444' },
                symbol: 'none',
                label: {
                    show: true,
                    position: 'insideEndTop',
                    formatter: '推荐限值 80kg/㎡·年',
                    fontSize: 10,
                    color: '#ef4444'
                },
                labelLayout: {
                    hideOverlap: true
                }
            }
        ],
        grid: {
            top: 60,
            right: 80,
            bottom: 80,
            left: 80
        }
    };

    areaChart.setOption(areaIntensityOption);

    // 添加预警交互
    areaChart.on('click', function(params) {
        if (params.seriesName === '单位面积排放量') {
            const year = params.name;
            const value = params.value;
            const standard = mockData.areaIntensity.standard;

            if (value > standard) {
                const exceedPercent = ((value - standard) / standard * 100).toFixed(1);
                showAreaIntensityWarning(year, value, exceedPercent);
            }
        }
    });
}

// 显示单位面积碳排放预警
function showAreaIntensityWarning(year, value, exceedPercent) {
    // 创建预警弹窗
    const warningHtml = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="area-warning-modal">
            <div class="bg-white rounded-lg p-6 max-w-md mx-4">
                <div class="flex items-center mb-4">
                    <i class="fas fa-exclamation-triangle text-red-500 text-2xl mr-3"></i>
                    <h3 class="text-lg font-bold text-red-800">碳排放超限预警</h3>
                </div>
                <div class="mb-4">
                    <p class="text-gray-700 mb-2">
                        <strong>${year}年单位面积碳排放超推荐限值 ${exceedPercent}%</strong>
                    </p>
                    <p class="text-sm text-gray-600 mb-2">
                        实际值: ${value} kgCO₂/㎡·年<br/>
                        推荐限值: 80 kgCO₂/㎡·年
                    </p>
                    <p class="text-sm text-red-600">
                        建议优先核查科研楼（占比36.12%）、宿舍（占比32.05%）等高能耗功能区用能情况
                    </p>
                </div>
                <button onclick="document.getElementById('area-warning-modal').remove()"
                        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    确定
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', warningHtml);
}

// 初始化功能区结构图表
function initFunctionalStructureChart() {
    // 延迟初始化图表
    const functionalChart = initChartIfNeeded('functionalStructure', 'functional-structure-chart');
    if (!functionalChart) return;

    const functionalOption = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                const data = mockData.functionalStructure[params.dataIndex];
                return `${params.name}<br/>排放量: ${data.emission} 吨<br/>占比: ${params.value}%<br/>单位面积: ${data.area}kg/m²<br/>主要设备: ${data.equipment}`;
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: { fontSize: 12 }
        },
        series: [{
            name: '功能区占比',
            type: 'pie',
            radius: '70%',
            center: ['60%', '50%'],
            data: mockData.functionalStructure.map(item => ({
                value: item.value,
                name: item.name,
                itemStyle: { color: item.color }
            })),
            itemStyle: {
                borderRadius: 6,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c}%',
                fontSize: 11
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    functionalChart.setOption(functionalOption);

    // 添加点击事件
    functionalChart.off('click');
    functionalChart.on('click', function(params) {
        const data = mockData.functionalStructure[params.dataIndex];
        showFunctionalDetail(data);
    });
}

// 显示功能区详细信息
function showFunctionalDetail(data) {
    const detailContent = document.getElementById('functional-detail-content');
    
    detailContent.innerHTML = `
        <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 mb-2">${data.name}</h4>
                <div class="text-2xl font-bold text-blue-600 mb-2">${data.emission} 吨</div>
                <div class="text-sm text-gray-600">占比: ${data.value}%</div>
            </div>
            
            <div class="bg-blue-50 rounded-lg p-4">
                <h5 class="font-semibold text-blue-800 mb-2">空间信息</h5>
                <div class="space-y-1 text-sm">
                    <div class="flex justify-between">
                        <span>建筑面积:</span>
                        <span class="font-semibold">${data.area} m²</span>
                    </div>
                    <div class="flex justify-between">
                        <span>单位面积排放:</span>
                        <span class="font-semibold">${data.area}kg/m²</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-green-50 rounded-lg p-4">
                <h5 class="font-semibold text-green-800 mb-2">主要设备</h5>
                <p class="text-sm text-green-700">${data.equipment}</p>
            </div>
        </div>
    `;
}

// 初始化来源结构图表
function initSourceStructureChart() {
    // 延迟初始化图表
    const sourceChart = initChartIfNeeded('sourceStructure', 'source-structure-chart');
    if (!sourceChart) return;

    const sourceOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
                let result = params[0].name + '<br/>';
                params.forEach(param => {
                    if (param.seriesName === '2023年占比') {
                        result += `${param.seriesName}: ${param.value}%<br/>`;
                    } else {
                        const trendText = param.value > 0 ? '上升' : '下降';
                        result += `趋势: ${trendText} ${Math.abs(param.value)}%<br/>`;
                    }
                });
                return result;
            }
        },
        legend: {
            data: ['2023年占比', '2018-2023年趋势'],
            textStyle: { fontSize: 12 }
        },
        xAxis: {
            type: 'value',
            name: '占比 (%)',
            axisLabel: { fontSize: 12 }
        },
        yAxis: {
            type: 'category',
            data: mockData.energySourceStructure.map(item => item.name),
            axisLabel: { fontSize: 12 }
        },
        series: [
            {
                name: '2023年占比',
                type: 'bar',
                data: mockData.energySourceStructure.map(item => item.value),
                itemStyle: {
                    color: function(params) {
                        return mockData.energySourceStructure[params.dataIndex].color;
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: function(params) {
                        const trend = mockData.energySourceStructure[params.dataIndex].trend;
                        const trendIcon = trend > 0 ? '↗' : '↘';
                        return `${params.value}% ${trendIcon}`;
                    },
                    fontSize: 11
                },
                barWidth: '60%'
            }
        ],
        grid: { top: 40, right: 80, bottom: 40, left: 80 }
    };
    sourceChart.setOption(sourceOption);
}

// 初始化时间分布图表
function initTimeDistributionCharts() {
    // 延迟初始化季节分布图表
    const seasonalChart = initChartIfNeeded('seasonalDistribution', 'seasonal-distribution-chart');
    if (seasonalChart) {
        // 季节分布饼图
        const seasonalOption = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    const reasons = [
                        '过渡季节，能耗适中',
                        '空调制冷高峰期',
                    '过渡季节，能耗较低',
                    '空调制热高峰期'
                ];
                return `${params.name}<br/>排放量占比: ${params.value}%<br/>主要原因: ${reasons[params.dataIndex]}`;
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: { fontSize: 12 }
        },
        series: [{
            name: '季节分布',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '50%'],
            data: mockData.seasonalDistribution.map(item => ({
                value: item.value,
                name: item.name,
                itemStyle: { color: item.color }
            })),
            itemStyle: {
                borderRadius: 8,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c}%',
                fontSize: 11
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    seasonalChart.setOption(seasonalOption);
    }

    // 延迟初始化月度分布图表
    const monthlyChart = initChartIfNeeded('monthlyDistributionDetailed', 'monthly-distribution-detailed-chart');
    if (monthlyChart) {
        // 月度分布折线图
        const monthlyOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                const season = mockData.monthlyDetailed.seasons[data.dataIndex];
                const seasonColors = {
                    '春季': '#86efac',
                    '夏季': '#fdba74',
                    '秋季': '#fbbf24',
                    '冬季': '#60a5fa'
                };
                return `<div style="color: ${seasonColors[season]}">● ${season}</div>${data.name}<br/>排放量: ${data.value} 吨CO₂`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.monthlyDetailed.months,
            axisLabel: {
                fontSize: 10,
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.monthlyDetailed.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: '#3b82f6', width: 3 },
            itemStyle: {
                color: function(params) {
                    const season = mockData.monthlyDetailed.seasons[params.dataIndex];
                    const seasonColors = {
                        '春季': '#86efac',
                        '夏季': '#fdba74',
                        '秋季': '#fbbf24',
                        '冬季': '#60a5fa'
                    };
                    return seasonColors[season] || '#3b82f6';
                }
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                        { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
                    ]
                }
            },
            markLine: {
                data: [
                    { name: '夏季高峰', xAxis: '6月', lineStyle: { color: '#fdba74', type: 'dashed' } },
                    { name: '冬季高峰', xAxis: '12月', lineStyle: { color: '#60a5fa', type: 'dashed' } }
                ]
            }
        }],
        grid: { top: 40, right: 20, bottom: 60, left: 60 }
    };
    monthlyChart.setOption(monthlyOption);
    }
}

// 初始化可再生能源图表
function initRenewableEnergyCharts() {
    // 延迟初始化仪表盘图表
    const gaugeChart = initChartIfNeeded('renewableGauge', 'renewable-gauge-chart');
    if (gaugeChart) {
        // 仪表盘
        const gaugeOption = {
        series: [{
            name: '可再生能源利用率',
            type: 'gauge',
            min: 0,
            max: 50,
            splitNumber: 5,
            radius: '80%',
            axisLine: {
                lineStyle: {
                    width: 15,
                    color: [
                        [0.3, '#ef4444'],
                        [0.5, '#f59e0b'],
                        [1, '#22c55e']
                    ]
                }
            },
            pointer: {
                itemStyle: {
                    color: '#3b82f6'
                }
            },
            axisTick: {
                distance: -15,
                length: 8,
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            splitLine: {
                distance: -15,
                length: 15,
                lineStyle: {
                    color: '#fff',
                    width: 4
                }
            },
            axisLabel: {
                color: 'auto',
                distance: 25,
                fontSize: 12
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}%',
                color: '#3b82f6',
                fontSize: 24
            },
            data: [{
                value: mockData.renewableEnergy.current,
                name: '利用率'
            }]
        }]
    };
    gaugeChart.setOption(gaugeOption);
    }

    // 延迟初始化趋势图表
    const trendChart = initChartIfNeeded('renewableTrend', 'renewable-trend-chart');
    if (trendChart) {
        // 趋势图
        const trendOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}<br/>利用率: ${data.value}%<br/>主要来源: 光伏+地热能`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.renewableEnergy.trend.map(item => item.year),
            axisLabel: { fontSize: 12 }
        },
        yAxis: {
            type: 'value',
            name: '利用率 (%)',
            min: 0,
            max: 60,
            axisLabel: { fontSize: 12 }
        },
        series: [{
            data: mockData.renewableEnergy.trend.map(item => item.value),
            type: 'line',
            smooth: true,
            lineStyle: { color: '#22c55e', width: 3 },
            itemStyle: { color: '#22c55e' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
                        { offset: 1, color: 'rgba(34, 197, 94, 0.1)' }
                    ]
                }
            },
            markLine: {
                data: [{
                    yAxis: mockData.renewableEnergy.target,
                    name: '2025年目标',
                    lineStyle: { color: '#3b82f6', type: 'dashed' },
                    label: { formatter: '目标: {c}%' }
                }]
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    trendChart.setOption(trendOption);
    }
}

// 初始化绿电绿证图表
function initGreenElectricityChart() {
    const greenChart = initChartIfNeeded('greenElectricity', 'green-electricity-chart');
    if (!greenChart) return;

    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}年<br/>绿电绿证占比: ${data.value}%`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.greenElectricity.years,
            axisLabel: { fontSize: 12 }
        },
        yAxis: {
            type: 'value',
            name: '占比 (%)',
            axisLabel: { fontSize: 12 }
        },
        series: [{
            data: mockData.greenElectricity.values,
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#22c55e' },
                    { offset: 1, color: '#16a34a' }
                ])
            },
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                fontSize: 11
            },
            markLine: {
                data: [{
                    yAxis: mockData.greenElectricity.target,
                    name: '2025年目标',
                    lineStyle: { color: '#3b82f6', type: 'dashed' },
                    label: { formatter: '目标: {c}%' }
                }]
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    greenChart.setOption(option);
}

// 初始化光伏流向图表
function initPhotovoltaicChart() {
    const photovoltaicChart = initChartIfNeeded('photovoltaicFlow', 'photovoltaic-flow-chart');
    if (!photovoltaicChart) return;

    const option = {
        title: {
            text: '光伏电量流向分析',
            left: 'center',
            textStyle: { fontSize: 16, color: '#374151' }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.name === '总发电量') {
                    return `光伏电站总发电量<br/>${mockData.photovoltaic.totalGeneration.toLocaleString()} kWh`;
                } else if (params.name === '消纳量') {
                    return `校园消纳量<br/>${mockData.photovoltaic.consumption.toLocaleString()} kWh<br/>占比: ${mockData.photovoltaic.percentage}%`;
                }
                return params.name;
            }
        },
        series: [{
            type: 'sankey',
            data: [
                { name: '总发电量' },
                { name: '消纳量' },
                { name: '上网电量' }
            ],
            links: [
                { source: '总发电量', target: '消纳量', value: mockData.photovoltaic.consumption },
                { source: '总发电量', target: '上网电量', value: mockData.photovoltaic.totalGeneration - mockData.photovoltaic.consumption }
            ],
            itemStyle: {
                color: function(params) {
                    const colors = ['#fbbf24', '#22c55e', '#6b7280'];
                    return colors[params.dataIndex] || '#3b82f6';
                }
            },
            lineStyle: {
                color: 'gradient',
                curveness: 0.5
            },
            label: {
                fontSize: 12,
                color: '#374151'
            }
        }]
    };
    photovoltaicChart.setOption(option);
}

// 初始化科研楼单楼栋碳排放量页面（新版本）
function initResearchBuildingEmissionNew() {
    const chart = echarts.init(document.getElementById('research-building-chart'));
    const buildings = buildingsData.laboratory;

    // 显示全楼栋对比
    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: buildings.map(b => b.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: buildings.map(b => b.carbonEmission),
            type: 'bar',
            itemStyle: { color: '#3b82f6' }
        }]
    };
    chart.setOption(option);
    charts['research-building'] = chart;

    // 楼栋选择器事件
    document.getElementById('research-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            // 显示全楼栋对比
            chart.setOption(option);
            document.getElementById('research-building-emission-value').textContent = '16,020';
            document.getElementById('research-building-growth-rate').textContent = '-2.3%';
            document.getElementById('research-building-calculation-basis').textContent =
                '科研楼总排放量：工科综合实验楼2,920吨 + 化学生院楼1 2,850吨 + 化学生院楼2 2,680吨 + 其他楼栋7,570吨 = 16,020吨';
            document.getElementById('research-building-details').innerHTML = '';
        } else {
            // 显示单个楼栋详情
            const index = parseInt(value);
            const building = buildings[index];

            // 高亮选中的楼栋
            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: buildings.map(b => b.name),
                    axisLabel: { rotate: 45, interval: 0 }
                },
                yAxis: { type: 'value', name: '吨CO₂' },
                series: [{
                    data: buildings.map((b, i) => ({
                        value: b.carbonEmission,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar',
                    emphasis: {
                        itemStyle: { color: '#ef4444' }
                    }
                }]
            };
            chart.setOption(highlightOption);

            // 更新数值
            document.getElementById('research-building-emission-value').textContent = building.carbonEmission.toLocaleString();
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('research-building-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('research-building-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            // 显示详细分析
            const monthlyData = Array.from({length: 12}, () => Math.floor(building.carbonEmission / 12 * (0.8 + Math.random() * 0.4)));
            document.getElementById('research-building-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度排放趋势</h5>
                    <div id="research-building-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-purple-600">${(building.carbonEmission / 12).toFixed(0)}</div>
                        <div class="text-sm text-purple-800">月均排放量 (吨)</div>
                    </div>
                    <div class="bg-indigo-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-indigo-600">${((building.carbonEmission / 12) / 30).toFixed(1)}</div>
                        <div class="text-sm text-indigo-800">日均排放量 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${(building.carbonEmission / 16020 * 100).toFixed(1)}%</div>
                        <div class="text-sm text-blue-800">占科研楼总量</div>
                    </div>
                </div>
            `;

            // 绘制月度趋势图
            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('research-building-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: '吨CO₂' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#3b82f6' },
                        areaStyle: { color: 'rgba(59, 130, 246, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('research-building-calculation-basis').textContent =
                `${building.name}年度排放量：${building.carbonEmission}吨CO₂，占科研楼总排放量的${(building.carbonEmission / 16020 * 100).toFixed(1)}%`;
        }
    });
}

// 初始化故障诊断图表
function initFaultDiagnosisCharts() {
    // 故障分布图
    const faultDistributionOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        series: [{
            name: '异常设备分布',
            type: 'pie',
            radius: '70%',
            data: mockData.faultData.distribution.map(item => ({
                value: item.value,
                name: item.name
            })),
            itemStyle: {
                borderRadius: 6,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c}%',
                fontSize: 11
            }
        }]
    };
    charts.faultDistribution.setOption(faultDistributionOption);

    // 故障趋势图
    const faultTrendOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}<br/>故障数: ${data.value} 个`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.faultData.trend.months,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '故障数量',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.faultData.trend.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: '#ef4444', width: 3 },
            itemStyle: { color: '#ef4444' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
                    { offset: 1, color: 'rgba(239, 68, 68, 0.1)' }
                ])
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.faultTrend.setOption(faultTrendOption);
}

// 初始化宿舍楼图表
function initDormitoryCharts() {
    // 宿舍楼趋势图
    const dormitoryTrendOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}年<br/>排放量: ${data.value} 吨CO₂`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.dormitoryBuilding.yearlyTrend.years,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.dormitoryBuilding.yearlyTrend.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: '#8b5cf6', width: 3 },
            itemStyle: { color: '#8b5cf6' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
                    { offset: 1, color: 'rgba(139, 92, 246, 0.1)' }
                ])
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.dormitoryTrend.setOption(dormitoryTrendOption);

    // 宿舍楼设备分布图
    const dormitoryEquipmentOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        series: [{
            name: '设备能耗占比',
            type: 'pie',
            radius: '70%',
            data: mockData.dormitoryBuilding.equipmentDistribution.map(item => ({
                value: item.value,
                name: item.name
            })),
            itemStyle: {
                borderRadius: 6,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c}%',
                fontSize: 11
            }
        }]
    };
    charts.dormitoryEquipment.setOption(dormitoryEquipmentOption);
}

// 初始化教学楼图表
function initTeachingBuildingCharts() {
    const teachingTrendOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}年<br/>排放量: ${data.value} 吨CO₂`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.teachingBuilding.yearlyTrend.years,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.teachingBuilding.yearlyTrend.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: '#10b981', width: 3 },
            itemStyle: { color: '#10b981' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
                    { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
                ])
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.teachingTrend.setOption(teachingTrendOption);

    const teachingEquipmentOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        series: [{
            name: '设备能耗占比',
            type: 'pie',
            radius: '70%',
            data: mockData.teachingBuilding.equipmentDistribution.map(item => ({
                value: item.value,
                name: item.name
            })),
            itemStyle: {
                borderRadius: 6,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c}%',
                fontSize: 11
            }
        }]
    };
    charts.teachingEquipment.setOption(teachingEquipmentOption);
}

// 初始化图书馆图表
function initLibraryCharts() {
    const libraryTrendOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}年<br/>排放量: ${data.value} 吨CO₂`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.libraryBuilding.yearlyTrend.years,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.libraryBuilding.yearlyTrend.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: '#6366f1', width: 3 },
            itemStyle: { color: '#6366f1' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(99, 102, 241, 0.3)' },
                    { offset: 1, color: 'rgba(99, 102, 241, 0.1)' }
                ])
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.libraryTrend.setOption(libraryTrendOption);

    const libraryEquipmentOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        series: [{
            name: '设备能耗占比',
            type: 'pie',
            radius: '70%',
            data: mockData.libraryBuilding.equipmentDistribution.map(item => ({
                value: item.value,
                name: item.name
            })),
            itemStyle: {
                borderRadius: 6,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c}%',
                fontSize: 11
            }
        }]
    };
    charts.libraryEquipment.setOption(libraryEquipmentOption);
}

// 初始化食堂图表
function initCanteenCharts() {
    const canteenTrendOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}年<br/>排放量: ${data.value} 吨CO₂`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.canteenBuilding.yearlyTrend.years,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.canteenBuilding.yearlyTrend.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: '#f59e0b', width: 3 },
            itemStyle: { color: '#f59e0b' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
                    { offset: 1, color: 'rgba(245, 158, 11, 0.1)' }
                ])
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.canteenTrend.setOption(canteenTrendOption);

    const canteenEquipmentOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        series: [{
            name: '设备能耗占比',
            type: 'pie',
            radius: '70%',
            data: mockData.canteenBuilding.equipmentDistribution.map(item => ({
                value: item.value,
                name: item.name
            })),
            itemStyle: {
                borderRadius: 6,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c}%',
                fontSize: 11
            }
        }]
    };
    charts.canteenEquipment.setOption(canteenEquipmentOption);
}

// 初始化体育馆图表
function initGymnasiumCharts() {
    const gymnasiumTrendOption = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const data = params[0];
                return `${data.name}年<br/>排放量: ${data.value} 吨CO₂`;
            }
        },
        xAxis: {
            type: 'category',
            data: mockData.gymnasiumBuilding.yearlyTrend.years,
            axisLabel: { fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂',
            axisLabel: { fontSize: 10 }
        },
        series: [{
            data: mockData.gymnasiumBuilding.yearlyTrend.values,
            type: 'line',
            smooth: true,
            lineStyle: { color: '#ef4444', width: 3 },
            itemStyle: { color: '#ef4444' },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
                    { offset: 1, color: 'rgba(239, 68, 68, 0.1)' }
                ])
            }
        }],
        grid: { top: 40, right: 20, bottom: 40, left: 60 }
    };
    charts.gymnasiumTrend.setOption(gymnasiumTrendOption);

    const gymnasiumEquipmentOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        series: [{
            name: '设备能耗占比',
            type: 'pie',
            radius: '70%',
            data: mockData.gymnasiumBuilding.equipmentDistribution.map(item => ({
                value: item.value,
                name: item.name
            })),
            itemStyle: {
                borderRadius: 6,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}\n{c}%',
                fontSize: 11
            }
        }]
    };
    charts.gymnasiumEquipment.setOption(gymnasiumEquipmentOption);
}

// 初始化优化建议模块
function initOptimizationSuggestions() {
    // 这个模块主要是静态内容展示，不需要图表初始化
    console.log('优化建议模块已加载');
}

// 初始化碳报告模块
function initCarbonReport() {
    // 这个模块主要是静态内容展示，不需要图表初始化
    console.log('碳报告模块已加载');
}

// 获取主要设备信息
function getMainEquipment(functionalArea) {
    const equipmentMap = {
        '科研楼': '大型实验仪器',
        '宿舍楼': '空调系统',
        '图书馆': '照明系统',
        '教学楼': '多媒体设备',
        '食堂': '厨房设备',
        '体育馆': '照明空调'
    };
    return equipmentMap[functionalArea] || '其他设备';
}

// 更新最后更新时间
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

// 响应式处理
window.addEventListener('resize', function() {
    Object.values(charts).forEach(chart => {
        if (chart && chart.resize) {
            chart.resize();
        }
    });
});

// 模拟实时数据更新
setInterval(function() {
    updateLastUpdateTime();
    
    // 随机更新一些数据以模拟实时变化
    const currentTime = new Date();
    if (currentTime.getSeconds() % 30 === 0) {
        // 每30秒更新一次数据
        mockData.monthlyEmission.values[mockData.monthlyEmission.values.length - 1] += Math.random() * 10 - 5;
        
        // 如果当前显示的是月排放图表，则更新
        if (currentSection === 'total-emission') {
            initTotalEmissionCharts();
        }
    }
}, 1000);

// 导出功能（模拟）
function exportData(format) {
    alert(`正在导出数据，格式：${format}\n\n这是一个演示功能，实际应用中会下载真实的文件。`);
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 图表点击事件处理
Object.values(charts).forEach(chart => {
    if (chart) {
        chart.on('click', function(params) {
            console.log('图表点击事件:', params);
            // 这里可以添加更多交互逻辑
        });
    }
});

// 初始化科研楼能源结构监测图表
function initResearchEnergyStructureChart() {
    updateEnergyStructureChart('all');

    // 楼栋选择器事件监听
    const buildingSelector = document.getElementById('energy-structure-building-selector');
    if (buildingSelector) {
        buildingSelector.addEventListener('change', function() {
            const selectedBuilding = this.value;
            updateEnergyStructureChart(selectedBuilding);
        });
    }
}

// 更新能源结构图表
function updateEnergyStructureChart(buildingType) {
    const chart = initChartIfNeeded('researchEnergyStructure', 'research-energy-structure-chart');
    if (!chart) return;

    const energyData = mockData.researchBuildingData.energyStructure;

    const option = {
        title: {
            text: `${buildingType === 'all' ? '全楼栋' : buildingType + '栋'}能源结构分析`,
            left: 'center',
            textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.seriesName === '一次能源') {
                    const data = energyData.primaryEnergy.find(item => item.name === params.name);
                    if (params.name === '电力') {
                        return `
                            <div style="padding: 8px;">
                                <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
                                <div>2023年电力碳排放 ${data.emission.toLocaleString()} 吨，占比 ${data.value}%</div>
                                <div>同比2022年上升0.5%；主要因新增5台大型光谱仪，单台日耗电120kWh</div>
                            </div>
                        `;
                    } else if (params.name === '天然气') {
                        return `
                            <div style="padding: 8px;">
                                <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
                                <div>2023年天然气碳排放 ${data.emission.toLocaleString()} 吨，占比 ${data.value}%</div>
                                <div>主要用于实验室恒温需求，冬季1-2月用量峰值</div>
                            </div>
                        `;
                    } else {
                        return `
                            <div style="padding: 8px;">
                                <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
                                <div>碳排放 ${data.emission.toLocaleString()} 吨，占比 ${data.value}%</div>
                            </div>
                        `;
                    }
                } else {
                    const data = energyData.electricityUsage.find(item => item.name === params.name);
                    if (params.name === '实验设备') {
                        return `
                            <div style="padding: 8px;">
                                <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
                                <div>实验设备年耗电480万kWh，折合碳排放${data.emission.toLocaleString()}吨</div>
                                <div>占电力排放${data.value}%；其中高温炉系列占实验设备总能耗62%</div>
                            </div>
                        `;
                    } else {
                        return `
                            <div style="padding: 8px;">
                                <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
                                <div>碳排放 ${data.emission.toLocaleString()} 吨，占电力排放 ${data.value}%</div>
                            </div>
                        `;
                    }
                }
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle',
            data: energyData.primaryEnergy.map(item => item.name).concat(energyData.electricityUsage.map(item => item.name))
        },
        series: [
            {
                name: '一次能源',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '40%'],
                center: ['60%', '50%'],
                data: energyData.primaryEnergy.map(item => ({
                    name: item.name,
                    value: item.value,
                    itemStyle: { color: item.color }
                })),
                label: {
                    position: 'inner',
                    fontSize: 12,
                    formatter: '{b}\n{c}%'
                }
            },
            {
                name: '电力用途细分',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['60%', '50%'],
                data: energyData.electricityUsage.map(item => ({
                    name: item.name,
                    value: item.value,
                    itemStyle: { color: item.color }
                })),
                label: {
                    formatter: '{b}\n{c}%',
                    fontSize: 11
                }
            }
        ]
    };

    chart.setOption(option);

    // 点击事件：显示月度趋势
    chart.off('click');
    chart.on('click', function(params) {
        if (params.seriesName === '一次能源') {
            showEnergyTrend(params.name);
        }
    });
}

// 显示能源月度趋势
function showEnergyTrend(energyType) {
    const trendPanel = document.getElementById('energy-trend-panel');
    const trendTitle = document.getElementById('energy-trend-title');
    const trendData = mockData.researchBuildingData.energyStructure.monthlyTrends[energyType];

    if (!trendData || !trendPanel) return;

    trendPanel.classList.remove('hidden');
    if (trendTitle) trendTitle.textContent = `${energyType}月度趋势 (2023年)`;

    const trendChart = initChartIfNeeded('energyTrend', 'energy-trend-chart');
    if (!trendChart) return;

    const option = {
        title: {
            text: `${energyType}2023年各月用量`,
            left: 'center',
            textStyle: { fontSize: 14 }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const month = params[0].axisValue;
                const value = params[0].value;
                let unit = energyType === '电力' ? 'kWh' : (energyType === '天然气' ? 'm³' : 'L');
                let tip = `${month}: ${value.toLocaleString()} ${unit}`;

                if (energyType === '天然气' && (month === '1月' || month === '2月')) {
                    tip += '<br/>冬季实验室恒温需求用量峰值';
                }

                return tip;
            }
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value',
            name: energyType === '电力' ? '用量 (万kWh)' : (energyType === '天然气' ? '用量 (万m³)' : '用量 (L)')
        },
        series: [{
            name: energyType,
            type: 'line',
            data: trendData,
            smooth: true,
            itemStyle: {
                color: energyType === '电力' ? '#ef4444' :
                       energyType === '天然气' ? '#f59e0b' :
                       energyType === '柴油' ? '#6b7280' : '#9ca3af'
            },
            areaStyle: { opacity: 0.3 }
        }]
    };

    trendChart.setOption(option);
}

// 初始化科研楼时段结构监测图表
function initResearchTimeStructureChart() {
    updateTimeStructureChart('all');

    // 楼栋选择器事件监听
    const buildingSelector = document.getElementById('time-structure-building-selector');
    if (buildingSelector) {
        buildingSelector.addEventListener('change', function() {
            const selectedBuilding = this.value;
            updateTimeStructureChart(selectedBuilding);
        });
    }
}

// 更新时段结构图表
function updateTimeStructureChart(buildingType) {
    const timeChart = initChartIfNeeded('researchTimeStructure', 'research-time-structure-chart');
    const heatmapChart = initChartIfNeeded('researchHeatmap', 'research-heatmap-chart');

    if (!timeChart || !heatmapChart) return;

    const timeData = mockData.researchBuildingData.timeStructure;

    // 时段堆叠条形图
    const timeOption = {
        title: {
            text: `${buildingType === 'all' ? '全楼栋' : buildingType + '栋'}时段碳排放分布`,
            left: 'center',
            textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
                const timeSlot = params[0].name;
                const percentage = timeData.timeSlots.find(slot => slot.name === timeSlot).percentage;
                let result = `<div style="padding: 8px;">`;
                result += `<div style="font-weight: bold; margin-bottom: 4px;">${timeSlot}</div>`;
                result += `<div>占比: <span style="color: #ef4444; font-weight: bold;">${percentage}%</span></div>`;

                if (timeSlot === '14:00-18:00') {
                    result += `<div style="margin-top: 4px; color: #666;">高能耗时段，主要设备：大型实验仪器45%、空调系统30%</div>`;
                }

                result += `</div>`;
                return result;
            }
        },
        xAxis: {
            type: 'value',
            name: '占比 (%)'
        },
        yAxis: {
            type: 'category',
            data: timeData.timeSlots.map(slot => slot.name)
        },
        series: [{
            name: '时段占比',
            type: 'bar',
            data: timeData.timeSlots.map(slot => ({
                value: slot.percentage,
                itemStyle: { color: slot.color }
            })),
            label: {
                show: true,
                position: 'right',
                formatter: '{c}%'
            }
        }]
    };

    timeChart.setOption(timeOption);

    // 点击事件：显示时段详情
    timeChart.off('click');
    timeChart.on('click', function(params) {
        showTimeDetail(params.name);
    });

    // 一周能耗热力图
    const heatmapOption = {
        title: {
            text: '一周能耗热力图',
            left: 'center',
            textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        tooltip: {
            position: 'top',
            formatter: function(params) {
                const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
                const times = ['00:00-08:00', '08:00-12:00', '12:00-14:00', '14:00-18:00', '18:00-24:00'];
                const day = days[params.data[1]];
                const time = times[params.data[0]];
                const intensity = params.data[2];

                let tip = `${day} ${time}<br/>排放强度: ${intensity} 吨CO₂`;

                if (params.data[1] >= 5 && params.data[0] >= 1 && params.data[0] <= 3) {
                    tip += '<br/>周末时段，主要为连续实验设备运行';
                }

                return tip;
            }
        },
        grid: {
            height: '60%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: ['00:00-08:00', '08:00-12:00', '12:00-14:00', '14:00-18:00', '18:00-24:00'],
            splitArea: { show: true }
        },
        yAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            splitArea: { show: true }
        },
        visualMap: {
            min: 0,
            max: 45,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            inRange: {
                color: ['#50a3ba', '#eac736', '#d94e5d']
            }
        },
        series: [{
            name: '排放强度',
            type: 'heatmap',
            data: timeData.heatmapData.flatMap((dayData, dayIndex) =>
                dayData.map((value, timeIndex) => [timeIndex, dayIndex, value])
            ),
            label: {
                show: true,
                formatter: '{c}'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    heatmapChart.setOption(heatmapOption);
}

// 显示时段详情
function showTimeDetail(timeSlot) {
    const detailPanel = document.getElementById('time-detail-panel');
    const detailTitle = document.getElementById('time-detail-title');
    const detailContent = document.getElementById('time-detail-content');

    if (!detailPanel || !detailTitle || !detailContent) return;

    const timeData = mockData.researchBuildingData.timeStructure;
    const deviceData = timeData.deviceBreakdown[timeSlot];

    if (!deviceData) return;

    detailPanel.classList.remove('hidden');
    detailTitle.textContent = `${timeSlot} 设备能耗详情`;

    let contentHtml = '<div class="grid grid-cols-2 md:grid-cols-4 gap-4">';
    deviceData.forEach(device => {
        contentHtml += `
            <div class="bg-gray-50 p-3 rounded-lg text-center">
                <div class="text-lg font-bold text-gray-800">${device.value}%</div>
                <div class="text-sm text-gray-600">${device.name}</div>
            </div>
        `;
    });
    contentHtml += '</div>';

    if (timeSlot === '14:00-18:00') {
        contentHtml += `
            <div class="mt-4 p-4 bg-red-50 rounded-lg">
                <h5 class="font-semibold text-red-800 mb-2">高能耗时段分析</h5>
                <p class="text-sm text-red-700">该时段为实验活动高峰期，大型实验仪器集中运行，建议推行错峰使用策略</p>
            </div>
        `;
    }

    detailContent.innerHTML = contentHtml;
}

// 初始化科研经费效率监测图表
function initResearchFundingEfficiencyChart() {
    updateFundingEfficiencyChart('all');

    // 楼栋选择器事件监听
    const buildingSelector = document.getElementById('funding-efficiency-building-selector');
    if (buildingSelector) {
        buildingSelector.addEventListener('change', function() {
            const selectedBuilding = this.value;
            updateFundingEfficiencyChart(selectedBuilding);
        });
    }
}

// 更新科研经费效率图表
function updateFundingEfficiencyChart(buildingType) {
    const trendChart = initChartIfNeeded('researchFundingTrend', 'research-funding-trend-chart');
    const comparisonChart = initChartIfNeeded('researchFundingComparison', 'research-funding-comparison-chart');

    if (!trendChart || !comparisonChart) return;

    const fundingData = mockData.researchBuildingData.fundingEfficiency;

    // 趋势折线图
    const trendOption = {
        title: {
            text: `${buildingType === 'all' ? '全楼栋' : buildingType + '栋'}单位科研经费碳排放趋势`,
            left: 'center',
            top: '5%',
            textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const year = params[0].name;
                const value = params[0].value;
                const targetValue = fundingData.trend.targetLine;
                const measure = fundingData.optimizationMeasures[year];

                let result = `<div style="padding: 8px;">`;
                result += `<div style="font-weight: bold; margin-bottom: 4px;">${year}年单位科研经费碳排放</div>`;
                result += `<div>排放强度: <span style="color: #22c55e; font-weight: bold;">${value} 吨CO₂/万元</span></div>`;
                result += `<div>距离2025年目标: ${(value - targetValue).toFixed(2)} 吨CO₂/万元</div>`;

                if (measure) {
                    result += `<div style="margin-top: 4px; color: #666;">优化措施: ${measure}</div>`;
                }

                result += `</div>`;
                return result;
            }
        },
        legend: {
            data: ['实际值', '2025年目标'],
            top: '15%',
            left: 'center'
        },
        grid: {
            top: '25%',
            left: '10%',
            right: '10%',
            bottom: '10%'
        },
        xAxis: {
            type: 'category',
            data: fundingData.trend.years
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂/万元',
            min: 0.6,
            max: 1.1
        },
        series: [
            {
                name: '实际值',
                type: 'line',
                data: fundingData.trend.values,
                smooth: true,
                itemStyle: { color: '#22c55e' },
                lineStyle: { width: 3 },
                symbol: 'circle',
                symbolSize: 8,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
                            { offset: 1, color: 'rgba(34, 197, 94, 0.1)' }
                        ]
                    }
                }
            },
            {
                name: '2025年目标',
                type: 'line',
                data: new Array(fundingData.trend.years.length).fill(fundingData.trend.targetLine),
                lineStyle: { color: '#ef4444', type: 'dashed', width: 2 },
                itemStyle: { color: '#ef4444' },
                symbol: 'none'
            }
        ]
    };

    trendChart.setOption(trendOption);

    // 横向对比柱状图
    const comparisonOption = {
        title: {
            text: '校内各科研单位横向对比 (2023年)',
            left: 'center',
            top: '5%',
            textStyle: { fontSize: 16, fontWeight: 'bold' }
        },
        grid: {
            top: '15%',
            left: '10%',
            right: '10%',
            bottom: '10%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
                const unit = params[0].name;
                const value = params[0].value;
                const benchmark = 0.95; // 985高校平均水平
                const performance = ((benchmark - value) / benchmark * 100).toFixed(1);

                let result = `<div style="padding: 8px;">`;
                result += `<div style="font-weight: bold; margin-bottom: 4px;">${unit}</div>`;
                result += `<div>排放强度: <span style="color: #3b82f6; font-weight: bold;">${value} 吨CO₂/万元</span></div>`;
                result += `<div>相比985高校平均水平: ${performance > 0 ? '优于' : '低于'} ${Math.abs(performance)}%</div>`;

                if (unit === '科研楼') {
                    result += `<div style="margin-top: 4px; color: #22c55e;">表现优秀，但仍有提升空间</div>`;
                } else if (unit === '化工学院') {
                    result += `<div style="margin-top: 4px; color: #ef4444;">需要重点改进，建议引入节能设备</div>`;
                }

                result += `</div>`;
                return result;
            }
        },
        xAxis: {
            type: 'category',
            data: fundingData.comparison.map(item => item.name)
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂/万元'
        },
        series: [{
            name: '单位科研经费碳排放',
            type: 'bar',
            data: fundingData.comparison.map(item => ({
                value: item.value,
                itemStyle: { color: item.color }
            })),
            label: {
                show: true,
                position: 'top',
                formatter: '{c}'
            },
            barWidth: '60%'
        }]
    };

    comparisonChart.setOption(comparisonOption);
}

// 初始化宿舍楼碳排放量页面
function initDormitoryEmissionMonitoring() {
    // 年碳排放总量图表
    const yearlyChart = echarts.init(document.getElementById('dormitory-yearly-emission-chart'));
    const yearlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [24500, 24200, 23800, 23500, 23200, 23420, 22678],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#9333ea' },
            areaStyle: { color: 'rgba(147, 51, 234, 0.1)' }
        }]
    };
    yearlyChart.setOption(yearlyOption);

    // 月碳排放总量图表
    const monthlyChart = echarts.init(document.getElementById('dormitory-monthly-emission-chart'));
    const monthlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [2100, 1695, 2010, 1890, 1850, 1920, 1980, 1750, 1880, 1950, 2020, 2100],
            type: 'bar',
            itemStyle: { color: '#9333ea' }
        }]
    };
    monthlyChart.setOption(monthlyOption);

    // 日碳排放总量图表
    const dailyChart = echarts.init(document.getElementById('dormitory-daily-emission-chart'));
    const dailyData = Array.from({length: 30}, (_, i) => Math.floor(60 + Math.random() * 20));
    const dailyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: Array.from({length: 30}, (_, i) => `${i+1}日`) },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: dailyData,
            type: 'line',
            smooth: true,
            itemStyle: { color: '#9333ea' }
        }]
    };
    dailyChart.setOption(dailyOption);

    charts['dormitory-yearly-emission'] = yearlyChart;
    charts['dormitory-monthly-emission'] = monthlyChart;
    charts['dormitory-daily-emission'] = dailyChart;
}

// 初始化宿舍楼单楼栋碳排放量页面
function initDormitoryBuildingEmission() {
    const chart = echarts.init(document.getElementById('dormitory-building-chart'));
    const buildings = buildingsData.dormitory;

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: buildings.map(b => b.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: buildings.map(b => b.carbonEmission),
            type: 'bar',
            itemStyle: { color: '#9333ea' }
        }]
    };
    chart.setOption(option);
    charts['dormitory-building'] = chart;

    // 楼栋选择器事件
    document.getElementById('dormitory-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            // 显示全楼栋对比
            chart.setOption(option);
            document.getElementById('dormitory-building-emission-value').textContent = '22,678';
            document.getElementById('dormitory-building-growth-rate').textContent = '-3.2%';
            document.getElementById('dormitory-building-calculation-basis').textContent =
                '宿舍楼总排放量：31栋宿舍楼合计 = 22,678吨';
            document.getElementById('dormitory-building-details').innerHTML = '';
        } else {
            // 显示单个楼栋详情
            const index = parseInt(value);
            const building = buildings[index];

            // 高亮选中的楼栋
            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: buildings.map(b => b.name),
                    axisLabel: { rotate: 45, interval: 0 }
                },
                yAxis: { type: 'value', name: '吨CO₂' },
                series: [{
                    data: buildings.map((b, i) => ({
                        value: b.carbonEmission,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar',
                    emphasis: {
                        itemStyle: { color: '#ef4444' }
                    }
                }]
            };
            chart.setOption(highlightOption);

            // 更新数值
            document.getElementById('dormitory-building-emission-value').textContent = building.carbonEmission.toLocaleString();
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('dormitory-building-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('dormitory-building-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            // 显示详细分析
            const monthlyData = Array.from({length: 12}, () => Math.floor(building.carbonEmission / 12 * (0.8 + Math.random() * 0.4)));
            document.getElementById('dormitory-building-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度排放趋势</h5>
                    <div id="dormitory-building-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-purple-600">${(building.carbonEmission / 12).toFixed(0)}</div>
                        <div class="text-sm text-purple-800">月均排放量 (吨)</div>
                    </div>
                    <div class="bg-indigo-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-indigo-600">${((building.carbonEmission / 12) / 30).toFixed(1)}</div>
                        <div class="text-sm text-indigo-800">日均排放量 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${(building.carbonEmission / 22678 * 100).toFixed(1)}%</div>
                        <div class="text-sm text-blue-800">占宿舍楼总量</div>
                    </div>
                </div>
            `;

            // 绘制月度趋势图
            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('dormitory-building-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: '吨CO₂' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#9333ea' },
                        areaStyle: { color: 'rgba(147, 51, 234, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('dormitory-building-calculation-basis').textContent =
                `${building.name}年度排放量：${building.carbonEmission}吨CO₂，占宿舍楼总排放量的${(building.carbonEmission / 22678 * 100).toFixed(1)}%`;
        }
    });
}

// 初始化宿舍楼人均碳排放量页面
function initDormitoryPerCapita() {
    const chart = echarts.init(document.getElementById('dormitory-per-capita-chart'));
    const buildings = buildingsData.dormitory;
    const avgPeople = 400; // 假设每栋宿舍楼平均住400人

    const perCapitaData = buildings.map(b => ({
        name: b.name,
        value: parseFloat((b.carbonEmission / avgPeople).toFixed(2))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: perCapitaData.map(d => d.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: '吨CO₂/人' },
        series: [{
            data: perCapitaData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#9333ea' }
        }]
    };
    chart.setOption(option);
    charts['dormitory-per-capita'] = chart;

    // 楼栋选择器事件
    document.getElementById('dormitory-per-capita-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            chart.setOption(option);
            document.getElementById('dormitory-per-capita-value').textContent = '1.89';
            document.getElementById('dormitory-per-capita-growth-rate').textContent = '-3.2%';
            document.getElementById('dormitory-per-capita-calculation-basis').textContent =
                '学生人数统计：在校住宿学生约12,000人，人均排放 = 22,678吨 ÷ 12,000人 = 1.89吨/人';
            document.getElementById('dormitory-per-capita-details').innerHTML = '';
        } else {
            const index = parseInt(value);
            const building = buildings[index];
            const perCapita = perCapitaData[index].value;

            // 高亮选中的楼栋
            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: perCapitaData.map(d => d.name),
                    axisLabel: { rotate: 45, interval: 0 }
                },
                yAxis: { type: 'value', name: '吨CO₂/人' },
                series: [{
                    data: perCapitaData.map((d, i) => ({
                        value: d.value,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar'
                }]
            };
            chart.setOption(highlightOption);

            document.getElementById('dormitory-per-capita-value').textContent = perCapita;
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('dormitory-per-capita-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('dormitory-per-capita-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            const monthlyData = Array.from({length: 12}, () => (perCapita / 12 * (0.8 + Math.random() * 0.4)).toFixed(3));
            document.getElementById('dormitory-per-capita-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度人均排放趋势</h5>
                    <div id="dormitory-per-capita-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-purple-600">${(perCapita / 12).toFixed(3)}</div>
                        <div class="text-sm text-purple-800">月均人均排放 (吨/人)</div>
                    </div>
                    <div class="bg-indigo-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-indigo-600">${building.carbonEmission.toLocaleString()}</div>
                        <div class="text-sm text-indigo-800">楼栋总排放 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${avgPeople}</div>
                        <div class="text-sm text-blue-800">预估入住人数</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('dormitory-per-capita-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: '吨CO₂/人' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#9333ea' },
                        areaStyle: { color: 'rgba(147, 51, 234, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('dormitory-per-capita-calculation-basis').textContent =
                `${building.name}人均排放：${building.carbonEmission}吨 ÷ ${avgPeople}人 = ${perCapita}吨/人`;
        }
    });
}

// 初始化宿舍楼单位面积碳排放量页面
function initDormitoryAreaIntensity() {
    const chart = echarts.init(document.getElementById('dormitory-area-intensity-chart'));
    const buildings = buildingsData.dormitory;
    const avgArea = 8000; // 假设每栋宿舍楼平均面积8000㎡

    const areaIntensityData = buildings.map(b => ({
        name: b.name,
        value: parseFloat(((b.carbonEmission * 1000) / avgArea).toFixed(1))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: areaIntensityData.map(d => d.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: 'kgCO₂/m²' },
        series: [{
            data: areaIntensityData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#f97316' }
        }]
    };
    chart.setOption(option);
    charts['dormitory-area-intensity'] = chart;

    // 楼栋选择器事件
    document.getElementById('dormitory-area-intensity-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            chart.setOption(option);
            document.getElementById('dormitory-area-intensity-value').textContent = '95';
            document.getElementById('dormitory-area-intensity-growth-rate').textContent = '-3.2%';
            document.getElementById('dormitory-area-intensity-calculation-basis').textContent =
                '建筑面积：宿舍楼总建筑面积约23.87万㎡，单位面积排放 = 22,678吨 ÷ 238,700㎡ = 95 kgCO₂/m²';
            document.getElementById('dormitory-area-intensity-details').innerHTML = '';
        } else {
            const index = parseInt(value);
            const building = buildings[index];
            const areaIntensity = areaIntensityData[index].value;

            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: areaIntensityData.map(d => d.name),
                    axisLabel: { rotate: 45, interval: 0 }
                },
                yAxis: { type: 'value', name: 'kgCO₂/m²' },
                series: [{
                    data: areaIntensityData.map((d, i) => ({
                        value: d.value,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar'
                }]
            };
            chart.setOption(highlightOption);

            document.getElementById('dormitory-area-intensity-value').textContent = areaIntensity;
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('dormitory-area-intensity-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('dormitory-area-intensity-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            const monthlyData = Array.from({length: 12}, () => (areaIntensity * (0.8 + Math.random() * 0.4)).toFixed(1));
            document.getElementById('dormitory-area-intensity-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度单位面积排放趋势</h5>
                    <div id="dormitory-area-intensity-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-orange-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-orange-600">${(areaIntensity / 12).toFixed(1)}</div>
                        <div class="text-sm text-orange-800">月均单位面积排放 (kgCO₂/m²)</div>
                    </div>
                    <div class="bg-amber-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-amber-600">${building.carbonEmission.toLocaleString()}</div>
                        <div class="text-sm text-amber-800">楼栋总排放 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${avgArea.toLocaleString()}</div>
                        <div class="text-sm text-blue-800">预估建筑面积 (m²)</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('dormitory-area-intensity-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: 'kgCO₂/m²' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#f97316' },
                        areaStyle: { color: 'rgba(249, 115, 22, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('dormitory-area-intensity-calculation-basis').textContent =
                `${building.name}单位面积排放：${building.carbonEmission}吨 × 1000 ÷ ${avgArea}m² = ${areaIntensity} kgCO₂/m²`;
        }
    });
}

// 初始化教学楼碳排放量页面
function initTeachingEmissionMonitoring() {
    // 年碳排放总量图表
    const yearlyChart = echarts.init(document.getElementById('teaching-yearly-emission-chart'));
    const yearlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [7200, 7150, 7100, 7050, 7000, 6990, 6845],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#22c55e' },
            areaStyle: { color: 'rgba(34, 197, 94, 0.1)' }
        }]
    };
    yearlyChart.setOption(yearlyOption);

    // 月碳排放总量图表
    const monthlyChart = echarts.init(document.getElementById('teaching-monthly-emission-chart'));
    const monthlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [620, 539, 605, 570, 560, 580, 590, 520, 560, 580, 600, 620],
            type: 'bar',
            itemStyle: { color: '#22c55e' }
        }]
    };
    monthlyChart.setOption(monthlyOption);

    // 日碳排放总量图表
    const dailyChart = echarts.init(document.getElementById('teaching-daily-emission-chart'));
    const dailyData = Array.from({length: 30}, (_, i) => Math.floor(18 + Math.random() * 6));
    const dailyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: Array.from({length: 30}, (_, i) => `${i+1}日`) },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: dailyData,
            type: 'line',
            smooth: true,
            itemStyle: { color: '#22c55e' }
        }]
    };
    dailyChart.setOption(dailyOption);

    charts['teaching-yearly-emission'] = yearlyChart;
    charts['teaching-monthly-emission'] = monthlyChart;
    charts['teaching-daily-emission'] = dailyChart;
}

// 初始化教学楼单楼栋碳排放量页面
function initTeachingBuildingEmission() {
    const chart = echarts.init(document.getElementById('teaching-building-chart'));
    const buildings = buildingsData.teaching;

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: buildings.map(b => b.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: buildings.map(b => b.carbonEmission),
            type: 'bar',
            itemStyle: { color: '#22c55e' }
        }]
    };
    chart.setOption(option);
    charts['teaching-building'] = chart;

    // 楼栋选择器事件
    document.getElementById('teaching-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            chart.setOption(option);
            document.getElementById('teaching-building-emission-value').textContent = '6,845';
            document.getElementById('teaching-building-growth-rate').textContent = '-2.1%';
            document.getElementById('teaching-building-calculation-basis').textContent =
                '教学楼总排放量：9栋教学楼合计 = 6,845吨';
            document.getElementById('teaching-building-details').innerHTML = '';
        } else {
            const index = parseInt(value);
            const building = buildings[index];

            // 高亮选中的楼栋
            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: buildings.map(b => b.name),
                    axisLabel: { rotate: 45, interval: 0 }
                },
                yAxis: { type: 'value', name: '吨CO₂' },
                series: [{
                    data: buildings.map((b, i) => ({
                        value: b.carbonEmission,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar'
                }]
            };
            chart.setOption(highlightOption);

            document.getElementById('teaching-building-emission-value').textContent = building.carbonEmission.toLocaleString();
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('teaching-building-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('teaching-building-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            const monthlyData = Array.from({length: 12}, () => Math.floor(building.carbonEmission / 12 * (0.8 + Math.random() * 0.4)));
            document.getElementById('teaching-building-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度排放趋势</h5>
                    <div id="teaching-building-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-green-600">${(building.carbonEmission / 12).toFixed(0)}</div>
                        <div class="text-sm text-green-800">月均排放量 (吨)</div>
                    </div>
                    <div class="bg-emerald-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-emerald-600">${((building.carbonEmission / 12) / 30).toFixed(1)}</div>
                        <div class="text-sm text-emerald-800">日均排放量 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${(building.carbonEmission / 6845 * 100).toFixed(1)}%</div>
                        <div class="text-sm text-blue-800">占教学楼总量</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('teaching-building-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: '吨CO₂' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#22c55e' },
                        areaStyle: { color: 'rgba(34, 197, 94, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('teaching-building-calculation-basis').textContent =
                `${building.name}年度排放量：${building.carbonEmission}吨CO₂，占教学楼总排放量的${(building.carbonEmission / 6845 * 100).toFixed(1)}%`;
        }
    });
}

// 初始化教学楼人均碳排放量页面
function initTeachingPerCapita() {
    const chart = echarts.init(document.getElementById('teaching-per-capita-chart'));
    const buildings = buildingsData.teaching;
    const avgPeople = 2200;

    const perCapitaData = buildings.map(b => ({
        name: b.name,
        value: parseFloat((b.carbonEmission / avgPeople).toFixed(2))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: perCapitaData.map(d => d.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: '吨CO₂/人' },
        series: [{
            data: perCapitaData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#22c55e' }
        }]
    };
    chart.setOption(option);
    charts['teaching-per-capita'] = chart;

    document.getElementById('teaching-per-capita-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            chart.setOption(option);
            document.getElementById('teaching-per-capita-value').textContent = '0.34';
            document.getElementById('teaching-per-capita-growth-rate').textContent = '-2.1%';
            document.getElementById('teaching-per-capita-calculation-basis').textContent =
                '师生人数统计：教学楼日均使用人数约20,000人，人均排放 = 6,845吨 ÷ 20,000人 = 0.34吨/人';
            document.getElementById('teaching-per-capita-details').innerHTML = '';
        } else {
            const index = parseInt(value);
            const building = buildings[index];
            const perCapita = perCapitaData[index].value;

            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: perCapitaData.map(d => d.name),
                    axisLabel: { rotate: 45, interval: 0 }
                },
                yAxis: { type: 'value', name: '吨CO₂/人' },
                series: [{
                    data: perCapitaData.map((d, i) => ({
                        value: d.value,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar'
                }]
            };
            chart.setOption(highlightOption);

            document.getElementById('teaching-per-capita-value').textContent = perCapita;
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('teaching-per-capita-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('teaching-per-capita-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            const monthlyData = Array.from({length: 12}, () => (perCapita / 12 * (0.8 + Math.random() * 0.4)).toFixed(3));
            document.getElementById('teaching-per-capita-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度人均排放趋势</h5>
                    <div id="teaching-per-capita-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-green-600">${(perCapita / 12).toFixed(3)}</div>
                        <div class="text-sm text-green-800">月均人均排放 (吨/人)</div>
                    </div>
                    <div class="bg-emerald-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-emerald-600">${building.carbonEmission.toLocaleString()}</div>
                        <div class="text-sm text-emerald-800">楼栋总排放 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${avgPeople}</div>
                        <div class="text-sm text-blue-800">预估使用人数</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('teaching-per-capita-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: '吨CO₂/人' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#22c55e' },
                        areaStyle: { color: 'rgba(34, 197, 94, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('teaching-per-capita-calculation-basis').textContent =
                `${building.name}人均排放：${building.carbonEmission}吨 ÷ ${avgPeople}人 = ${perCapita}吨/人`;
        }
    });
}

// 初始化教学楼单位面积碳排放量页面
function initTeachingAreaIntensity() {
    const chart = echarts.init(document.getElementById('teaching-area-intensity-chart'));
    const buildings = buildingsData.teaching;
    const avgArea = 10000;

    const areaIntensityData = buildings.map(b => ({
        name: b.name,
        value: parseFloat(((b.carbonEmission * 1000) / avgArea).toFixed(1))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: areaIntensityData.map(d => d.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: 'kgCO₂/m²' },
        series: [{
            data: areaIntensityData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#f97316' }
        }]
    };
    chart.setOption(option);
    charts['teaching-area-intensity'] = chart;

    document.getElementById('teaching-area-intensity-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            chart.setOption(option);
            document.getElementById('teaching-area-intensity-value').textContent = '78';
            document.getElementById('teaching-area-intensity-growth-rate').textContent = '-2.1%';
            document.getElementById('teaching-area-intensity-calculation-basis').textContent =
                '建筑面积：教学楼总建筑面积约8.78万㎡，单位面积排放 = 6,845吨 ÷ 87,800㎡ = 78 kgCO₂/m²';
            document.getElementById('teaching-area-intensity-details').innerHTML = '';
        } else {
            const index = parseInt(value);
            const building = buildings[index];
            const areaIntensity = areaIntensityData[index].value;

            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: areaIntensityData.map(d => d.name),
                    axisLabel: { rotate: 45, interval: 0 }
                },
                yAxis: { type: 'value', name: 'kgCO₂/m²' },
                series: [{
                    data: areaIntensityData.map((d, i) => ({
                        value: d.value,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar'
                }]
            };
            chart.setOption(highlightOption);

            document.getElementById('teaching-area-intensity-value').textContent = areaIntensity;
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('teaching-area-intensity-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('teaching-area-intensity-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            const monthlyData = Array.from({length: 12}, () => (areaIntensity * (0.8 + Math.random() * 0.4)).toFixed(1));
            document.getElementById('teaching-area-intensity-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度单位面积排放趋势</h5>
                    <div id="teaching-area-intensity-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-orange-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-orange-600">${(areaIntensity / 12).toFixed(1)}</div>
                        <div class="text-sm text-orange-800">月均单位面积排放 (kgCO₂/m²)</div>
                    </div>
                    <div class="bg-amber-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-amber-600">${building.carbonEmission.toLocaleString()}</div>
                        <div class="text-sm text-amber-800">楼栋总排放 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${avgArea.toLocaleString()}</div>
                        <div class="text-sm text-blue-800">预估建筑面积 (m²)</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('teaching-area-intensity-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: 'kgCO₂/m²' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#f97316' },
                        areaStyle: { color: 'rgba(249, 115, 22, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('teaching-area-intensity-calculation-basis').textContent =
                `${building.name}单位面积排放：${building.carbonEmission}吨 × 1000 ÷ ${avgArea}m² = ${areaIntensity} kgCO₂/m²`;
        }
    });
}

// 初始化图书馆碳排放量页面
function initLibraryEmissionMonitoring() {
    // 年碳排放总量图表
    const yearlyChart = echarts.init(document.getElementById('library-yearly-emission-chart'));
    const yearlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [8800, 8750, 8700, 8650, 8600, 8610, 8456],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#6366f1' },
            areaStyle: { color: 'rgba(99, 102, 241, 0.1)' }
        }]
    };
    yearlyChart.setOption(yearlyOption);

    // 月碳排放总量图表
    const monthlyChart = echarts.init(document.getElementById('library-monthly-emission-chart'));
    const monthlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [760, 689, 748, 710, 700, 720, 730, 680, 710, 730, 750, 760],
            type: 'bar',
            itemStyle: { color: '#6366f1' }
        }]
    };
    monthlyChart.setOption(monthlyOption);

    // 日碳排放总量图表
    const dailyChart = echarts.init(document.getElementById('library-daily-emission-chart'));
    const dailyData = Array.from({length: 30}, (_, i) => Math.floor(23 + Math.random() * 8));
    const dailyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: Array.from({length: 30}, (_, i) => `${i+1}日`) },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: dailyData,
            type: 'line',
            smooth: true,
            itemStyle: { color: '#6366f1' }
        }]
    };
    dailyChart.setOption(dailyOption);

    charts['library-yearly-emission'] = yearlyChart;
    charts['library-monthly-emission'] = monthlyChart;
    charts['library-daily-emission'] = dailyChart;
}

// 初始化图书馆单楼栋碳排放量页面
function initLibraryBuildingEmission() {
    const chart = echarts.init(document.getElementById('library-building-chart'));
    const buildings = buildingsData.library;

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: buildings.map(b => b.name)
        },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: buildings.map(b => b.carbonEmission),
            type: 'bar',
            itemStyle: { color: '#6366f1' }
        }]
    };
    chart.setOption(option);
    charts['library-building'] = chart;
}

// 初始化图书馆人均碳排放量页面
function initLibraryPerCapita() {
    const chart = echarts.init(document.getElementById('library-per-capita-chart'));
    const buildings = buildingsData.library;

    // 假设图书馆日均访客15000人
    const perCapitaData = buildings.map(b => ({
        name: b.name,
        value: (b.carbonEmission / 15000).toFixed(2)
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: perCapitaData.map(d => d.name)
        },
        yAxis: { type: 'value', name: '吨CO₂/人' },
        series: [{
            data: perCapitaData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#6366f1' }
        }]
    };
    chart.setOption(option);
    charts['library-per-capita'] = chart;
}

// 初始化图书馆单位面积碳排放量页面
function initLibraryAreaIntensity() {
    const chart = echarts.init(document.getElementById('library-area-intensity-chart'));
    const buildings = buildingsData.library;

    // 假设图书馆面积95000㎡
    const areaIntensityData = buildings.map(b => ({
        name: b.name,
        value: ((b.carbonEmission * 1000) / 95000).toFixed(1)
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: areaIntensityData.map(d => d.name)
        },
        yAxis: { type: 'value', name: 'kgCO₂/m²' },
        series: [{
            data: areaIntensityData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#f97316' }
        }]
    };
    chart.setOption(option);
    charts['library-area-intensity'] = chart;
}

// 初始化食堂碳排放量页面
function initCanteenEmissionMonitoring() {
    // 年碳排放总量图表
    const yearlyChart = echarts.init(document.getElementById('canteen-yearly-emission-chart'));
    const yearlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [4300, 4280, 4250, 4220, 4180, 4129, 4067],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#f97316' },
            areaStyle: { color: 'rgba(249, 115, 22, 0.1)' }
        }]
    };
    yearlyChart.setOption(yearlyOption);

    // 月碳排放总量图表
    const monthlyChart = echarts.init(document.getElementById('canteen-monthly-emission-chart'));
    const monthlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [370, 339, 360, 340, 335, 345, 350, 320, 340, 350, 360, 370],
            type: 'bar',
            itemStyle: { color: '#f97316' }
        }]
    };
    monthlyChart.setOption(monthlyOption);

    // 日碳排放总量图表
    const dailyChart = echarts.init(document.getElementById('canteen-daily-emission-chart'));
    const dailyData = Array.from({length: 30}, (_, i) => Math.floor(11 + Math.random() * 4));
    const dailyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: Array.from({length: 30}, (_, i) => `${i+1}日`) },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: dailyData,
            type: 'line',
            smooth: true,
            itemStyle: { color: '#f97316' }
        }]
    };
    dailyChart.setOption(dailyOption);

    charts['canteen-yearly-emission'] = yearlyChart;
    charts['canteen-monthly-emission'] = monthlyChart;
    charts['canteen-daily-emission'] = dailyChart;
}

// 初始化食堂单楼栋碳排放量页面
function initCanteenBuildingEmission() {
    const chart = echarts.init(document.getElementById('canteen-building-chart'));
    const buildings = buildingsData.canteen;

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: buildings.map(b => b.name)
        },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: buildings.map(b => b.carbonEmission),
            type: 'bar',
            itemStyle: { color: '#f97316' }
        }]
    };
    chart.setOption(option);
    charts['canteen-building'] = chart;

    // 楼栋选择器事件
    document.getElementById('canteen-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            chart.setOption(option);
            document.getElementById('canteen-building-emission-value').textContent = '4,067';
            document.getElementById('canteen-building-growth-rate').textContent = '-1.5%';
            document.getElementById('canteen-building-calculation-basis').textContent =
                '食堂总排放量：2个食堂合计 = 4,067吨';
            document.getElementById('canteen-building-details').innerHTML = '';
        } else {
            const index = parseInt(value);
            const building = buildings[index];

            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: buildings.map(b => b.name)
                },
                yAxis: { type: 'value', name: '吨CO₂' },
                series: [{
                    data: buildings.map((b, i) => ({
                        value: b.carbonEmission,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar'
                }]
            };
            chart.setOption(highlightOption);

            document.getElementById('canteen-building-emission-value').textContent = building.carbonEmission.toLocaleString();
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('canteen-building-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('canteen-building-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            const monthlyData = Array.from({length: 12}, () => Math.floor(building.carbonEmission / 12 * (0.8 + Math.random() * 0.4)));
            document.getElementById('canteen-building-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度排放趋势</h5>
                    <div id="canteen-building-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-orange-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-orange-600">${(building.carbonEmission / 12).toFixed(0)}</div>
                        <div class="text-sm text-orange-800">月均排放量 (吨)</div>
                    </div>
                    <div class="bg-amber-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-amber-600">${((building.carbonEmission / 12) / 30).toFixed(1)}</div>
                        <div class="text-sm text-amber-800">日均排放量 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${(building.carbonEmission / 4067 * 100).toFixed(1)}%</div>
                        <div class="text-sm text-blue-800">占食堂总量</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('canteen-building-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: '吨CO₂' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#f97316' },
                        areaStyle: { color: 'rgba(249, 115, 22, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('canteen-building-calculation-basis').textContent =
                `${building.name}年度排放量：${building.carbonEmission}吨CO₂，占食堂总排放量的${(building.carbonEmission / 4067 * 100).toFixed(1)}%`;
        }
    });
}

// 初始化食堂人均碳排放量页面
function initCanteenPerCapita() {
    const chart = echarts.init(document.getElementById('canteen-per-capita-chart'));
    const buildings = buildingsData.canteen;
    const avgPeople = 10000;

    const perCapitaData = buildings.map(b => ({
        name: b.name,
        value: parseFloat((b.carbonEmission / avgPeople).toFixed(2))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: perCapitaData.map(d => d.name)
        },
        yAxis: { type: 'value', name: '吨CO₂/人' },
        series: [{
            data: perCapitaData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#f97316' }
        }]
    };
    chart.setOption(option);
    charts['canteen-per-capita'] = chart;

    const selector = document.getElementById('canteen-per-capita-building-selector');
    if (selector) {
        selector.addEventListener('change', function(e) {
            const value = e.target.value;
            if (value === 'all') {
                chart.setOption(option);
                document.getElementById('canteen-per-capita-value').textContent = '0.20';
                document.getElementById('canteen-per-capita-growth-rate').textContent = '-1.5%';
                document.getElementById('canteen-per-capita-calculation-basis').textContent =
                    '就餐人数统计：食堂日均就餐人数约20,000人，人均排放 = 4,067吨 ÷ 20,000人 = 0.20吨/人';
                document.getElementById('canteen-per-capita-details').innerHTML = '';
            } else {
                const index = parseInt(value);
                const building = buildings[index];
                const perCapita = perCapitaData[index].value;

                const highlightOption = {
                    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                    xAxis: {
                        type: 'category',
                        data: perCapitaData.map(d => d.name)
                    },
                    yAxis: { type: 'value', name: '吨CO₂/人' },
                    series: [{
                        data: perCapitaData.map((d, i) => ({
                            value: d.value,
                            itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                        })),
                        type: 'bar'
                    }]
                };
                chart.setOption(highlightOption);

                document.getElementById('canteen-per-capita-value').textContent = perCapita;
                const growthRate = (Math.random() * 10 - 5).toFixed(1);
                document.getElementById('canteen-per-capita-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
                document.getElementById('canteen-per-capita-growth-rate').className =
                    `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

                const monthlyData = Array.from({length: 12}, () => (perCapita / 12 * (0.8 + Math.random() * 0.4)).toFixed(3));
                document.getElementById('canteen-per-capita-details').innerHTML = `
                    <div class="bg-white rounded-lg shadow p-4 mb-4">
                        <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度人均排放趋势</h5>
                        <div id="canteen-per-capita-monthly-chart" style="height: 250px;"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <div class="bg-orange-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-orange-600">${(perCapita / 12).toFixed(3)}</div>
                            <div class="text-sm text-orange-800">月均人均排放 (吨/人)</div>
                        </div>
                        <div class="bg-amber-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-amber-600">${building.carbonEmission.toLocaleString()}</div>
                            <div class="text-sm text-amber-800">食堂总排放 (吨)</div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-blue-600">${avgPeople.toLocaleString()}</div>
                            <div class="text-sm text-blue-800">预估就餐人数</div>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    const monthlyChart = echarts.init(document.getElementById('canteen-per-capita-monthly-chart'));
                    monthlyChart.setOption({
                        tooltip: { trigger: 'axis' },
                        xAxis: {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        },
                        yAxis: { type: 'value', name: '吨CO₂/人' },
                        series: [{
                            data: monthlyData,
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#f97316' },
                            areaStyle: { color: 'rgba(249, 115, 22, 0.1)' }
                        }]
                    });
                }, 100);

                document.getElementById('canteen-per-capita-calculation-basis').textContent =
                    `${building.name}人均排放：${building.carbonEmission}吨 ÷ ${avgPeople}人 = ${perCapita}吨/人`;
            }
        });
    }
}

// 初始化食堂单位面积碳排放量页面
function initCanteenAreaIntensity() {
    const chart = echarts.init(document.getElementById('canteen-area-intensity-chart'));
    const buildings = buildingsData.canteen;
    const avgArea = 13050;

    const areaIntensityData = buildings.map(b => ({
        name: b.name,
        value: parseFloat(((b.carbonEmission * 1000) / avgArea).toFixed(1))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: areaIntensityData.map(d => d.name)
        },
        yAxis: { type: 'value', name: 'kgCO₂/m²' },
        series: [{
            data: areaIntensityData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#f97316' }
        }]
    };
    chart.setOption(option);
    charts['canteen-area-intensity'] = chart;

    const selector = document.getElementById('canteen-area-intensity-building-selector');
    if (selector) {
        selector.addEventListener('change', function(e) {
            const value = e.target.value;
            if (value === 'all') {
                chart.setOption(option);
                document.getElementById('canteen-area-intensity-value').textContent = '156';
                document.getElementById('canteen-area-intensity-growth-rate').textContent = '-1.5%';
                document.getElementById('canteen-area-intensity-calculation-basis').textContent =
                    '建筑面积：食堂总建筑面积约2.61万㎡，单位面积排放 = 4,067吨 ÷ 26,100㎡ = 156 kgCO₂/m²';
                document.getElementById('canteen-area-intensity-details').innerHTML = '';
            } else {
                const index = parseInt(value);
                const building = buildings[index];
                const areaIntensity = areaIntensityData[index].value;

                const highlightOption = {
                    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                    xAxis: {
                        type: 'category',
                        data: areaIntensityData.map(d => d.name)
                    },
                    yAxis: { type: 'value', name: 'kgCO₂/m²' },
                    series: [{
                        data: areaIntensityData.map((d, i) => ({
                            value: d.value,
                            itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                        })),
                        type: 'bar'
                    }]
                };
                chart.setOption(highlightOption);

                document.getElementById('canteen-area-intensity-value').textContent = areaIntensity;
                const growthRate = (Math.random() * 10 - 5).toFixed(1);
                document.getElementById('canteen-area-intensity-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
                document.getElementById('canteen-area-intensity-growth-rate').className =
                    `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

                const monthlyData = Array.from({length: 12}, () => (areaIntensity * (0.8 + Math.random() * 0.4)).toFixed(1));
                document.getElementById('canteen-area-intensity-details').innerHTML = `
                    <div class="bg-white rounded-lg shadow p-4 mb-4">
                        <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度单位面积排放趋势</h5>
                        <div id="canteen-area-intensity-monthly-chart" style="height: 250px;"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <div class="bg-orange-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-orange-600">${(areaIntensity / 12).toFixed(1)}</div>
                            <div class="text-sm text-orange-800">月均单位面积排放 (kgCO₂/m²)</div>
                        </div>
                        <div class="bg-amber-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-amber-600">${building.carbonEmission.toLocaleString()}</div>
                            <div class="text-sm text-amber-800">食堂总排放 (吨)</div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-blue-600">${avgArea.toLocaleString()}</div>
                            <div class="text-sm text-blue-800">预估建筑面积 (m²)</div>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    const monthlyChart = echarts.init(document.getElementById('canteen-area-intensity-monthly-chart'));
                    monthlyChart.setOption({
                        tooltip: { trigger: 'axis' },
                        xAxis: {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        },
                        yAxis: { type: 'value', name: 'kgCO₂/m²' },
                        series: [{
                            data: monthlyData,
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#f97316' },
                            areaStyle: { color: 'rgba(249, 115, 22, 0.1)' }
                        }]
                    });
                }, 100);

                document.getElementById('canteen-area-intensity-calculation-basis').textContent =
                    `${building.name}单位面积排放：${building.carbonEmission}吨 × 1000 ÷ ${avgArea}m² = ${areaIntensity} kgCO₂/m²`;
            }
        });
    }
}

// 初始化体育馆碳排放量页面
function initGymnasiumEmissionMonitoring() {
    // 年碳排放总量图表
    const yearlyChart = echarts.init(document.getElementById('gymnasium-yearly-emission-chart'));
    const yearlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [3400, 3380, 3350, 3320, 3280, 3241, 3167],
            type: 'line',
            smooth: true,
            itemStyle: { color: '#ef4444' },
            areaStyle: { color: 'rgba(239, 68, 68, 0.1)' }
        }]
    };
    yearlyChart.setOption(yearlyOption);

    // 月碳排放总量图表
    const monthlyChart = echarts.init(document.getElementById('gymnasium-monthly-emission-chart'));
    const monthlyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: [290, 254, 280, 265, 260, 270, 275, 250, 265, 275, 285, 290],
            type: 'bar',
            itemStyle: { color: '#ef4444' }
        }]
    };
    monthlyChart.setOption(monthlyOption);

    // 日碳排放总量图表
    const dailyChart = echarts.init(document.getElementById('gymnasium-daily-emission-chart'));
    const dailyData = Array.from({length: 30}, (_, i) => Math.floor(8 + Math.random() * 4));
    const dailyOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: Array.from({length: 30}, (_, i) => `${i+1}日`) },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: dailyData,
            type: 'line',
            smooth: true,
            itemStyle: { color: '#ef4444' }
        }]
    };
    dailyChart.setOption(dailyOption);

    charts['gymnasium-yearly-emission'] = yearlyChart;
    charts['gymnasium-monthly-emission'] = monthlyChart;
    charts['gymnasium-daily-emission'] = dailyChart;
}

// 初始化体育馆单楼栋碳排放量页面
function initGymnasiumBuildingEmission() {
    const chart = echarts.init(document.getElementById('gymnasium-building-chart'));
    const buildings = buildingsData.gymnasium;

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: buildings.map(b => b.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: '吨CO₂' },
        series: [{
            data: buildings.map(b => b.carbonEmission),
            type: 'bar',
            itemStyle: { color: '#ef4444' }
        }]
    };
    chart.setOption(option);
    charts['gymnasium-building'] = chart;

    // 楼栋选择器事件
    document.getElementById('gymnasium-building-selector').addEventListener('change', function(e) {
        const value = e.target.value;
        if (value === 'all') {
            chart.setOption(option);
            document.getElementById('gymnasium-building-emission-value').textContent = '3,167';
            document.getElementById('gymnasium-building-growth-rate').textContent = '-2.3%';
            document.getElementById('gymnasium-building-calculation-basis').textContent =
                '体育馆总排放量：7个体育场馆合计 = 3,167吨';
            document.getElementById('gymnasium-building-details').innerHTML = '';
        } else {
            const index = parseInt(value);
            const building = buildings[index];

            const highlightOption = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                    type: 'category',
                    data: buildings.map(b => b.name),
                    axisLabel: { rotate: 45, interval: 0 }
                },
                yAxis: { type: 'value', name: '吨CO₂' },
                series: [{
                    data: buildings.map((b, i) => ({
                        value: b.carbonEmission,
                        itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                    })),
                    type: 'bar'
                }]
            };
            chart.setOption(highlightOption);

            document.getElementById('gymnasium-building-emission-value').textContent = building.carbonEmission.toLocaleString();
            const growthRate = (Math.random() * 10 - 5).toFixed(1);
            document.getElementById('gymnasium-building-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
            document.getElementById('gymnasium-building-growth-rate').className =
                `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

            const monthlyData = Array.from({length: 12}, () => Math.floor(building.carbonEmission / 12 * (0.8 + Math.random() * 0.4)));
            document.getElementById('gymnasium-building-details').innerHTML = `
                <div class="bg-white rounded-lg shadow p-4 mb-4">
                    <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度排放趋势</h5>
                    <div id="gymnasium-building-monthly-chart" style="height: 250px;"></div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="bg-red-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-red-600">${(building.carbonEmission / 12).toFixed(0)}</div>
                        <div class="text-sm text-red-800">月均排放量 (吨)</div>
                    </div>
                    <div class="bg-rose-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-rose-600">${((building.carbonEmission / 12) / 30).toFixed(1)}</div>
                        <div class="text-sm text-rose-800">日均排放量 (吨)</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="text-xl font-bold text-blue-600">${(building.carbonEmission / 3167 * 100).toFixed(1)}%</div>
                        <div class="text-sm text-blue-800">占体育馆总量</div>
                    </div>
                </div>
            `;

            setTimeout(() => {
                const monthlyChart = echarts.init(document.getElementById('gymnasium-building-monthly-chart'));
                monthlyChart.setOption({
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: { type: 'value', name: '吨CO₂' },
                    series: [{
                        data: monthlyData,
                        type: 'line',
                        smooth: true,
                        itemStyle: { color: '#ef4444' },
                        areaStyle: { color: 'rgba(239, 68, 68, 0.1)' }
                    }]
                });
            }, 100);

            document.getElementById('gymnasium-building-calculation-basis').textContent =
                `${building.name}年度排放量：${building.carbonEmission}吨CO₂，占体育馆总排放量的${(building.carbonEmission / 3167 * 100).toFixed(1)}%`;
        }
    });
}

// 初始化体育馆人均碳排放量页面
function initGymnasiumPerCapita() {
    const chart = echarts.init(document.getElementById('gymnasium-per-capita-chart'));
    const buildings = buildingsData.gymnasium;
    const avgPeople = 1400;

    const perCapitaData = buildings.map(b => ({
        name: b.name,
        value: parseFloat((b.carbonEmission / avgPeople).toFixed(2))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: perCapitaData.map(d => d.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: '吨CO₂/人' },
        series: [{
            data: perCapitaData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#ef4444' }
        }]
    };
    chart.setOption(option);
    charts['gymnasium-per-capita'] = chart;

    const selector = document.getElementById('gymnasium-per-capita-building-selector');
    if (selector) {
        selector.addEventListener('change', function(e) {
            const value = e.target.value;
            if (value === 'all') {
                chart.setOption(option);
                document.getElementById('gymnasium-per-capita-value').textContent = '0.32';
                document.getElementById('gymnasium-per-capita-growth-rate').textContent = '-2.3%';
                document.getElementById('gymnasium-per-capita-calculation-basis').textContent =
                    '使用人数统计：体育馆日均使用人数约10,000人，人均排放 = 3,167吨 ÷ 10,000人 = 0.32吨/人';
                document.getElementById('gymnasium-per-capita-details').innerHTML = '';
            } else {
                const index = parseInt(value);
                const building = buildings[index];
                const perCapita = perCapitaData[index].value;

                const highlightOption = {
                    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                    xAxis: {
                        type: 'category',
                        data: perCapitaData.map(d => d.name),
                        axisLabel: { rotate: 45, interval: 0 }
                    },
                    yAxis: { type: 'value', name: '吨CO₂/人' },
                    series: [{
                        data: perCapitaData.map((d, i) => ({
                            value: d.value,
                            itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                        })),
                        type: 'bar'
                    }]
                };
                chart.setOption(highlightOption);

                document.getElementById('gymnasium-per-capita-value').textContent = perCapita;
                const growthRate = (Math.random() * 10 - 5).toFixed(1);
                document.getElementById('gymnasium-per-capita-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
                document.getElementById('gymnasium-per-capita-growth-rate').className =
                    `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

                const monthlyData = Array.from({length: 12}, () => (perCapita / 12 * (0.8 + Math.random() * 0.4)).toFixed(3));
                document.getElementById('gymnasium-per-capita-details').innerHTML = `
                    <div class="bg-white rounded-lg shadow p-4 mb-4">
                        <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度人均排放趋势</h5>
                        <div id="gymnasium-per-capita-monthly-chart" style="height: 250px;"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <div class="bg-red-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-red-600">${(perCapita / 12).toFixed(3)}</div>
                            <div class="text-sm text-red-800">月均人均排放 (吨/人)</div>
                        </div>
                        <div class="bg-rose-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-rose-600">${building.carbonEmission.toLocaleString()}</div>
                            <div class="text-sm text-rose-800">场馆总排放 (吨)</div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-blue-600">${avgPeople.toLocaleString()}</div>
                            <div class="text-sm text-blue-800">预估使用人数</div>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    const monthlyChart = echarts.init(document.getElementById('gymnasium-per-capita-monthly-chart'));
                    monthlyChart.setOption({
                        tooltip: { trigger: 'axis' },
                        xAxis: {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        },
                        yAxis: { type: 'value', name: '吨CO₂/人' },
                        series: [{
                            data: monthlyData,
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#ef4444' },
                            areaStyle: { color: 'rgba(239, 68, 68, 0.1)' }
                        }]
                    });
                }, 100);

                document.getElementById('gymnasium-per-capita-calculation-basis').textContent =
                    `${building.name}人均排放：${building.carbonEmission}吨 ÷ ${avgPeople}人 = ${perCapita}吨/人`;
            }
        });
    }
}

// 初始化体育馆单位面积碳排放量页面
function initGymnasiumAreaIntensity() {
    const chart = echarts.init(document.getElementById('gymnasium-area-intensity-chart'));
    const buildings = buildingsData.gymnasium;
    const avgArea = 2285;

    const areaIntensityData = buildings.map(b => ({
        name: b.name,
        value: parseFloat(((b.carbonEmission * 1000) / avgArea).toFixed(1))
    }));

    const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        xAxis: {
            type: 'category',
            data: areaIntensityData.map(d => d.name),
            axisLabel: { rotate: 45, interval: 0 }
        },
        yAxis: { type: 'value', name: 'kgCO₂/m²' },
        series: [{
            data: areaIntensityData.map(d => d.value),
            type: 'bar',
            itemStyle: { color: '#f97316' }
        }]
    };
    chart.setOption(option);
    charts['gymnasium-area-intensity'] = chart;

    const selector = document.getElementById('gymnasium-area-intensity-building-selector');
    if (selector) {
        selector.addEventListener('change', function(e) {
            const value = e.target.value;
            if (value === 'all') {
                chart.setOption(option);
                document.getElementById('gymnasium-area-intensity-value').textContent = '198';
                document.getElementById('gymnasium-area-intensity-growth-rate').textContent = '-2.3%';
                document.getElementById('gymnasium-area-intensity-calculation-basis').textContent =
                    '建筑面积：体育馆总建筑面积约1.60万㎡，单位面积排放 = 3,167吨 ÷ 16,000㎡ = 198 kgCO₂/m²';
                document.getElementById('gymnasium-area-intensity-details').innerHTML = '';
            } else {
                const index = parseInt(value);
                const building = buildings[index];
                const areaIntensity = areaIntensityData[index].value;

                const highlightOption = {
                    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                    xAxis: {
                        type: 'category',
                        data: areaIntensityData.map(d => d.name),
                        axisLabel: { rotate: 45, interval: 0 }
                    },
                    yAxis: { type: 'value', name: 'kgCO₂/m²' },
                    series: [{
                        data: areaIntensityData.map((d, i) => ({
                            value: d.value,
                            itemStyle: { color: i === index ? '#ef4444' : '#e5e7eb' }
                        })),
                        type: 'bar'
                    }]
                };
                chart.setOption(highlightOption);

                document.getElementById('gymnasium-area-intensity-value').textContent = areaIntensity;
                const growthRate = (Math.random() * 10 - 5).toFixed(1);
                document.getElementById('gymnasium-area-intensity-growth-rate').textContent = `${growthRate > 0 ? '+' : ''}${growthRate}%`;
                document.getElementById('gymnasium-area-intensity-growth-rate').className =
                    `text-2xl font-bold ${growthRate > 0 ? 'text-red-600' : 'text-green-600'}`;

                const monthlyData = Array.from({length: 12}, () => (areaIntensity * (0.8 + Math.random() * 0.4)).toFixed(1));
                document.getElementById('gymnasium-area-intensity-details').innerHTML = `
                    <div class="bg-white rounded-lg shadow p-4 mb-4">
                        <h5 class="font-semibold text-gray-800 mb-3">${building.name} - 月度单位面积排放趋势</h5>
                        <div id="gymnasium-area-intensity-monthly-chart" style="height: 250px;"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <div class="bg-red-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-red-600">${(areaIntensity / 12).toFixed(1)}</div>
                            <div class="text-sm text-red-800">月均单位面积排放 (kgCO₂/m²)</div>
                        </div>
                        <div class="bg-rose-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-rose-600">${building.carbonEmission.toLocaleString()}</div>
                            <div class="text-sm text-rose-800">场馆总排放 (吨)</div>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <div class="text-xl font-bold text-blue-600">${avgArea.toLocaleString()}</div>
                            <div class="text-sm text-blue-800">预估建筑面积 (m²)</div>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    const monthlyChart = echarts.init(document.getElementById('gymnasium-area-intensity-monthly-chart'));
                    monthlyChart.setOption({
                        tooltip: { trigger: 'axis' },
                        xAxis: {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        },
                        yAxis: { type: 'value', name: 'kgCO₂/m²' },
                        series: [{
                            data: monthlyData,
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#f97316' },
                            areaStyle: { color: 'rgba(249, 115, 22, 0.1)' }
                        }]
                    });
                }, 100);

                document.getElementById('gymnasium-area-intensity-calculation-basis').textContent =
                    `${building.name}单位面积排放：${building.carbonEmission}吨 × 1000 ÷ ${avgArea}m² = ${areaIntensity} kgCO₂/m²`;
            }
        });
    }
}