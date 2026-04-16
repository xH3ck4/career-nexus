const CAREER_DATA = [
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
    id: "qa-engineer",
    name: "QA Engineer",
    level: "Menengah",
    salary: "Rp6.000.000 - Rp12.000.000 / bulan",
    major: ["RPL", "TKJ"],
    hobbies: ["testing", "analisis", "detail", "problem solving"],
    skills: "Testing manual, automation, test case",
    education: "SMK + sertifikasi quality assurance",
    profile: "Menjaga kualitas perangkat lunak melalui pengujian manual dan otomatis.",
    track: "Junior QA -> QA Engineer -> Senior QA -> Test Lead"
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
    id: "cloud-engineer",
    name: "Cloud Engineer",
    level: "Lanjutan",
    salary: "Rp10.000.000 - Rp22.000.000 / bulan",
    major: ["TKJ", "RPL"],
    hobbies: ["server", "otomasi", "cloud", "devops"],
    skills: "AWS/GCP, Linux, CI/CD, Docker",
    education: "SMK + sertifikasi cloud associate",
    profile: "Membangun infrastruktur cloud yang aman, scalable, dan efisien.",
    track: "Network/Backend -> Cloud Engineer -> Senior Cloud -> Cloud Architect"
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
    id: "motion-designer",
    name: "Motion Graphic Designer",
    level: "Menengah",
    salary: "Rp6.000.000 - Rp12.000.000 / bulan",
    major: ["DKV"],
    hobbies: ["animasi", "video", "desain", "storytelling"],
    skills: "After Effects, video compositing, motion",
    education: "SMK DKV + sertifikasi motion",
    profile: "Menciptakan animasi visual untuk konten digital, iklan, dan UI motion.",
    track: "Graphic Designer -> Motion Designer -> Senior Motion -> Creative Lead"
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
    id: "content-strategist",
    name: "Content Strategist",
    level: "Menengah",
    salary: "Rp5.500.000 - Rp11.000.000 / bulan",
    major: ["BDP", "DKV"],
    hobbies: ["menulis", "konten", "brand", "komunikasi"],
    skills: "Content planning, copywriting, brand voice",
    education: "SMK + portofolio konten",
    profile: "Menyusun strategi konten yang konsisten untuk brand dan audiens.",
    track: "Content Creator -> Content Strategist -> Brand Strategist"
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
  },
  {
    id: "tax-admin",
    name: "Tax & Payroll Admin",
    level: "Menengah",
    salary: "Rp5.000.000 - Rp10.000.000 / bulan",
    major: ["AKL"],
    hobbies: ["aturan", "angka", "administrasi", "detail"],
    skills: "Perpajakan dasar, payroll, compliance",
    education: "SMK AKL + brevet pajak dasar",
    profile: "Mengurus penggajian dan kewajiban pajak perusahaan secara akurat.",
    track: "Accounting Staff -> Tax Admin -> Tax Officer -> Tax Specialist"
  },
  {
    id: "tech-lead",
    name: "Tech Lead",
    level: "Lanjutan",
    salary: "Rp15.000.000 - Rp30.000.000 / bulan",
    major: ["RPL", "TKJ"],
    hobbies: ["leadership", "coding", "arsitektur", "problem solving"],
    skills: "System design, leadership, mentoring",
    education: "Pengalaman industri + sertifikasi lanjutan",
    profile: "Memimpin tim teknis, menetapkan standar coding, dan keputusan arsitektur.",
    track: "Frontend/Backend Senior -> Tech Lead -> Engineering Manager"
  },
  {
    id: "product-designer",
    name: "Product Designer",
    level: "Lanjutan",
    salary: "Rp12.000.000 - Rp24.000.000 / bulan",
    major: ["DKV", "RPL"],
    hobbies: ["desain", "produk", "riset", "kolaborasi"],
    skills: "UX strategy, prototyping, design system",
    education: "Pengalaman UI/UX + studi produk",
    profile: "Menyatukan kebutuhan bisnis, pengguna, dan visual untuk produk digital.",
    track: "UI/UX Designer -> Product Designer -> Lead Product Designer"
  }
];

const EDGES = [
  ["junior-web", "frontend-dev"],
  ["junior-web", "backend-dev"],
  ["junior-web", "qa-engineer"],
  ["frontend-dev", "tech-lead"],
  ["backend-dev", "tech-lead"],
  ["backend-dev", "cyber-analyst"],
  ["backend-dev", "cloud-engineer"],
  ["network-tech", "cyber-analyst"],
  ["network-tech", "cloud-engineer"],
  ["qa-engineer", "tech-lead"],
  ["graphic-designer", "uiux-designer"],
  ["graphic-designer", "motion-designer"],
  ["uiux-designer", "product-designer"],
  ["frontend-dev", "uiux-designer"],
  ["motion-designer", "content-strategist"],
  ["graphic-designer", "digital-marketer"],
  ["content-strategist", "digital-marketer"],
  ["digital-marketer", "product-designer"],
  ["accounting-staff", "tax-admin"],
  ["accounting-staff", "digital-marketer"],
  ["tax-admin", "content-strategist"]
];

const svg = document.getElementById("careerGraph");
const tooltip = document.getElementById("tooltip");
const studentForm = document.getElementById("studentForm");
const resultCard = document.getElementById("result");
const resultSummary = document.getElementById("resultSummary");
const careerList = document.getElementById("careerList");
const submitBtn = document.getElementById("submitBtn");
const graphStage = document.getElementById("graphStage");
const graphCard = document.getElementById("graphCard");
const resetNodesBtn = document.getElementById("resetNodes");
const focusRecommendedBtn = document.getElementById("focusRecommended");
const toggleFullscreenBtn = document.getElementById("toggleFullscreen");
const particleCanvas = document.getElementById("particleCanvas");
const stepItems = document.querySelectorAll(".steps__item");
const mascot = document.getElementById("cartoonMascot");
const mascotSpeech = document.getElementById("mascotSpeech");
const mascotPupils = document.querySelectorAll(".pupil");
const graphInfoPanel = document.getElementById("graphInfoPanel");
const graphInfoContent = document.getElementById("graphInfoContent");
const graphInfoPlaceholder = document.getElementById("graphInfoPlaceholder");
const graphAnalyzeOverlay = document.getElementById("graphAnalyzeOverlay");
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

const WORLD_WIDTH = 1800;
const WORLD_HEIGHT = 1200;
const HUB_CENTER = { x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 };
const FORBIDDEN_ZONE = { left: 860, right: 940, top: 560, bottom: 640 };

function createOrbitPositions(nodes) {
  const orderedIds = [
    "junior-web",
    "frontend-dev",
    "backend-dev",
    "qa-engineer",
    "tech-lead",
    "cloud-engineer",
    "network-tech",
    "cyber-analyst",
    "accounting-staff",
    "tax-admin",
    "content-strategist",
    "digital-marketer",
    "graphic-designer",
    "motion-designer",
    "uiux-designer",
    "product-designer"
  ];
  const orderedNodes = orderedIds.map((id) => nodes.find((n) => n.id === id)).filter(Boolean);
  const positions = {};
  const total = orderedNodes.length;
  orderedNodes.forEach((node, index) => {
    const angle = ((Math.PI * 2) / total) * index - Math.PI / 2;
    const ringX = index % 2 === 0 ? 360 : 420;
    const ringY = index % 2 === 0 ? 250 : 300;
    positions[node.id] = {
      x: HUB_CENTER.x + Math.cos(angle) * ringX,
      y: HUB_CENTER.y + Math.sin(angle) * ringY
    };
  });
  return positions;
}

const INITIAL_POSITIONS = createOrbitPositions(CAREER_DATA);

const state = {
  nodes: CAREER_DATA.map((career) => ({ ...career, ...INITIAL_POSITIONS[career.id] })),
  selectedCareerIds: [],
  activeDragId: null,
  activeNodePointerId: null,
  camera: {
    x: (WORLD_WIDTH - 900) / 2,
    y: (WORLD_HEIGHT - 560) / 2,
    scale: 1
  },
  isPanning: false,
  panPointerId: null,
  panStartClientX: 0,
  panStartClientY: 0,
  panStartCameraX: 0,
  panStartCameraY: 0,
  pinchStartDistance: 0,
  pinchStartScale: 1,
  activeStagePointers: new Map(),
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
};

const edgeEls = [];
const hubEdgeEls = [];
const nodeEls = new Map();
const adjacencyMap = new Map();

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getNodeLabelLines(node) {
  const words = node.name.split(" ");
  let line1 = node.name;
  if (node.name.length > 18 && words.length >= 2) {
    line1 = `${words[0]} ${words[1]}`;
    if (line1.length > 18) {
      line1 = `${line1.slice(0, 16)}…`;
    }
  }
  return { line1, line2: node.level };
}

function setStepsPhase(phase) {
  stepItems.forEach((el, index) => {
    const active = (phase === "form" && index === 0) || (phase === "analyze" && index <= 1) || (phase === "map" && index <= 2);
    el.classList.toggle("steps__item--active", active);
  });
}

function updateEdgeHighlight() {
  const set = new Set(state.selectedCareerIds);
  for (const line of edgeEls) {
    const a = line.dataset.source;
    const b = line.dataset.target;
    const related = set.size > 0 && (set.has(a) || set.has(b));
    line.classList.toggle("edge--related", Boolean(related));
  }
}

function clearInteractiveHighlights() {
  for (const edge of edgeEls) {
    edge.classList.remove("edge--focus");
    edge.classList.remove("edge--muted");
  }
  for (const nodeGroup of nodeEls.values()) {
    nodeGroup.classList.remove("node--focus");
    nodeGroup.classList.remove("node--muted");
  }
}

function highlightConnections(nodeId) {
  const neighbors = adjacencyMap.get(nodeId) || new Set();
  for (const [id, nodeGroup] of nodeEls.entries()) {
    const isSelf = id === nodeId;
    const isNeighbor = neighbors.has(id);
    nodeGroup.classList.toggle("node--focus", isSelf || isNeighbor);
    nodeGroup.classList.toggle("node--muted", !isSelf && !isNeighbor);
  }
  for (const edge of edgeEls) {
    const source = edge.dataset.source;
    const target = edge.dataset.target;
    const focused = source === nodeId || target === nodeId;
    edge.classList.toggle("edge--focus", focused);
    edge.classList.toggle("edge--muted", !focused);
  }
}

function updateHubEdges() {
  for (const old of hubEdgeEls) {
    old.remove();
  }
  hubEdgeEls.length = 0;

  for (const id of state.selectedCareerIds) {
    const node = state.nodes.find((n) => n.id === id);
    if (!node) {
      continue;
    }
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("edge", "edge--hub");
    line.setAttribute("x1", String(HUB_CENTER.x));
    line.setAttribute("y1", String(HUB_CENTER.y));
    line.setAttribute("x2", String(node.x));
    line.setAttribute("y2", String(node.y));
    svg.insertBefore(line, svg.firstChild);
    hubEdgeEls.push(line);
  }
}

function getViewportWorldSize(scale = state.camera.scale) {
  return {
    width: 900 / scale,
    height: 560 / scale
  };
}

function clampCamera() {
  const viewport = getViewportWorldSize();
  const maxX = Math.max(0, WORLD_WIDTH - viewport.width);
  const maxY = Math.max(0, WORLD_HEIGHT - viewport.height);
  state.camera.x = clamp(state.camera.x, 0, maxX);
  state.camera.y = clamp(state.camera.y, 0, maxY);
}

function applyCamera() {
  clampCamera();
  const viewport = getViewportWorldSize();
  svg.setAttribute("viewBox", `${state.camera.x} ${state.camera.y} ${viewport.width} ${viewport.height}`);
}

function screenToWorld(clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  const ratioX = (clientX - rect.left) / rect.width;
  const ratioY = (clientY - rect.top) / rect.height;
  const viewport = getViewportWorldSize();
  return {
    x: state.camera.x + ratioX * viewport.width,
    y: state.camera.y + ratioY * viewport.height
  };
}

function renderGraph() {
  svg.innerHTML = "";
  edgeEls.length = 0;
  nodeEls.clear();

  for (const [sourceId, targetId] of EDGES) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.classList.add("edge");
    line.dataset.source = sourceId;
    line.dataset.target = targetId;
    svg.appendChild(line);
    edgeEls.push(line);
  }

  for (const node of state.nodes) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("node");
    group.dataset.id = node.id;

    const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    glow.classList.add("node-glow");
    glow.setAttribute("r", "58");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", "52");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "0");
    text.setAttribute("y", "0");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    const { line1, line2 } = getNodeLabelLines(node);
    const tspan1 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan1.setAttribute("x", "0");
    tspan1.setAttribute("dy", "-7");
    tspan1.textContent = line1;
    const tspan2 = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan2.setAttribute("x", "0");
    tspan2.setAttribute("dy", "13");
    tspan2.classList.add("node-sub");
    tspan2.textContent = line2;
    text.appendChild(tspan1);
    text.appendChild(tspan2);

    group.appendChild(glow);
    group.appendChild(circle);
    group.appendChild(text);
    svg.appendChild(group);

    nodeEls.set(node.id, group);
    bindNodeEvents(group, node);
  }

  adjacencyMap.clear();
  for (const [a, b] of EDGES) {
    if (!adjacencyMap.has(a)) {
      adjacencyMap.set(a, new Set());
    }
    if (!adjacencyMap.has(b)) {
      adjacencyMap.set(b, new Set());
    }
    adjacencyMap.get(a).add(b);
    adjacencyMap.get(b).add(a);
  }

  updatePositions();
  updateEdgeHighlight();
  applyCamera();
}

function updatePositions() {
  for (const line of edgeEls) {
    const source = state.nodes.find((n) => n.id === line.dataset.source);
    const target = state.nodes.find((n) => n.id === line.dataset.target);
    if (!source || !target) {
      continue;
    }
    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2;
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const length = Math.hypot(dx, dy) || 1;
    const normalX = -dy / length;
    const normalY = dx / length;
    const offset = Math.min(95, Math.max(36, length * 0.16));
    const controlX = midX + normalX * offset;
    const controlY = midY + normalY * offset;
    line.setAttribute("d", `M ${source.x} ${source.y} Q ${controlX} ${controlY} ${target.x} ${target.y}`);
  }

  for (const node of state.nodes) {
    const group = nodeEls.get(node.id);
    if (!group) {
      continue;
    }
    group.setAttribute("transform", `translate(${node.x} ${node.y})`);
    group.classList.toggle("recommended", state.selectedCareerIds.includes(node.id));
  }
  updateEdgeHighlight();
  updateHubEdges();
}

function preventCenterOverlap(nextPoint) {
  const x = nextPoint.x;
  const y = nextPoint.y;
  const inZone = x > FORBIDDEN_ZONE.left && x < FORBIDDEN_ZONE.right && y > FORBIDDEN_ZONE.top && y < FORBIDDEN_ZONE.bottom;
  if (!inZone) {
    return { x, y };
  }
  const cx = HUB_CENTER.x;
  const cy = HUB_CENTER.y;
  const dx = x - cx || 1;
  const dy = y - cy || 1;
  const factorX = dx > 0 ? (FORBIDDEN_ZONE.right - cx) / dx : (FORBIDDEN_ZONE.left - cx) / dx;
  const factorY = dy > 0 ? (FORBIDDEN_ZONE.bottom - cy) / dy : (FORBIDDEN_ZONE.top - cy) / dy;
  const factor = Math.min(Math.abs(factorX), Math.abs(factorY)) * 1.04;
  return {
    x: clamp(cx + dx * factor, 62, WORLD_WIDTH - 62),
    y: clamp(cy + dy * factor, 62, WORLD_HEIGHT - 62)
  };
}

function bindNodeEvents(group, node) {
  let dragMoved = false;
  let dragStartClientX = 0;
  let dragStartClientY = 0;

  group.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    state.activeDragId = node.id;
    state.activeNodePointerId = event.pointerId;
    dragMoved = false;
    dragStartClientX = event.clientX;
    dragStartClientY = event.clientY;
    group.classList.add("is-dragging");
    try {
      group.setPointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
  });

  group.addEventListener("pointermove", (event) => {
    if (state.activeDragId !== node.id) {
      if (!isTouchDevice) {
        updateInfoPanel(node);
      } else {
        moveTooltip(event);
      }
      return;
    }
    const point = screenToWorld(event.clientX, event.clientY);
    const safePoint = preventCenterOverlap({
      x: clamp(point.x, 62, WORLD_WIDTH - 62),
      y: clamp(point.y, 62, WORLD_HEIGHT - 62)
    });
    if (Math.hypot(event.clientX - dragStartClientX, event.clientY - dragStartClientY) > 4) {
      dragMoved = true;
    }
    node.x = safePoint.x;
    node.y = safePoint.y;
    updatePositions();
  });

  const endDrag = (event) => {
    if (state.activeDragId === node.id) {
      state.activeDragId = null;
      state.activeNodePointerId = null;
      group.classList.remove("is-dragging");
      try {
        group.releasePointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    }
  };

  group.addEventListener("pointerup", endDrag);
  group.addEventListener("pointercancel", endDrag);
  group.addEventListener("lostpointercapture", () => {
    state.activeDragId = null;
    state.activeNodePointerId = null;
    group.classList.remove("is-dragging");
  });

  group.addEventListener("click", (event) => {
    event.stopPropagation();
    if (dragMoved) {
      return;
    }
    clearInteractiveHighlights();
    group.classList.add("highlight");
    highlightConnections(node.id);
    showTooltip(event, node);
    updateInfoPanel(node);
    if (graphInfoPanel && window.innerWidth <= 720) {
      graphInfoPanel.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
    }
  });

  if (!isTouchDevice) {
    group.addEventListener("pointerenter", (event) => {
      highlightConnections(node.id);
      group.classList.add("highlight");
      updateInfoPanel(node);
      hideTooltip();
    });

    group.addEventListener("pointerleave", () => {
      group.classList.remove("highlight");
      clearInteractiveHighlights();
    });
  }
}

function updateInfoPanel(node) {
  if (!graphInfoPanel || !graphInfoContent || !graphInfoPlaceholder) {
    return;
  }
  graphInfoPlaceholder.classList.add("hidden");
  graphInfoContent.innerHTML = `
    <div class="graph-info__name">${node.name}</div>
    <div><strong>Level:</strong> ${node.level}</div>
    <div><strong>Perkiraan gaji awal:</strong> ${node.salary}</div>
    <div><strong>Jurusan yang cocok:</strong> ${node.major.join(", ")}</div>
    <div><strong>Skill utama:</strong> ${node.skills}</div>
    <div><strong>Persiapan dari SMK:</strong> ${node.education}</div>
    <div><strong>Profil singkat:</strong> ${node.profile}</div>
    <div><strong>Jenjang karir:</strong> ${node.track}</div>
  `;
}

function showTooltip(event, node) {
  if (!isTouchDevice) {
    if (node) {
      updateInfoPanel(node);
    }
    return;
  }
  tooltip.innerHTML = `
    <div class="title">${node.name}</div>
    <div><strong>Level:</strong> ${node.level}</div>
    <div><strong>Gaji:</strong> ${node.salary}</div>
    <div><strong>Jurusan Cocok:</strong> ${node.major.join(", ")}</div>
    <div><strong>Skill Utama:</strong> ${node.skills}</div>
    <div><strong>Persiapan:</strong> ${node.education}</div>
    <div><strong>Profil:</strong> ${node.profile}</div>
    <div><strong>Jenjang:</strong> ${node.track}</div>
  `;
  tooltip.classList.remove("hidden");
  moveTooltip(event);
}

function moveTooltip(event) {
  const bounds = graphStage.getBoundingClientRect();
  const pad = 12;
  let offsetX = event.clientX - bounds.left + 14;
  let offsetY = event.clientY - bounds.top - 10;
  tooltip.classList.remove("hidden");

  const place = () => {
    const tipRect = tooltip.getBoundingClientRect();
    const relW = tipRect.width || 200;
    const relH = tipRect.height || 120;
    if (offsetX + relW > bounds.width - pad) {
      offsetX = Math.max(pad, bounds.width - relW - pad);
    }
    if (offsetY + relH > bounds.height - pad) {
      offsetY = Math.max(pad, event.clientY - bounds.top - relH - 18);
    }
    tooltip.style.left = `${offsetX}px`;
    tooltip.style.top = `${offsetY}px`;
  };

  place();
  requestAnimationFrame(place);
}

function hideTooltip() {
  tooltip.classList.add("hidden");
}

function isFullscreenActive() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizeText(text) {
  return text.toLowerCase().trim();
}

function getRecommendations(major, hobbyInput) {
  const hobby = normalizeText(hobbyInput);
  const scored = state.nodes.map((career) => {
    let score = 0;
    if (career.major.includes(major)) {
      score += 3;
    }
    for (const keyword of career.hobbies) {
      if (hobby.includes(keyword)) {
        score += 2;
      }
    }
    return { career, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.career);
}

function flashRecommendedNodes() {
  for (const id of state.selectedCareerIds) {
    const group = nodeEls.get(id);
    if (!group) {
      continue;
    }
    group.classList.remove("flash-once");
    void group.offsetWidth;
    group.classList.add("flash-once");
    window.setTimeout(() => group.classList.remove("flash-once"), 650);
  }
}

function runSubmitFlow(studentName, classroom, major, hobby) {
  if (graphAnalyzeOverlay) {
    graphAnalyzeOverlay.classList.add("hidden");
  }
  const recommendations = getRecommendations(major, hobby);
  state.selectedCareerIds = recommendations.map((career) => career.id);
  updatePositions();
  setStepsPhase("map");

  resultCard.classList.remove("hidden");
  careerList.innerHTML = "";

  if (recommendations.length === 0) {
    resultSummary.textContent = `Halo ${studentName} (${classroom}), belum ada karir yang sangat cocok dari data saat ini. Coba isi hobi lebih spesifik.`;
    const li = document.createElement("li");
    li.textContent = "Contoh hobi: coding web, desain UI, jaringan komputer, analisis data.";
    careerList.appendChild(li);
    setMascotSpeech("Hmm, coba isi hobi lebih spesifik ya. Aku siap bantu lagi! 😊");
    return;
  }

  resultSummary.textContent = `Halo ${studentName} (${classroom}), berdasarkan jurusan ${major} dan minat "${hobby}", jalur karir yang direkomendasikan adalah:`;

  for (const career of recommendations) {
    const li = document.createElement("li");
    li.textContent = `${career.name} (${career.level}) | ${career.salary} | Jenjang: ${career.track}`;
    careerList.appendChild(li);
  }

  flashRecommendedNodes();
  focusRecommendedCluster();
  graphCard.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
  setMascotSpeech(`Keren ${studentName}! Aku sudah temukan ${recommendations.length} jalur karir untukmu 🚀`);
}

function setMascotSpeech(text) {
  if (!mascotSpeech) {
    return;
  }
  mascotSpeech.textContent = text;
}

function setupMascotInteractions() {
  if (!mascot || mascotPupils.length === 0) {
    return;
  }

  const moveEyes = (clientX, clientY) => {
    for (const pupil of mascotPupils) {
      const eye = pupil.parentElement;
      if (!eye) {
        continue;
      }
      const rect = eye.getBoundingClientRect();
      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      const maxMove = 5;
      const tx = (dx / distance) * Math.min(maxMove, distance * 0.22);
      const ty = (dy / distance) * Math.min(maxMove, distance * 0.22);
      pupil.style.transform = `translate(${tx}px, ${ty}px)`;
    }
  };

  document.addEventListener("pointermove", (event) => {
    moveEyes(event.clientX, event.clientY);
  });

  mascot.addEventListener("click", () => {
    mascot.classList.remove("mascot-pop");
    void mascot.offsetWidth;
    mascot.classList.add("mascot-pop");
    setMascotSpeech("Hehe! Klik aku lagi kalau mau semangat belajar karir 💫");
  });

  const interactiveTips = [
    "Tips: Hover node untuk lihat info detail profesi 👀",
    "Tips: Drag peta dan zoom untuk eksplor jalur karir 🔍",
    "Tips: Isi hobi spesifik biar rekomendasi makin akurat 🎯"
  ];
  let tipIndex = 0;
  window.setInterval(() => {
    if (!mascotSpeech || !resultCard.classList.contains("hidden")) {
      return;
    }
    tipIndex = (tipIndex + 1) % interactiveTips.length;
    setMascotSpeech(interactiveTips[tipIndex]);
  }, 6000);
}

function focusRecommendedCluster() {
  if (state.selectedCareerIds.length === 0) {
    return;
  }
  const selectedNodes = state.nodes.filter((n) => state.selectedCareerIds.includes(n.id));
  const centerX = selectedNodes.reduce((acc, n) => acc + n.x, 0) / selectedNodes.length;
  const centerY = selectedNodes.reduce((acc, n) => acc + n.y, 0) / selectedNodes.length;
  const viewport = getViewportWorldSize();
  state.camera.x = centerX - viewport.width / 2;
  state.camera.y = centerY - viewport.height / 2;
  applyCamera();
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!studentForm.reportValidity()) {
    return;
  }

  const studentName = document.getElementById("name").value.trim();
  const classroom = document.getElementById("classroom").value.trim();
  const major = document.getElementById("major").value;
  const hobby = document.getElementById("hobby").value.trim();

  setStepsPhase("analyze");
  if (graphAnalyzeOverlay) {
    graphAnalyzeOverlay.classList.remove("hidden");
  }
  submitBtn.disabled = true;
  submitBtn.classList.add("is-loading");

  const delay = prefersReducedMotion() ? 0 : 4000;
  window.setTimeout(() => {
    runSubmitFlow(studentName, classroom, major, hobby);
    submitBtn.disabled = false;
    submitBtn.classList.remove("is-loading");
  }, delay);
});

resetNodesBtn.addEventListener("click", () => {
  for (const node of state.nodes) {
    const pos = INITIAL_POSITIONS[node.id];
    if (pos) {
      node.x = pos.x;
      node.y = pos.y;
    }
  }
  state.camera = {
    x: (WORLD_WIDTH - 900) / 2,
    y: (WORLD_HEIGHT - 560) / 2,
    scale: 1
  };
  updatePositions();
  applyCamera();
});

focusRecommendedBtn.addEventListener("click", () => {
  if (state.selectedCareerIds.length === 0) {
    flashRecommendedNodes();
    return;
  }
  flashRecommendedNodes();
  focusRecommendedCluster();
});

if (toggleFullscreenBtn && graphCard) {
  toggleFullscreenBtn.addEventListener("click", () => {
    if (!isFullscreenActive()) {
      enterFullscreen(graphCard);
    } else {
      exitFullscreen();
    }
  });

  const syncFullscreenState = () => {
    const active = isFullscreenActive();
    graphCard.classList.toggle("graph-card--fullscreen", active);
    if (active) {
      toggleFullscreenBtn.textContent = "✖ Keluar layar penuh";
    } else {
      toggleFullscreenBtn.textContent = "⛶ Layar penuh";
    }
  };

  document.addEventListener("fullscreenchange", syncFullscreenState);
  document.addEventListener("webkitfullscreenchange", syncFullscreenState);
  document.addEventListener("msfullscreenchange", syncFullscreenState);
}

graphStage.addEventListener("pointerdown", (event) => {
  if (state.activeNodePointerId) {
    return;
  }
  hideTooltip();
  state.activeStagePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (state.activeStagePointers.size === 1) {
    state.isPanning = true;
    state.panPointerId = event.pointerId;
    state.panStartClientX = event.clientX;
    state.panStartClientY = event.clientY;
    state.panStartCameraX = state.camera.x;
    state.panStartCameraY = state.camera.y;
    graphStage.classList.add("is-panning");
  } else if (state.activeStagePointers.size === 2) {
    const pointers = [...state.activeStagePointers.values()];
    state.isPanning = false;
    graphStage.classList.remove("is-panning");
    state.pinchStartDistance = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
    state.pinchStartScale = state.camera.scale;
  }

  try {
    graphStage.setPointerCapture(event.pointerId);
  } catch {
    /* ignore */
  }
});

graphStage.addEventListener("pointermove", (event) => {
  if (state.activeStagePointers.has(event.pointerId)) {
    state.activeStagePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  }

  if (state.activeStagePointers.size >= 2) {
    const pointers = [...state.activeStagePointers.values()];
    const distance = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
    if (state.pinchStartDistance > 0) {
      const nextScale = clamp((distance / state.pinchStartDistance) * state.pinchStartScale, 0.72, 1.85);
      const midX = (pointers[0].x + pointers[1].x) / 2;
      const midY = (pointers[0].y + pointers[1].y) / 2;
      const focus = screenToWorld(midX, midY);
      const prevViewport = getViewportWorldSize(state.camera.scale);
      const ratioX = (focus.x - state.camera.x) / prevViewport.width;
      const ratioY = (focus.y - state.camera.y) / prevViewport.height;
      state.camera.scale = nextScale;
      const nextViewport = getViewportWorldSize(nextScale);
      state.camera.x = focus.x - ratioX * nextViewport.width;
      state.camera.y = focus.y - ratioY * nextViewport.height;
      applyCamera();
    }
    return;
  }

  if (!state.isPanning || state.panPointerId !== event.pointerId) {
    return;
  }
  const rect = graphStage.getBoundingClientRect();
  const viewport = getViewportWorldSize();
  const worldPerPxX = viewport.width / rect.width;
  const worldPerPxY = viewport.height / rect.height;
  const dx = (event.clientX - state.panStartClientX) * worldPerPxX;
  const dy = (event.clientY - state.panStartClientY) * worldPerPxY;
  state.camera.x = state.panStartCameraX - dx;
  state.camera.y = state.panStartCameraY - dy;
  applyCamera();
});

function endPanning(event) {
  if (event) {
    state.activeStagePointers.delete(event.pointerId);
  }

  if (state.activeStagePointers.size >= 1) {
    const [pointerId, point] = state.activeStagePointers.entries().next().value;
    state.isPanning = true;
    state.panPointerId = pointerId;
    state.panStartClientX = point.x;
    state.panStartClientY = point.y;
    state.panStartCameraX = state.camera.x;
    state.panStartCameraY = state.camera.y;
    graphStage.classList.add("is-panning");
  } else {
    state.isPanning = false;
    state.panPointerId = null;
    graphStage.classList.remove("is-panning");
  }

  try {
    if (event) {
      graphStage.releasePointerCapture(event.pointerId);
    }
  } catch {
    /* ignore */
  }
}

graphStage.addEventListener("pointerup", endPanning);
graphStage.addEventListener("pointercancel", endPanning);
graphStage.addEventListener("lostpointercapture", () => {
  state.isPanning = false;
  state.panPointerId = null;
  state.activeStagePointers.clear();
  graphStage.classList.remove("is-panning");
});

graphStage.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const zoomFactor = event.deltaY < 0 ? 1.08 : 0.92;
    const nextScale = clamp(state.camera.scale * zoomFactor, 0.72, 1.85);
    if (Math.abs(nextScale - state.camera.scale) < 0.001) {
      return;
    }
    const focus = screenToWorld(event.clientX, event.clientY);
    const prevViewport = getViewportWorldSize(state.camera.scale);
    const ratioX = (focus.x - state.camera.x) / prevViewport.width;
    const ratioY = (focus.y - state.camera.y) / prevViewport.height;
    state.camera.scale = nextScale;
    const nextViewport = getViewportWorldSize(nextScale);
    state.camera.x = focus.x - ratioX * nextViewport.width;
    state.camera.y = focus.y - ratioY * nextViewport.height;
    applyCamera();
  },
  { passive: false }
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideTooltip();
    clearInteractiveHighlights();
  }
});

document.addEventListener("click", (event) => {
  const clickedNode = event.target instanceof Element && Boolean(event.target.closest(".node"));
  const clickedTooltip = event.target instanceof Element && Boolean(event.target.closest("#tooltip"));
  if (!clickedNode && !clickedTooltip) {
    hideTooltip();
    clearInteractiveHighlights();
  }
});

/* --- Parallax halus --- */
const ambientLayer = document.querySelector(".ambient");
let parallaxRaf = 0;
let mx = 0.5;
let my = 0.5;

function applyParallax() {
  parallaxRaf = 0;
  if (prefersReducedMotion() || state.reducedMotion) {
    return;
  }
  const dx = (mx - 0.5) * 2;
  const dy = (my - 0.5) * 2;
  if (ambientLayer) {
    ambientLayer.style.transform = `translate3d(${dx * 14}px, ${dy * 12}px, 0)`;
  }
  if (graphStage) {
    graphStage.style.transform = `perspective(900px) rotateX(${dy * -2.2}deg) rotateY(${dx * 3.4}deg)`;
  }
}

document.addEventListener(
  "pointermove",
  (event) => {
    mx = event.clientX / window.innerWidth;
    my = event.clientY / window.innerHeight;
    if (!parallaxRaf) {
      parallaxRaf = requestAnimationFrame(applyParallax);
    }
  },
  { passive: true }
);

/* --- Partikel ringan di canvas --- */
function initParticles() {
  if (!particleCanvas || prefersReducedMotion()) {
    return;
  }
  const ctx = particleCanvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const dots = [];
  let width = 0;
  let height = 0;
  let running = true;

  function resize() {
    width = particleCanvas.width = window.innerWidth * devicePixelRatio;
    height = particleCanvas.height = window.innerHeight * devicePixelRatio;
    particleCanvas.style.width = `${window.innerWidth}px`;
    particleCanvas.style.height = `${window.innerHeight}px`;
    dots.length = 0;
    const count = Math.min(55, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    for (let i = 0; i < count; i += 1) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4
      });
    }
  }

  function frame() {
    if (!running) {
      return;
    }
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(120, 190, 255, 0.5)";
    for (const d of dots) {
      d.x += d.vx * devicePixelRatio;
      d.y += d.vy * devicePixelRatio;
      if (d.x < 0 || d.x > width) {
        d.vx *= -1;
      }
      if (d.y < 0 || d.y > height) {
        d.vy *= -1;
      }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    }

    const linkDist = 110 * devicePixelRatio;
    ctx.strokeStyle = "rgba(100, 160, 255, 0.12)";
    for (let i = 0; i < dots.length; i += 1) {
      for (let j = i + 1; j < dots.length; j += 1) {
        const a = dots[i];
        const b = dots[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < linkDist) {
          ctx.globalAlpha = 1 - dist / linkDist;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  requestAnimationFrame(frame);

  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState === "visible";
    if (running) {
      requestAnimationFrame(frame);
    }
  });
}

window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
  state.reducedMotion = event.matches;
  if (event.matches) {
    if (graphStage) {
      graphStage.style.transform = "";
    }
    if (ambientLayer) {
      ambientLayer.style.transform = "";
    }
  }
});

setStepsPhase("form");
renderGraph();
initParticles();
setupMascotInteractions();
