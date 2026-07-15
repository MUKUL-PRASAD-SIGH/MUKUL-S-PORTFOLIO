import re

new_data = '''const projectsData = [
    {
        id: 'reggraph-ai',
        name: 'RegGraph-AI ???',
        description: 'AI-powered regulatory knowledge graph system for intelligent compliance mapping, automated regulation analysis, and graph-based reasoning over legal and policy documents.',
        icon: 'fas fa-project-diagram',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/RegGraph-AI',
        technologies: ["Next.js", "PostgreSQL", "FastAPI", "LangGraph", "Chroma DB", "NLP"],
        color: '#fe428e',
        categories: ["ai"]
    },
    {
        id: 'contextos',
        name: 'ContextOS ?',
        description: 'Intelligent Android background agent that proactively automates user workflows using contextual situation modeling, adaptive decision-making, autonomous action execution, Google API integrations, memory systems, and on-device AI-powered orchestration.',
        icon: 'fas fa-mobile-alt',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/ContextOS',
        technologies: ["Kotlin", "Jetpack Compose", "Android SDK", "RoomDB", "Groq", "On-device AI"],
        color: '#7c3aed',
        categories: ["ai"]
    },
    {
        id: 'neurosoc',
        name: 'NeuroSOC ??',
        description: 'AI-powered SOC analyst system that performs real-time threat detection using SNN, LNN, and XGBoost ensemble models with behavioral profiling, sandbox isolation, feedback-driven retraining, and full microservices architecture.',
        icon: 'fas fa-shield-alt',
        githubUrl: '#',
        technologies: ["SNN", "LNN", "XGBoost", "Microservices", "Cybersecurity"],
        color: '#ff3b5c',
        categories: ["ai", "data"]
    },
    {
        id: 'githopper',
        name: 'GitHopper ??',
        description: 'Intelligent Git repository analysis platform that performs deep code scanning, technical debt detection, health scoring, and real-time monitoring using MCP and AI-powered synthesis for actionable developer insights.',
        icon: 'fab fa-git-alt',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/GITHOPPER',
        technologies: ["MCP", "Amazon Bedrock", "React", "Flask", "Code Analytics"],
        color: '#00b894',
        categories: ["ai", "web"]
    },
    {
        id: 'llm-benchmark',
        name: 'LLM Benchmark Game ??',
        description: 'Interactive AI benchmark platform that compares multiple LLMs through real-time game-based challenges and reasoning tasks to evaluate model intelligence, speed, and accuracy.',
        icon: 'fas fa-gamepad',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/LLM_BENCHMARK_GAME',
        technologies: ["LLM", "LLMOps", "Microservices", "Groq"],
        color: '#6e40c9',
        categories: ["ai", "web"]
    },
    {
        id: 'project-astraeus',
        name: 'PROJECT_ENTANGLEMENT ??',
        description: 'SIH 2025: Project Astraeus — AI-powered Mission Control with digital twin simulation and predictive system monitoring.',
        icon: 'fas fa-satellite',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/PROJECT_ENTANGLEMENT',
        technologies: ["GNN", "Reinforcement Learning", "CesiumJS", "Digital Twin", "PyTorch"],
        color: '#ff6600',
        categories: ["ai", "data"]
    },
    {
        id: 'hackathon-dashboard',
        name: 'Hackathon-Dashboard ??',
        description: 'Real-time hackathon management dashboard for event tracking, analytics, and participant intelligence.',
        icon: 'fas fa-chart-bar',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/Hackathon-Dashboard',
        technologies: ["React", "Node.js", "MongoDB", "FullCalendar.js", "Express"],
        color: '#3178c6',
        categories: ["web"]
    },
    {
        id: 'novapulse',
        name: 'NovaPulse ??',
        description: 'Voice-powered multi-agent news intelligence system using Amazon Nova AI for sentiment analysis, trend detection, and automated executive summaries.',
        icon: 'fas fa-brain',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/NovaPulse',
        technologies: ["Multi-agent Systems", "DAG", "Amazon Nova", "NER", "asyncio", "FastAPI"],
        color: '#0099ff',
        categories: ["ai"]
    },
    {
        id: 'clipbait',
        name: 'Clipbait ??',
        description: 'AI-powered smart clipboard system to capture, analyze, and understand copied content using ML & DL.',
        icon: 'fas fa-clipboard',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/ClipBait',
        technologies: ["Node.js", "HuggingFace", "PostgreSQL", "FastAPI", "WebSockets", "Tauri Rust", "React Native"],
        color: '#ff3b5c',
        categories: ["ai", "web"]
    },
    {
        id: 'donorconnect',
        name: 'DonorConnectT ??',
        description: 'ML & DL based real-time blood donor-recipient intelligent matching and healthcare support system.',
        icon: 'fas fa-hand-holding-heart',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/DonorConnectT',
        technologies: ["Next.js", "Geospatial Querying", "RBAC", "JWT", "REST APIs", "WebSocket"],
        color: '#f44336',
        categories: ["ai", "web"]
    },
    {
        id: 'kisaanmitra',
        name: 'KisaanMitra ??',
        description: 'Multi-Agent System for collective agricultural intelligence — climate insights, autonomous irrigation, market intelligence, and financial inclusion for farmers.',
        icon: 'fas fa-tractor',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/KisaanMitra',
        technologies: ["Redis", "MCP", "PostgreSQL", "TimescaleDB", "PostGIS", "TensorFlow", "Python"],
        color: '#ffc107',
        categories: ["ai", "data"]
    },
    {
        id: 'vaaya',
        name: 'VAAYA-PROJECT ??',
        description: 'Smart travel platform blending Google Maps + Reels discovery + gamified exploration quests for travelers and local earners.',
        icon: 'fas fa-plane',
        githubUrl: 'https://github.com/MUKUL-PRASAD-SIGH/VAAYA-PROJECT',
        technologies: ["MongoDB Atlas", "OpenCV", "MobileNet", "RESTful API", "TensorFlow Lite"],
        color: '#00ccff',
        categories: ["ai", "web"]
    },
    {
        id: 'vootex',
        name: 'VoOTEX ???',
        description: 'Voice-to-text transcription pipeline with speaker diarization, noise handling, and post-processing intelligence.',
        icon: 'fas fa-microphone',
        githubUrl: '#',
        technologies: ["Speech-to-Text", "NLP", "Diarization"],
        color: '#6e40c9',
        categories: ["ai"]
    },
    {
        id: 'x-forecast',
        name: 'X-FORECAST ??',
        description: 'Advanced time-series forecasting models and dashboards for demand prediction, analytics, and trend intelligence.',
        icon: 'fas fa-chart-line',
        githubUrl: '#',
        technologies: ["Time-Series", "Prophet", "ARIMA", "Data Analytics"],
        color: '#00b894',
        categories: ["data", "ai"]
    },
    {
        id: 'finance-bud',
        name: 'finance-bud ??',
        description: 'Intelligent personal finance manager with budgeting automation, expense analytics, and financial insights.',
        icon: 'fas fa-wallet',
        githubUrl: '#',
        technologies: ["Data Analytics", "Automation", "Web Dev"],
        color: '#ffc107',
        categories: ["ai", "web"]
    },
    {
        id: 'glamglow',
        name: 'GlamGlow ?',
        description: 'ML-powered beauty product recommendation engine for personalized skincare and product discovery.',
        icon: 'fas fa-sparkles',
        githubUrl: '#',
        technologies: ["Recommendation Systems", "ML", "Data Mining"],
        color: '#fe428e',
        categories: ["ai", "data"]
    },
    {
        id: 'healthcare-dashboard',
        name: 'HealthCare-System-Dashboard ??',
        description: 'Real-time healthcare analytics dashboard powered by ML-driven insights and monitoring pipelines.',
        icon: 'fas fa-heartbeat',
        githubUrl: '#',
        technologies: ["Analytics", "Dashboard", "ML"],
        color: '#3178c6',
        categories: ["data", "web"]
    },
    {
        id: 'neuracity',
        name: 'NEURACITY ???',
        description: 'Neural/ML toolkit for city modelling and visualization — traffic optimization, zoning intelligence, and urban simulation.',
        icon: 'fas fa-city',
        githubUrl: '#',
        technologies: ["Urban Simulation", "ML", "Visualization"],
        color: '#0099ff',
        categories: ["ai", "data"]
    }
];'''

with open("script.js", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(r'const projectsData = \[.*?\];', new_data, content, flags=re.DOTALL)

with open("script.js", "w", encoding="utf-8") as f:
    f.write(content)
