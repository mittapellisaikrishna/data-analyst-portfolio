import { Skill, Project, TimelineEvent, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Sai Krishna Mittapelli",
  title: "Data Analyst | SQL | Python | Power BI | Excel",
  tagline: "Turning Raw Data into Business Insights",
  heroStatement: "I don't just analyze data—I build data pipelines that transform messy real-world information into business decisions.",
  about: {
    education: "B.Tech in Electronics and Communication Engineering (ECE) at SR University (2022–2026)",
    specialization: "Data Analytics & Engineering",
    passion: "I have a profound passon for solving complex, messy real-world business challenges using python scripting, statistical modeling, structured SQL databases, and highly functional Power BI reporting dashboards. I specialize in complete, end-to-end data value chains—from custom web scraping through robust ETL pipelines to production grade executive BI dashboards.",
  }
};

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: "step-1",
    phase: "STUDENT",
    title: "B.Tech ECE Foundation",
    subtitle: "SR University (2022 - 2026)",
    duration: "2022 - 2026",
    description: "Built strong mathematical foundations in probability, linear algebra, and data transmission. Sparked a passion for computational analytics and database query tuning.",
    milestones: [
      "Specialized coursework in Statistics & Mathematics",
      "Learned core programming (Python, C) and algorithm design",
      "Discovered Passion for transforming raw spreadsheet rows into insights"
    ]
  },
  {
    id: "step-2",
    phase: "DATA ANALYST",
    title: "Analytics Specialization",
    subtitle: "Data Pipeline & ETL Engineering (2024 - 2025)",
    duration: "2024 - 2025",
    description: "Expanded core competency into advanced data structures, full ETL pipeline construction, and automated browser-like fallbacks for web harvesting.",
    milestones: [
      "Mastered Python stack (Pandas, NumPy, BeautifulSoup, Requests)",
      "Designed advanced SQL aggregation, window functions, and indexing",
      "Constructed production-grade cleaning engines to audit messy sources"
    ]
  },
  {
    id: "step-3",
    phase: "BI PROFESSIONAL",
    title: "Business Intelligence Specialist",
    subtitle: "Value Delivery & Enterprise Portals (2025 - 2026)",
    duration: "2025 - 2026",
    description: "Focusing on corporate stakeholder adoption, clean interactive analytics dashboards, and translating multi-million-row datasets into decision actions.",
    milestones: [
      "Built multi-perspective Power BI dashboards with DAX metrics",
      "Synthesized business churn metrics & customer value optimization",
      "Prepared predictive, pipeline-backed portfolio solutions"
    ]
  }
];

export const SKILLS_DATA: Skill[] = [
  {
    id: "sql",
    name: "SQL",
    percentage: 92,
    category: "core",
    summary: "Expert in complex joins, subqueries, CTEs, window functions, index optimization, and data modeling schema architectures.",
    experience: "3+ Years of hands-on data modeling and transactional query construction",
    relatedProjects: ["Sales Dashboard Analytics", "E-commerce Revenue Analysis"],
    color: "#00b4d8"
  },
  {
    id: "python",
    name: "Python",
    percentage: 95,
    category: "core",
    summary: "Proficient in numerical analysis, automated scraping systems, file parsing, custom ETL services, and ML classification models.",
    experience: "4 Years of Python development across scripting, web scraping and ML",
    relatedProjects: ["IPL 2025 Analytics Platform", "Customer Churn Analysis"],
    color: "#ffb703"
  },
  {
    id: "power-bi",
    name: "Power BI",
    percentage: 90,
    category: "tool",
    summary: "Skilled in creating visually clean UX/UI reports, complex DAX measures, star schema modeling, interactive filters, and premium workspace management.",
    experience: "2+ Years building production-ready reports for business consumers",
    relatedProjects: ["IPL 2025 Analytics Platform", "Sales Dashboard Analytics"],
    color: "#f3c614"
  },
  {
    id: "excel",
    name: "Excel",
    percentage: 88,
    category: "tool",
    summary: "Advanced manipulation using Pivot Tables, Power Query, lookup lookups (XLOOKUP, VLOOKUP), array formulas, and executive summary structures.",
    experience: "3+ Years of modeling and mock forecasting",
    relatedProjects: ["Sales Dashboard Analytics"],
    color: "#217346"
  },
  {
    id: "pandas",
    name: "Pandas",
    percentage: 94,
    category: "library",
    summary: "Advanced data wrangling, missing data imputation, group aggregations, multi-index joining, speed-optimized vectorize operations, and text parsing.",
    experience: "2+ Years of continuous analytics engineering pipelines",
    relatedProjects: ["IPL 2025 Analytics Platform", "Customer Churn Analysis"],
    color: "#1389cf"
  },
  {
    id: "statistics",
    name: "Statistics",
    percentage: 85,
    category: "core",
    summary: "Practical execution of hypothesis testing (A/B), standard deviations, probability distributions, correlations, regression estimation, and anomaly auditing.",
    experience: "Academic coursework at SR University & research practice",
    relatedProjects: ["Customer Churn Analysis"],
    color: "#a2d2ff"
  },
  {
    id: "tableau",
    name: "Tableau",
    percentage: 82,
    category: "tool",
    summary: "Design of executive visual workbooks, dashboard linkages, custom map layers, calculated fields, and cohort breakdowns.",
    experience: "1+ Years of auxiliary dashboard construction",
    relatedProjects: ["E-commerce Revenue Analysis"],
    color: "#e15759"
  },
  {
    id: "web-scraping",
    name: "Web Scraping",
    percentage: 96,
    category: "core",
    summary: "Experienced harvester bypassing anti-scrape blocks using custom headers, throttle timers, sequential page loops, error fallbacks, and multi-threaded queries.",
    experience: "2+ Years scraping live athletic databases and financial platforms",
    relatedProjects: ["IPL 2025 Analytics Platform"],
    color: "#9146ff"
  }
];

export const FEATURED_PROJECT: Project = {
  id: "ipl-2025",
  title: "IPL 2025 Analytics Platform",
  description: "An end-to-end cricket analytics and ETL data pipeline that extracts scattered IPL 2025 match scorecards and auction details, models them into clean relational files, and visualizes them on an executive dashboard.",
  problem: "IPL data is heavily fragmented across static ESPN Cricinfo scorecards, live-blog articles, flash alerts, and PDF auction sheets. Raw sports datasets are loaded with non-standard strings, inconsistent player names, empty overs cells, and confusing sub-tabs, which prevents analysts from establishing unified performance matrices.",
  solution: "Constructed a comprehensive automated ETL framework in Python using BeautifulSoup and Request throttling. The raw text of 74 match scorecards was extracted, put into an automated sanitization and type-normalization engine, and modeled into robust facts and dimensions tables. This structured dataset yields high-fidelity metrics displayed in Power BI.",
  tech: ["Python", "Pandas", "BeautifulSoup", "Power BI", "ETL Pipelines", "Data Cleaning"],
  role: "Lead Analytics Architect",
  githubUrl: "https://github.com/mittapellisaikrishna/ipl-2025-franchise-roi",
  liveUrl: "https://ipl-2025-franchise-roi-nlbxp6ygeaiqv3mtqtmj6v.streamlit.app/?utm_source=chatgpt.com",
  docUrl: "https://github.com/mittapellisaikrishna/ipl-2025-franchise-roi/blob/main/TECHNICAL_DOCUMENTATION.md",
  metrics: [
    { label: "Total Matches Scraped", value: "74", trend: "100% coverage" },
    { label: "Active Players Modeled", value: "240+", trend: "Static rosters verified" },
    { label: "Auction Capital Scaped", value: "₹641.5 Cr", trend: "Fully balanced" },
    { label: "Top Run Scorer", value: "Jos Buttler", trend: "732 Runs" },
    { label: "Top Wicket Taker", value: "Y. Chahal", trend: "27 Wickets" },
    { label: "Team Performance Depth", value: "10/10", trend: "Teams mapped" }
  ],
  featured: true
};

export const ADDITIONAL_PROJECTS: Project[] = [
  {
    id: "sales-dashboard",
    title: "Sales Dashboard Analytics",
    description: "An enterprise executive commercial report tracking revenues, margins, and sales rep pipeline efficiency across regional lines.",
    problem: "Corporate managers had to consolidate multiple offline Excel sheets each month, experiencing lagging trends, human errors, and lack of filtering.",
    solution: "Loaded offline CSV stores into a structured SQL database, engineered reusable views calculating rolling quarterly trends, and connected it directly to Power BI.",
    tech: ["SQL", "Excel", "Power BI", "Data Modeling", "DAX Formulas"],
    githubUrl: "https://github.com/mittapellisaikrishna/sales-dashboard-analytics",
    liveUrl: "https://github.com/mittapellisaikrishna/sales-dashboard-analytics#livedocument",
    metrics: [
      { label: "Efficiency Boost", value: "+34%" },
      { label: "Data Latency Reduced", value: "30d -> 1d" },
      { label: "Revenue Checked", value: "$4.1M" }
    ],
    featured: false
  },
  {
    id: "customer-churn",
    title: "Customer Churn Analysis",
    description: "A machine learning and exploratory statistical pipeline detecting high-risk accounts using account tenure, support tickets, and spend patterns.",
    problem: "SaaS accounts churned unpredictably, resulting in a 12% revenue drop. The service team lacked a predictive mechanism to trigger preventative account help.",
    solution: "Engineered correlation and classification trees using Python Pandas, Scikit-learn, and Seaborn. Isolated critical churn triggers like ticket resolution delays.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Statistics"],
    githubUrl: "https://github.com/mittapellisaikrishna/customer-churn-prediction",
    liveUrl: "https://github.com/mittapellisaikrishna/customer-churn-prediction#metrics",
    metrics: [
      { label: "Churn Accuracy", value: "89% AUC" },
      { label: "Key Churn Catalyst", value: ">3 Tickets" },
      { label: "Retention Savings", value: "Est. $85K" }
    ],
    featured: false
  },
  {
    id: "ecommerce-revenue",
    title: "E-Commerce Revenue Analysis",
    description: "Multi-touch cohort database exploration analyzing checkout abandonments, top inventory turnover, and sales-funnel bottlenecks.",
    problem: "An e-commerce business was experiencing elevated cart drop rates (73%) but could not pin down the UX drop points or the items driving high dropouts.",
    solution: "Formulated robust SQL queries mapping user web session logs to purchase checkout statuses. Built cohort matrices and visual funnels in Tableau.",
    tech: ["SQL", "Tableau", "Database Optimization", "Cohort Analysis"],
    githubUrl: "https://github.com/mittapellisaikrishna/ecommerce-funnel-sql",
    liveUrl: "https://github.com/mittapellisaikrishna/ecommerce-funnel-sql#tableau-board",
    metrics: [
      { label: "Abandonment Pinpointed", value: "Billing Step" },
      { label: "Inventory Velocity", value: "1.4x Faster" },
      { label: "Conversion Lift", value: "4.8% Checked" }
    ],
    featured: false
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-cisco-da",
    name: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    badgeColor: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
    date: "2026",
    credentialUrl: "https://www.credly.com/badges/44de4cdf-ff23-438f-a3bb-0c79a85a2ee9"
  },
  {
    id: "cert-cyber",
    name: "Foundations of Cybersecurity",
    issuer: "Google",
    badgeColor: "from-blue-600 to-indigo-600",
    glowColor: "rgba(37, 99, 235, 0.4)",
    date: "2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/AGAN5VB3YVFR"
  },
  {
    id: "cert-aws-arch",
    name: "AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services",
    badgeColor: "from-yellow-500 to-amber-600",
    glowColor: "rgba(217, 119, 6, 0.4)",
    date: "2025",
    credentialUrl: "https://www.credly.com/badges/a04d7b5e-6c5a-4714-80ae-da0442160f1d/linked_in_profile"
  },
  {
    id: "cert-proj-mgt",
    name: "Career Essentials in Project Management",
    issuer: "Microsoft & LinkedIn",
    badgeColor: "from-teal-500 to-emerald-600",
    glowColor: "rgba(20, 184, 166, 0.4)",
    date: "2025",
    credentialUrl: "https://www.linkedin.com/learning/certificates/23bfb06a35003c19c590fb0ed493c37d3fac7ab0c642c59741d594338138a7e1"
  }
];
