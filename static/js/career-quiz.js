const particleCanvasQuiz = document.getElementById("particleCanvas");
const quizQuestionText = document.getElementById("quizQuestionText");
const quizOptions = document.getElementById("quizOptions");
const quizPrevBtn = document.getElementById("quizPrevBtn");
const quizNextBtn = document.getElementById("quizNextBtn");
const quizProgressFill = document.getElementById("quizProgressFill");
const quizProgressLabel = document.getElementById("quizProgressLabel");
const quizScoreValue = document.getElementById("quizScoreValue");
const quizResultText = document.getElementById("quizResultText");
const quizResultTags = document.getElementById("quizResultTags");
const quizAreasEl = document.getElementById("quizAreas");
const maturityMarker = document.getElementById("maturityMarker");
const maturityLevel = document.getElementById("maturityLevel");
const maturityText = document.getElementById("maturityText");
const maturityChecklist = document.getElementById("maturityChecklist");
const quizRetryBtn = document.getElementById("quizRetryBtn");
const quizSaveBtn = document.getElementById("quizSaveBtn");

const STORAGE_KEY = "cn-quiz-answers";

// "maturity" = poin kematangan karier (kesadaran diri, perencanaan, pengambilan keputusan).
const QUIZ_QUESTIONS = [
  {
    id: "style",
    text: "Saat mengerjakan tugas, kamu paling menikmati hal apa?",
    options: [
      { id: "code", label: "Mencari solusi logika dan ngulik kode", scores: { tech: 3 } },
      { id: "design", label: "Membuat tampilan menarik atau desain visual", scores: { design: 3 } },
      { id: "social", label: "Presentasi, berkomunikasi, atau mengatur orang", scores: { business: 3 } },
      { id: "numbers", label: "Mengolah angka dan data dengan rapi", scores: { finance: 3 } },
      { id: "device", label: "Mengutak-atik perangkat, jaringan, atau hardware", scores: { infra: 3 } }
    ]
  },
  {
    id: "environment",
    text: "Lingkungan kerja seperti apa yang menurutmu paling cocok?",
    options: [
      { id: "remote", label: "Bisa kerja dari mana saja, penting ada laptop & internet", scores: { tech: 2, design: 1 } },
      { id: "office", label: "Kantor terstruktur dengan jam kerja jelas", scores: { finance: 2, business: 1 } },
      { id: "onsite", label: "Kadang turun ke lapangan / server room", scores: { infra: 3 } },
      { id: "creative", label: "Studio kreatif dengan banyak brainstorming", scores: { design: 2, business: 1 } }
    ]
  },
  {
    id: "activity",
    text: "Kegiatan mana yang paling sering kamu lakukan di luar jam pelajaran?",
    options: [
      { id: "build", label: "Ngoprek website/app, belajar tools baru", scores: { tech: 3 } },
      { id: "content", label: "Bikin konten, poster, atau desain feed sosmed", scores: { design: 2, business: 1 } },
      { id: "selling", label: "Jualan online, promosi, atau ikut organisasi OSIS", scores: { business: 3 } },
      { id: "finance", label: "Membantu hitung keuangan, catat pemasukan/pengeluaran", scores: { finance: 3 } },
      { id: "network", label: "Setting wifi/jaringan, instal ulang, betulin komputer", scores: { infra: 3 } }
    ]
  },
  {
    id: "focus",
    text: "Kalau diberi proyek kelompok, biasanya kamu ambil peran apa?",
    options: [
      { id: "leader", label: "Koordinator, memastikan semua jalan", scores: { business: 2, tech: 1 } },
      { id: "implement", label: "Pelaksana teknis utama (ngoding / setting jaringan / hitung)", scores: { tech: 2, infra: 1, finance: 1 } },
      { id: "visual", label: "Membuat slide, desain, atau tampilan yang menarik", scores: { design: 2 } },
      { id: "support", label: "Mendukung administrasi, mencatat dan merapikan", scores: { finance: 2 } }
    ]
  },
  {
    id: "subject",
    text: "Mata pelajaran / materi yang paling kamu nikmati selama ini?",
    options: [
      { id: "logic", label: "Logika, algoritma, pemrograman", scores: { tech: 3 } },
      { id: "art", label: "Seni, gambar, multimedia", scores: { design: 3 } },
      { id: "econ", label: "Ekonomi, kewirausahaan, komunikasi", scores: { business: 3 } },
      { id: "acc", label: "Akuntansi, matematika keuangan", scores: { finance: 3 } },
      { id: "net", label: "Jaringan komputer, perakitan, sistem operasi", scores: { infra: 3 } }
    ]
  },
  {
    id: "tool",
    text: "Tools / aplikasi mana yang membuatmu paling penasaran untuk dikuasai?",
    options: [
      { id: "vscode", label: "VS Code / bahasa pemrograman", scores: { tech: 3 } },
      { id: "figma", label: "Figma / Photoshop / editor video", scores: { design: 3 } },
      { id: "ads", label: "Marketplace / Meta Ads / analitik sosmed", scores: { business: 3 } },
      { id: "excel", label: "Excel / software akuntansi", scores: { finance: 3 } },
      { id: "cisco", label: "Cisco / MikroTik / tools jaringan", scores: { infra: 3 } }
    ]
  },
  {
    id: "risk",
    text: "Seberapa nyaman kamu dengan teknologi baru yang terus berubah?",
    options: [
      { id: "very", label: "Sangat nyaman, justru suka tantangan baru", scores: { tech: 2, infra: 1 } },
      { id: "ok", label: "Cukup nyaman, selama ada waktu belajar", scores: { design: 1, business: 1 } },
      { id: "stable", label: "Lebih suka hal yang stabil dan jelas aturannya", scores: { finance: 2 } },
      { id: "mix", label: "Campuran, kadang ingin stabil kadang ingin tantangan", scores: { business: 1, tech: 1 } }
    ]
  },
  {
    id: "future",
    text: "Dalam 5–10 tahun ke depan, kamu lebih membayangkan diri sebagai…",
    options: [
      { id: "engineer", label: "Engineer ahli (software / jaringan / cloud)", scores: { tech: 3, infra: 2 } },
      { id: "designer", label: "Desainer kreatif (UI/UX / motion / branding)", scores: { design: 3 } },
      { id: "manager", label: "Pengelola bisnis / marketing / produk", scores: { business: 3 } },
      { id: "finance", label: "Ahli akuntansi / pajak / keuangan", scores: { finance: 3 } }
    ]
  },
  {
    id: "self-known",
    text: "Seberapa kenal kamu dengan minat dan kemampuan dirimu sendiri?",
    options: [
      { id: "very", label: "Sangat kenal, aku tahu kelebihan & kekuranganku", scores: {}, maturity: 3 },
      { id: "some", label: "Cukup tahu, tapi masih ragu di beberapa hal", scores: {}, maturity: 2 },
      { id: "little", label: "Sedikit, masih bingung apa yang benar-benar aku suka", scores: {}, maturity: 1 },
      { id: "none", label: "Belum kenal, masih ikut-ikutan teman", scores: {}, maturity: 0 }
    ]
  },
  {
    id: "plan",
    text: "Apakah kamu sudah punya rencana setelah lulus SMK?",
    options: [
      { id: "detail", label: "Sudah, lengkap dengan langkah & target waktunya", scores: {}, maturity: 3 },
      { id: "rough", label: "Sudah ada gambaran besar, belum detail", scores: {}, maturity: 2 },
      { id: "vague", label: "Masih samar, sekadar ingin kerja/kuliah", scores: {}, maturity: 1 },
      { id: "no", label: "Belum kepikiran sama sekali", scores: {}, maturity: 0 }
    ]
  },
  {
    id: "info",
    text: "Seberapa sering kamu mencari informasi tentang karir impianmu?",
    options: [
      { id: "often", label: "Sering, aku cari tahu skill, gaji, dan jenjangnya", scores: {}, maturity: 3 },
      { id: "sometimes", label: "Kadang-kadang kalau ingat", scores: {}, maturity: 2 },
      { id: "rare", label: "Jarang, hanya saat ada tugas", scores: {}, maturity: 1 },
      { id: "never", label: "Belum pernah serius mencari", scores: {}, maturity: 0 }
    ]
  },
  {
    id: "decision",
    text: "Kalau menghadapi pilihan penting soal masa depan, kamu biasanya…",
    options: [
      { id: "analyze", label: "Menimbang untung-rugi lalu memutuskan sendiri dengan yakin", scores: { business: 1 }, maturity: 3 },
      { id: "advice", label: "Minta saran orang tua/guru BK, lalu memutuskan", scores: {}, maturity: 2 },
      { id: "follow", label: "Cenderung ikut keputusan teman atau tren", scores: {}, maturity: 1 },
      { id: "avoid", label: "Menunda dan menghindari keputusan", scores: {}, maturity: 0 }
    ]
  }
];

const QUIZ_AREAS = ["tech", "design", "business", "finance", "infra"];
const AREA_LABELS = {
  tech: "Teknologi & Pemrograman",
  design: "Desain & Kreatif",
  business: "Bisnis & Komunikasi",
  finance: "Keuangan & Ketelitian",
  infra: "Jaringan & Infrastruktur"
};

let quizState = {
  currentIndex: 0,
  answers: {},
  scores: QUIZ_AREAS.reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
};

function initParticlesQuiz() {
  if (!particleCanvasQuiz || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = particleCanvasQuiz.getContext("2d");
  if (!ctx) return;
  const dots = [];
  let width = 0;
  let height = 0;

  function resize() {
    width = particleCanvasQuiz.width = window.innerWidth * devicePixelRatio;
    height = particleCanvasQuiz.height = window.innerHeight * devicePixelRatio;
    particleCanvasQuiz.style.width = `${window.innerWidth}px`;
    particleCanvasQuiz.style.height = `${window.innerHeight}px`;
    dots.length = 0;
    const count = Math.min(40, Math.floor((window.innerWidth * window.innerHeight) / 26000));
    for (let i = 0; i < count; i += 1) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(120, 190, 255, 0.5)";
    for (const d of dots) {
      d.x += d.vx * devicePixelRatio;
      d.y += d.vy * devicePixelRatio;
      if (d.x < 0 || d.x > width) d.vx *= -1;
      if (d.y < 0 || d.y > height) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  requestAnimationFrame(frame);
}

function renderCurrentQuestion() {
  const q = QUIZ_QUESTIONS[quizState.currentIndex];
  quizQuestionText.textContent = q.text;
  quizOptions.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt.label;
    btn.dataset.id = opt.id;
    if (quizState.answers[q.id] === opt.id) {
      btn.classList.add("quiz-option--selected");
    }
    btn.addEventListener("click", () => {
      quizState.answers[q.id] = opt.id;
      persistAnswers();
      document.querySelectorAll(".quiz-option").forEach((b) => b.classList.remove("quiz-option--selected"));
      btn.classList.add("quiz-option--selected");
      quizNextBtn.disabled = false;
    });
    quizOptions.appendChild(btn);
  });

  quizPrevBtn.disabled = quizState.currentIndex === 0;
  const answered = Boolean(quizState.answers[q.id]);
  quizNextBtn.disabled = !answered;
  quizNextBtn.textContent = quizState.currentIndex === QUIZ_QUESTIONS.length - 1 ? "Selesai & Lihat Hasil" : "Berikutnya";

  const progress = ((quizState.currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;
  quizProgressFill.style.width = `${progress}%`;
  quizProgressLabel.textContent = `Pertanyaan ${quizState.currentIndex + 1} dari ${QUIZ_QUESTIONS.length}`;
}

function persistAnswers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizState.answers));
  } catch {
    /* abaikan */
  }
}

function loadAnswers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      quizState.answers = JSON.parse(raw) || {};
    }
  } catch {
    quizState.answers = {};
  }
}

function computeScores() {
  quizState.scores = QUIZ_AREAS.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  quizState.maturity = 0;
  quizState.maturityMax = 0;
  QUIZ_QUESTIONS.forEach((q) => {
    const hasMaturity = q.options.some((o) => typeof o.maturity === "number");
    if (hasMaturity) {
      quizState.maturityMax += Math.max(...q.options.map((o) => o.maturity || 0));
    }
    const answerId = quizState.answers[q.id];
    const opt = q.options.find((o) => o.id === answerId);
    if (!opt) return;
    Object.entries(opt.scores || {}).forEach(([area, val]) => {
      quizState.scores[area] += val;
    });
    if (typeof opt.maturity === "number") {
      quizState.maturity += opt.maturity;
    }
  });
}

function renderAreas() {
  if (!quizAreasEl) return;
  const maxScore = Math.max(1, ...QUIZ_AREAS.map((a) => quizState.scores[a]));
  quizAreasEl.innerHTML = "";
  QUIZ_AREAS.slice()
    .sort((a, b) => quizState.scores[b] - quizState.scores[a])
    .forEach((area) => {
      const score = quizState.scores[area];
      const percent = Math.round((score / maxScore) * 100);
      const li = document.createElement("li");
      li.className = "quiz-area";
      li.innerHTML = `
        <div class="quiz-area__head">
          <span class="quiz-area__name">${AREA_LABELS[area]}</span>
          <span>${score} poin</span>
        </div>
        <div class="quiz-area__track"><div class="quiz-area__fill"></div></div>
      `;
      quizAreasEl.appendChild(li);
      requestAnimationFrame(() => {
        const fill = li.querySelector(".quiz-area__fill");
        if (fill) fill.style.width = `${percent}%`;
      });
    });
}

function renderMaturity() {
  if (!maturityMarker || !maturityLevel || !maturityText || !maturityChecklist) return;
  const percent = quizState.maturityMax > 0 ? Math.round((quizState.maturity / quizState.maturityMax) * 100) : 0;
  maturityMarker.style.left = `${percent}%`;

  let level;
  let desc;
  let checklist;
  if (percent < 40) {
    level = `Tahap Awal · ${percent}%`;
    desc = "Kamu masih dalam tahap eksplorasi. Wajar! Saatnya mengenali diri dan menggali banyak informasi karir.";
    checklist = [
      "Tulis 3 hal yang paling kamu sukai dan kuasai.",
      "Tonton minimal 2 video profesi di menu Info Karir.",
      "Ngobrol dengan guru BK tentang minatmu.",
      "Coba isi Peta Karir & Mind Planning untuk gambaran awal."
    ];
  } else if (percent < 70) {
    level = `Tahap Berkembang · ${percent}%`;
    desc = "Bagus! Arah karirmu mulai terbentuk. Perkuat rencana dan perdalam informasi agar makin mantap.";
    checklist = [
      "Pilih 1–2 karir tujuan dari rekomendasi di atas.",
      "Susun langkah-langkah di halaman Mind Planning.",
      "Cari info skill & sertifikasi yang dibutuhkan.",
      "Mulai bangun portofolio / proyek kecil."
    ];
  } else {
    level = `Tahap Matang · ${percent}%`;
    desc = "Keren! Kamu sudah cukup matang merencanakan karir. Fokus eksekusi dan konsisten mengembangkan diri.";
    checklist = [
      "Tetapkan target 1 tahun ke depan secara spesifik.",
      "Ikut lomba / magang / komunitas bidangmu.",
      "Lengkapi portofolio dengan proyek nyata.",
      "Evaluasi rutin progresmu bersama guru BK."
    ];
  }

  maturityLevel.textContent = level;
  maturityText.textContent = desc;
  maturityChecklist.innerHTML = "";
  checklist.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" id="mat-${i}" /><label for="mat-${i}">${item}</label>`;
    maturityChecklist.appendChild(li);
  });
}

function showFinalResult() {
  computeScores();
  const entries = Object.entries(quizState.scores);
  const maxScore = Math.max(...entries.map(([_, s]) => s));
  const totalScore = entries.reduce((acc, [, s]) => acc + s, 0);
  const percent = Math.round((maxScore / (totalScore || 1)) * 100);

  quizScoreValue.textContent = `${percent}`;
  quizScoreValue.classList.remove("quiz-score-circle__inner--pulse");
  void quizScoreValue.offsetWidth;
  quizScoreValue.classList.add("quiz-score-circle__inner--pulse");

  let strongestArea = entries.find(([, s]) => s === maxScore)?.[0] || "tech";
  let message = "";
  const tags = [];

  if (strongestArea === "tech") {
    message = "Jawabanmu banyak mengarah ke dunia teknologi dan pengembangan software.";
    tags.push("Frontend/Backend Developer", "QA Engineer", "Cloud Engineer");
  } else if (strongestArea === "design") {
    message = "Kamu tampak kuat di sisi desain dan kreativitas visual.";
    tags.push("UI/UX Designer", "Graphic Designer", "Motion Designer");
  } else if (strongestArea === "business") {
    message = "Kamu nyaman di ranah bisnis, komunikasi, dan pengelolaan produk.";
    tags.push("Digital Marketer", "Content Strategist", "Product Manager (lanjutan)");
  } else if (strongestArea === "finance") {
    message = "Kamu teliti, senang angka dan aturan, cocok di jalur keuangan.";
    tags.push("Accounting Staff", "Tax & Payroll Admin", "Finance Analyst (lanjutan)");
  } else {
    message = "Kamu tertarik dengan sistem dan infrastruktur teknologi.";
    tags.push("Network Technician", "Cybersecurity Analyst", "Cloud Engineer");
  }

  quizResultText.textContent = `${message} Skor tertinggi: ${maxScore} poin.`;
  quizResultTags.innerHTML = "";
  tags.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    quizResultTags.appendChild(li);
  });

  renderAreas();
  renderMaturity();
}

function initQuizPage() {
  initParticlesQuiz();
  loadAnswers();
  renderCurrentQuestion();

  quizPrevBtn.addEventListener("click", () => {
    if (quizState.currentIndex === 0) return;
    quizState.currentIndex -= 1;
    renderCurrentQuestion();
  });

  quizNextBtn.addEventListener("click", () => {
    const lastIndex = QUIZ_QUESTIONS.length - 1;
    if (quizState.currentIndex < lastIndex) {
      quizState.currentIndex += 1;
      renderCurrentQuestion();
    } else {
      showFinalResult();
      document.querySelector(".quiz-result").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  if (quizRetryBtn) {
    quizRetryBtn.addEventListener("click", () => {
      quizState.currentIndex = 0;
      quizState.answers = {};
      persistAnswers();
      quizScoreValue.textContent = "0";
      quizResultText.textContent = "Jawabanmu akan dianalisis setelah kamu menyelesaikan semua pertanyaan.";
      quizResultTags.innerHTML = "";
      if (quizAreasEl) quizAreasEl.innerHTML = "";
      if (maturityLevel) maturityLevel.textContent = "Belum diukur";
      if (maturityText) maturityText.textContent = "";
      if (maturityChecklist) maturityChecklist.innerHTML = "";
      if (maturityMarker) maturityMarker.style.left = "0%";
      renderCurrentQuestion();
      document.querySelector(".quiz-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  if (quizSaveBtn) {
    quizSaveBtn.addEventListener("click", () => {
      const answered = Object.keys(quizState.answers).length;
      if (answered < QUIZ_QUESTIONS.length) {
        quizSaveBtn.textContent = "⚠️ Selesaikan dulu";
        window.setTimeout(() => (quizSaveBtn.textContent = "💾 Simpan Hasil"), 1800);
        return;
      }
      persistAnswers();
      quizSaveBtn.textContent = "✅ Tersimpan!";
      window.setTimeout(() => (quizSaveBtn.textContent = "💾 Simpan Hasil"), 1800);
    });
  }
}

window.addEventListener("load", initQuizPage);

