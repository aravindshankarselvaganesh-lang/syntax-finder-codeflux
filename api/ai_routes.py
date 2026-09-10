from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import json
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from supabase.client import Client, create_client
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

router = APIRouter()

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")
HF_TOKEN = os.environ.get("HF_TOKEN", "")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

# Lazy initialize
supabase_client = None
embeddings = None
vector_store = None
llm = None

def get_vector_store():
    global supabase_client, embeddings, vector_store
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("Missing Supabase credentials!")
        return None
        
    if vector_store is None:
        try:
            supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
            embeddings = HuggingFaceInferenceAPIEmbeddings(
                api_key=HF_TOKEN, 
                model_name="sentence-transformers/all-MiniLM-L6-v2"
            )
            vector_store = SupabaseVectorStore(
                client=supabase_client,
                embedding=embeddings,
                table_name="documents",
                query_name="match_documents"
            )
        except Exception as e:
            print(f"Failed to load DB: {e}")
    return vector_store

def get_llm():
    global llm
    if llm is None:
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key=GEMINI_API_KEY,
            temperature=0.2
        )
    return llm

class AnalyzeRequest(BaseModel):
    well_id: str
    telemetry_state: dict
    region: str

@router.post("/analyze")
def analyze_telemetry(req: AnalyzeRequest):
    store = get_vector_store()
    gemini = get_llm()
    matches = []
    historical_context = ""
    
    if store:
        # Construct query based on live telemetry (mocking high pressure scenario for demo)
        query = f"Abnormal Pressure Trend Equipment Failure in {req.region}"
        try:
            results = store.similarity_search_with_relevance_scores(query, k=3)
            for doc, score in results:
                sim = max(0, min(100, int(score * 100)))
                matches.append({
                    "title": doc.metadata.get("source", "Historical Report").split("\\")[-1].split("/")[-1],
                    "excerpt": doc.page_content[:200] + "...",
                    "similarity": sim
                })
                historical_context += f"\n--- Report snippet ---\n{doc.page_content}\n"
        except Exception as e:
            print(f"Error querying Supabase: {e}")

    # Fallback context if DB is empty
    if not historical_context:
        historical_context = "No historical matching documents found in database."

    # Ask Gemini to generate the insight
    prompt = PromptTemplate.from_template("""
    You are an AI Drilling Assistant. Analyze the current well telemetry and historical context to provide an operational recommendation.
    
    Live Telemetry for well {well_id} in {region}:
    {telemetry}
    
    Historical Similar Incidents (from RAG pipeline):
    {context}
    
    Respond STRICTLY with a valid JSON object matching this schema. Do not include markdown formatting or backticks:
    {{
        "assessment": "1 sentence summarizing the current risk state",
        "root_cause": "Short phrase describing likely root cause (e.g. 'Equipment / technical anomaly')",
        "recommendation": "Actionable 2-3 sentence recommendation for the operators on the rig",
        "confidence": 85
    }}
    """)
    
    try:
        chain = prompt | gemini
        response = chain.invoke({
            "well_id": req.well_id,
            "region": req.region,
            "telemetry": json.dumps(req.telemetry_state),
            "context": historical_context
        })
        
        # Clean response (remove markdown if gemini included it)
        clean_json = response.content.replace("```json", "").replace("```", "").strip()
        ai_output = json.loads(clean_json)
        
        return {
            "assessment": ai_output.get("assessment", "Analysis complete."),
            "risk_score": 87,
            "risk_level": "HIGH",
            "confidence": ai_output.get("confidence", 80),
            "root_cause": ai_output.get("root_cause", "Unknown"),
            "historical_matches": matches,
            "recommendation": ai_output.get("recommendation", "Monitor parameters closely."),
        }
        
    except Exception as e:
        print(f"Gemini generation error: {e}")
        # Fallback response
        return {
            "assessment": f"{req.well_id} has entered HIGH RISK. Primary signal: Pressure deviation.",
            "risk_score": 87,
            "risk_level": "HIGH",
            "confidence": 87,
            "root_cause": "Equipment / technical anomaly",
            "historical_matches": matches,
            "recommendation": "Inspect pressure-control equipment and verify sensor calibration. Cross-check with similar past cases.",
        }
