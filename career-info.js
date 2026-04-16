const particleCanvasInfo = document.getElementById("particleCanvas");
const careerInfoList = document.getElementById("careerInfoList");
const infoSearchInput = document.getElementById("infoSearchInput");
const infoRandomBtn = document.getElementById("infoRandomBtn");

const infoTitle = document.getElementById("infoTitle");
const infoSubtitle = document.getElementById("infoSubtitle");
const infoMediaCaption = document.getElementById("infoMediaCaption");
const infoTags = document.getElementById("infoTags");
const infoDescription = document.getElementById("infoDescription");
const infoTips = document.getElementById("infoTips");
const infoRoadmap = document.getElementById("infoRoadmap");

// Jika halaman ini tidak memuat script utama, definisikan ulang data karir minimal
// agar career-info bisa berdiri sendiri.
/* eslint-disable no-var */
if (typeof CAREER_DATA === "undefined") {
  var CAREER_DATA = [
    {
      id: "junior-web",
      name: "Junior Web Developer",
      level: "Entry",
      salary: "Rp4.500.000 - Rp7.000.000 / bulan",
      major: ["RPL"],
      hobbies: ["coding", "programming", "web", "teknologi", "game"],
      skills: "HTML, CSS, JavaScript, Git",
      education: "SMK RPL + sertifikasi web dasar",
      profile: "Membangun website dan aplikasi web dasar dengan HTML, CSS, dan JavaScript.",
      track: "SMK RPL -> Junior Developer -> Frontend/Backend Developer -> Software Engineer"
    },
    {
      id: "frontend-dev",
      name: "Frontend Developer",
      level: "Menengah",
      salary: "Rp7.000.000 - Rp14.000.000 / bulan",
      major: ["RPL", "DKV"],
      hobbies: ["desain", "ui", "ux", "coding", "animasi"],
      skills: "React/Vue, TypeScript, UI engineering",
      education: "SMK + bootcamp/sertifikasi frontend",
      profile: "Fokus pada antarmuka interaktif, aksesibilitas, dan pengalaman pengguna.",
      track: "Junior Web Dev -> Frontend Dev -> Senior Frontend -> Frontend Architect"
    },
    {
      id: "backend-dev",
      name: "Backend Developer",
      level: "Menengah",
      salary: "Rp7.500.000 - Rp15.000.000 / bulan",
      major: ["RPL", "TKJ"],
      hobbies: ["logika", "data", "server", "coding"],
      skills: "API, SQL/NoSQL, autentikasi, cloud",
      education: "SMK + sertifikasi backend/cloud",
      profile: "Membangun API, database, sistem autentikasi, dan logika inti aplikasi.",
      track: "Junior Dev -> Backend Dev -> Senior Backend -> Software Architect"
    },
    {
      id: "network-tech",
      name: "Network Technician",
      level: "Entry",
      salary: "Rp4.500.000 - Rp8.000.000 / bulan",
      major: ["TKJ"],
      hobbies: ["jaringan", "hardware", "teknologi", "problem solving"],
      skills: "Routing, switching, troubleshooting",
      education: "SMK TKJ + sertifikasi jaringan",
      profile: "Menangani instalasi, konfigurasi, dan troubleshooting jaringan komputer.",
      track: "SMK TKJ -> Network Technician -> Network Engineer -> Network Specialist"
    },
    {
      id: "cyber-analyst",
      name: "Cybersecurity Analyst",
      level: "Menengah",
      salary: "Rp8.000.000 - Rp18.000.000 / bulan",
      major: ["TKJ", "RPL"],
      hobbies: ["keamanan", "analisis", "ctf", "teknologi"],
      skills: "SIEM, incident response, pentest dasar",
      education: "SMK + sertifikasi keamanan",
      profile: "Menganalisis celah keamanan, memonitor ancaman, dan menyusun mitigasi.",
      track: "Network/Backend -> Security Analyst -> Security Engineer -> Security Lead"
    },
    {
      id: "graphic-designer",
      name: "Graphic Designer",
      level: "Entry",
      salary: "Rp4.000.000 - Rp9.000.000 / bulan",
      major: ["DKV"],
      hobbies: ["desain", "ilustrasi", "fotografi", "branding"],
      skills: "Adobe Illustrator, Photoshop, typography",
      education: "SMK DKV + portofolio desain",
      profile: "Membuat materi visual promosi, branding, dan konten kreatif.",
      track: "SMK DKV -> Graphic Designer -> Senior Designer -> Art Director"
    },
    {
      id: "uiux-designer",
      name: "UI/UX Designer",
      level: "Menengah",
      salary: "Rp7.000.000 - Rp14.000.000 / bulan",
      major: ["DKV", "RPL"],
      hobbies: ["desain", "riset", "user", "prototyping"],
      skills: "Figma, user research, wireframing",
      education: "SMK + pelatihan UX/UI",
      profile: "Merancang alur aplikasi yang nyaman, efisien, dan sesuai kebutuhan user.",
      track: "Graphic Designer -> UI/UX Designer -> Product Designer -> Head of Design"
    },
    {
      id: "digital-marketer",
      name: "Digital Marketing Specialist",
      level: "Menengah",
      salary: "Rp5.000.000 - Rp12.000.000 / bulan",
      major: ["BDP", "DKV"],
      hobbies: ["marketing", "sosmed", "konten", "komunikasi"],
      skills: "SEO, ads, social media analytics",
      education: "SMK BDP + sertifikasi digital marketing",
      profile: "Mengelola strategi promosi digital berbasis data dan performa kampanye.",
      track: "SMK BDP -> Digital Marketer -> Performance Marketer -> Growth Strategist"
    },
    {
      id: "accounting-staff",
      name: "Accounting Staff",
      level: "Entry",
      salary: "Rp4.500.000 - Rp8.500.000 / bulan",
      major: ["AKL"],
      hobbies: ["angka", "administrasi", "ketelitian", "analisis"],
      skills: "Jurnal, laporan keuangan, spreadsheet",
      education: "SMK AKL + sertifikasi teknisi akuntansi",
      profile: "Mengelola pencatatan keuangan, laporan transaksi, dan rekonsiliasi data.",
      track: "SMK AKL -> Accounting Staff -> Senior Accounting -> Finance Supervisor"
    }
  ];
}
/* eslint-enable no-var */

const INFO_DATA = CAREER_DATA.map((career) => {
  const tipsBase = [
    "Bangun portofolio kecil dari proyek pribadi atau tugas sekolah.",
    "Aktif di komunitas online/offline yang relevan dengan bidang ini.",
    "Cari mentor: guru, kakak kelas, atau profesional di LinkedIn.",
    "Ikut lomba atau challenge kecil untuk melatih mental dan skill."
  ];
  const levelExtra =
    career.level === "Entry"
      ? "Fokuskan diri pada penguasaan dasar dan kebiasaan kerja yang baik. Jangan takut mencoba banyak hal."
      : career.level === "Menengah"
      ? "Perkuat soft skill seperti komunikasi dan kerja tim, karena level ini banyak kolaborasi."
      : "Bangun personal branding dan kemampuan memimpin, karena kamu akan banyak ambil keputusan strategis.";

  return {
    ...career,
    videoCaption: `Simulasi singkat suasana kerja sebagai ${career.name}.`,
    tips: [...tipsBase.slice(0, 3), levelExtra],
    roadmapSteps: career.track.split("->").map((p) => p.trim())
  };
});

function initParticlesInfo() {
  if (!particleCanvasInfo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = particleCanvasInfo.getContext("2d");
  if (!ctx) return;

  const dots = [];
  let width = 0;
  let height = 0;

  function resize() {
    width = particleCanvasInfo.width = window.innerWidth * devicePixelRatio;
    height = particleCanvasInfo.height = window.innerHeight * devicePixelRatio;
    particleCanvasInfo.style.width = `${window.innerWidth}px`;
    particleCanvasInfo.style.height = `${window.innerHeight}px`;
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

function renderCareerList(filterText = "") {
  if (!careerInfoList) return;
  const q = filterText.toLowerCase().trim();
  careerInfoList.innerHTML = "";
  const items = INFO_DATA.filter((c) => {
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.profile.toLowerCase().includes(q) ||
      c.major.join(" ").toLowerCase().includes(q)
    );
  });

  for (const career of items) {
    const li = document.createElement("li");
    li.className = "info-list-item";
    li.dataset.id = career.id;
    li.innerHTML = `
      <div class="info-list-item__title">${career.name}</div>
      <div class="info-list-item__meta">${career.level} · ${career.major.join(", ")}</div>
    `;
    li.addEventListener("click", () => {
      document.querySelectorAll(".info-list-item--active").forEach((el) => el.classList.remove("info-list-item--active"));
      li.classList.add("info-list-item--active");
      showCareerDetail(career.id, true);
    });
    careerInfoList.appendChild(li);
  }
}

function showCareerDetail(id, animate = false) {
  const career = INFO_DATA.find((c) => c.id === id);
  if (!career) return;

  infoTitle.textContent = career.name;
  infoSubtitle.textContent = `${career.profile}`;
  infoMediaCaption.textContent = career.videoCaption;

  infoTags.innerHTML = `
    <span class="info-tag">${career.level} level</span>
    <span class="info-tag">Gaji: ${career.salary}</span>
    <span class="info-tag">Jurusan: ${career.major.join(", ")}</span>
  `;

  infoDescription.textContent = `${career.profile} Skill utama: ${career.skills}. Pendidikan/latihan yang disarankan: ${career.education}.`;

  infoTips.innerHTML = "";
  career.tips.forEach((tip, index) => {
    const li = document.createElement("li");
    li.textContent = tip;
    li.style.animationDelay = `${index * 0.06}s`;
    infoTips.appendChild(li);
  });

  infoRoadmap.innerHTML = "";
  career.roadmapSteps.forEach((step, index) => {
    const div = document.createElement("div");
    div.className = "info-roadmap-step";
    div.innerHTML = `
      <div class="info-roadmap-step__circle">${index + 1}</div>
      <div class="info-roadmap-step__label">${step}</div>
    `;
    infoRoadmap.appendChild(div);
  });

  if (animate) {
    const media = document.querySelector(".info-media");
    media.classList.remove("info-media--pulse");
    void media.offsetWidth;
    media.classList.add("info-media--pulse");
  }
}

function initCareerInfoPage() {
  initParticlesInfo();
  renderCareerList();

  if (infoSearchInput) {
    infoSearchInput.addEventListener("input", () => {
      renderCareerList(infoSearchInput.value);
    });
  }

  if (infoRandomBtn) {
    infoRandomBtn.addEventListener("click", () => {
      const random = INFO_DATA[Math.floor(Math.random() * INFO_DATA.length)];
      showCareerDetail(random.id, true);
      const li = careerInfoList.querySelector(`[data-id="${random.id}"]`);
      if (li) {
        document.querySelectorAll(".info-list-item--active").forEach((el) => el.classList.remove("info-list-item--active"));
        li.classList.add("info-list-item--active");
        li.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  if (INFO_DATA.length > 0) {
    showCareerDetail(INFO_DATA[0].id, false);
    const firstLi = careerInfoList.querySelector("[data-id]");
    if (firstLi) firstLi.classList.add("info-list-item--active");
  }
}

window.addEventListener("load", initCareerInfoPage);

