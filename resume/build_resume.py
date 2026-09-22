"""One-page, ATS-friendly résumé for Gurprince Singh (A4, single column, real text, clickable links).

Regenerate:  python resume/build_resume.py public/Resume_Gurprince_Singh.pdf
Needs: pip install reportlab, and Calibri (bundled with Windows).
"""
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer,
                                Table, TableStyle, KeepTogether, Flowable)

OUT = sys.argv[1] if len(sys.argv) > 1 else 'Resume_Gurprince_Singh.pdf'
SCALE = float(sys.argv[2]) if len(sys.argv) > 2 else 0.96   # tweak to fit one page

F = 'C:/Windows/Fonts/'
pdfmetrics.registerFont(TTFont('Cal', F + 'calibri.ttf'))
pdfmetrics.registerFont(TTFont('Cal-B', F + 'calibrib.ttf'))
pdfmetrics.registerFont(TTFont('Cal-I', F + 'calibrii.ttf'))
pdfmetrics.registerFont(TTFont('Cal-BI', F + 'calibriz.ttf'))
pdfmetrics.registerFontFamily('Cal', normal='Cal', bold='Cal-B', italic='Cal-I', boldItalic='Cal-BI')

INK = HexColor('#111111')
MUTE = HexColor('#555555')
ACCENT = HexColor('#9a5a0e')     # dark amber: echoes the portfolio, prints fine in greyscale
RULE = HexColor('#bbbbbb')

BODY = 9.6 * SCALE
LEAD = BODY * 1.24

s_name = ParagraphStyle('name', fontName='Cal-B', fontSize=23 * SCALE, leading=25 * SCALE, textColor=INK)
s_role = ParagraphStyle('role', fontName='Cal', fontSize=11.5 * SCALE, leading=14 * SCALE, textColor=ACCENT)
s_contact = ParagraphStyle('contact', fontName='Cal', fontSize=9 * SCALE, leading=11.5 * SCALE, textColor=MUTE)
s_h = ParagraphStyle('h', fontName='Cal-B', fontSize=10.6 * SCALE, leading=12 * SCALE, textColor=ACCENT,
                     spaceBefore=7.5 * SCALE, spaceAfter=1.5 * SCALE)
s_body = ParagraphStyle('body', fontName='Cal', fontSize=BODY, leading=LEAD, textColor=INK, alignment=TA_LEFT)
s_bullet = ParagraphStyle('bullet', parent=s_body, leftIndent=9 * SCALE, bulletIndent=1.5 * SCALE, bulletFontName='Cal')
s_left = ParagraphStyle('left', parent=s_body, fontName='Cal-B')
s_right = ParagraphStyle('right', parent=s_body, fontName='Cal', textColor=MUTE, alignment=2)


def link(url, text):
    return f'<link href="{url}" color="#111111">{text}</link>'


class Rule(Flowable):
    def __init__(self, width, color=RULE, thickness=0.6):
        super().__init__()
        self.width, self.color, self.thickness = width, color, thickness
        self.height = 2.5 * SCALE

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, self.height, self.width, self.height)


W = A4[0] - 2 * 15 * mm


def heading(text):
    return [Paragraph(text.upper(), s_h), Rule(W)]


def row(left, right):
    t = Table([[Paragraph(left, s_left), Paragraph(right, s_right)]], colWidths=[W * 0.72, W * 0.28])
    t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'BOTTOM'),
                           ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('TOPPADDING', (0, 0), (-1, -1), 3.2 * SCALE), ('BOTTOMPADDING', (0, 0), (-1, -1), 0.6)]))
    return t


def bullets(items):
    return [Paragraph(i, s_bullet, bulletText='•') for i in items]


def entry(left, right, items):
    return KeepTogether([row(left, right)] + bullets(items))


story = []

# ---------- header ----------
story.append(Paragraph('Gurprince Singh', s_name))
story.append(Paragraph('Full Stack Developer', s_role))
story.append(Spacer(1, 2 * SCALE))
story.append(Paragraph(
    'Mohali, Punjab, India &nbsp;|&nbsp; +91 78883 62208 &nbsp;|&nbsp; '
    + link('mailto:gurprince151@gmail.com', 'gurprince151@gmail.com') + ' &nbsp;|&nbsp; '
    + link('https://gurprincesingh.vercel.app', 'gurprincesingh.vercel.app') + ' &nbsp;|&nbsp; '
    + link('https://github.com/Gurprince', 'github.com/Gurprince') + ' &nbsp;|&nbsp; '
    + link('https://linkedin.com/in/gurprince-singh-b572b9221', 'linkedin.com/in/gurprince-singh-b572b9221'),
    s_contact))

# ---------- summary ----------
story += heading('Summary')
story.append(Paragraph(
    'Full stack developer working across React, NestJS and PHP, with hands-on Azure and Power Platform automation and '
    'AI integration (vector search, MCP servers). Rebuilt a client reporting feature from <b>24 hours to under 7 seconds</b>, '
    'automated enterprise document workflows end to end, and hold a <b>granted patent</b> for an IoT display system. '
    'B.Tech in Computer Science (2026).', s_body))

# ---------- experience ----------
story += heading('Experience')
story.append(entry('Full Stack Developer, CFZ Technologies', 'Mohali &nbsp;|&nbsp; Jul 2026 – Present', [
    'Build end-to-end features across the frontend and backend of a high-traffic web application.',
    'Design and implement complex calculation and business-logic modules for accurate, real-time data processing.',
    'Develop responsive user interfaces for new product features.',
]))
story.append(entry('Software Developer Intern, Penthara Technologies', 'Mohali &nbsp;|&nbsp; Oct 2025 – Jun 2026', [
    'Rebuilt a client reporting feature in React and PHP, cutting report generation from <b>24 hours to 3–7 seconds</b> '
    '(~99.99% faster) for client Healthicity.',
    'Designed and deployed Azure Logic Apps and Power Automate flows that <b>eliminated manual document uploads</b> for '
    'client Standish, filing SharePoint files into Azure Blob Storage in a client-named folder structure.',
    'Built a <b>multi-tenant workforce platform</b> in React and NestJS covering workspaces, projects with tasks and subtasks, '
    'timesheets, leave, employee capacity tracking, and RAG and risk reports, with Teams integration and automated emails.',
    'Added AI features to the platform: semantic search on a vector database and custom MCP (Model Context Protocol) servers.',
    'Delivered Power Apps on SharePoint, email-attachment automation flows, a client WordPress site, and new features on a '
    'React + PHP client platform.',
]))
story.append(entry('Junior Software Intern, Logicsoft International', 'Gurgaon &nbsp;|&nbsp; Jun 2025 – Jul 2025', [
    'Built a company AI chatbot platform and designed its UX and landing page to improve user onboarding.',
]))
story.append(entry('Software Developer Intern, Speedum Technology', 'Punjab &nbsp;|&nbsp; Jan 2024 – Sep 2024', [
    'Developed and debugged web applications in HTML, CSS, JavaScript and React.js.',
]))

# ---------- projects ----------
story += heading('Projects')
story.append(entry(
    'SkillMentor, AI learning roadmap platform &nbsp;<font name="Cal" color="#555555">| '
    + link('https://github.com/Gurprince/Skill-Mentor', 'GitHub') + '</font>',
    'React, Node.js, MongoDB, AI', [
        'Generates a personalised roadmap for a target role (e.g. Frontend, DevOps) with curated resources, tasks and milestones.',
        'AI evaluates completed tasks, gives feedback and adapts the learning path to each user’s progress.',
    ]))
story.append(entry(
    'DevDeck, developer productivity workspace &nbsp;<font name="Cal" color="#555555">| '
    + link('https://github.com/Gurprince/dev-deck', 'GitHub') + '</font>',
    'MongoDB, Express, React, Node.js', [
        'Combines a Kanban board, searchable snippet library, versioned docs, custom dashboards and real-time notifications '
        'in one app, replacing five separate tools.',
        'Implemented role-based access control with Owner, Editor and Viewer permission tiers.',
    ]))
story.append(entry(
    'SkillSync, AI task recommendations &nbsp;<font name="Cal" color="#555555">| '
    + link('https://github.com/Gurprince/Ai-TaskRecommend', 'GitHub') + '</font>',
    'React, Node.js, MongoDB', [
        'Recommendation engine that suggests tasks based on each user’s skills, improving task completion engagement.',
    ]))
story.append(entry('Smart Notice Board, IoT display system (granted patent)', 'Raspberry Pi, web', [
    'Designed a two-site system: a sender portal for notices and a Raspberry Pi-hosted receiver that displays them in real time.',
]))
story.append(entry('Freelance client websites', 'React, Node.js, Firebase', [
    link('https://indytruckrepair.us', '<b>Indy Truck &amp; Trailer Repair</b>') + ' (indytruckrepair.us): business website '
    'for service discovery and customer inquiries.',
    link('https://lensfillers.ca', '<b>LensFillers</b>') + ' (lensfillers.ca): portfolio site for a photographer and '
    'filmmaker, with album showcase and inquiry flow.',
]))

# ---------- skills ----------
story += heading('Technical skills')
skills = [
    ('Frontend', 'React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, SCSS'),
    ('Backend', 'Node.js, Express.js, NestJS, PHP, REST APIs, MCP server development'),
    ('Data', 'MongoDB, MySQL, Firebase, vector databases (semantic search)'),
    ('Microsoft &amp; Azure', 'Azure Logic Apps, Azure Functions, Blob Storage, Power Apps, Power Automate, SharePoint, SPFx, Teams'),
    ('Other', 'Python, C++, WordPress, Git, GitHub'),
]
for k, v in skills:
    story.append(Paragraph(f'<b>{k}:</b> {v}', ParagraphStyle('sk', parent=s_body, spaceBefore=0.6 * SCALE)))

# ---------- education ----------
story += heading('Education')
story.append(row('B.Tech, Computer Science &amp; Engineering, GNA University', 'Phagwara &nbsp;|&nbsp; 2022 – 2026'))
story.append(Paragraph('Coursework: Full Stack Development, Data Structures &amp; Algorithms, Web Technologies.', s_body))
story.append(row('Senior Secondary (CBSE), Akal Academy Tibber<font name="Cal" color="#555555">, 86%, 2nd rank in school</font>', 'Punjab &nbsp;|&nbsp; 2022'))

# ---------- achievements ----------
story += heading('Achievements &amp; leadership')
story += bullets([
    'Ran a 2-day React.js workshop for <b>180+ participants</b> covering components, state management and hooks.',
    '2nd place, inter-college Web Design Competition. Built an AI tutor suite in 28 hours with a 5-person team at GNA '
    'Hackathon. Coordinator for Coding Mania and several gaming events.',
])

pages = []


def on_page(canv, doc):
    pages.append(doc.page)


doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm, topMargin=12 * mm, bottomMargin=11 * mm,
                      title='Gurprince Singh – Résumé', author='Gurprince Singh',
                      subject='Full Stack Developer', creator='Gurprince Singh')
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f', leftPadding=0, rightPadding=0,
              topPadding=0, bottomPadding=0)
doc.addPageTemplates([PageTemplate(id='p', frames=[frame], onPage=on_page)])
doc.build(story)
print('pages:', len(pages))
