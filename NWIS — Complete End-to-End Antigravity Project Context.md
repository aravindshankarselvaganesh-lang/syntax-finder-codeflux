# NWIS
# Intelligent Drilling Intelligence System

## MASTER PROJECT CONTEXT FOR ANTIGRAVITY

**Project:** Code Flux 2026  
**Date:** September 11, 2026  
**Domain:** Oil & Gas / Drilling Intelligence  
**Target Organization:** Oil India Limited (OIL)  
**Primary Geography:** Assam + Gujarat  
**Product Type:** AI-powered industrial operational intelligence and decision-support platform  
**Primary Goal:** Build a polished, functional, production-inspired hackathon prototype.

---

# 0. IMPORTANT INSTRUCTION TO ANTIGRAVITY

You are working on a project called:

# NWIS — Intelligent Drilling Intelligence System

Do not treat this project as a generic CRUD application.

Do not build a generic SaaS dashboard.

Do not build a generic AI chatbot.

Do not build a static UI mockup.

Build NWIS as a:

> **Map-first, AI-native, real-time drilling operational intelligence and decision-support platform.**

The application must connect:

```text
GEOGRAPHY
    ↓
SITE
    ↓
WELL
    ↓
LIVE TELEMETRY
    ↓
ANOMALY
    ↓
RISK
    ↓
HISTORICAL KNOWLEDGE
    ↓
RAG
    ↓
ROOT-CAUSE ANALYSIS
    ↓
AI INSIGHT
    ↓
RECOMMENDED INVESTIGATION
    ↓
HUMAN DECISION
```

This chain is the core product.

Every major feature should support this workflow.

---

# 1. PRODUCT VISION

NWIS brings drilling information from multiple sources into one intelligent operational environment.

It combines:

- historical drilling reports
- drilling logs
- historical incidents
- equipment information
- real-time or simulated telemetry
- site and well information
- risk metrics
- anomaly detection
- root-cause analysis
- Retrieval-Augmented Generation
- AI-generated operational insights
- geographical visualization
- alerts
- operational analytics

The goal is to help drilling personnel answer:

1. Where are drilling operations occurring?
2. What is happening right now?
3. Is the operation behaving normally?
4. What changed?
5. What is the current risk?
6. Why is the risk elevated?
7. Has something similar happened historically?
8. What evidence supports the AI assessment?
9. What should the operator investigate next?

---

# 2. CORE PROBLEM

Drilling operations generate heterogeneous information.

Examples:

- historical drilling reports
- daily drilling reports
- well logs
- telemetry
- equipment information
- incident reports
- operational observations
- pressure information
- temperature
- drilling parameters
- historical failure records

These sources can be difficult to analyze together.

An engineer may need to manually:

```text
find the affected well
→ inspect telemetry
→ identify abnormal behavior
→ search historical reports
→ find similar incidents
→ determine possible cause
→ estimate severity
→ decide what to investigate
```

NWIS compresses this process into one integrated system.

---

# 3. CORE VALUE PROPOSITION

NWIS is not merely:

> "A dashboard showing drilling data."

It is:

> **A system that connects current drilling conditions with historical organizational knowledge to identify, explain, and prioritize operational risks.**

The strongest differentiator is:

# LIVE TELEMETRY + HISTORICAL KNOWLEDGE + AI REASONING

---

# 4. PRODUCT NORTH STAR

The system should allow a user to move from:

> "Something changed."

to:

> "This is what changed."

to:

> "This is why it may have changed."

to:

> "Here is what happened in similar historical cases."

to:

> "Here is the evidence."

to:

> "Here is what should be investigated next."

---

# 5. TARGET USERS

## 5.1 Drilling Engineer

Primary needs:

- live telemetry
- well performance
- drilling parameters
- anomalies
- risk
- historical cases
- root-cause analysis
- AI recommendations

---

## 5.2 Operations Manager

Primary needs:

- regional operational overview
- active sites
- high-risk sites
- critical alerts
- performance
- NPT
- incidents
- trends

---

## 5.3 Field Operator

Primary needs:

- current well state
- critical telemetry
- alerts
- anomalies
- operational context
- AI-generated brief

The field experience should minimize unnecessary information.

---

## 5.4 AI/Data Analyst

Primary needs:

- historical reports
- RAG
- document retrieval
- incidents
- root causes
- telemetry correlations
- analytics

---

## 5.5 Executive / Decision Maker

Primary needs:

- overall operational status
- regional performance
- risk
- incidents
- trends
- AI-generated executive summary

---

# 6. PRODUCT PRINCIPLES

Follow these principles throughout development.

## Principle 1 — Map First

Geography is central to the product.

## Principle 2 — Operational, Not Decorative

Every visualization should answer a real operational question.

## Principle 3 — Explain Risk

Never show only a risk score.

Explain contributors.

## Principle 4 — Evidence Before Confidence

AI should show supporting historical evidence.

## Principle 5 — Human in the Loop

AI recommends.

Humans validate and decide.

## Principle 6 — Real-Time Awareness

Live data must visibly communicate freshness.

## Principle 7 — Progressive Disclosure

Show the most important information first.

Expose deeper information when requested.

## Principle 8 — Exception Driven

Normal operations should remain visually calm.

Abnormal operations should receive attention.

---

# 7. UX PHILOSOPHY

The product interaction model is:

```text
OBSERVE
↓
UNDERSTAND
↓
INVESTIGATE
↓
CORRELATE
↓
PREDICT
↓
DECIDE
↓
ACT
```

The UI should make this progression natural.

---

# 8. PRIMARY USER JOURNEY

The most important journey is:

```text
LOGIN
 ↓
COMMAND CENTER
 ↓
OPERATIONS MAP
 ↓
SELECT SITE
 ↓
SITE DRAWER
 ↓
LIVE TELEMETRY
 ↓
ANOMALY
 ↓
RISK SCORE
 ↓
RISK EXPLANATION
 ↓
HISTORICAL MATCH
 ↓
RAG EVIDENCE
 ↓
ROOT CAUSE
 ↓
AI INSIGHT
 ↓
RECOMMENDED INVESTIGATION
 ↓
INCIDENT / ALERT
 ↓
HUMAN REVIEW
```

This is the primary demo journey.

---

# 9. APPLICATION ARCHITECTURE

Recommended high-level architecture:

```text
                        ┌──────────────────────┐
                        │       React          │
                        │   NWIS Frontend      │
                        └──────────┬───────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │      FastAPI         │
                        │    Main API Layer    │
                        └──────────┬───────────┘
                                   │
               ┌───────────────────┼──────────────────┐
               │                   │                  │
               ▼                   ▼                  ▼
        ┌─────────────┐     ┌─────────────┐    ┌─────────────┐
        │ Supabase /  │     │ Risk Engine │    │ RAG / AI    │
        │ PostgreSQL  │     │             │    │ Intelligence│
        └─────────────┘     └─────────────┘    └─────────────┘
               │                   │                  │
               ▼                   ▼                  ▼
          Structured          Telemetry          Historical
             Data              Analysis            Reports
```

---

# 10. TECHNOLOGY STACK

## Frontend

Primary:

- React
- TypeScript
- Tailwind CSS

Visualization:

- Recharts or equivalent
- Google Maps API

Icons:

- Lucide

---

## Backend

Primary:

- Python
- FastAPI

Authentication:

- Flask where required by existing architecture

Alternative:

FastAPI authentication may be used if simplifying the architecture is beneficial.

Do not maintain two backend frameworks unnecessarily.

---

## Database

Primary:

- Supabase
- PostgreSQL

MySQL may be used where existing/legacy data requires it.

Do not duplicate data across PostgreSQL and MySQL without a reason.

---

## Media

Cloudinary.

Use for:

- site images
- equipment images
- supporting media
- report assets where appropriate

Store references/URLs in the database.

---

## Development

- Git
- GitHub
- VS Code
- GitHub Copilot
- Qoder
- Antigravity

---

# 11. DATABASE MODEL

Create a relational model similar to:

```text
users
│
├── roles
│
sites
│
├── wells
│   │
│   ├── telemetry
│   │
│   ├── drilling_events
│   │
│   ├── risk_assessments
│   │
│   ├── alerts
│   │
│   ├── incidents
│   │
│   └── ai_insights
│
historical_reports
│
├── document_chunks
│
├── embeddings / vector references
│
└── historical_incidents

recommendations
reports
media
system_events
```

---

# 12. DATABASE TABLES

## users

Fields:

```text
id
name
email
password_hash
role
status
created_at
last_login
```

Never store plaintext passwords.

---

## sites

```text
id
site_code
name
region
state
district
field
latitude
longitude
status
risk_level
risk_score
active_wells
active_rigs
created_at
updated_at
```

---

## wells

```text
id
site_id
well_code
well_name
well_type
status
current_depth
target_depth
drilling_status
rig_id
risk_level
risk_score
created_at
updated_at
```

---

## rigs

```text
id
rig_code
name
site_id
status
equipment_health
last_update
```

---

## telemetry

```text
id
well_id
timestamp
depth
rop
wob
rpm
torque
spp
flow_rate
temperature
mud_weight
ecd
equipment_state
```

---

## drilling_events

```text
id
well_id
event_type
severity
description
timestamp
source
status
```

---

## risk_assessments

```text
id
well_id
risk_score
risk_level
primary_cause
contributors
confidence
explanation
timestamp
```

---

## alerts

```text
id
site_id
well_id
severity
title
description
detected_at
status
acknowledged_by
resolved_at
```

---

## incidents

```text
id
site_id
well_id
incident_type
root_cause
severity
description
start_time
end_time
status
resolution
```

---

## historical_reports

```text
id
title
well_code
site
region
report_type
report_date
source
file_url
text_content
metadata
created_at
```

---

## document_chunks

```text
id
report_id
chunk_index
content
metadata
embedding_reference
created_at
```

---

## ai_insights

```text
id
well_id
risk_assessment_id
title
assessment
evidence
historical_matches
root_cause
recommendation
confidence
created_at
```

---

## recommendations

```text
id
well_id
insight_id
recommendation
reason
confidence
status
assigned_to
created_at
```

---

# 13. HISTORICAL DATA PIPELINE

Historical reports should follow:

```text
REPORT
 ↓
INGESTION
 ↓
TEXT EXTRACTION
 ↓
CLEANING
 ↓
METADATA EXTRACTION
 ↓
CHUNKING
 ↓
EMBEDDING
 ↓
VECTOR STORAGE
 ↓
RETRIEVAL
```

---

# 14. RAG PIPELINE

The RAG architecture:

```text
User / System Query
        ↓
Query Understanding
        ↓
Embedding
        ↓
Vector Search
        ↓
Metadata Filtering
        ↓
Top-K Historical Chunks
        ↓
Context Assembly
        ↓
LLM
        ↓
Structured AI Response
```

---

# 15. RAG REQUIREMENTS

Historical retrieval should support:

- site
- region
- well
- report type
- incident type
- root cause
- date
- similarity

The RAG response must preserve source references.

---

# 16. RAG EXPLAINABILITY

When AI says:

> "This condition resembles historical formation-related incidents."

the UI should be able to show:

```text
Historical Match #1
Similarity: 91%

Historical Match #2
Similarity: 84%

Historical Match #3
Similarity: 79%
```

Each result should link back to its source.

---

# 17. AI RESPONSE CONTRACT

AI should produce structured output.

Recommended JSON-style conceptual response:

```json
{
  "assessment": "...",
  "risk_level": "HIGH",
  "risk_score": 87,
  "confidence": 0.87,
  "contributors": [
    {
      "factor": "Pressure anomaly",
      "impact": 0.34
    }
  ],
  "historical_matches": [
    {
      "report_id": "...",
      "similarity": 0.91
    }
  ],
  "probable_root_cause": "...",
  "recommendation": "...",
  "evidence": []
}
```

Do not rely on free-form AI text for critical UI state.

---

# 18. RISK ENGINE

For the hackathon MVP, risk can be rule-based or hybrid.

Do not pretend the score is an officially validated Oil India risk model.

Clearly treat it as:

```text
NWIS DEMO RISK MODEL
```

---

# 19. RISK LEVELS

Use:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Possible score mapping:

```text
0–29     LOW
30–59    MEDIUM
60–79    HIGH
80–100   CRITICAL
```

These thresholds are demo values and should be configurable.

---

# 20. RISK CONTRIBUTORS

Possible factors:

```text
Pressure anomaly
ROP deviation
Torque instability
Temperature anomaly
Flow deviation
Mud-weight deviation
Equipment state
Historical similarity
Rate-of-change
Data quality
```

---

# 21. RISK EXPLANATION

Never show:

```text
Risk = 87
```

without context.

Instead:

```text
RISK
87 / 100
HIGH

Contributors:

Pressure anomaly       34%
ROP deviation          22%
Torque instability     18%
Historical similarity  13%
Other                  13%
```

---

# 22. ROOT-CAUSE CATEGORIES

Use a configurable taxonomy.

```text
TECHNICAL
├── Equipment
├── Mechanical
├── Electrical
└── Instrumentation

FORMATION / GEOLOGICAL
├── Pressure
├── Lithology
├── Stability
└── Fluid behavior

OPERATIONAL
├── Procedure
├── Coordination
├── Delay
└── Logistics

DATA / SENSOR
├── Sensor fault
├── Telemetry issue
└── Data quality

EXTERNAL
├── Weather
├── Infrastructure
└── Supply
```

---

# 23. TELEMETRY

Telemetry may include:

```text
Depth
ROP
WOB
RPM
Torque
Standpipe Pressure
Flow Rate
Temperature
Mud Weight
ECD
Equipment State
```

All data may be simulated for the hackathon.

---

# 24. TELEMETRY SIMULATION

Create a deterministic simulation engine.

States:

```text
NORMAL
WATCH
ANOMALY
HIGH_RISK
CRITICAL
RECOVERY
```

The simulator should alter parameters over time.

Example:

```text
NORMAL
pressure = baseline
rop = normal
torque = normal

↓

ANOMALY

pressure ↑
rop ↓
torque variance ↑

↓

HIGH RISK

pressure significantly ↑
rop significantly ↓
historical similarity ↑

↓

RECOVERY

parameters return toward baseline
```

---

# 25. SIMULATION MODE

Create a hidden/secondary demo control.

```text
SIMULATION MODE

Scenario:

Normal
Pressure Anomaly
Equipment Issue
Formation Challenge
Critical Event
Recovery

[ Start Scenario ]
```

The simulation should update:

- telemetry
- charts
- risk
- alerts
- map status
- AI insights

---

# 26. PRIMARY DEMO SCENARIO

Hero site:

# ASSAM-07

Initial state:

```text
ACTIVE
LOW / MEDIUM RISK
```

Then trigger:

```text
Pressure begins rising
↓
ROP decreases
↓
Torque becomes unstable
↓
Anomaly detector triggers
↓
Risk increases
↓
Alert generated
↓
Historical retrieval begins
↓
Similar cases found
↓
AI generates assessment
↓
Root cause suggested
↓
Recommendation generated
```

This should be the main hackathon demonstration.

---

# 27. FRONTEND INFORMATION ARCHITECTURE

Primary navigation:

```text
COMMAND
├── Overview
└── Operations Map

ASSETS
├── Sites
├── Wells
└── Rigs

INTELLIGENCE
├── Risk Intelligence
├── AI Copilot
├── Historical Intelligence
├── Root Cause Analysis
└── Performance Intelligence

OPERATIONS
├── Alerts
├── Incidents
└── Reports

SYSTEM
├── Data Sources
├── System Health
└── Settings
```

---

# 28. REQUIRED SCREENS

Build the following.

## Authentication

- Login
- Logout
- Session handling

---

## Command Center

- Overview dashboard

---

## Map

- Operations map
- Site selection
- Site drawer
- Filters
- Layers

---

## Assets

- Sites
- Site detail
- Wells
- Well detail
- Rigs

---

## Intelligence

- Risk Intelligence
- AI Copilot
- Historical Intelligence
- Root Cause Analysis
- Performance Intelligence

---

## Operations

- Alerts
- Incidents
- Reports

---

## System

- Data Sources
- System Health
- Settings

---

# 29. COMMAND CENTER

The command center is the default landing screen after login.

Header:

```text
DRILLING OPERATIONS
COMMAND CENTER

Assam + Gujarat

● SYSTEM LIVE
Last update: 12 sec
```

---

# 30. COMMAND CENTER KPIs

Display:

```text
ACTIVE SITES
24

ACTIVE WELLS
31

DRILLING
18

HIGH RISK
05

CRITICAL ALERTS
02

NPT
3.2%

AVG ROP
17.8 m/hr

SYSTEM HEALTH
99.4%
```

Use compact operational blocks.

---

# 31. COMMAND CENTER LAYOUT

Recommended:

```text
┌───────────────────────────────────────────────────────────┐
│ KPI RIBBON                                                │
├─────────────────────────────────────┬─────────────────────┤
│                                     │                     │
│                                     │ CRITICAL ALERTS     │
│                                     │                     │
│             LIVE MAP                │ Alert               │
│                                     │ Alert               │
│                                     │ Alert               │
│                                     │                     │
├──────────────────────┬──────────────┴─────────────────────┤
│ TELEMETRY SNAPSHOT   │ AI OPERATIONAL BRIEF              │
├──────────────────────┴────────────────────────────────────┤
│ RISK / PERFORMANCE / ACTIVE OPERATIONS                    │
└───────────────────────────────────────────────────────────┘
```

---

# 32. OPERATIONS MAP

Use Google Maps API.

The map should focus on:

- Assam
- Gujarat

Show:

- sites
- wells
- rigs
- incidents
- risk
- activity

---

# 33. MAP MARKERS

Do not use generic Google Maps pins.

Create custom markers.

```text
LOW       green
MEDIUM    amber
HIGH      orange
CRITICAL  red
```

Use:

```text
icon
+
label
+
risk state
```

Critical markers may have a subtle pulse.

---

# 34. MAP FILTERS

Filters:

```text
Region
Risk
Status
Activity
Asset
Time
```

Example:

```text
Region: Assam
Risk: High+
Status: Active
Activity: Drilling
```

Filters should persist when navigating where appropriate.

---

# 35. MAP LAYERS

Layers:

```text
Sites
Wells
Rigs
Incidents
Risk
Infrastructure
```

---

# 36. MAP TIME CONTROL

Provide a temporal slider.

```text
08:00 ─── 10:00 ─── 12:00 ─── 14:00 ─── NOW
                          ▲
                        EVENT
```

This allows investigation of:

> What happened before the risk increased?

---

# 37. SITE DRAWER

Clicking a site opens a right-side drawer without losing map context.

Example:

```text
ASSAM-07
DULIAJAN FIELD

● HIGH RISK
ACTIVE

WELL
OIL-AS-07

RIG
OIL-RIG-24

DEPTH
3,842 m

ROP
18.4 m/hr

WOB
22 klbf

RPM
118

SPP
2,940 psi

RISK
87 / 100

AI BRIEF

Pressure behavior differs
from expected baseline.

[ INVESTIGATE ]
[ OPEN SITE ]
```

---

# 38. SITE DETAIL

Tabs:

```text
Overview
Live Telemetry
Risk
Wellbore
Incidents
Historical Intelligence
AI Analysis
Reports
```

---

# 39. SITE OVERVIEW

Display:

- current operation
- current depth
- target depth
- progress
- telemetry
- equipment health
- risk
- active alerts
- recent events

---

# 40. WELLBORE VIEW

Create a vertical well visualization.

Show:

- surface
- casing
- formation intervals
- geological markers
- current bit depth
- target depth
- anomalies
- pressure zones where available

This should make the product visually drilling-specific.

---

# 41. LIVE TELEMETRY SCREEN

Charts:

```text
Depth
ROP
WOB
RPM
Torque
SPP
Flow
Temperature
Mud Weight
ECD
```

Time ranges:

```text
15 min
1 hour
6 hours
24 hours
7 days
```

---

# 42. TELEMETRY CHART DESIGN

Each chart should support:

- current value
- expected baseline
- threshold
- historical range
- anomaly marker
- hover tooltip

---

# 43. CURRENT VS EXPECTED

Example:

```text
SPP

Current:      2,940 psi
Expected:    2,710 psi
Deviation:   +8.5%
Historical:  +2.1%
```

This is more useful than showing the current value alone.

---

# 44. ANOMALY UX

Example:

```text
⚠ ANOMALY DETECTED

Pressure deviation
+8.5% above expected

Detected:
14:32:18

Confidence:
92%
```

Clicking the anomaly should reveal the contributing telemetry.

---

# 45. RISK INTELLIGENCE PAGE

Show:

```text
CRITICAL     02
HIGH         05
MEDIUM       09
LOW          18
```

Then provide:

- risk trend
- risk distribution
- high-risk wells
- contributing causes
- regional comparison

---

# 46. RISK TABLE

Columns:

```text
Site
Well
Risk
Score
Primary Cause
Detected
Trend
Action
```

Example:

```text
Assam-07
OIL-AS-07
HIGH
87
Formation pressure
4 min ago
↑
Investigate
```

---

# 47. ROOT-CAUSE ANALYSIS

Represent causal relationships.

Concept:

```text
             HIGH RISK
                 │
        ┌────────┼────────┐
        ↓        ↓        ↓
    PRESSURE     ROP    TORQUE
        │        │        │
        └────────┼────────┘
                 ↓
       FORMATION RESPONSE
                 │
                 ↓
       HISTORICAL MATCHES
```

---

# 48. HISTORICAL INTELLIGENCE

Search interface:

```text
Ask the drilling knowledge base...

"Have we seen this pressure behavior before?"
```

Response:

```text
I found 7 historically similar cases.

5 occurred in Assam.
2 occurred under comparable conditions.

3 resulted in significant operational intervention.
```

---

# 49. HISTORICAL MATCH CARD

Example:

```text
HISTORICAL MATCH #01

Well:
ASSAM-2019-042

Similarity:
91%

Incident:
Abnormal pressure response

Root Cause:
Formation pressure transition

Source:
Daily Drilling Report

Date:
12 Aug 2019

[ View Evidence ]
```

---

# 50. AI COPILOT

Name:

# NWIS INTELLIGENCE COPILOT

It must not look like a generic chatbot.

It should be contextual.

Example context:

```text
Context:
Assam-07
OIL-AS-07
HIGH RISK
LIVE TELEMETRY
HISTORICAL KNOWLEDGE
```

---

# 51. COPILOT SUGGESTIONS

Provide suggested questions:

```text
Why is this well high risk?

What changed in the last 30 minutes?

Find similar historical incidents.

What are the major risk contributors?

Compare this well with nearby wells.

Summarize today's drilling performance.
```

---

# 52. AI RESPONSE STRUCTURE

Every major response should use:

```text
ASSESSMENT

EVIDENCE

HISTORICAL CONTEXT

RISK

RECOMMENDED INVESTIGATION

CONFIDENCE
```

---

# 53. AI RECOMMENDATIONS

AI should not issue unsafe authoritative commands.

Use:

```text
RECOMMENDED INVESTIGATION

Review pressure and mud-property behavior
against the current formation interval.

Reason:
Current telemetry deviates from expected behavior.

Confidence:
87%

[ Review Evidence ]
[ Assign Investigation ]
```

Use language:

- likely
- suggests
- potential
- investigate
- review
- consider

Do not imply certainty.

---

# 54. AI ↔ TELEMETRY LINK

AI statements should link to telemetry.

Example:

AI:

> Pressure increased significantly at 14:18.

Click:

```text
[ Evidence ]
```

Telemetry chart jumps to:

```text
14:18
  ↑
ANOMALY
```

---

# 55. AI ↔ HISTORICAL LINK

Clicking historical evidence should open:

```text
CURRENT CASE
       ↕
HISTORICAL CASE
```

Show relevant similarities.

---

# 56. ALERT CENTER

Severity:

```text
CRITICAL
HIGH
MEDIUM
LOW
INFO
```

Each alert:

```text
Site
Well
Timestamp
Metric
Severity
Cause
Confidence
Recommended Investigation
```

---

# 57. ALERT CORRELATION

Avoid alert spam.

Instead of:

```text
Pressure high
Torque high
ROP low
Flow abnormal
```

create:

```text
DRILLING PERFORMANCE ANOMALY

4 correlated signals:

Pressure ↑
Torque ↑
ROP ↓
Flow deviation

[ Investigate Cluster ]
```

---

# 58. INCIDENT MANAGEMENT

Workflow:

```text
DETECTED
 ↓
ACKNOWLEDGED
 ↓
INVESTIGATING
 ↓
ASSIGNED
 ↓
RESOLVED
 ↓
REVIEWED
```

---

# 59. INCIDENT TIMELINE

Example:

```text
14:18
Pressure begins deviating

14:24
AI detects anomaly

14:27
Risk → MEDIUM

14:32
Risk → HIGH

14:34
Operator acknowledges

14:38
Investigation assigned

14:52
Risk returns to MEDIUM
```

---

# 60. PERFORMANCE INTELLIGENCE

Include:

- ROP
- NPT
- drilling hours
- depth progress
- target vs actual
- operational efficiency
- connection time
- trip time

---

# 61. NPT INTELLIGENCE

Example:

```text
NPT
3.2%

Mechanical      38%
Operational     27%
Formation       21%
Other           14%
```

Categories should be clickable.

---

# 62. REGIONAL ANALYTICS

Compare:

```text
ASSAM

Sites:       18
Active:      14
High Risk:    4
Critical:     1

GUJARAT

Sites:       12
Active:       9
High Risk:    1
Critical:     1
```

---

# 63. SITE COMPARISON

Allow multiple selection.

Example:

```text
ASSAM-07
vs
ASSAM-12
vs
GUJARAT-05
```

Compare:

- depth
- ROP
- pressure
- torque
- risk
- NPT
- performance
- historical similarity

---

# 64. EXECUTIVE VIEW

Show:

```text
Active Wells
31

High Risk
5

Critical
2

NPT
3.2%

Avg ROP
17.8 m/hr

Incidents
12

System Health
99.4%
```

Then:

- regional performance
- risk trend
- major incidents
- AI operational brief

---

# 65. FIELD OPERATOR VIEW

Prioritize:

```text
Current Well
Critical Telemetry
Alerts
AI Brief
Investigation
```

Keep it simple.

---

# 66. ENGINEER VIEW

Prioritize:

```text
Telemetry
Risk
Anomalies
Wellbore
Historical Matches
AI Analysis
```

High information density.

---

# 67. ANALYST VIEW

Prioritize:

```text
Historical Reports
RAG
Incidents
Root Causes
Correlations
Analytics
```

---

# 68. DESIGN SYSTEM

The application must use a consistent reusable design system.

---

# 69. VISUAL THEME

Primary:

# DARK INDUSTRIAL COMMAND CENTER

Base:

```text
#060A0E
#080D12
#0B1117
#0F161D
```

Surfaces:

```text
#121A22
#151F28
#19252F
#1E2B35
```

Borders:

```text
#24323D
#2B3B47
```

---

# 70. BRAND ACCENT

Primary:

```text
#F2A900
#FFB51B
```

Secondary:

```text
#19D3E6
```

Status:

```text
SUCCESS   #27D17F
WARNING   #FFB020
HIGH      #FF7A2F
CRITICAL  #FF3B4D
INFO      #5B9CFF
```

Do not overuse accent colors.

---

# 71. TYPOGRAPHY

Primary:

```text
Inter
```

Alternative:

```text
Geist
```

Telemetry:

```text
IBM Plex Mono
```

---

# 72. SHAPE LANGUAGE

Use:

```text
6px
8px
10px maximum
```

Avoid excessive rounded corners.

---

# 73. INFORMATION DENSITY

Target:

# HIGH INFORMATION DENSITY + HIGH SCANNABILITY

Do not create giant cards with excessive whitespace.

Use:

- compact KPI blocks
- aligned grids
- dense tables
- compact charts
- clear hierarchy

---

# 74. COMPONENT LIBRARY

Create reusable components:

```text
AppShell
Sidebar
Topbar
CommandPalette

KPI
Metric
Sparkline
TelemetryChart

RiskBadge
RiskScore
RiskContributor
RiskTrend

OperationsMap
SiteMarker
SiteCluster
SiteDrawer
MapToolbar
MapFilters

AIInsight
AICopilot
EvidenceCard
HistoricalMatch
Recommendation
ConfidenceIndicator

AlertCard
AlertCluster
IncidentTimeline

WellboreView
PerformanceCard
DataFreshness
SystemHealth
```

---

# 75. COMPONENT STATES

Every component must account for:

```text
loading
loaded
empty
error
stale
live
warning
critical
disabled
selected
hover
focus
```

Do not only design happy paths.

---

# 76. DATA FRESHNESS

Live data must display freshness.

Example:

```text
● LIVE
12 sec ago
```

Stale:

```text
● STALE
2m 14s
```

Critical delay:

```text
DATA DELAY
5m 21s
```

Never display stale data as live.

---

# 77. SYSTEM HEALTH

Show:

```text
API             ● HEALTHY
TELEMETRY       ● CONNECTED
DATABASE        ● HEALTHY
RAG             ● HEALTHY
AI SERVICE      ● HEALTHY
MAP SERVICE     ● HEALTHY
MEDIA           ● HEALTHY
```

Include:

- latency
- last sync
- records processed
- errors

---

# 78. AUTHENTICATION

Authentication should include:

- login
- logout
- secure sessions
- password hashing
- authorization
- role-based access

Never hardcode:

- passwords
- API keys
- database credentials
- secrets

Use environment variables.

---

# 79. SECURITY

Protect:

- API endpoints
- database access
- authentication
- user sessions
- AI endpoints
- administrative functions

Validate:

- user input
- API parameters
- uploaded files
- database inputs

---

# 80. ENVIRONMENT VARIABLES

Use:

```text
.env
```

for:

```text
DATABASE_URL
SUPABASE_URL
SUPABASE_KEY
GOOGLE_MAPS_API_KEY
CLOUDINARY_URL
AI_API_KEY
SECRET_KEY
```

Never commit secrets.

Provide:

```text
.env.example
```

---

# 81. API STRUCTURE

Recommended FastAPI routes:

```text
/api/auth
/api/sites
/api/wells
/api/rigs
/api/telemetry
/api/risk
/api/alerts
/api/incidents
/api/analytics
/api/historical
/api/rag
/api/ai
/api/reports
/api/system
```

---

# 82. EXAMPLE API ENDPOINTS

```text
GET /api/sites
GET /api/sites/{site_id}

GET /api/wells
GET /api/wells/{well_id}

GET /api/wells/{well_id}/telemetry
GET /api/wells/{well_id}/risk

GET /api/alerts
GET /api/incidents

POST /api/rag/query
POST /api/ai/analyze

GET /api/historical/search
GET /api/reports
```

---

# 83. AI ANALYSIS ENDPOINT

Conceptual:

```text
POST /api/ai/analyze
```

Input:

```json
{
  "well_id": "...",
  "telemetry_window": "30m",
  "include_historical": true
}
```

Output:

```json
{
  "risk_score": 87,
  "risk_level": "HIGH",
  "assessment": "...",
  "contributors": [],
  "root_cause": "...",
  "historical_matches": [],
  "recommendation": "...",
  "confidence": 0.87
}
```

---

# 84. RAG ENDPOINT

```text
POST /api/rag/query
```

Input:

```json
{
  "query": "Have we seen similar pressure behavior?",
  "well_id": "...",
  "region": "Assam"
}
```

Output:

```json
{
  "answer": "...",
  "sources": [],
  "matches": []
}
```

---

# 85. FRONTEND STATE

Use a sensible state management strategy.

Separate:

```text
UI state
server state
telemetry state
simulation state
AI state
authentication state
```

Do not duplicate server data unnecessarily.

---

# 86. REAL-TIME ARCHITECTURE

For the hackathon:

Option 1:

Polling.

Option 2:

WebSockets.

Prefer WebSockets if implementation is stable.

Concept:

```text
Telemetry Simulator
       ↓
FastAPI
       ↓
WebSocket
       ↓
React
       ↓
Live charts
       ↓
Risk engine
       ↓
Alerts
```

---

# 87. REAL-TIME UPDATE RULE

Only changed values should visibly update.

Do not animate the entire dashboard continuously.

Use subtle transitions.

---

# 88. PERFORMANCE

The application must remain responsive with:

- many sites
- many wells
- telemetry charts
- map markers
- alerts

Use:

- pagination
- lazy loading
- marker clustering
- memoization
- debounced search
- efficient chart rendering

---

# 89. MAP PERFORMANCE

Use clustering when zoomed out.

Example:

```text
12 sites
```

becomes:

```text
● 12
```

Then expands as user zooms.

---

# 90. RESPONSIVE DESIGN

Primary:

### Desktop 1440×900

Also support:

```text
1920×1080
1280×800
1024
768
480
```

Mobile is secondary.

---

# 91. MOBILE

Prioritize:

```text
Alerts
Sites
Risk
AI Brief
Telemetry
```

Use:

- bottom sheets
- stacked panels
- simplified maps

---

# 92. ACCESSIBILITY

Follow WCAG-conscious principles.

Requirements:

- sufficient contrast
- keyboard navigation
- visible focus
- semantic HTML
- non-color status
- accessible charts
- readable typography

---

# 93. MOTION

Use subtle motion.

```text
Fast: 120–180ms
Normal: 200–300ms
Complex: 300–500ms
```

No excessive animations.

---

# 94. AI UX SAFETY

The AI is decision support.

It is not an autonomous drilling control system.

Therefore:

AI can:

```text
detect
explain
correlate
prioritize
recommend
```

Humans:

```text
review
validate
decide
act
```

---

# 95. DEMO DATA

Use fictional data.

Never imply that fictional telemetry is actual OIL India operational telemetry.

Example sites:

```text
ASSAM-01
ASSAM-03
ASSAM-07
ASSAM-12
ASSAM-18

GUJARAT-02
GUJARAT-05
GUJARAT-09
GUJARAT-14
GUJARAT-21
```

---

# 96. SAMPLE TELEMETRY

Example:

```text
Depth: 3,842 m
ROP: 18.4 m/hr
WOB: 22 klbf
RPM: 118
Torque: 14.8 kN·m
SPP: 2,940 psi
Temperature: 86°C
Flow: 1,240 L/min
```

These values are fictional demo values.

---

# 97. SAMPLE SITE

```text
Site:
Assam-07

Field:
Duliajan Demo Field

Well:
OIL-AS-07

Rig:
OIL-RIG-24

Status:
ACTIVE

Risk:
HIGH

Risk Score:
87
```

Use a demo disclaimer.

---

# 98. SAMPLE AI RESPONSE

Example:

```text
ASSESSMENT

Assam-07 is currently classified as HIGH RISK.

The primary concern is abnormal pressure behavior
combined with declining ROP and increased torque variance.

EVIDENCE

Pressure is approximately 8.5% above the expected baseline.

ROP has declined by approximately 11%.

Torque variability has increased.

HISTORICAL CONTEXT

7 historically similar cases were retrieved.

3 involved significant operational intervention.

PROBABLE CONTRIBUTOR

Formation-related pressure behavior.

CONFIDENCE

87%

RECOMMENDED INVESTIGATION

Review pressure and mud-property behavior against
the current formation interval and verify telemetry quality.
```

---

# 99. DEMO STORY

The ideal demo:

### STEP 1

Login.

### STEP 2

Command Center appears.

### STEP 3

Show Assam + Gujarat map.

### STEP 4

Point out active wells.

### STEP 5

Select Assam-07.

### STEP 6

Open telemetry.

### STEP 7

Start simulation.

### STEP 8

Pressure begins rising.

### STEP 9

ROP begins falling.

### STEP 10

Risk score increases.

### STEP 11

Alert appears.

### STEP 12

AI analysis becomes available.

### STEP 13

RAG retrieves historical cases.

### STEP 14

Show evidence.

### STEP 15

Show root cause.

### STEP 16

Show recommended investigation.

### STEP 17

Show incident timeline.

### STEP 18

Return to map.

This should take approximately:

# 3–5 minutes.

---

# 100. HACKATHON "WOW" MOMENT

The system should visibly transition:

```text
NORMAL
↓
ANOMALY
↓
HIGH RISK
↓
HISTORICAL MATCH
↓
AI EXPLANATION
↓
RECOMMENDATION
```

The map, telemetry, risk engine, alerts, and AI should update together.

This is the main demonstration of system intelligence.

---

# 101. DESIGN IDENTITY

The application should feel like:

```text
Industrial HMI
+
Mission Control
+
GIS
+
Enterprise Intelligence
+
AI
```

Not:

```text
Generic SaaS Dashboard
```

---

# 102. DESIGN DON'TS

Never create:

- generic Bootstrap dashboards
- excessive rounded cards
- huge KPI cards
- rainbow charts
- excessive purple AI styling
- childish illustrations
- fake 3D graphics
- meaningless charts
- excessive glassmorphism
- decorative gradients everywhere
- generic chatbot interface
- unreadable telemetry
- fake official OIL data

---

# 103. MAP DESIGN DON'TS

Do not make the map:

- visually dominant but functionally useless
- covered in generic pins
- impossible to filter
- disconnected from site details
- disconnected from risk
- disconnected from AI

The map must be operational.

---

# 104. AI DESIGN DON'TS

Do not create:

```text
ChatGPT clone
```

Instead create:

```text
NWIS INTELLIGENCE COPILOT
```

with:

- context
- evidence
- confidence
- historical matches
- recommendations

---

# 105. DATA QUALITY

The system should distinguish:

```text
LIVE
RECENT
STALE
UNAVAILABLE
SIMULATED
```

Never hide uncertainty.

---

# 106. SIMULATION LABEL

When demo telemetry is being used:

```text
DEMO / SIMULATION
```

must be visible.

Do not claim:

> Live OIL India data.

---

# 107. OIL BRANDING

NWIS is a project designed for an Oil India Limited context.

Do not falsely claim the system is officially deployed by OIL.

Use wording such as:

```text
Designed for Oil India Limited
```

or:

```text
NWIS
Intelligent Drilling Intelligence System

Demo / Simulation
```

---

# 108. ERROR HANDLING

Example:

```text
TELEMETRY CONNECTION INTERRUPTED

Last successful update:
14:32:18

Cached operational data remains available.

[ Retry ]
```

---

# 109. EMPTY STATE

Example:

```text
NO ACTIVE INCIDENTS

All monitored drilling operations
are currently within expected conditions.

● SYSTEM NORMAL
```

---

# 110. LOADING STATE

AI:

```text
ANALYZING

Reading telemetry...
Retrieving historical evidence...
Evaluating risk factors...
Generating operational brief...
```

---

# 111. SYSTEM HEALTH

Show:

```text
API
99.99%

Telemetry
99.7%

Database
99.9%

RAG
98.9%

AI
99.1%

Maps
100%
```

These are demo/system-status values unless backed by real measurements.

---

# 112. PROJECT DIRECTORY

Recommended structure:

```text
nwis/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── state/
│   │   ├── types/
│   │   ├── data/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── ai/
│   │   ├── rag/
│   │   ├── risk/
│   │   ├── telemetry/
│   │   ├── auth/
│   │   └── utils/
│   └── requirements.txt
│
├── data/
│   ├── demo/
│   ├── historical/
│   └── telemetry/
│
├── scripts/
│   ├── seed_demo_data.py
│   ├── simulate_telemetry.py
│   └── ingest_documents.py
│
├── docs/
│
├── .env.example
├── README.md
└── docker-compose.yml
```

---

# 113. DEVELOPMENT PHASES

Do not attempt everything simultaneously.

Build in this order.

---

## PHASE 1 — FOUNDATION

Create:

- project structure
- frontend
- backend
- environment configuration
- database connection
- basic authentication
- API health endpoint

Acceptance:

```text
Frontend loads.
Backend loads.
Database connects.
Authentication works.
```

---

## PHASE 2 — DESIGN SYSTEM

Create:

- colors
- typography
- spacing
- buttons
- cards
- tables
- badges
- navigation
- charts
- drawers

Acceptance:

All pages use the same design language.

---

## PHASE 3 — COMMAND CENTER

Build:

- KPI ribbon
- map
- alerts
- telemetry snapshot
- AI brief
- system status

Acceptance:

The dashboard looks and behaves like an industrial command center.

---

## PHASE 4 — MAP

Build:

- Google Maps
- Assam
- Gujarat
- markers
- clustering
- filters
- layers
- site drawer

Acceptance:

User can locate and select drilling sites.

---

## PHASE 5 — SITE / WELL

Build:

- site detail
- well detail
- telemetry
- equipment
- wellbore

Acceptance:

User can investigate a well.

---

## PHASE 6 — TELEMETRY

Build:

- simulation engine
- live charts
- thresholds
- baseline
- anomaly markers

Acceptance:

Telemetry changes visibly.

---

## PHASE 7 — RISK ENGINE

Build:

- scoring
- severity
- contributors
- trend
- explanations

Acceptance:

Telemetry anomaly can change risk.

---

## PHASE 8 — ALERTS

Build:

- alert creation
- alert center
- correlated alerts
- acknowledgment
- incident workflow

Acceptance:

Risk changes create operational alerts.

---

## PHASE 9 — RAG

Build:

- document ingestion
- chunking
- embeddings
- retrieval
- source citations

Acceptance:

Historical question retrieves relevant demo documents.

---

## PHASE 10 — AI

Connect:

```text
Telemetry
+
Risk
+
RAG
```

to:

```text
AI Analysis
```

Acceptance:

AI can explain a simulated anomaly using historical evidence.

---

## PHASE 11 — DEMO MODE

Build:

```text
Normal
→ Anomaly
→ High Risk
→ AI Analysis
→ Recovery
```

Acceptance:

One click starts the complete demo.

---

# 114. MVP PRIORITY

If time is limited:

## MUST HAVE

1. Login
2. Command Center
3. Map
4. Site drawer
5. Telemetry
6. Risk
7. Alerts
8. AI analysis
9. Historical RAG
10. Demo simulation

---

# 115. SHOULD HAVE

- wellbore
- incident timeline
- site comparison
- regional analytics
- reports
- system health

---

# 116. NICE TO HAVE

- advanced role-based views
- sophisticated temporal map
- computer vision
- predictive maintenance
- digital twin
- advanced forecasting

Do not sacrifice the core flow for these.

---

# 117. CORE ACCEPTANCE TEST

A fresh user must be able to:

```text
Login
 ↓
See drilling sites
 ↓
Select Assam-07
 ↓
See live telemetry
 ↓
See abnormal condition
 ↓
See risk increase
 ↓
Open AI analysis
 ↓
See historical matches
 ↓
See evidence
 ↓
See root cause
 ↓
See recommendation
```

without leaving the application.

---

# 118. SECOND ACCEPTANCE TEST

Trigger the simulation.

Within the interface:

```text
Telemetry changes
+
Risk changes
+
Map changes
+
Alert appears
+
AI insight appears
```

The system must feel connected.

---

# 119. THIRD ACCEPTANCE TEST

Ask:

> "Why is Assam-07 high risk?"

The system must provide:

```text
current telemetry evidence
+
risk contributors
+
historical evidence
+
probable cause
+
confidence
+
recommended investigation
```

---

# 120. FOURTH ACCEPTANCE TEST

Ask:

> "Have we seen this before?"

The system should retrieve historical cases.

---

# 121. FIFTH ACCEPTANCE TEST

Ask:

> "What changed?"

The system should show telemetry differences and anomaly timing.

---

# 122. UX SUCCESS CRITERIA

A user should identify critical sites within:

# < 5 seconds

Open a site within:

# < 3 seconds

Understand why a site is risky:

# without leaving the site context

Trace AI claims to evidence:

# within 1–2 clicks

---

# 123. PERFORMANCE REQUIREMENTS

Target:

- fast initial load
- smooth navigation
- responsive charts
- efficient map rendering
- low-latency API calls
- graceful loading states

Avoid unnecessary dependencies.

---

# 124. CODE QUALITY

Write:

- modular code
- typed interfaces
- reusable components
- clear naming
- error handling
- API validation
- meaningful comments only where useful

Avoid:

- giant files
- duplicated components
- hardcoded secrets
- hardcoded business logic throughout UI
- magic numbers
- unnecessary abstractions

---

# 125. CONFIGURATION

Risk thresholds should be configurable.

Simulation parameters should be configurable.

Map configuration should be configurable.

AI configuration should be configurable.

Do not bury these values throughout the codebase.

---

# 126. LOGGING

Backend should log:

- authentication events
- API errors
- telemetry ingestion
- AI requests
- RAG retrieval
- simulation state
- important system errors

Never log sensitive credentials.

---

# 127. DOCUMENTATION

Maintain:

```text
README.md
ARCHITECTURE.md
API.md
DATA_MODEL.md
DEMO.md
ENVIRONMENT.md
```

---

# 128. README MUST EXPLAIN

- what NWIS is
- why it exists
- architecture
- setup
- environment variables
- database
- API
- simulation
- RAG
- AI
- demo flow

---

# 129. DEMO MODE REQUIREMENTS

A hackathon judge should be able to launch:

```text
Demo Mode
```

and immediately see:

```text
Assam
Gujarat
active wells
telemetry
risk
alerts
AI
```

No complicated setup during presentation.

---

# 130. DEMO RESET

Provide:

```text
Reset Demo
```

which returns the entire system to:

```text
NORMAL
```

---

# 131. DEMO CONTROL

Potential control:

```text
SIMULATION CONTROL

Scenario:
Pressure Anomaly

Duration:
60 seconds

[ START ]

[ RESET ]
```

---

# 132. AI DEMO RESPONSE

When anomaly is triggered, generate a structured response.

Example:

```text
NEW OPERATIONAL INSIGHT

Assam-07 has entered HIGH RISK.

Primary signal:
Pressure deviation.

Supporting signals:
ROP decline
Torque instability

Historical evidence:
7 similar cases

Likely contributor:
Formation pressure response

Confidence:
87%

Recommended investigation:
Review pressure and mud-property behavior
and verify telemetry quality.
```

---

# 133. IMPORTANT DOMAIN DISCLAIMER

The system is a prototype.

Risk thresholds, recommendations, telemetry values, and AI conclusions are demonstration constructs unless validated against official operational standards and datasets.

Never represent demo output as certified drilling advice.

---

# 134. FUTURE EXTENSIONS

Future NWIS versions could include:

- actual telemetry integration
- advanced predictive models
- equipment predictive maintenance
- geological data
- digital twin
- computer vision
- automated report generation
- advanced NPT prediction
- enterprise integrations
- mobile field applications
- role-aware dashboards
- historical trend forecasting

These are future roadmap items.

Do not let them distract from the MVP.

---

# 135. SECONDARY PROJECT CONCEPT

There is another concept related to the broader research:

## AI Project Planning + Site Execution Intelligence

Concept:

```text
PROJECT PLAN
+
ACTUAL SITE PROGRESS
+
AI VISION / DATA
=
AUTOMATED PROGRESS TRACKING
```

It can identify:

- planned vs actual progress
- delays
- variance
- site activity
- potential causes

However:

# DO NOT MIX THIS INTO NWIS MVP.

Keep it as a separate future product direction.

---

# 136. RELATIONSHIP TO NWIS

The shared conceptual idea is:

```text
REAL-WORLD DATA
↓
AI ANALYSIS
↓
OPERATIONAL UNDERSTANDING
↓
ACTIONABLE DECISION
```

NWIS applies this to:

# DRILLING

The second concept applies it to:

# PROJECT EXECUTION

---

# 137. PRODUCT DIFFERENTIATION

NWIS should not compete with ordinary dashboards.

Its differentiation is:

```text
GEOSPATIAL AWARENESS
+
REAL-TIME TELEMETRY
+
RISK INTELLIGENCE
+
HISTORICAL RAG
+
EXPLAINABLE AI
```

---

# 138. FINAL PRODUCT MODEL

The entire system can be summarized as:

```text
                NWIS
                 │
        ┌────────┴─────────┐
        │                  │
   CURRENT STATE      HISTORICAL
        │              KNOWLEDGE
        │                  │
   TELEMETRY              RAG
        │                  │
        └────────┬─────────┘
                 │
             AI ENGINE
                 │
       ┌─────────┼──────────┐
       │         │          │
      RISK      RCA       INSIGHT
       │         │          │
       └─────────┼──────────┘
                 │
          RECOMMENDATION
                 │
          HUMAN DECISION
```

---

# 139. ONE-SENTENCE DESCRIPTION

Use this whenever a concise project description is needed:

> **NWIS is an AI-powered drilling intelligence platform that combines real-time or simulated drilling telemetry, historical drilling knowledge, RAG-based retrieval, risk analysis, root-cause intelligence, and geospatial visualization to help operational teams understand current drilling conditions, identify emerging risks, learn from historical incidents, and make faster, evidence-supported decisions.**

---

# 140. PITCH VERSION

Short pitch:

> **NWIS turns drilling data into operational intelligence. It combines live telemetry with historical drilling knowledge and AI to detect anomalies, explain risk, retrieve similar incidents, identify probable root causes, and guide operators toward the right investigation — all through a single map-based command center.**

---

# 141. CORE USER EXPERIENCE

The signature experience is:

```text
SEE THE WELL
      ↓
SEE THE TELEMETRY
      ↓
SEE THE ANOMALY
      ↓
SEE THE RISK
      ↓
UNDERSTAND WHY
      ↓
SEE HISTORICAL EVIDENCE
      ↓
ASK AI
      ↓
RECEIVE EXPLAINABLE INSIGHT
      ↓
INVESTIGATE
```

---

# 142. ANTIGRAVITY DEVELOPMENT RULE

When making implementation decisions, prefer:

1. Working functionality
2. Correct data flow
3. Strong UX
4. Visual quality
5. Maintainability
6. Advanced features

Do not build decorative features before the core workflow works.

---

# 143. ANTIGRAVITY AGENT BEHAVIOR

Before implementing any major feature:

1. Understand the existing architecture.
2. Inspect related files.
3. Reuse existing components.
4. Avoid unnecessary rewrites.
5. Preserve working functionality.
6. Implement incrementally.
7. Test the feature.
8. Verify visual behavior.
9. Verify API behavior.
10. Update documentation where needed.

Do not randomly restructure the repository.

---

# 144. DO NOT ASK UNNECESSARY QUESTIONS

If reasonable defaults exist:

# USE THEM.

For example:

If historical documents are unavailable:

→ create clearly labeled demo historical reports.

If live telemetry is unavailable:

→ use the telemetry simulator.

If Google Maps credentials are unavailable:

→ provide a graceful demo fallback while keeping the Google Maps architecture ready.

If an AI API is unavailable:

→ implement a deterministic demo intelligence layer with the same API contract.

The prototype should remain demonstrable.

---

# 145. MOCK VS REAL

The architecture must clearly distinguish:

```text
REAL INTEGRATION
MOCK DATA
SIMULATED DATA
AI DEMO RESPONSE
```

Do not hide mocks behind fake "live" labels.

---

# 146. GRACEFUL FALLBACKS

If external services fail:

### Maps unavailable

Show a geographic fallback or placeholder map state.

### AI unavailable

Use deterministic demo responses.

### RAG unavailable

Show demo historical matches.

### Database unavailable

Show a clear system-health state.

Do not crash the entire application.

---

# 147. FINAL DEVELOPMENT PRINCIPLE

Do not build:

> 20 disconnected pages.

Build:

> **one connected operational intelligence system.**

The relationship between screens matters more than the number of screens.

---

# 148. FINAL UX PRINCIPLE

The most important product interaction is:

```text
MAP
 ↓
SITE
 ↓
WELL
 ↓
TELEMETRY
 ↓
ANOMALY
 ↓
RISK
 ↓
RAG
 ↓
AI
 ↓
EVIDENCE
 ↓
RECOMMENDATION
```

Everything else is secondary.

---

# 149. FINAL IMPLEMENTATION CHECKLIST

Before considering NWIS complete, verify:

## PRODUCT

- [ ] Product identity implemented
- [ ] Demo disclaimer visible
- [ ] Core user journey works

## FRONTEND

- [ ] Login
- [ ] Command Center
- [ ] Map
- [ ] Site drawer
- [ ] Site detail
- [ ] Well detail
- [ ] Telemetry
- [ ] Risk
- [ ] Alerts
- [ ] AI Copilot
- [ ] Historical Intelligence
- [ ] Root Cause
- [ ] Incidents
- [ ] Reports
- [ ] System Health

## BACKEND

- [ ] FastAPI
- [ ] API routes
- [ ] validation
- [ ] error handling
- [ ] authentication
- [ ] database

## DATA

- [ ] demo sites
- [ ] demo wells
- [ ] demo telemetry
- [ ] demo alerts
- [ ] demo incidents
- [ ] demo historical reports

## AI

- [ ] RAG
- [ ] historical retrieval
- [ ] structured AI response
- [ ] evidence
- [ ] confidence
- [ ] root cause
- [ ] recommendation

## REAL-TIME

- [ ] telemetry simulation
- [ ] live UI updates
- [ ] risk updates
- [ ] alert generation
- [ ] map status updates

## UX

- [ ] loading states
- [ ] empty states
- [ ] error states
- [ ] stale-data states
- [ ] responsive behavior
- [ ] accessibility
- [ ] keyboard navigation

## SECURITY

- [ ] password hashing
- [ ] sessions
- [ ] authorization
- [ ] environment secrets
- [ ] protected APIs

## DEMO

- [ ] one-click simulation
- [ ] Assam-07 scenario
- [ ] anomaly
- [ ] risk escalation
- [ ] RAG retrieval
- [ ] AI explanation
- [ ] evidence
- [ ] recommendation
- [ ] recovery
- [ ] reset

---

# 150. FINAL QUALITY BAR

Before declaring the project complete, ask:

### Does it look like an industrial intelligence platform?

### Does the map matter?

### Does telemetry matter?

### Does risk visibly respond to telemetry?

### Does AI use current context?

### Does RAG provide historical evidence?

### Can the user understand why the AI reached its conclusion?

### Can the user move from insight to investigation?

### Does the system clearly distinguish simulation from real data?

### Does the entire experience feel like one product?

If any answer is NO:

# FIX IT.

---

# 151. FINAL NWIS DEFINITION

NWIS is:

> **A map-first, AI-native drilling operational intelligence platform that unifies current drilling telemetry and historical organizational knowledge to detect anomalies, assess risk, explain potential causes, retrieve relevant historical evidence, and provide human-centered operational recommendations across drilling operations in Assam and Gujarat.**

---

# END OF NWIS MASTER CONTEXT