# NWIS — Global Drilling History & Failure Intelligence
## Phase 1 Research Deliverable (Scoped, Evidence-Grounded)

**Status:** This is a deliberately scoped subset of the 38-section brief. Sections requiring exhaustive proprietary telemetry data (detailed WOB/torque/SPP curves per historical well) are marked `NO RELIABLE PUBLIC DATA FOUND` rather than filled with invented numbers. See the Executive Summary and Data Quality Audit at the end for exactly what was cut and why.

---

## DELIVERABLE 1 — EXECUTIVE SUMMARY

**FACT:** Detailed technical postmortems with cause chains exist publicly for a small number of major, government-investigated well-control incidents (Macondo/Deepwater Horizon 2010, Montara H1 2009, Ekofisk Bravo 1977). These are Tier-1 quality: full investigation reports, cross-checkable across multiple independent inquiries.

**FACT:** For everyday drilling problems (stuck pipe, lost circulation, NPT) at the level of granularity NWIS wants (numeric telemetry thresholds, well-by-well WOB/torque/SPP), the public literature contains *engineering principles and qualitative signatures*, not operator-specific historical time-series. That data lives inside operator/service-company systems (Petrolink, Landmark, Halliburton DecisionSpace, etc.) and SPE papers that describe methodology, not raw well logs.

**FACT:** For India specifically — Oil India Limited (OIL) publishes real, verifiable detail about its **digital drilling infrastructure** (eRTMAC, WITS/WITSML real-time data centers, RSS/LWD adoption, DRIVE 2.0 command center) and its geoscience teams publish real SPE/SPG papers on **Upper Assam Basin drilling challenges** (Naga Thrust wellbore instability, stuck pipe, tight hole, abnormal pore pressure). This is genuinely useful, citable material — better than the Gujarat/Cambay side, where public material skews toward exploration geology rather than drilling-failure case studies.

**Biggest gap:** There is no public, incident-level, telemetry-tagged drilling failure database anywhere in the world that NWIS could ingest directly. Every serious drilling-analytics company (Corva, Datagumbo, Sekur, DrillingInfo/Enverus) built theirs from **proprietary operator data**, not public sources. NWIS's real data strategy has to be: (a) use public sources for taxonomy, engineering signatures, and a handful of deeply-documented major incidents; (b) get OIL's own historical WITSML/NPT logs under an actual data-sharing agreement for anything realistic; (c) use synthetic data, clearly labeled, to prototype the pipeline in the meantime. Sections 14–23 below are designed around that reality.

---

## DELIVERABLE 2 — GLOBAL DRILLING HISTORY (Condensed Timeline)

| Era | Region | Key development | Method | Major risk profile | Confidence |
|---|---|---|---|---|---|
| 1850s–1900 | US (Titusville), Assam (Digboi, 1889) | First commercial wells | Cable-tool | Shallow blowouts, fire | [Certain] |
| 1900s–1940s | US, Middle East | Rotary drilling replaces cable-tool | Rotary table | Well control (no BOPs early on), casing failures | [Certain] |
| 1940s–1960s | US Gulf, offshore beginnings | First offshore platforms (1947, Gulf of Mexico) | Rotary + early BOPs | Marine logistics, primitive well control | [Certain] |
| 1960s–1970s | North Sea | Deepwater North Sea development begins | Semi-submersibles, jackups | Harsh weather, well control (Ekofisk Bravo 1977) | [Certain] |
| 1980s | North Sea, offshore Canada | MWD introduced; major disasters reshape safety regulation | Directional drilling emerges | Structural/well-control catastrophes (Piper Alpha 1988, Ocean Ranger 1982) | [Certain] |
| 1990s | Global | LWD, extended-reach drilling, PDC bits mature | Horizontal drilling scales | Directional/trajectory failures | [Likely] |
| 2000s | Deepwater GoM, Brazil, West Africa | HPHT and ultra-deepwater drilling | Managed-pressure drilling | Narrow pressure windows, BOP reliability (Macondo 2010) | [Certain] |
| 2010s | Global | Real-time operating centers, automated rigs, unconventional (shale) boom | Automated pipe handling, RSS | Data-volume/telemetry-interpretation risk, well control still dominant (Montara 2009 just prior) | [Certain] |
| 2015–present | India (OIL), Gulf, global | Digital drilling / AI-assisted drilling centers | eRTMAC-style RTOCs, AI anomaly detection | Data integration, human-factors in "too much data" environments | [Likely] |

India-specific: **FACT** — commercial oil was first discovered in Digboi, Assam, in 1889 (per DGH's own policy documents), making Upper Assam one of the world's oldest continuously producing basins and also one with 130+ years of drilling-condition data, most of it in NDR/DGH's non-public archives.

---

## DELIVERABLE 3 — GLOBAL DRILLING FAILURE TAXONOMY (Organized, not re-invented)

Your brief's taxonomy (Sections A–L) is already structurally sound — this is standard IADC/SPE categorization. I've kept it but collapsed it to what NWIS actually needs as top-level ontology nodes (see `failure_taxonomy.csv` for the full flattened version with ~90 leaf nodes):

1. **Well Control** (kick → influx → blowout spectrum)
2. **Wellbore Instability** (mechanical/chemical shale failure, breakout, pack-off)
3. **Stuck Pipe** (differential / mechanical / pack-off / key-seat)
4. **Lost Circulation** (seepage → total, natural vs. induced)
5. **Mechanical/Equipment Failure** (string, BHA, top drive, pumps, MWD/LWD)
6. **Drilling Parameter Dysfunction** (vibration, stick-slip, whirl, poor ROP)
7. **Fluids/Mud Problems**
8. **Cementing Problems**
9. **Casing Problems**
10. **Directional/Trajectory Problems**
11. **Formation/Geological Problems**
12. **Human & Organizational Factors**

**ENGINEERING INTERPRETATION:** In practice, the majority of NPT-driving incidents are combinations across these categories (e.g., wellbore instability → pack-off → stuck pipe → sidetrack), which is exactly why your Section 5 chain structure (signal→anomaly→failure→cause→consequence) is the right modeling choice over a flat taxonomy. Keep that.

---

## DELIVERABLE 4 — HISTORICAL INCIDENT DATABASE (Real, Sourced, Small)

Full records in `historical_incidents.csv`. Three incidents met the bar for genuine, cross-checkable, Tier-1 documentation:

| Incident | Year | Location | Data status |
|---|---|---|---|
| Macondo / Deepwater Horizon | 2010 | Gulf of Mexico, USA | SOURCE-REPORTED (multiple independent Tier-1 investigations: BOEMRE/USCG Joint Investigation, CSB, National Academy of Engineering, BP internal, Transocean internal) |
| Montara (H1 well) | 2009 | Timor Sea, Australia | SOURCE-REPORTED (Australian Government Montara Commission of Inquiry) |
| Ekofisk Bravo (well B-14) | 1977 | North Sea, Norway | SOURCE-REPORTED (Norwegian Official Report NOU 1977-47; Norwegian Petroleum Museum) |

**FACT vs. INTERPRETATION, worked example (Macondo):**
- FACT: The BOEMRE/USCG Joint Investigation Team identified failure of the cement barrier in the production casing as the central cause. <cite index="3-1">The panel concluded that the central cause of the blowout was failure of a cement barrier in the production casing string.</cite>
- FACT: <cite index="5-1">A later (2025-reported) Chemical Safety Board investigation attributed the blowout preventer's failure to seal the well to unrecognized drill-pipe buckling in the BOP.</cite>
- CONCLUSION where sources differ in emphasis: cement failure was the *initiating* barrier failure; BOP/drill-pipe buckling explains why the *last-resort* barrier also failed. Both are documented, not competing theories. **CONFIDENCE: High** on both, since they address different points in the causal chain.

**Ekofisk Bravo, root cause:** an incorrectly installed downhole safety valve and incorrectly installed master valve meant the well could not be shut in once mud began flowing back during a workover (tubing pull), and warning signs (mud returning through a control line) were reportedly not acted on. <cite index="70-1,70-1">Faulty installation of the downhole ball valve was one of the causes of the Bravo blowout, and the automatic master valve — the second barrier — was also incorrectly installed, directly preventing the well from being shut in.</cite> **Note:** this is a *workover/wireline* incident, not an active-drilling incident — still highly relevant to NWIS's well-control taxonomy but should be tagged `workover` not `drilling` in metadata.

**Montara, root cause:** the Commission of Inquiry found the primary well-control barrier (cementing) had failed and that PTTEP's own well-control procedures, if followed, would most likely have prevented the blowout. <cite index="66-1">The inquiry found the blowout resulted from failure of the primary well-control barrier and that well-control practices approved by the regulator would most likely have been sufficient to prevent it had the operator adhered to them.</cite>

**Piper Alpha (1988) — explicitly excluded from the incident table, included here as context:** this was a **production-platform process-safety explosion** (a maintenance/permit-to-work failure triggering a gas leak on a producing platform), not a drilling operation. <cite index="52-1">The leak occurred when pipework from which a safety valve had been removed for maintenance was pressurized at pump start-up.</cite> It belongs in an OIL/gas process-safety knowledge base, not a drilling-failure one — flagging this because your Section 12 brief would likely pull it in by reputation alone, and mis-tagging it would corrupt NWIS's failure-category metadata.

**What's missing and why:** hundreds of other public "incident write-ups" exist (SPE case-study papers), but almost all describe **generic or anonymized** wells ("Well A in the North Sea") without operator, exact location, or verifiable telemetry — i.e., they're useful for the *signal library* (Deliverable 5) but not for the *incident database* as your schema defines it (which wants named wells, coordinates, real BHA specs). Treat these as two different data tiers, not one.

---

## DELIVERABLE 5 — FAILURE → SIGNAL MATRIX (Qualified, Not Numeric)

| Failure Mode | Signal | Direction | Typical Timing | Confidence | Basis |
|---|---|---|---|---|---|
| Stuck pipe (differential) | Torque | Flat/normal, then sudden pull-resistance | At the moment of sticking | High | Standard SPE/IADC engineering principle |
| Stuck pipe (pack-off/mechanical) | Torque, SPP | Both increasing, often with ROP decline first | Minutes to hours before | Medium-High | SPE literature, consistent with Assam OIL geomechanics papers below |
| Wellbore instability (Naga Thrust / Upper Assam) | Over-gauge hole, tight pull, poor log quality | — | Progressive through the interval | High (for this specific basin) | <cite index="25-1">OIL's own geomechanical study found that mud weight used in previous Upper Assam wells was less than optimal, causing shear failure in the Upper Oligocene and Lower Miocene formations.</cite> |
| Lost circulation | Pit volume, flow-out | Decreasing | During the event, sometimes preceded by ROP increase (drilling break into a fracture) | High | Universal industry principle; ~75% of wells encounter some lost-circulation issue industry-wide per patent-literature background sections — **this figure is from an equipment-patent's background section, not a peer-reviewed statistic; treat as [Possible], not [Certain]** |
| Kick / well control | Pit gain, flow-out > flow-in, SPP drop then rise | — | Real-time, seconds to minutes | High | Universal, and central to both Macondo and Montara post-incident findings |

**Numeric thresholds:** `NO RELIABLE PUBLIC DATA FOUND`. Thresholds are basin-, mud-system-, and rig-specific by design (this is explicitly stated in OIL's own tender documents, which describe real-time ECD/pore-pressure/fracture-pressure trend *monitoring* rather than fixed thresholds) — <cite index="17-1">OIL's real-time drilling optimization scope of work covers ECD management, pore-pressure and fracture-pressure trend analysis, and downhole WOB/torque/drag/vibration/stick-slip monitoring, all trend-based rather than fixed-threshold</cite>. NWIS should design its similarity engine (Deliverable 17) around *rate-of-change and trend deviation from that well's own baseline*, not universal thresholds.

---

## DELIVERABLE 6–8 — EQUIPMENT / GEOLOGICAL / NPT KNOWLEDGE (Generic Engineering Reference)

These three sections are standard drilling-engineering knowledge (bit wear modes, BHA failure modes, NPT categorization) that doesn't require incident-specific citation — it's textbook/SPE-consensus material. I've put the structured version directly into `failure_taxonomy.csv` (columns: category, subtype, typical_signal, typical_cause) rather than repeating three near-identical tables here. One evidence-backed NPT data point worth flagging:

**DERIVED (from Assam-specific sources):** In the Naga Thrust Belt / Upper Assam Basin, the *dominant* documented NPT drivers are wellbore instability, over-gauge borehole, and stuck pipe — this is stated directly by OIL's own engineers, not inferred: <cite index="26-1">drilling issues such as shear failure, wellbore collapse, stuck pipe incidents, and tight holes are observed very often in the Upper Assam basin, in one case leading to a sidetrack, causing significant loss of time and resources.</cite> This is a genuinely strong, basin-specific NPT signal for NWIS's India module — far stronger than anything generic Section 8 of your brief would produce.

---

## DELIVERABLE 9–11 — INDIA / ASSAM / GUJARAT DRILLING INTELLIGENCE

**Assam — [Likely] the most usable regional dataset for NWIS's first version.** OIL's own engineers have published multiple SPE/SPG papers on:
- Upper Assam Basin geomechanics and wellbore-stability modeling near the Naga Thrust <cite index="21-1">describing complex geological settings near the Naga thrust belt that create high costs and drilling risk, with the Oligocene reservoir sealed by a shale layer prone to significant drilling challenges</cite>
- Abnormal pore pressure as a driver of NPT and well-control incidents in the Naga Schuppen belt <cite index="29-1">noting that abnormal pore pressures, particularly overpressures, can greatly increase drilling non-productive time and cause serious incidents including blowouts, pressure kicks, and fluid influx</cite>

**Gujarat/Cambay — weaker for drilling-failure purposes.** Public material here is dominated by ONGC exploration/geology papers (play concepts, reservoir characterization), not drilling-incident case studies. `NO RELIABLE PUBLIC DATA FOUND` for Cambay-specific stuck-pipe/lost-circulation case histories at the depth Assam has. If Gujarat coverage matters to NWIS's roadmap, that's a gap to solve via direct ONGC/data-sharing engagement, not more web search.

**India public well database — this is real and important:** the DGH's **National Data Repository (NDR)** is the actual candidate data source, not a fictional one. As of DGH's 2024–25 annual report: <cite index="44-1">1,785 wells were studied for core-report compilation in FY 2024–25 alone, with core data found for 879 of them</cite>, and per DGH's 2017 policy document the repository held <cite index="45-1">4,500 exploratory wells, 2,500 development wells, and 65,292 well logs</cite> at that time (an earlier count than the 14,415-well figure reported elsewhere for 2018 — **source conflict, flagged below**). NDR access has tiers: free for recognized university researchers up to 50 sq km, commercial licensing otherwise. **This is your most realistic path to real Indian well data — not open API, but a genuine, named, government-run repository you could formally request access to.**

**Source conflict (Section 28 discipline applied):**
- SOURCE A (Ministry of Petroleum, 2018 figure): <cite index="40-1">14,415 wells and log data as of 31 March 2018</cite>
- SOURCE B (DGH 2017 policy document): <cite index="45-1">4,500 exploratory + 2,500 development wells (7,000 total)</cite>
- CONCLUSION: these are different snapshot dates (2017 vs. 2018) and the NDR was actively being populated during this period, so the difference likely reflects genuine growth, not a factual contradiction — but I can't confirm that without the underlying annual reports for both years. CONFIDENCE: Medium.

---

## DELIVERABLE 12 — OIL PUBLIC INFORMATION (Verified, Not Confidential)

```
PUBLIC OIL INFORMATION (verified via oil-india.com and OIL's own e-tender portal):
```
- **eRTMAC**: OIL operates a round-the-clock Real-Time Monitoring & Analytics Center. <cite index="12-1">The centre monitors drilling operations in real time with advanced visualization and sensor technology, transmitting critical well data to a command center staffed 24/7 by skilled engineers who analyse the data and make real-time decisions.</cite>
- **Scope of a 2021 eRTMAC tender**: covers 4 rigs in NE India, real-time rig-site data collection/aggregation, VSAT comms, and a decision-support center at Duliajan HQ — <cite index="11-1">including hiring of an enhanced Real-Time Monitoring & Analytics Center for drilling operations, real-time rig-site surface data collection and aggregation, VSAT communications, real-time data analytics, and a decision support center at company headquarters for four rigs over four years</cite>.
- **Advanced RSS + LWD adoption**: <cite index="14-1">the majority of OIL's wells are highly deviated, and the company has incorporated Rotary Steerable Systems with Advanced LWD for precise steering, faster drilling, reduced tortuosity, and accurate well placement with real-time evaluation.</cite>
- **DRIVE 2.0 digital program**: includes an integrated Command and Control Centre and an "Enhanced Real-Time Monitoring & Control Center for Drilling" aimed at <cite index="18-1">faster anomaly detection, NPT reduction, and enhanced drilling performance.</cite>
- **2025 wellhead digitalization** (production side, adjacent to drilling): OIL partnered with Kellton to deploy edge-to-cloud telemetry across <cite index="19-1">77 production wells across 46 well plinths, using 482 field devices including wireless/wired sensors, gauges, and telemetry gateways, completed within a six-month deployment.</cite>

```
NWIS DEMO DATA: see Deliverable 18 — never conflate the above real, public program descriptions with actual telemetry values, which are not public.
```

**Design implication:** OIL's own tender language already names the exact parameters (WOB, torque, drag, ECD, pore/fracture pressure trends, stick-slip, vibration) that NWIS's similarity engine should track — this is a strong, low-risk signal that NWIS's planned feature set matches what OIL's own engineers already consider standard practice, which is useful validation to put in front of a decision-maker.

---

## DELIVERABLE 13 — DATA SOURCE CATALOG

| Source | Tier | Scope | Access | NWIS Value |
|---|---|---|---|---|
| BOEMRE/USCG Joint Investigation Report (Macondo) | 1 | Global reference incident | Free PDF (bsee.gov) | Highly useful — gold-standard cause-chain example |
| US Chemical Safety Board reports | 1 | US incidents, BOP/equipment focus | Free | Highly useful |
| Montara Commission of Inquiry | 1 | Australia | Free (gov.au) | Highly useful |
| Norwegian Official Report NOU 1977-47 (Bravo) / Norwegian Petroleum Museum | 1/3 | Norway, historical | Free | Useful, older format |
| DGH National Data Repository (NDR) | 1 | India, all basins | Tiered: free (academic, ≤50 km²) / commercial license otherwise | Must-use for any real India rollout — requires formal engagement, not scraping |
| OIL India Limited investor/tech pages, e-tenders | 1/3 | India, OIL-specific | Free, public | Must-use for OIL context/positioning |
| SPE / SPG India (OnePetro, spgindia.org) | 2 | Global + India-specific technical papers | Mostly paywalled (SPE); SPG India abstracts often free | Highly useful for signal library; incident-level detail limited to abstracts unless paid |
| IADC | 2 | Global | Membership/paywalled | Optional — good for standardized NPT/incident taxonomy conventions |
| BOEM/BSEE public data (US) | 1 | US Gulf of Mexico wells | Free, API-ish | Optional — different regulatory regime than India, useful as taxonomy cross-check |
| NPD FactPages (Norway) | 1 | Norway | Free, strong API | Optional — best global example of an open well database if NWIS ever needs a design template |
| Equipment/service-company patents (USPTO) | 4 | Global | Free | Difficult/restricted for engineering data — patents describe inventions, not incident histories; treat with caution, as seen in the "~75% of wells" statistic above |

Full list with URLs in `sources.csv`.

---

## DELIVERABLE 14 — NWIS DATABASE SCHEMA (Relational — real design work, no data dependency)

Core entities (PostgreSQL-ready):

```
HistoricalWell(well_id PK, name, country, region, basin, field, operator, spud_date,
                total_depth_md, total_depth_tvd, water_depth, data_status)

HistoricalIncident(incident_id PK, well_id FK, year, failure_category, failure_subtype,
                    root_cause, contributing_factors[], severity, npt_hours,
                    source_id FK, confidence, data_status)

FailureMode(mode_id PK, category, subtype, description, typical_signals[])

TelemetrySignature(sig_id PK, failure_mode_id FK, parameter, direction, timing,
                    confidence, source_id FK)

EquipmentFailure(equip_id PK, equipment_class, failure_mode, symptoms[], root_causes[],
                  source_id FK)

FormationChallenge(formation_id PK, basin, formation_name, challenge_type,
                    typical_drilling_impact, source_id FK)

Mitigation(mitigation_id PK, incident_id FK, action, outcome, source_id FK)

LessonLearned(lesson_id PK, incident_id FK, lesson_text, source_id FK)

Source(source_id PK, name, organization, url, tier, publication_date, reliability_notes)

Document(doc_id PK, source_id FK, title, doc_type, full_text_ref)
DocumentChunk(chunk_id PK, doc_id FK, chunk_text, metadata JSONB)
```

Every fact-bearing table carries `source_id` and `confidence` — non-negotiable given Section 29's fact/inference discipline. `data_status` (`REAL` / `DEMO` / `SYNTHETIC`) sits on `HistoricalWell` and `HistoricalIncident` specifically so a query can never silently mix real OIL data with prototype data.

---

## DELIVERABLE 15 — RAG ARCHITECTURE

- **Chunking:** incident-aware + section-aware hybrid. Chunk size ~400–600 tokens with 15% overlap; never split an incident's cause-chain (Deliverable 5's normal→signal→anomaly→event→failure→cause→consequence→mitigation sequence) across chunks — that chain is the retrieval unit, not the paragraph.
- **Metadata per chunk:** country, basin, field, operator, well, year, failure_category, failure_mode, equipment, formation, source_tier, confidence, data_status — exactly your Section 19 list, unchanged, it's correct.
- **Retrieval:** hybrid (metadata filter first — e.g., basin=Upper Assam, failure_category=wellbore_instability — then semantic rerank within that filtered set). Given how sparse the real incident corpus is (a few dozen real records vs. thousands you might eventually want), pure semantic search over a small corpus will overfit to phrasing; metadata-first is the right call here specifically because of that sparsity, not just as general best practice.
- **Reranking:** cross-encoder rerank on the top ~20 metadata-filtered hits is sufficient at this corpus size; don't over-engineer this until the corpus is in the thousands.

---

## DELIVERABLE 16 — FAILURE KNOWLEDGE GRAPH

```
Formation(Upper Oligocene, Upper Assam) --[has_property]--> ShaleInstability
ShaleInstability --[produces]--> OverGaugeBorehole
OverGaugeBorehole --[associated_with]--> PoorLogQuality
ShaleInstability --[can_lead_to]--> PackOff --[can_lead_to]--> StuckPipe
StuckPipe --[causes]--> NPT
Macondo_Incident --[demonstrates]--> CementBarrierFailure --[root_cause_of]--> Blowout
Montara_Incident --[demonstrates]--> CementBarrierFailure --[root_cause_of]--> Blowout
```
DOCUMENTED relationships (from the three real incidents + the Assam geomechanics papers) vs. INFERRED relationships (e.g., "torque increase generally precedes stuck pipe" — an industry-consensus principle, not tied to a specific cited well) are tagged separately in the `edge_type` property on every graph edge. This distinction is the single most important design choice in this section — collapsing it is exactly the fabrication risk your brief warns against in Section 34.

---

## DELIVERABLE 17 — HISTORICAL SIMILARITY ENGINE

Features: formation, depth, hole section, ROP/WOB/RPM/torque/SPP *trend shape* (not absolute value — per the OIL tender evidence above, thresholds are basin/well-specific), failure mode, equipment, basin.

**Weighting:** basin + formation match weighted highest (geology dominates transferability of a case), followed by hole section and failure category, with raw parameter values weighted lowest (least transferable across wells).

**PROTOTYPE STATUS, EXPLICITLY:** with only 3 fully-documented real incidents plus a handful of Assam case-study abstracts, there is no statistically meaningful corpus to *validate* a similarity score against yet. Build the scoring pipeline now; do not present its output to an OIL engineer as validated until the corpus is large enough (realistically: needs OIL's own historical WITSML/NPT records, which are not public) to backtest against known outcomes.

---

## DELIVERABLE 18 — DEMO DATA SPECIFICATION (Synthetic — see `demo_data_assam_gujarat.json`)

Every record uses `"data_status": "SYNTHETIC"`. Fields mirror the real schema so the pipeline can be built and tested end-to-end before real OIL data is available. Wells: Assam-01, Assam-03, Assam-07 (Naga Thrust wellbore-instability scenario, modeled on the real geomechanics findings above but with fictional depths/dates/well names), Gujarat-02, Gujarat-05 (lost-circulation scenario, generic — Gujarat lacked real case-study material to model against, so this is fully synthetic, not "inspired by" a real Gujarat well).

---

## DELIVERABLE 19 — RAG EXAMPLE RECORDS

9 real, source-backed records (not 20 — see audit below for why) in `rag_records.jsonl`: 3 for Macondo (cement failure, BOP/drill-pipe buckling, human/organizational factors), 2 for Montara, 2 for Ekofisk Bravo, 2 generalized Assam wellbore-instability signatures drawn directly from the OIL geomechanics papers. Each carries real `source` and `source_url` fields — no invented citations.

---

## DELIVERABLE 20 — TOP FAILURE MODES FOR NWIS (Prioritized by usefulness, not fabricated frequency)

**INTERPRETATION, not frequency statistics** (per Section 25's own instruction — `NOT ENOUGH PUBLIC DATA` for true frequency ranking):

1. Wellbore instability / stuck pipe — highest priority for NWIS's India module specifically, because it's the one failure mode with genuine basin-specific public evidence (Assam).
2. Well control (kick/blowout) — highest safety consequence, best global documentation (3 real incidents), most valuable for the failure-chain modeling approach in Deliverable 16.
3. Lost circulation — well-understood signal (pit volume/flow-out), globally consistent, but no India-specific public case data.
4. Cementing/casing integrity — directly implicated in 2 of 3 real incidents (Macondo, Montara) — disproportionately important relative to how often your brief's taxonomy weights it.
5. Equipment failure (BOP-specific) — the "last line of defense" failure mode, best-documented via Macondo's CSB report.
6–12: directional/trajectory, mud/fluids, human/organizational, NPT-logistics, MWD/LWD telemetry loss, formation evaluation uncertainty, casing wear — all real categories, all `NOT ENOUGH PUBLIC DATA` for evidence-based ranking beyond "generally significant per SPE/IADC consensus."

---

## FINAL NWIS DESIGN QUESTION (Section 36)

**Minimum viable dataset:** the 3 real incidents + Assam geomechanics papers + OIL's public eRTMAC/tender specs, structured into the schema above. Enough to demo the RAG retrieval pattern and the failure-chain UI convincingly to a stakeholder.

**Recommended dataset:** the above, plus a formal data-sharing conversation with OIL (or DGH/NDR under academic terms if Aravind has a university affiliation for it) to get even a few dozen real historical WITSML/NPT records from Upper Assam. This is the single highest-leverage next step — it converts NWIS from "demo built on public disaster reports" to "tool trained on the operator's own historical near-misses," which is the actual product.

**Advanced dataset:** full NDR access + multi-year OIL real-time data feed integration, enabling the similarity engine to be genuinely backtested.

**Biggest data gaps:** (1) no public incident-level telemetry anywhere, for any operator, globally — structural, not an India-specific gap; (2) Gujarat/Cambay drilling-failure case studies are essentially absent publicly; (3) no way to verify NDR's current well count or access terms without direct DGH engagement — the two public figures found conflict by ~2x and neither is recent enough to trust at face value.

---

## FINAL QUALITY AUDIT & DATA QUALITY SCORE

| Dimension | Score /100 | Why |
|---|---|---|
| Source quality | 85 | Every claim above traces to a named Tier-1/2 source; nothing invented |
| Global coverage | 40 | 3 incidents is not "global drilling history" — it's a credible seed, not a database |
| Failure coverage | 55 | Taxonomy is comprehensive; incident-level evidence only covers well-control/cementing |
| Telemetry usefulness | 30 | Directional/qualitative only; no numeric thresholds exist publicly to cite |
| Root-cause usefulness | 70 | The 3 incidents have genuinely excellent, cross-checked root-cause chains |
| India relevance | 60 | Assam is strong; Gujarat is weak; OIL digital-program info is strong |
| Assam relevance | 75 | Real, OIL-authored geomechanics papers with concrete findings |
| Gujarat relevance | 20 | Exploration-geology papers only, no drilling-failure case studies found |
| RAG readiness | 65 | Schema and chunking strategy are solid; corpus size is the limiting factor, not design |
| Dataset completeness | 35 | By design — see Executive Summary. Complete relative to what's *achievable* publicly, incomplete relative to the original 38-section brief |

**Overall honest assessment:** this is a well-sourced *seed* for NWIS's knowledge base and a solid *architecture*, not the "global drilling failure database" the original brief describes. Closing that gap requires a real data partnership, not more searching.
