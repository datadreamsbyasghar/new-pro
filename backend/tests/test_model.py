from transformers import pipeline

# Load model directly from your local folder
summarizer = pipeline(
    "summarization",
    model="D:/Note Hub/models/distilbart-cnn-12-6"
)

print("Model ready!")

text = "FastAPI is a modern Python web framework that makes building APIs quick and easy."
summary = summarizer(text, max_length=50, min_length=10, do_sample=False)
print("Summary:", summary[0]["summary_text"])