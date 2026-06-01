"""
Career Nexus - CyberCounseling SMK
Aplikasi web Flask untuk mendukung kematangan karier siswa SMK.

Menjalankan:
    pip install -r requirements.txt
    python app.py
Lalu buka http://127.0.0.1:5000 di browser.
"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    """Peta Karir interaktif + form rekomendasi."""
    return render_template("index.html", active="peta")


@app.route("/mind-planning")
def mind_planning():
    """Mind Planning jalur karir."""
    return render_template("mind-planning.html", active="mind")


@app.route("/info-karir")
def career_info():
    """Info Karir detail + video YouTube pengenalan profesi."""
    return render_template("career-info.html", active="info")


@app.route("/quiz-karir")
def career_quiz():
    """Quiz minat & indikator kematangan karier."""
    return render_template("career-quiz.html", active="quiz")


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
