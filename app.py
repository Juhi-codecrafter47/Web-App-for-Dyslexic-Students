from flask import Flask, request, jsonify, render_template
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import ast
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app)

# Load dataset
csv_file = 'Learning Content.csv'
content = pd.read_csv(csv_file)

# Convert 'keywords' column from a list to a string
content['keywords'] = content['keywords'].apply(lambda x: ' '.join(ast.literal_eval(x)) if isinstance(x, str) else '')
content['keywords'] = content['keywords'].str.lower()

# Mapping subjects to their corresponding HTML files
content['subject_template'] = content['Subject'].str.lower() + ".html"  # Assuming Subject column has values like "Math", "Science", etc.

# TF-IDF Vectorizer
tfidf = TfidfVectorizer(ngram_range=(1, 2))
tfidf_matrix = tfidf.fit_transform(content['keywords'])

@app.route('/recommend', methods=['GET'])
def recommend():
    query = request.args.get('query', '').strip().lower()
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    # Transform the user's query using TF-IDF
    query_vector = tfidf.transform([query])
    query_similarity = cosine_similarity(query_vector, tfidf_matrix).flatten()

    # Get the top 5 recommendations
    top_indices = query_similarity.argsort()[-5:][::-1]
    
    # Create response including subject page links
    top_recommendations = content.iloc[top_indices][['Title', 'Subject']].copy()
    top_recommendations['subject_template'] = top_recommendations['Subject'].str.lower() + ".html"
    
    recommendations_json = top_recommendations[['Title', 'subject_template']].to_dict(orient='records')

    print("Backend Response:", recommendations_json)  # 🔍 Debugging Step
    return jsonify(recommendations_json)

@app.route("/learn/<subject>")
def learn(subject):
    subject = subject.replace(".html","")
    return render_template(f"{subject}.html")

    return jsonify(recommendations_json)
if __name__ == '__main__':
    app.run(debug=True)