/* Mind Planning Karir — Perencana Roadmap interaktif.
   Fitur: status tiap langkah (Belum/Sedang/Selesai), progress bar, checklist
   aksi, catatan pribadi, zoom & geser, ekspor rencana. Semua kemajuan otomatis
   tersimpan di localStorage perangkat (per template jalur). */

const particleCanvas = document.getElementById("particleCanvas");
const mindStage = document.getElementById("mindStage");
const mindStageInner = document.getElementById("mindStageInner");
const mindLinesSvg = document.getElementById("mindLines");
const mindNodesLayer = document.getElementById("mindNodesLayer");
const mindTemplateSelect = document.getElementById("mindTemplateSelect");
const resetMindMapBtn = document.getElementById("resetMindMap");
const resetProgressBtn = document.getElementById("resetMindProgress");
const exportPlanBtn = document.getElementById("exportMindPlan");
const mindFullscreenToggle = document.getElementById("mindFullscreenToggle");
const mindCard = document.querySelector(".mind-card");

const zoomInBtn = document.getElementById("mindZoomIn");
const zoomOutBtn = document.getElementById("mindZoomOut");
const zoomFitBtn = document.getElementById("mindZoomFit");
const zoomLabel = document.getElementById("mindZoomLabel");

const progressFill = document.getElementById("mindProgressFill");
const progressText = document.getElementById("mindProgressText");
const progressPercent = document.getElementById("mindProgressPercent");

const detailEmpty = document.getElementById("mindDetailEmpty");
const detailBody = document.getElementById("mindDetailBody");
const detailIcon = document.getElementById("mindDetailIcon");
const detailTitle = document.getElementById("mindDetailTitle");
const detailDesc = document.getElementById("mindDetailDesc");
const detailStatusBtns = document.querySelectorAll(".mind-status-btn");
const detailChecklist = document.getElementById("mindChecklist");
const detailNotes = document.getElementById("mindDetailNotes");

const MIND_WORLD = { width: 1600, height: 700 };
const STORAGE_PREFIX = "cn-mind-";
const STATUS = { TODO: "todo", DOING: "doing", DONE: "done" };
const STATUS_LABEL = { todo: "Belum mulai", doing: "Sedang dikerjakan", done: "Selesai" };
const STATUS_EMOJI = { todo: "⚪", doing: "🟡", done: "✅" };
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 1.4;

const mindTemplates = {
  webdev: {
    id: "webdev",
    title: "Web Developer / RPL",
    nodes: [
      { id: "start", label: "Lulus SMK RPL", x: 80, y: 280, accent: true, icon: "🎓",
        desc: "Titik awal perjalananmu. Pastikan dasar pemrograman (HTML, CSS, JS) sudah dipahami.",
        checklist: ["Rapikan nilai & sertifikat sekolah", "Tentukan minat: frontend, backend, atau fullstack"] },
      { id: "kuliah", label: "Lanjut kuliah?", x: 340, y: 280, icon: "🤔",
        desc: "Ambil keputusan: lanjut kuliah untuk gelar formal, atau langsung asah skill lewat jalur mandiri.",
        checklist: ["Diskusi dengan orang tua & guru BK", "Hitung biaya dan peluang beasiswa"] },
      { id: "kuliah-ya", label: "Ya, kuliah", x: 560, y: 165, compact: true, icon: "📚",
        desc: "Pilih jalur pendidikan tinggi di bidang informatika / RPL.",
        checklist: ["Cari kampus & jurusan yang relevan"] },
      { id: "kuliah-tidak", label: "Tidak dulu", x: 560, y: 395, compact: true, icon: "🚀",
        desc: "Fokus membangun skill & portofolio secara mandiri.",
        checklist: ["Susun jadwal belajar mandiri"] },
      { id: "ambil-pt", label: "Daftar PTN / PTS", x: 780, y: 165, icon: "🏛️",
        desc: "Ikuti seleksi masuk perguruan tinggi sesuai jalur yang tersedia.",
        checklist: ["Siapkan berkas pendaftaran", "Latihan soal tes masuk"] },
      { id: "sertif", label: "Sertifikasi / Bootcamp", x: 780, y: 395, icon: "📜",
        desc: "Ikuti pelatihan intensif & sertifikasi untuk mempercepat keahlian.",
        checklist: ["Pilih bootcamp/kursus terpercaya", "Selesaikan minimal 1 proyek nyata"] },
      { id: "ptn", label: "Jalur SNBP / SNBT", x: 1040, y: 130, icon: "📝",
        desc: "Manfaatkan jalur prestasi (SNBP) atau tes (SNBT) untuk PTN.",
        checklist: ["Pantau jadwal pendaftaran resmi"] },
      { id: "pts", label: "Jalur prestasi PTS", x: 1040, y: 230, icon: "🏅",
        desc: "Daftar di PTS, manfaatkan jalur prestasi/beasiswa bila ada.",
        checklist: ["Bandingkan akreditasi & biaya"] },
      { id: "lomba", label: "Ikut lomba web developer", x: 1040, y: 395, icon: "🏆",
        desc: "Asah kemampuan & bangun reputasi lewat kompetisi.",
        checklist: ["Cari info lomba (nasional/online)", "Bentuk tim atau ikut solo"] },
      { id: "apply", label: "Melamar kerja sesuai bidang", x: 1340, y: 260, accent: true, icon: "💼",
        desc: "Tujuan akhir tahap ini: diterima kerja sebagai developer.",
        checklist: ["Buat CV & portofolio online", "Latihan wawancara teknis"] }
    ],
    edges: [
      ["start", "kuliah"], ["kuliah", "kuliah-ya"], ["kuliah", "kuliah-tidak"],
      ["kuliah-ya", "ambil-pt"], ["ambil-pt", "ptn"], ["ambil-pt", "pts"],
      ["kuliah-tidak", "sertif"], ["sertif", "lomba"], ["lomba", "apply"],
      ["ptn", "apply"], ["pts", "apply"]
    ]
  },
  design: {
    id: "design",
    title: "Desain & UI/UX",
    nodes: [
      { id: "start", label: "Lulus SMK DKV / RPL", x: 80, y: 260, accent: true, icon: "🎓",
        desc: "Mulai dari kemampuan dasar desain visual dan kreativitas.",
        checklist: ["Kumpulkan karya terbaikmu", "Kuasai 1 tool utama (Figma/Adobe)"] },
      { id: "portfolio", label: "Bangun portofolio desain", x: 360, y: 175, icon: "🎨",
        desc: "Tampilkan karya di Dribbble / Behance / website pribadi.",
        checklist: ["Pilih 5–8 karya terbaik", "Buat studi kasus singkat tiap karya"] },
      { id: "freelance", label: "Coba freelance kecil", x: 360, y: 360, icon: "💡",
        desc: "Ambil proyek kecil: poster, logo, atau UI sederhana.",
        checklist: ["Daftar di platform freelance", "Tentukan tarif yang wajar"] },
      { id: "kuliah", label: "Kuliah desain / informatika", x: 680, y: 175, icon: "🏛️",
        desc: "Pertimbangkan pendidikan formal untuk memperdalam teori desain.",
        checklist: ["Cari jurusan DKV/Informatika"] },
      { id: "bootcamp", label: "Bootcamp UI/UX intensif", x: 680, y: 360, icon: "📜",
        desc: "Ikuti kelas UI/UX intensif untuk skill industri.",
        checklist: ["Pelajari riset pengguna & prototyping"] },
      { id: "intern", label: "Magang UI/UX", x: 1000, y: 250, icon: "🧰",
        desc: "Dapatkan pengalaman nyata di tim produk.",
        checklist: ["Lamar program magang", "Bangun relasi profesional"] },
      { id: "junior", label: "Junior UI/UX Designer", x: 1320, y: 250, accent: true, icon: "💼",
        desc: "Tujuan tahap ini: bekerja sebagai desainer UI/UX.",
        checklist: ["Perkuat portofolio dengan proyek tim", "Pelajari design system"] }
    ],
    edges: [
      ["start", "portfolio"], ["start", "freelance"], ["portfolio", "kuliah"],
      ["portfolio", "bootcamp"], ["freelance", "bootcamp"], ["kuliah", "intern"],
      ["bootcamp", "intern"], ["intern", "junior"]
    ]
  },
  network: {
    id: "network",
    title: "Jaringan & Cybersecurity",
    nodes: [
      { id: "start", label: "Lulus SMK TKJ / RPL", x: 80, y: 260, accent: true, icon: "🎓",
        desc: "Pondasi: paham konsep jaringan dasar & sistem operasi.",
        checklist: ["Kuasai dasar IP & subnetting", "Biasakan pakai Linux"] },
      { id: "ccna", label: "Sertifikasi jaringan (CCNA/Mikrotik)", x: 360, y: 160, icon: "📜",
        desc: "Ambil sertifikasi yang diakui industri jaringan.",
        checklist: ["Pilih jalur CCNA / MTCNA", "Ikuti pelatihan & ujian"] },
      { id: "lab", label: "Latihan lab jaringan", x: 360, y: 360, icon: "🧪",
        desc: "Praktik langsung membangun & mengelola jaringan.",
        checklist: ["Gunakan Cisco Packet Tracer / GNS3", "Dokumentasikan tiap latihan"] },
      { id: "network-tech", label: "Network Technician", x: 720, y: 160, icon: "🔧",
        desc: "Mulai karir mengelola perangkat & jaringan.",
        checklist: ["Lamar posisi teknisi jaringan"] },
      { id: "soc", label: "Komunitas keamanan siber", x: 720, y: 360, icon: "🛡️",
        desc: "Aktif di komunitas & event keamanan siber.",
        checklist: ["Ikut CTF / webinar keamanan", "Pelajari dasar ethical hacking"] },
      { id: "cyber-analyst", label: "Cybersecurity Analyst / SOC", x: 1080, y: 250, accent: true, icon: "💼",
        desc: "Tujuan: menjadi analis keamanan siber.",
        checklist: ["Pelajari tools SIEM", "Ambil sertifikasi keamanan (mis. Security+)"] }
    ],
    edges: [
      ["start", "ccna"], ["start", "lab"], ["ccna", "network-tech"],
      ["lab", "network-tech"], ["network-tech", "soc"], ["soc", "cyber-analyst"]
    ]
  },
  finance: {
    id: "finance",
    title: "Akuntansi & Keuangan",
    nodes: [
      { id: "start", label: "Lulus SMK AKL", x: 80, y: 260, accent: true, icon: "🎓",
        desc: "Dasar kuat di pembukuan dan ketelitian angka.",
        checklist: ["Kuasai siklus akuntansi", "Mahir Excel/spreadsheet"] },
      { id: "intern", label: "Magang / PKL akuntansi", x: 360, y: 160, icon: "🧰",
        desc: "Pengalaman nyata di kantor akuntan / perusahaan.",
        checklist: ["Lamar magang", "Pelajari software akuntansi"] },
      { id: "cert", label: "Sertifikasi / Brevet pajak", x: 360, y: 360, icon: "📜",
        desc: "Tingkatkan nilai jual dengan sertifikasi profesi.",
        checklist: ["Ikut brevet pajak A/B", "Sertifikasi teknisi akuntansi"] },
      { id: "staff", label: "Accounting Staff", x: 720, y: 160, icon: "🧮",
        desc: "Mulai bekerja sebagai staf akuntansi.",
        checklist: ["Lamar posisi accounting staff"] },
      { id: "tax", label: "Spesialis pajak (Tax & Payroll)", x: 720, y: 360, icon: "📊",
        desc: "Spesialisasi di bidang pajak & penggajian.",
        checklist: ["Perdalam regulasi perpajakan"] },
      { id: "senior", label: "Senior Accounting / Tax Officer", x: 1080, y: 260, accent: true, icon: "💼",
        desc: "Tujuan: posisi senior di bidang keuangan.",
        checklist: ["Bangun rekam jejak & kepemimpinan", "Pertimbangkan sertifikasi lanjutan"] }
    ],
    edges: [
      ["start", "intern"], ["start", "cert"], ["intern", "staff"],
      ["cert", "staff"], ["staff", "tax"], ["tax", "senior"]
    ]
  },
  business: {
    id: "business",
    title: "Bisnis & Pemasaran Digital",
    nodes: [
      { id: "start", label: "Lulus SMK BDP", x: 80, y: 260, accent: true, icon: "🎓",
        desc: "Modal awal: paham dasar bisnis, komunikasi, dan penjualan.",
        checklist: ["Asah kemampuan komunikasi", "Pahami dasar pemasaran"] },
      { id: "sosmed", label: "Kelola media sosial / konten", x: 360, y: 160, icon: "📱",
        desc: "Belajar membuat konten & mengelola media sosial.",
        checklist: ["Buat akun konten sendiri", "Pelajari tren & algoritma"] },
      { id: "jualan", label: "Coba jualan online", x: 360, y: 360, icon: "🛒",
        desc: "Praktik langsung berjualan di marketplace / sosial commerce.",
        checklist: ["Tentukan produk", "Pelajari foto & copywriting produk"] },
      { id: "skill", label: "Kuasai digital marketing", x: 720, y: 160, icon: "📈",
        desc: "Pelajari SEO, iklan, dan analitik pemasaran.",
        checklist: ["Ikut kursus digital marketing", "Coba kelola 1 kampanye iklan"] },
      { id: "intern", label: "Magang marketing / sales", x: 720, y: 360, icon: "🧰",
        desc: "Dapatkan pengalaman di tim pemasaran.",
        checklist: ["Lamar magang marketing"] },
      { id: "specialist", label: "Digital Marketing Specialist", x: 1080, y: 260, accent: true, icon: "💼",
        desc: "Tujuan: menjadi spesialis pemasaran digital.",
        checklist: ["Bangun portofolio kampanye", "Pelajari data & analitik lanjutan"] }
    ],
    edges: [
      ["start", "sosmed"], ["start", "jualan"], ["sosmed", "skill"],
      ["jualan", "skill"], ["skill", "intern"], ["intern", "specialist"]
    ]
  }
};

let mindState = {
  templateKey: "webdev",
  nodes: [],
  edges: [],
  focusedNodeId: null,
  zoom: 1,
  stagePanning: { active: false, pointerId: null, startX: 0, startY: 0, startScrollLeft: 0, startScrollTop: 0 }
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/* ----------------------------- Persistensi ----------------------------- */
function storageKey(templateKey) {
  return STORAGE_PREFIX + templateKey;
}

function loadSaved(templateKey) {
  try {
    const raw = localStorage.getItem(storageKey(templateKey));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState() {
  try {
    const data = { nodes: {} };
    for (const n of mindState.nodes) {
      data.nodes[n.id] = {
        status: n.status,
        checks: n.checks,
        notes: n.notes || "",
        x: Math.round(n.x),
        y: Math.round(n.y)
      };
    }
    localStorage.setItem(storageKey(mindState.templateKey), JSON.stringify(data));
  } catch {
    /* abaikan bila storage penuh/diblokir */
  }
}

/* ----------------------------- Partikel latar ----------------------------- */
function initParticles() {
  if (!particleCanvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = particleCanvas.getContext("2d");
  if (!ctx) return;
  const dots = [];
  let width = 0;
  let height = 0;
  function resize() {
    width = particleCanvas.width = window.innerWidth * devicePixelRatio;
    height = particleCanvas.height = window.innerHeight * devicePixelRatio;
    particleCanvas.style.width = `${window.innerWidth}px`;
    particleCanvas.style.height = `${window.innerHeight}px`;
    dots.length = 0;
    const count = Math.min(45, Math.floor((window.innerWidth * window.innerHeight) / 26000));
    for (let i = 0; i < count; i += 1) {
      dots.push({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
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

/* ----------------------------- Bangun & render ----------------------------- */
function buildMindMapFromTemplate(templateKey, options = {}) {
  const template = mindTemplates[templateKey] || mindTemplates.webdev;
  const saved = options.fresh ? {} : loadSaved(templateKey);
  const savedNodes = saved.nodes || {};

  mindState.templateKey = templateKey;
  mindState.focusedNodeId = null;
  mindState.nodes = template.nodes.map((n) => {
    const s = savedNodes[n.id] || {};
    const checklist = n.checklist || [];
    let checks = Array.isArray(s.checks) ? s.checks.slice(0, checklist.length) : [];
    while (checks.length < checklist.length) checks.push(false);
    return {
      ...n,
      status: s.status || STATUS.TODO,
      checks,
      notes: typeof s.notes === "string" ? s.notes : "",
      x: typeof s.x === "number" ? s.x : n.x,
      y: typeof s.y === "number" ? s.y : n.y
    };
  });
  mindState.edges = template.edges.map(([from, to]) => ({ from, to }));

  if (mindNodesLayer) mindNodesLayer.innerHTML = "";
  if (mindLinesSvg) mindLinesSvg.innerHTML = "";
  renderMindNodes();
  renderMindEdges();
  updateProgress();
  showDetailEmpty();
}

function statusClass(status) {
  return `mind-node--${status || STATUS.TODO}`;
}

function renderMindNodes() {
  if (!mindNodesLayer) return;
  for (const node of mindState.nodes) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "mind-node " + statusClass(node.status);
    if (node.accent) el.classList.add("mind-node--accent");
    if (node.compact) el.classList.add("mind-node--compact");
    el.dataset.id = node.id;
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;

    const dot = document.createElement("span");
    dot.className = "mind-node__status";
    dot.setAttribute("aria-hidden", "true");

    const inner = document.createElement("span");
    inner.className = "mind-node__inner";
    if (node.icon && !node.compact) {
      const ic = document.createElement("span");
      ic.className = "mind-node__icon";
      ic.setAttribute("aria-hidden", "true");
      ic.textContent = node.icon;
      inner.appendChild(ic);
    }
    const lab = document.createElement("span");
    lab.className = "mind-node__label";
    lab.textContent = node.label;
    inner.appendChild(lab);

    el.appendChild(dot);
    el.appendChild(inner);
    bindMindNodeEvents(el, node);
    mindNodesLayer.appendChild(el);
  }
}

function refreshNodeElement(node) {
  const el = mindNodesLayer.querySelector(`.mind-node[data-id="${node.id}"]`);
  if (!el) return;
  el.classList.remove("mind-node--todo", "mind-node--doing", "mind-node--done");
  el.classList.add(statusClass(node.status));
}

function renderMindEdges() {
  if (!mindLinesSvg) return;
  mindLinesSvg.setAttribute("viewBox", `0 0 ${MIND_WORLD.width} ${MIND_WORLD.height}`);
  mindLinesSvg.innerHTML = "";
  for (const edge of mindState.edges) {
    const from = mindState.nodes.find((n) => n.id === edge.from);
    const to = mindState.nodes.find((n) => n.id === edge.to);
    if (!from || !to) continue;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.classList.add("mind-edge");
    if (from.status === STATUS.DONE) line.classList.add("mind-edge--done");
    const sx = from.x + 110;
    const sy = from.y + 30;
    const tx = to.x;
    const ty = to.y + 30;
    const mx = (sx + tx) / 2;
    const my = (sy + ty) / 2;
    const dx = tx - sx;
    const dy = ty - sy;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const offset = Math.min(90, Math.max(40, length * 0.18));
    const cx = mx + nx * offset;
    const cy = my + ny * offset;
    line.setAttribute("d", `M ${sx} ${sy} Q ${cx} ${cy} ${tx} ${ty}`);
    mindLinesSvg.appendChild(line);
  }
}

/* ----------------------------- Interaksi node ----------------------------- */
function bindMindNodeEvents(el, node) {
  let dragActive = false;
  let moved = false;
  let startScreenX = 0;
  let startScreenY = 0;
  let startNodeX = 0;
  let startNodeY = 0;

  const startPointer = (event) => {
    event.preventDefault();
    dragActive = true;
    moved = false;
    startScreenX = event.clientX;
    startScreenY = event.clientY;
    startNodeX = node.x;
    startNodeY = node.y;
    el.classList.add("mind-node--dragging");
    try { el.setPointerCapture(event.pointerId); } catch { /* ignore */ }
  };

  const movePointer = (event) => {
    if (!dragActive) return;
    const z = mindState.zoom || 1;
    const dx = (event.clientX - startScreenX) / z;
    const dy = (event.clientY - startScreenY) / z;
    if (Math.hypot(event.clientX - startScreenX, event.clientY - startScreenY) > 4) moved = true;
    node.x = clamp(startNodeX + dx, 0, MIND_WORLD.width - 180);
    node.y = clamp(startNodeY + dy, 20, MIND_WORLD.height - 80);
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    renderMindEdges();
  };

  const endPointer = (event) => {
    if (!dragActive) return;
    dragActive = false;
    el.classList.remove("mind-node--dragging");
    try { el.releasePointerCapture(event.pointerId); } catch { /* ignore */ }
    if (moved) saveState();
  };

  el.addEventListener("pointerdown", startPointer);
  el.addEventListener("pointermove", movePointer);
  el.addEventListener("pointerup", endPointer);
  el.addEventListener("pointercancel", endPointer);

  el.addEventListener("click", () => {
    if (moved) return;
    selectNode(node);
  });
}

function selectNode(node) {
  mindState.focusedNodeId = node.id;
  mindNodesLayer.querySelectorAll(".mind-node--active").forEach((n) => n.classList.remove("mind-node--active"));
  const el = mindNodesLayer.querySelector(`.mind-node[data-id="${node.id}"]`);
  if (el) el.classList.add("mind-node--active");
  renderDetail(node);
}

/* ----------------------------- Panel detail ----------------------------- */
function showDetailEmpty() {
  if (detailEmpty) detailEmpty.hidden = false;
  if (detailBody) detailBody.hidden = true;
}

function renderDetail(node) {
  if (!detailBody) return;
  if (detailEmpty) detailEmpty.hidden = true;
  detailBody.hidden = false;

  if (detailIcon) detailIcon.textContent = node.icon || "📍";
  if (detailTitle) detailTitle.textContent = node.label;
  if (detailDesc) detailDesc.textContent = node.desc || "Langkah dalam roadmap karirmu.";

  detailStatusBtns.forEach((btn) => {
    const isActive = btn.dataset.status === node.status;
    btn.classList.toggle("mind-status-btn--active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  if (detailChecklist) {
    detailChecklist.innerHTML = "";
    const items = node.checklist || [];
    if (items.length === 0) {
      const li = document.createElement("li");
      li.className = "mind-check__empty";
      li.textContent = "Tidak ada saran aksi untuk langkah ini.";
      detailChecklist.appendChild(li);
    } else {
      items.forEach((text, idx) => {
        const li = document.createElement("li");
        const label = document.createElement("label");
        label.className = "mind-check";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = Boolean(node.checks[idx]);
        cb.addEventListener("change", () => {
          node.checks[idx] = cb.checked;
          label.classList.toggle("mind-check--done", cb.checked);
          saveState();
        });
        const span = document.createElement("span");
        span.textContent = text;
        label.classList.toggle("mind-check--done", cb.checked);
        label.appendChild(cb);
        label.appendChild(span);
        li.appendChild(label);
        detailChecklist.appendChild(li);
      });
    }
  }

  if (detailNotes) {
    detailNotes.value = node.notes || "";
    detailNotes.oninput = () => {
      node.notes = detailNotes.value;
      saveState();
    };
  }
}

function getFocusedNode() {
  return mindState.nodes.find((n) => n.id === mindState.focusedNodeId) || null;
}

function setStatus(status) {
  const node = getFocusedNode();
  if (!node) return;
  node.status = status;
  refreshNodeElement(node);
  renderMindEdges();
  updateProgress();
  saveState();
  detailStatusBtns.forEach((btn) => {
    const isActive = btn.dataset.status === status;
    btn.classList.toggle("mind-status-btn--active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
  if (status === STATUS.DONE) {
    const el = mindNodesLayer.querySelector(`.mind-node[data-id="${node.id}"]`);
    if (el) {
      el.classList.remove("mind-node--celebrate");
      void el.offsetWidth;
      el.classList.add("mind-node--celebrate");
    }
  }
}

/* ----------------------------- Progress ----------------------------- */
function updateProgress() {
  const total = mindState.nodes.length || 1;
  const done = mindState.nodes.filter((n) => n.status === STATUS.DONE).length;
  const pct = Math.round((done / total) * 100);
  if (progressFill) progressFill.style.width = `${pct}%`;
  if (progressPercent) progressPercent.textContent = `${pct}%`;
  if (progressText) progressText.textContent = `${done} dari ${total} langkah selesai`;
}

/* ----------------------------- Zoom ----------------------------- */
function applyZoom() {
  if (!mindStageInner) return;
  const z = mindState.zoom;
  mindStageInner.style.transform = `scale(${z})`;
  mindStageInner.style.transformOrigin = "0 0";
  mindStageInner.style.width = `${MIND_WORLD.width * z}px`;
  mindStageInner.style.height = `${MIND_WORLD.height * z}px`;
  if (zoomLabel) zoomLabel.textContent = `${Math.round(z * 100)}%`;
}

function setZoom(z) {
  mindState.zoom = clamp(Number(z.toFixed(2)), ZOOM_MIN, ZOOM_MAX);
  applyZoom();
}

function fitZoom() {
  if (!mindStage) return;
  const available = mindStage.clientWidth - 24;
  const z = clamp(available / MIND_WORLD.width, ZOOM_MIN, ZOOM_MAX);
  setZoom(z);
  mindStage.scrollLeft = 0;
  mindStage.scrollTop = 0;
}

/* ----------------------------- Ekspor rencana ----------------------------- */
function buildPlanText() {
  const template = mindTemplates[mindState.templateKey];
  const lines = [];
  lines.push(`RENCANA KARIR — ${template ? template.title : mindState.templateKey}`);
  lines.push(`Tanggal: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`);
  const done = mindState.nodes.filter((n) => n.status === STATUS.DONE).length;
  lines.push(`Progress: ${done}/${mindState.nodes.length} langkah selesai`);
  lines.push("");
  mindState.nodes.forEach((n, i) => {
    lines.push(`${i + 1}. ${STATUS_EMOJI[n.status]} ${n.label}  [${STATUS_LABEL[n.status]}]`);
    if (n.desc) lines.push(`   ${n.desc}`);
    const checks = (n.checklist || []).map((c, idx) => `   ${n.checks[idx] ? "[x]" : "[ ]"} ${c}`);
    if (checks.length) lines.push(...checks);
    if (n.notes && n.notes.trim()) lines.push(`   Catatan: ${n.notes.trim()}`);
    lines.push("");
  });
  return lines.join("\n");
}

function exportPlan() {
  const text = buildPlanText();
  const fileName = `rencana-karir-${mindState.templateKey}.txt`;
  let copied = false;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {}).catch(() => {});
    copied = true;
  }
  try {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch {
    /* ignore */
  }
  showToast(copied ? "Rencana disalin & diunduh (.txt) ✓" : "Rencana diunduh sebagai .txt ✓");
}

/* ----------------------------- Toast ----------------------------- */
let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById("mindToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "mindToast";
    toast.className = "mind-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("mind-toast--show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("mind-toast--show"), 2600);
}

/* ----------------------------- Toolbar & init ----------------------------- */
function setupToolbar() {
  if (mindTemplateSelect) {
    mindTemplateSelect.addEventListener("change", () => buildMindMapFromTemplate(mindTemplateSelect.value));
  }
  if (resetMindMapBtn) {
    resetMindMapBtn.addEventListener("click", () => {
      const template = mindTemplates[mindState.templateKey];
      if (!template) return;
      template.nodes.forEach((tn) => {
        const node = mindState.nodes.find((n) => n.id === tn.id);
        if (node) {
          node.x = tn.x;
          node.y = tn.y;
          const el = mindNodesLayer.querySelector(`.mind-node[data-id="${node.id}"]`);
          if (el) {
            el.style.left = `${node.x}px`;
            el.style.top = `${node.y}px`;
          }
        }
      });
      renderMindEdges();
      saveState();
      setZoom(1);
      showToast("Posisi mind map dikembalikan ✓");
    });
  }
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener("click", () => {
      const ok = window.confirm("Hapus semua status, checklist, dan catatan untuk jalur ini?");
      if (!ok) return;
      mindState.nodes.forEach((n) => {
        n.status = STATUS.TODO;
        n.checks = (n.checklist || []).map(() => false);
        n.notes = "";
        refreshNodeElement(n);
      });
      renderMindEdges();
      updateProgress();
      saveState();
      const focused = getFocusedNode();
      if (focused) renderDetail(focused);
      showToast("Progress jalur ini direset ✓");
    });
  }
  if (exportPlanBtn) exportPlanBtn.addEventListener("click", exportPlan);

  if (zoomInBtn) zoomInBtn.addEventListener("click", () => setZoom(mindState.zoom + 0.1));
  if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => setZoom(mindState.zoom - 0.1));
  if (zoomFitBtn) zoomFitBtn.addEventListener("click", fitZoom);

  detailStatusBtns.forEach((btn) => {
    btn.addEventListener("click", () => setStatus(btn.dataset.status));
  });
}

function setupStagePan() {
  if (!mindStage) return;
  mindStage.addEventListener("pointerdown", (event) => {
    const targetIsNode = event.target instanceof Element && Boolean(event.target.closest(".mind-node"));
    if (targetIsNode) return;
    mindState.stagePanning.active = true;
    mindState.stagePanning.pointerId = event.pointerId;
    mindState.stagePanning.startX = event.clientX;
    mindState.stagePanning.startY = event.clientY;
    mindState.stagePanning.startScrollLeft = mindStage.scrollLeft;
    mindState.stagePanning.startScrollTop = mindStage.scrollTop;
    mindStage.classList.add("mind-stage--grabbing");
    try { mindStage.setPointerCapture(event.pointerId); } catch { /* ignore */ }
  });
  mindStage.addEventListener("pointermove", (event) => {
    if (!mindState.stagePanning.active || mindState.stagePanning.pointerId !== event.pointerId) return;
    const dx = event.clientX - mindState.stagePanning.startX;
    const dy = event.clientY - mindState.stagePanning.startY;
    mindStage.scrollLeft = mindState.stagePanning.startScrollLeft - dx;
    mindStage.scrollTop = mindState.stagePanning.startScrollTop - dy;
  });
  const endPan = (event) => {
    if (!mindState.stagePanning.active || mindState.stagePanning.pointerId !== event.pointerId) return;
    mindState.stagePanning.active = false;
    mindState.stagePanning.pointerId = null;
    mindStage.classList.remove("mind-stage--grabbing");
    try { mindStage.releasePointerCapture(event.pointerId); } catch { /* ignore */ }
  };
  mindStage.addEventListener("pointerup", endPan);
  mindStage.addEventListener("pointercancel", endPan);

  mindStage.addEventListener("wheel", (event) => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    setZoom(mindState.zoom + (event.deltaY < 0 ? 0.1 : -0.1));
  }, { passive: false });
}

function initMindPage() {
  initParticles();
  setupToolbar();
  setupStagePan();
  const defaultTemplate = (mindTemplateSelect && mindTemplateSelect.value) || "webdev";
  buildMindMapFromTemplate(defaultTemplate);
  applyZoom();
}

if (mindStage && mindLinesSvg && mindNodesLayer) {
  window.addEventListener("load", initMindPage);
}

/* ----------------------------- Fullscreen ----------------------------- */
function isFullscreenActive() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}
function enterFullscreen(element) {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
}
function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}
if (mindFullscreenToggle && mindCard) {
  mindFullscreenToggle.addEventListener("click", () => {
    if (!isFullscreenActive()) enterFullscreen(mindCard);
    else exitFullscreen();
  });
  const syncMindFullscreen = () => {
    const active = isFullscreenActive();
    mindCard.classList.toggle("mind-card--fullscreen", active);
    mindFullscreenToggle.textContent = active ? "✖ Keluar layar penuh" : "⛶ Layar penuh";
  };
  document.addEventListener("fullscreenchange", syncMindFullscreen);
  document.addEventListener("webkitfullscreenchange", syncMindFullscreen);
  document.addEventListener("msfullscreenchange", syncMindFullscreen);
}
