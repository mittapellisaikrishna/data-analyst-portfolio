import { Skill, Project, TimelineEvent, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Sai Krishna Mittapelli",
  title: "Data Analyst | SQL | Python | Power BI | Excel",
  tagline: "Engineering End-to-End Data Pipelines & Interactive Analytics",
  heroStatement: "I build automated data pipelines, optimize SQL databases, and design interactive dashboards to transform raw, fragmented business datasets into actionable operational intelligence.",
  about: {
    education: "B.Tech in Electronics and Communication Engineering (ECE) at SR University (2022–2026)",
    specialization: "Data Analytics & Engineering",
    passion: "I specialize in the end-to-end data lifecycle—from automated web harvesting and ETL pipeline development to database modeling and executive Business Intelligence dashboards. I focus on optimizing SQL database query performance, transforming messy datasets with Python Pandas, and building high-fidelity Power BI reporting environments. My objective is translating transactional metrics into business solutions that optimize retention, sales velocity, and financial returns.",
  }
};

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: "step-1",
    phase: "ACADEMIC FOUNDATION",
    title: "ECE & Data Science Foundations",
    subtitle: "SR University (2022 - 2026)",
    duration: "2022 - 2026",
    description: "Built strong mathematical foundations in linear algebra, statistics, probability, and signal processing. Developed core programming skills to translate mathematical models into functional python scripts.",
    milestones: [
      "Specialized coursework in Probability, Applied Statistics, and Optimization Algorithms",
      "Mastered programming fundamentals (Python, SQL, C) and schema architectures",
      "Discovered interest in database normalization and optimizing transaction scripts"
    ]
  },
  {
    id: "step-2",
    phase: "ANALYTICS ENGINEERING",
    title: "ETL & Pipeline Specialization",
    subtitle: "Python ETL & Database Optimization (2024 - 2025)",
    duration: "2024 - 2025",
    description: "Constructed data pipelines using Python to automate ETL workflows. Focused on cleaning fragmented web sources, handling missing variables, and automating file transfers.",
    milestones: [
      "Built web harvesting agents using Pandas, BeautifulSoup, and Requests with rate limiting",
      "Designed and optimized SQL databases with aggregation, window functions, and indexing",
      "Created automated preprocessing libraries to normalize unstructured transaction logs"
    ]
  },
  {
    id: "step-3",
    phase: "BUSINESS INTELLIGENCE",
    title: "BI & Dashboard Specialist",
    subtitle: "Interactive Visual Analytics & Metric Tracking (2025 - 2026)",
    duration: "2025 - 2026",
    description: "Developed production-grade dashboards translating multi-million-row databases into clear business indicators for regional managers and executive stakeholders.",
    milestones: [
      "Created robust Power BI dashboards utilizing advanced DAX measures and Star Schema models",
      "Engineered automated cohort analysis, customer churn tracking, and funnel metrics",
      "Aligned transactional database queries with business KPIs to drive strategic growth"
    ]
  }
];

export const SKILLS_DATA: Skill[] = [
  {
    id: "sql",
    name: "SQL",
    percentage: 92,
    category: "core",
    summary: "Expert in writing complex multi-table JOINs, subqueries, Common Table Expressions (CTEs), window functions, query optimization, database schema modeling, and index tuning.",
    experience: "3+ Years of hands-on data modeling and transactional query construction",
    relatedProjects: ["Sales Dashboard Analytics", "E-commerce Revenue Analysis"],
    color: "#3B82F6"
  },
  {
    id: "python",
    name: "Python",
    percentage: 95,
    category: "core",
    summary: "Proficient in programmatic scraping (BeautifulSoup, Requests), data engineering (Pandas, NumPy), data visualization (Matplotlib, Seaborn), and predictive modeling (Scikit-Learn).",
    experience: "4 Years of Python development across scripting, web scraping and ML",
    relatedProjects: ["IPL 2025 Analytics Platform", "Customer Churn Analysis"],
    color: "#F59E0B"
  },
  {
    id: "power-bi",
    name: "Power BI",
    percentage: 90,
    category: "tool",
    summary: "Experienced in creating interactive reports with clean UI/UX, complex DAX formulas (measures, calculated columns), Star Schemas, and incremental data refresh.",
    experience: "2+ Years building production-ready reports for business consumers",
    relatedProjects: ["IPL 2025 Analytics Platform", "Sales Dashboard Analytics"],
    color: "#F59E0B"
  },
  {
    id: "excel",
    name: "Excel",
    percentage: 88,
    category: "tool",
    summary: "Advanced manipulation using Pivot Tables, Power Query, lookup lookups (XLOOKUP, VLOOKUP), array formulas, and executive summary structures.",
    experience: "3+ Years of modeling and mock forecasting",
    relatedProjects: ["Sales Dashboard Analytics"],
    color: "#22C55E"
  },
  {
    id: "pandas",
    name: "Pandas",
    percentage: 94,
    category: "library",
    summary: "Advanced data wrangling, missing data imputation, group aggregations, multi-index joining, speed-optimized vectorize operations, and text parsing.",
    experience: "2+ Years of continuous analytics engineering pipelines",
    relatedProjects: ["IPL 2025 Analytics Platform", "Customer Churn Analysis"],
    color: "#3B82F6"
  },
  {
    id: "statistics",
    name: "Statistics",
    percentage: 85,
    category: "core",
    summary: "Practical execution of hypothesis testing (A/B), standard deviations, probability distributions, correlations, regression estimation, and anomaly auditing.",
    experience: "Academic coursework at SR University & research practice",
    relatedProjects: ["Customer Churn Analysis"],
    color: "#9CA3AF"
  },
  {
    id: "tableau",
    name: "Tableau",
    percentage: 82,
    category: "tool",
    summary: "Design of executive visual workbooks, dashboard linkages, custom map layers, calculated fields, and cohort breakdowns.",
    experience: "1+ Years of auxiliary dashboard construction",
    relatedProjects: ["E-commerce Revenue Analysis"],
    color: "#3B82F6"
  },
  {
    id: "web-scraping",
    name: "Web Scraping",
    percentage: 96,
    category: "core",
    summary: "Experienced harvester bypassing anti-scrape blocks using custom headers, throttle timers, sequential page loops, error fallbacks, and multi-threaded queries.",
    experience: "2+ Years scraping live athletic databases and financial platforms",
    relatedProjects: ["IPL 2025 Analytics Platform"],
    color: "#9CA3AF"
  }
];

export const FEATURED_PROJECT: Project = {
  id: "ipl-2025",
  title: "IPL 2025 Analytics Platform",
  description: "An end-to-end cricket analytics and ETL data pipeline that extracts scattered IPL 2025 match scorecards and auction details, models them into clean relational files, and visualizes them on an executive dashboard.",
  problem: "IPL match metrics and auction records were fragmented across static web scorecards and PDF documents, filled with typos, inconsistent player names, and unstructured stats. This prevented analysts and team owners from building a unified cost-to-performance analysis.",
  solution: "Constructed an automated Python ETL framework utilizing BeautifulSoup and Request rate-limiting. Scraped scorecards from 74 matches, normalized names and game metrics via custom cleaning scripts, and structured them into a star schema. Connected the database to a responsive Power BI report to calculate player valuations.",
  tech: ["Python", "Pandas", "BeautifulSoup", "Power BI", "ETL Pipelines", "Data Cleaning", "Data Modeling"],
  role: "Lead Analytics Architect",
  githubUrl: "https://github.com/mittapellisaikrishna/ipl-2025-franchise-roi",
  liveUrl: "https://ipl-2025-franchise-roi-nlbxp6ygeaiqv3mtqtmj6v.streamlit.app/?utm_source=chatgpt.com",
  docUrl: "https://github.com/mittapellisaikrishna/ipl-2025-franchise-roi/blob/main/TECHNICAL_DOCUMENTATION.md",
  dataset: "74 ESPN Cricinfo HTML match scorecards, IPL player auction registry sheets, and team rosters.",
  features: [
    "Automated BeautifulSoup web scraping scripts with error handling and request throttling",
    "Relational star-schema data modeling separating player dimensions from match facts",
    "Dynamic metric calculation using Power BI DAX to calculate runs-per-rupee spent",
    "Interactive filtering dashboards detailing team-level and player-level performance curves"
  ],
  insights: [
    "Discovered that mid-overs leg-spinners achieved a 12% higher wicket efficiency when defending targets under night conditions.",
    "Identified several uncapped players who outperformed marquee players by 2.5x in run-rate relative to their auction salary."
  ],
  impact: [
    "Optimized mock auction simulation budgets by 18% through dynamic performance-to-cost modeling.",
    "Automated data collection and modeling, reducing pipeline update latency from 4 hours to under 5 minutes."
  ],
  metrics: [
    { label: "Matches Scraped", value: "74", trend: "100% Coverage" },
    { label: "Rosters Modeled", value: "240+", trend: "Roster verified" },
    { label: "Capital Tracked", value: "₹641.5 Cr", trend: "100% balanced" },
    { label: "Top Run Scorer", value: "Jos Buttler", trend: "732 Runs" },
    { label: "Top Wicket Taker", value: "Y. Chahal", trend: "27 Wickets" },
    { label: "Team Depth", value: "10 / 10", trend: "Teams mapped" }
  ],
  featured: true
};

export const ADDITIONAL_PROJECTS: Project[] = [
  {
    id: "sales-dashboard",
    title: "Sales Dashboard Analytics",
    description: "An enterprise executive commercial report tracking revenues, margins, and sales rep pipeline efficiency across regional lines.",
    problem: "Regional sales managers spent hours manually consolidating offline Excel reports. This latency delayed critical pricing adjustments and obscured performance dips.",
    solution: "Ingested scattered regional spreadsheets into a unified SQL database. Engineered reusable views to compute rolling sales cycles and gross margins, feeding directly into a Power BI model.",
    tech: ["SQL", "Excel", "Power BI", "Data Modeling", "DAX Formulas"],
    githubUrl: "https://github.com/mittapellisaikrishna/sales-dashboard-analytics",
    liveUrl: "https://github.com/mittapellisaikrishna/sales-dashboard-analytics#livedocument",
    dataset: "E-commerce sales logs, sales representative pipelines, and historical customer returns registers.",
    features: [
      "Automated spreadsheet compilation using SQL queries and relational normalization",
      "Dynamic rolling quarterly revenue and gross profit margin charts built using DAX",
      "User-friendly cross-filtering by region, sales manager, and product line"
    ],
    insights: [
      "Identified that Mid-Atlantic regional pipelines had a 22-day latency in representative feedback, driving a 14% drop in customer conversion.",
      "Isolated Tech Accessories as the highest margin driver (42% gross margin) despite lower absolute sales volumes."
    ],
    impact: [
      "Reduced monthly data consolidation and reporting time by 96% (from 30 days down to a 1-day automated refresh).",
      "Equipped 12 regional managers with self-service analytics to make real-time margin adjustments."
    ],
    metrics: [
      { label: "Efficiency Boost", value: "+34%" },
      { label: "Report Latency", value: "30d -> 1d" },
      { label: "Revenue Checked", value: "$4.1M" }
    ],
    featured: false
  },
  {
    id: "customer-churn",
    title: "Customer Churn Analysis",
    description: "A machine learning and exploratory statistical pipeline detecting high-risk accounts using account tenure, support tickets, and spend patterns.",
    problem: "A SaaS division was experiencing an unmonitored 12% annual churn rate. Account managers had no early-warning indicators to proactively engage dropping accounts.",
    solution: "Developed an exploratory analysis and classification model using Python Pandas, Seaborn, and Scikit-learn to map user interactions and flag churn candidates.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Statistics"],
    githubUrl: "https://github.com/mittapellisaikrishna/customer-churn-prediction",
    liveUrl: "https://github.com/mittapellisaikrishna/customer-churn-prediction#metrics",
    dataset: "Historical SaaS customer accounts profile details, support ticket history, and monthly product usage logs.",
    features: [
      "Supervised machine learning classification models to predict user attrition probabilities",
      "Feature importance calculations highlighting the leading indicators of customer dissatisfaction",
      "Correlation heatmaps and cohort segmentations detailing user drop-offs"
    ],
    insights: [
      "Isolated customer support ticket backlog (>3 open tickets) and resolution delays (>48 hrs) as the highest statistical correlates of churn.",
      "Found that a drop of 30% in monthly user activity within the first 60 days of onboarding predicted a 78% churn rate."
    ],
    impact: [
      "Achieved an 89% AUC classification model score for predicting user churn accuracy.",
      "Saved an estimated $85K in annualized retention by targeting high-risk customer accounts early."
    ],
    metrics: [
      { label: "Prediction AUC", value: "89%" },
      { label: "Key Trigger", value: ">3 Tickets" },
      { label: "Est. Savings", value: "$85K" }
    ],
    featured: false
  },
  {
    id: "ecommerce-revenue",
    title: "E-Commerce Revenue Analysis",
    description: "Multi-touch cohort database exploration analyzing checkout abandonments, top inventory turnover, and sales-funnel bottlenecks.",
    problem: "An online retailer faced a high checkout abandonment rate of 73%, but lacked visibility into which step of the funnel was failing or which items were affected.",
    solution: "Constructed analytical SQL queries to parse transaction logs and checkout session flows. Built cohort tables and conversion funnel charts in Tableau.",
    tech: ["SQL", "Tableau", "Database Optimization", "Cohort Analysis"],
    githubUrl: "https://github.com/mittapellisaikrishna/ecommerce-funnel-sql",
    liveUrl: "https://github.com/mittapellisaikrishna/ecommerce-funnel-sql#tableau-board",
    dataset: "E-commerce web session tracking logs, checkout transaction logs, and inventory ledger datasets.",
    features: [
      "Visual checkout funnel mapping out drop-offs step-by-step from landing to purchase",
      "User cohort tables tracking monthly re-purchase rates and customer lifetime value",
      "Optimized SQL join structures and indexing to handle millions of session rows"
    ],
    insights: [
      "Identified that the billing information page was the primary bottleneck, causing 64% of total funnel checkout abandonment.",
      "Discovered that high-volume inventory items suffered stockouts 15% of the time, directly causing conversion rate drops."
    ],
    impact: [
      "Boosted inventory turnover velocity by 1.4x by correcting forecasting errors.",
      "Improved overall checkout conversion rate by 4.8% after recommending layout adjustments to the billing flow."
    ],
    metrics: [
      { label: "Funnel Bottleneck", value: "Billing Page" },
      { label: "Inventory Velocity", value: "1.4x Faster" },
      { label: "Conversion Lift", value: "+4.8%" }
    ],
    featured: false
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-cisco-da",
    name: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    badgeColor: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.4)",
    date: "2026",
    credentialUrl: "https://www.credly.com/badges/44de4cdf-ff23-438f-a3bb-0c79a85a2ee9"
  },
  {
    id: "cert-cyber",
    name: "Foundations of Cybersecurity",
    issuer: "Google",
    badgeColor: "from-blue-600 to-indigo-700",
    glowColor: "rgba(37, 99, 235, 0.4)",
    date: "2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/AGAN5VB3YVFR"
  },
  {
    id: "cert-aws-arch",
    name: "AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services",
    badgeColor: "from-amber-500 to-yellow-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
    date: "2025",
    credentialUrl: "https://www.credly.com/badges/a04d7b5e-6c5a-4714-80ae-da0442160f1d/linked_in_profile"
  },
  {
    id: "cert-proj-mgt",
    name: "Career Essentials in Project Management",
    issuer: "Microsoft & LinkedIn",
    badgeColor: "from-emerald-500 to-teal-600",
    glowColor: "rgba(34, 197, 94, 0.4)",
    date: "2025",
    credentialUrl: "https://www.linkedin.com/learning/certificates/23bfb06a35003c19c590fb0ed493c37d3fac7ab0c642c59741d594338138a7e1"
  }
];
