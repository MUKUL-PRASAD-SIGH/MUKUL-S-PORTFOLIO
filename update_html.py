import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update Deployed Projects
content = re.sub(
    r'(<h4 class="project-name"[^>]*>Project Astraeus</h4>\s*</div>\s*</div>\s*<div class="project-content">\s*<p class="project-description">).*?(</p>)',
    r'\g<1>SIH 2025: Project Astraeus - AI-powered Mission Control with digital twin simulation and predictive system monitoring.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>DonorConnect</h4>\s*</div>\s*</div>\s*<div class="project-content">\s*<p class="project-description">).*?(</p>)',
    r'\g<1>Intelligent real-time blood donor matching platform utilizing deep learning and geospatial querying.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>Amazon Nova Pulse</h4>\s*</div>\s*</div>\s*<div class="project-content">\s*<p class="project-description">).*?(</p>)',
    r'\g<1>Voice-powered multi-agent news intelligence system using Amazon Nova AI for automated executive summaries and trend detection.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>Hackathon Dashboard</h4>\s*</div>\s*</div>\s*<div class="project-content">\s*<p class="project-description">).*?(</p>)',
    r'\g<1>Real-time hackathon management dashboard for tracking teams, projects, and submissions seamlessly.\g<2>',
    content, flags=re.DOTALL
)

# Update Demo Videos
content = re.sub(
    r'(<h4 class="project-name"[^>]*>ContextOS</h4>\s*<p class="project-description">).*?(</p>)',
    r'\g<1>Proactive Android AI agent that autonomously manages meetings, navigation, DND, reminders, and contextual workflows using adaptive on-device intelligence.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>Project Astraeus</h4>\s*<p class="project-description">).*?(</p>)',
    r'\g<1>SIH 2025: Project Astraeus - AI-powered Mission Control with digital twin simulation and predictive system monitoring.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>Hackathon Dashboard</h4>\s*<p class="project-description">).*?(</p>)',
    r'\g<1>Real-time hackathon management dashboard for tracking teams, projects, and submissions seamlessly.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>KisaanMitra</h4>\s*<p class="project-description">).*?(</p>)',
    r'\g<1>Multi-Agent AI System for Agricultural Optimization built to transform smallholder farmers into digitally coordinated, profit-generating agribusinesses.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>DonorConnect</h4>\s*<p class="project-description">).*?(</p>)',
    r'\g<1>Intelligent real-time blood donor matching platform utilizing deep learning and geospatial querying.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>ClipBait</h4>\s*<p class="project-description">).*?(</p>)',
    r'\g<1>AI-Powered Smart Clipboard System built to transform traditional copy-paste workflows into an intelligent, context-aware experience.\g<2>',
    content, flags=re.DOTALL
)

content = re.sub(
    r'(<h4 class="project-name"[^>]*>NovaPulse</h4>\s*<p class="project-description">).*?(</p>)',
    r'\g<1>Voice-powered multi-agent news intelligence system using Amazon Nova AI for automated executive summaries and trend detection.\g<2>',
    content, flags=re.DOTALL
)

# Insert filter UI
filter_ui = '''        <div class="project-filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="ai">AI / ML</button>
            <button class="filter-btn" data-filter="data">Data Science</button>
            <button class="filter-btn" data-filter="web">Web Dev</button>
        </div>'''

if "project-filters" not in content:
    content = re.sub(
        r'(<h2 class="section-title">Forge & Projects</h2>\s*<p class="section-subtitle">[^<]*</p>)',
        r'\g<1>\n' + filter_ui,
        content
    )

# Decrease font size for video-card project-name
content = re.sub(r'(class="project-name"[^>]*)font-size: 1\.5rem;', r'\g<1>font-size: 1.25rem;', content)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
