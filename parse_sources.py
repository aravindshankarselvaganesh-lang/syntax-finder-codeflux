import json

text = """
D01	DGH	Operational Model of NDR	https://ndr.dghindia.gov.in/operationalModel	Government / data repository	India	Registered / ordered	Tier 1	NDR scope and acquisition route
D02	DGH	National Data Repository overview	https://dghindia.gov.in/ndr	Government portal	India	Public portal	Tier 1	Catalogue scale; not raw open data
D03	DGH	NDR Price List for Data Sale	https://www.dghindia.gov.in/assets/downloads/5d68b90f876d3Price_List_for_NDR_Data_Sale_30-08-2019-Final.pdf	Government PDF	India	Paid / terms verify	Tier 1	Data formats and controlled access
D04	GSI	BHUKOSH	https://ap.data.gov.in/catalog/bhukosh	Government catalogue	India	Layer dependent	Tier 1	Geology / geophysics gateway
D05	Survey of India	Online Maps Portal	https://onlinemaps.surveyofindia.gov.in/	Government portal	India	Product dependent	Tier 1	Base mapping
D06	ISRIC	SoilGrids FAQ	https://docs.isric.org/globaldata/soilgrids/SoilGrids_faqs_04.html	Scientific data docs	Global	CC BY 4.0	Tier 2	Surface-soil model and limits
D07	USGS	Earthquake Catalog API	https://earthquake.usgs.gov/fdsnws/event/1/wsdl	Government API	Global	Public service	Tier 1	Seismicity context
D08	WorldPop	Introduction to API	https://www.worldpop.org/sdi/introapi/	Research data docs	Global	CC BY 4.0 cited release	Tier 2	Population exposure model
D09	UNEP-WCMC	WDPCA Data License	https://www.unep-wcmc.org/en/wdpa-data-license	Licence	Global	Restricted terms	Tier 1	Protected-area constraint
D10	IADC	DDR Plus XML Guide	https://iadc.org/wp-content/uploads/2019/01/DRAFT-IADC_DDR_Plus_XML_Guide_v1.0-1-24-20191.pdf	Industry specification	Global	Publisher terms	Tier 2	DDR taxonomy
D11	SPE	Wired drillpipe performance	https://jpt.spe.org/real-time-data-wired-drillpipe-leads-improvement-drilling-performance	Technical publication	Global	Publisher terms	Tier 2	Downhole dynamics context
D12	SPE	Vibration and logging reliability	https://jpt.spe.org/twa/drilling-and-logging-equipment-reliability-in-a-downhole-vibration-environment	Technical publication	Global	Publisher terms	Tier 2	Vibration signals
D13	BSEE	Offshore Data and Tools	https://www.bsee.gov/offshore-data-tools	Regulator portal	US OCS	Public	Tier 1	eWell / incident discovery
D14	BSEE	South Timbalier investigation	https://www.bsee.gov/sites/bsee.gov/files/panel-investigation/incident-and-investigations/st-220-panel-report9-8-2015.pdf	Investigation	US OCS	Public	Tier 1	Well-control case evidence
D15	Oil India Limited	Drilling	https://www.oil-india.com/drilling	Operator public page	India	Public page	Tier 1	Public eRTMAC statement only
D16	Oil India Limited	Digitalization	https://www.oil-india.com/digitalfootprint	Operator public page	India	Public page	Tier 1	Public DRIVE statement only
D17	NSTA	OGA Wells ETRS89	https://www.data.gov.uk/dataset/00051383-9782-4a52-bce6-f0528a9eecbe/oga-wells-etrs89	Regulator open data	UKCS	UK OGL	Tier 1	Well spatial index
D18	Norwegian Offshore Directorate	FactMaps DataService	https://factmaps.sodir.no/api/rest/services/DataService/Data/MapServer	Regulator API	Norway	Released-data conditions	Tier 1	Wellbore / geology tables
D19	DGH	Assam Arakan Basin	https://www.dghindia.gov.in/assets/downloads/56cc43934337fAssam-Arakan_Basin.pdf	Government report	Assam-Arakan	Public document	Tier 1	Regional basin context
D20	DGH	Hydrocarbon Outlook Assam	https://www.dghindia.gov.in/assets/downloads/ar/2023-24/64/	Government report	Assam	Public document	Tier 1	Regional context
D21	DGH	E and P Activities Cambay	https://dghindia.gov.in/assets/downloads/ar/2024-25/annual_report24-25.pdf	Government report	Cambay	Public document	Tier 1	Regional context
A01	OSHA	Hydrogen Sulfide Evaluating and Controlling Exposure	https://www.osha.gov/hydrogen-sulfide/evaluating-controlling-exposure	Safety guidance	US	Public	Tier 1	Controls / monitoring; not India legal limit
A02	OSHA	Oil and Gas Drilling Well Control	https://www.osha.gov/etools/oil-and-gas/drilling/well-control	Safety guidance	US	Public	Tier 1	Well control and BOP context
A03	OSHA	Oil and Gas Extraction Hazards	https://www.osha.gov/oil-and-gas-extraction/hazards	Safety guidance	US	Public	Tier 1	Worker hazard taxonomy
A04	NIST	AI Risk Management Framework 1.0	https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf	Government framework	Global	Public	Tier 1	AI governance functions
A05	OWASP	Top 10 for LLM and GenAI	https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/	Security guidance	Global	Public	Tier 2	LLM threat model
A06	PostgreSQL	Row Security Policies	https://www.postgresql.org/docs/17/ddl-rowsecurity.html	Official documentation	Global	Open docs	Tier 1	RLS capability
A07	India Code	Digital Personal Data Protection Act 2023	https://www.indiacode.nic.in/indiacode/handle/123456789/22037?view_type=browse	Statute	India	Official text	Tier 1	Privacy review anchor
A08	US EPA	EJScreen Technical Documentation	https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P101AWSX.txt	Government technical documentation	US	Public	Tier 1	Screening limitations principle
A09	NDMA	Guidelines for Chemical Disaster Management	https://nidm.gov.in/pdf/guidelines/new/chemicaldisaster.pdf	Government guideline	India	Public	Tier 1	On/off-site planning context
"""

data = []
for line in text.strip().split("\n"):
    parts = line.split("\t")
    if len(parts) == 9:
        data.append({
            'id': parts[0],
            'organisation': parts[1],
            'title': parts[2],
            'url': parts[3],
            'type': parts[4],
            'geography': parts[5],
            'access': parts[6],
            'reliability': parts[7],
            'limitation': parts[8]
        })

print(f"export const CANONICAL_SOURCES = {json.dumps(data, indent=2)};")
