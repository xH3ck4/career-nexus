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

const QUIZ_QUESTIONS = [
  {
    id: "style",
    text: "Saat mengerjakan tugas, kamu paling menikmati hal apa?",
    options: [
      { id: "code", label: "Mencari solusi logika dan ngulik kode", scores: { tech: 3 } },
      { id: "design", label: "Membuat tampilan menarik atau desain visual", scores: { design: 3 } },
      { id: "social", label: "Presentasi, berkomunikasi, atau mengatur orang", scores: { business: 3 } },
      { id: "numbers", label: "Mengolah angka dan data dengan rapi", scores: { finance: 3 } }
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
      { id: "finance", label: "Membantu hitung keuangan, catat pemasukan/pengeluaran", scores: { finance: 3 } }
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
  }
];

const QUIZ_AREAS = ["tech", "design", "business", "finance", "infra"];

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

function computeScores() {
  quizState.scores = QUIZ_AREAS.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  QUIZ_QUESTIONS.forEach((q) => {
    const answerId = quizState.answers[q.id];
    const opt = q.options.find((o) => o.id === answerId);
    if (!opt) return;
    Object.entries(opt.scores).forEach(([area, val]) => {
      quizState.scores[area] += val;
    });
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
}

function initQuizPage() {
  initParticlesQuiz();
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
}

window.addEventListener("load", initQuizPage);

