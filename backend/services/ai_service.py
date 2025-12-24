# backend/services/ai_service.py
from transformers import pipeline
from keybert import KeyBERT

# Local summarization model (downloaded and stored in your project path)
summarizer = pipeline(
    "summarization",
    model="D:/Note Hub/models/distilbart-cnn-12-6",
    trust_remote_code=True
)

# Keyword extraction model
kw_model = KeyBERT()

def summarize_text(text: str):
    if not text or len(text.split()) < 10:
        return "Text too short to summarize."
    return summarizer(
        text,
        max_length=120,
        min_length=30,
        do_sample=False
    )[0]["summary_text"]

def extract_keywords(text: str, top_n: int = 10):
    if not text.strip():
        return []
    pairs = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 2),   # allow single words and 2-word phrases
        stop_words="english",
        top_n=top_n
    )
    # Sort by score (highest relevance first)
    pairs = sorted(pairs, key=lambda x: x[1], reverse=True)

    # Deduplicate and clean
    seen = set()
    clean_keywords = []
    for kw, score in pairs:
        kw = kw.strip().lower()
        if kw not in seen and "ai" not in kw or kw == "artificial intelligence":
            seen.add(kw)
            clean_keywords.append(kw)
    return clean_keywords
