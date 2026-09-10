import os
import glob
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from supabase.client import Client, create_client

# Environment Variables
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))

def main():
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables must be set.")
        return

    print("Starting PDF ingestion to Supabase...")
    pdf_files = glob.glob(os.path.join(WORKSPACE_ROOT, '*.pdf'))
    
    if not pdf_files:
        print("No PDFs found in the workspace root.")
        return

    print(f"Found {len(pdf_files)} PDF files.")
    
    documents = []
    for pdf_path in pdf_files:
        print(f"Loading {os.path.basename(pdf_path)}...")
        try:
            loader = PyPDFLoader(pdf_path)
            docs = loader.load()
            documents.extend(docs)
        except Exception as e:
            print(f"Failed to load {pdf_path}: {e}")

    print("Splitting text into chunks...")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)
    print(f"Created {len(chunks)} text chunks.")

    print("Initializing embedding model (all-MiniLM-L6-v2)...")
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    print("Connecting to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    print("Inserting chunks into Supabase pgvector...")
    SupabaseVectorStore.from_documents(
        chunks,
        embeddings,
        client=supabase,
        table_name="documents",
        query_name="match_documents"
    )
    print("Ingestion complete!")

if __name__ == "__main__":
    main()
