# Career Nexus — CyberCounseling SMK

Aplikasi web **Flask** untuk mendukung kematangan karier siswa SMK (proyek skripsi Bimbingan & Konseling).
Terdapat empat fitur utama: Peta Karir interaktif, Mind Planning jalur karir, Info Karir berbasis video
YouTube, dan Quiz minat dengan indikator kematangan karier. Mendukung **mode terang & gelap** (default terang).

## Struktur Folder

```
career-nexus/
├── app.py                  # Aplikasi Flask + definisi route
├── requirements.txt        # Daftar dependensi Python
├── README.md
├── templates/              # Template Jinja (HTML)
│   ├── base.html           # Layout bersama (head, header, footer, tema)
│   ├── index.html          # Peta Karir
│   ├── mind-planning.html  # Mind Planning
│   ├── career-info.html    # Info Karir (video YouTube)
│   └── career-quiz.html    # Quiz Karir + kematangan karier
└── static/                 # Aset statis
    ├── css/
    │   └── style.css
    └── js/
        ├── theme.js         # Toggle mode terang/gelap (semua halaman)
        ├── script.js        # Logika Peta Karir
        ├── mind-planning.js
        ├── career-info.js
        └── career-quiz.js
```

## Cara Menjalankan

1. (Opsional) Buat virtual environment:

   ```bash
   python -m venv venv
   venv\Scripts\activate        # Windows
   # source venv/bin/activate   # macOS/Linux
   ```

2. Pasang dependensi:

   ```bash
   pip install -r requirements.txt
   ```

3. Jalankan server:

   ```bash
   python app.py
   ```

4. Buka di browser: <http://127.0.0.1:5000>

## Daftar Halaman (Route)

| Route            | Halaman                          |
| ---------------- | -------------------------------- |
| `/`              | Peta Karir interaktif            |
| `/mind-planning` | Mind Planning jalur karir        |
| `/info-karir`    | Info Karir + video YouTube       |
| `/quiz-karir`    | Quiz minat + kematangan karier   |

## Catatan

- Video pengenalan profesi diputar langsung dari YouTube (butuh koneksi internet).
- Preferensi tema dan jawaban quiz disimpan di `localStorage` browser perangkat.
