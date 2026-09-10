from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from supabase.client import Client, create_client

router = APIRouter()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

# Lazy initialize
supabase_client = None
embeddings = None
vector_store = None

def get_vector_store():
    global supabase_client, embeddings, vector_store
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("Missing Supabase credentials!")
        return None
        
    if vector_store is None:
        try:
            supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
            embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
            vector_store = SupabaseVectorStore(
                client=supabase_client,
                embedding=embeddings,
                table_name="documents",
                query_name="match_documents"
            )
        except Exception as e:
            print(f"Failed to load DB: {e}")
    return vector_store

class AnalyzeRequest(BaseModel):
    well_id: str
    telemetry_state: dict
    region: str

@router.post("/analyze")
def analyze_telemetry(req: AnalyzeRequest):
    store = get_vector_store()
    matches = []
    
    if store:
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
        except Exception as e:
            print(f"Error querying Supabase: {e}")
            
    return {
        "assessment": f"{req.well_id} has entered HIGH RISK. Primary signal: Pressure deviation.",
        "risk_score": 87,
        "risk_level": "HIGH",
        "confidence": 87,
        "root_cause": "Equipment / technical anomaly",
        "historical_matches": matches,
        "recommendation": "Inspect pressure-control equipment and verify sensor calibration. Cross-check with similar past cases.",
    }
