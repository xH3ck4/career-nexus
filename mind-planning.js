const particleCanvas = document.getElementById("particleCanvas");
const mindStage = document.getElementById("mindStage");
const mindLinesSvg = document.getElementById("mindLines");
const mindNodesLayer = document.getElementById("mindNodesLayer");
const mindTemplateSelect = document.getElementById("mindTemplateSelect");
const resetMindMapBtn = document.getElementById("resetMindMap");
const mindCurrentStep = document.getElementById("mindCurrentStep");
const mindNotesInput = document.getElementById("mindNotesInput");
const mindFullscreenToggle = document.getElementById("mindFullscreenToggle");
const mindCard = document.querySelector(".mind-card");

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

const MIND_WORLD = { width: 1600, height: 700 };

const mindTemplates = {
  webdev: {
    id: "webdev",
    title: "Web Developer / RPL",
    nodes: [
      { id: "start", label: "Lulus SMK", x: 80, y: 280, accent: true },
      { id: "kuliah", label: "Kuliah ?", x: 340, y: 280 },
      { id: "kuliah-ya", label: "Iya", x: 560, y: 170, compact: true },
      { id: "kuliah-tidak", label: "Tidak", x: 560, y: 390, compact: true },
      { id: "ambil-pt", label: "Ambil PTN atau PTS", x: 780, y: 170 },
      { id: "sertif", label: "Sertifikasi atau Bootcamp", x: 780, y: 390 },
      { id: "pts", label: "PTS = daftar / ambil jalur prestasi (jika ada)", x: 1040, y: 120 },
      { id: "ptn", label: "PTN = SNBT/SNBTN", x: 1040, y: 220 },
      { id: "lomba", label: "Mencoba ikut lomba Website Developer", x: 1040, y: 390 },
      { id: "apply", label: "Melamar pekerjaan sesuai bidang", x: 1340, y: 260, accent: true }
    ],
    edges: [
      ["start", "kuliah"],
      ["kuliah", "kuliah-ya"],
      ["kuliah", "kuliah-tidak"],
      ["kuliah-ya", "ambil-pt"],
      ["ambil-pt", "ptn"],
      ["ambil-pt", "pts"],
      ["kuliah-tidak", "sertif"],
      ["sertif", "lomba"],
      ["lomba", "apply"],
      ["ptn", "apply"],
      ["pts", "apply"]
    ]
  },
  design: {
    id: "design",
    title: "Desain & UI/UX",
    nodes: [
      { id: "start", label: "Lulus SMK DKV / RPL", x: 80, y: 260, accent: true },
      { id: "portfolio", label: "Bangun portofolio desain\n(Dribbble / Behance / GitHub)", x: 360, y: 180 },
      { id: "freelance", label: "Coba freelance kecil\n(poster, logo, UI sederhana)", x: 360, y: 360 },
      { id: "kuliah", label: "Pertimbangkan kuliah desain / informatika", x: 680, y: 180 },
      { id: "bootcamp", label: "Ikut kelas/bootcamp UI/UX intensif", x: 680, y: 360 },
      { id: "intern", label: "Magang / internship UI/UX", x: 1000, y: 240 },
      { id: "junior", label: "Menjadi Junior UI/UX Designer", x: 1320, y: 240, accent: true }
    ],
    edges: [
      ["start", "portfolio"],
      ["start", "freelance"],
      ["portfolio", "kuliah"],
      ["portfolio", "bootcamp"],
      ["freelance", "bootcamp"],
      ["kuliah", "intern"],
      ["bootcamp", "intern"],
      ["intern", "junior"]
    ]
  },
  network: {
    id: "network",
    title: "Jaringan & Cybersecurity",
    nodes: [
      { id: "start", label: "Lulus SMK TKJ / RPL", x: 80, y: 260, accent: true },
      { id: "ccna", label: "Ambil sertifikasi jaringan\n(CCNA / Mikrotik / setara)", x: 360, y: 160 },
      { id: "lab", label: "Latihan lab jaringan\n(di sekolah / rumah)", x: 360, y: 360 },
      { id: "network-tech", label: "Bekerja sebagai Network Technician", x: 720, y: 160 },
      { id: "soc", label: "Ikut komunitas / event\nkeamanan siber", x: 720, y: 360 },
      { id: "cyber-analyst", label: "Jadi Cybersecurity Analyst / SOC", x: 1080, y: 240, accent: true }
    ],
    edges: [
      ["start", "ccna"],
      ["start", "lab"],
      ["ccna", "network-tech"],
      ["lab", "network-tech"],
      ["network-tech", "soc"],
      ["soc", "cyber-analyst"]
    ]
  },
  finance: {
    id: "finance",
    title: "Akuntansi & Keuangan",
    nodes: [
      { id: "start", label: "Lulus SMK AKL", x: 80, y: 260, accent: true },
      { id: "intern", label: "Magang / PKL di kantor akuntan / perusahaan", x: 360, y: 160 },
      { id: "cert", label: "Sertifikasi teknisi akuntansi / brevet pajak", x: 360, y: 360 },
      { id: "staff", label: "Bekerja sebagai Accounting Staff", x: 720, y: 160 },
      { id: "tax", label: "Spesialisasi di pajak\n(Tax & Payroll Admin)", x: 720, y: 360 },
      { id: "senior", label: "Menuju Senior Accounting / Tax Officer", x: 1080, y: 260, accent: true }
    ],
    edges: [
      ["start", "intern"],
      ["start", "cert"],
      ["intern", "staff"],
      ["cert", "staff"],
      ["staff", "tax"],
      ["tax", "senior"]
    ]
  }
};

let mindState = {
  nodes: [],
  edges: [],
  dragNodeId: null,
  dragOffsetX: 0,
  dragOffsetY: 0,
  focusedNodeId: null,
  stagePanning: {
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0
  }
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function initParticles() {
  if (!particleCanvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
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

function buildMindMapFromTemplate(templateKey) {
  const template = mindTemplates[templateKey] || mindTemplates.webdev;
  mindState = {
    nodes: template.nodes.map((n) => ({ ...n })),
    edges: template.edges.map(([from, to]) => ({ from, to })),
    dragNodeId: null,
    dragOffsetX: 0,
    dragOffsetY: 0,
    focusedNodeId: null
  };
  if (mindNodesLayer) {
    mindNodesLayer.innerHTML = "";
  }
  if (mindLinesSvg) {
    mindLinesSvg.innerHTML = "";
  }
  renderMindNodes();
  renderMindEdges();
  if (mindCurrentStep) {
    mindCurrentStep.textContent = "Belum ada langkah yang dipilih.";
  }
}

function renderMindNodes() {
  if (!mindNodesLayer) return;
  for (const node of mindState.nodes) {
    const el = document.createElement("button");
    el.className = "mind-node";
    if (node.accent) {
      el.classList.add("mind-node--accent");
    }
    if (node.compact) {
      el.classList.add("mind-node--compact");
    }
    el.textContent = node.label;
    el.dataset.id = node.id;
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    bindMindNodeEvents(el, node);
    mindNodesLayer.appendChild(el);
  }
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
    const sx = from.x + 110;
    const sy = from.y + 32;
    const tx = to.x;
    const ty = to.y + 32;
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

function updateEdgesForNode(nodeId) {
  if (!mindLinesSvg) return;
  renderMindEdges();
}

function bindMindNodeEvents(el, node) {
  let dragActive = false;
  let dragStartX = 0;
  let dragStartY = 0;

  const startPointer = (event) => {
    event.preventDefault();
    dragActive = true;
    mindState.dragNodeId = node.id;
    dragStartX = event.clientX - node.x;
    dragStartY = event.clientY - node.y;
    el.classList.add("mind-node--dragging");
    try {
      el.setPointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
  };

  const movePointer = (event) => {
    if (!dragActive || mindState.dragNodeId !== node.id) return;
    const nextX = clamp(event.clientX - dragStartX, 0, MIND_WORLD.width - 180);
    const nextY = clamp(event.clientY - dragStartY, 20, MIND_WORLD.height - 80);
    node.x = nextX;
    node.y = nextY;
    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    updateEdgesForNode(node.id);
  };

  const endPointer = (event) => {
    if (!dragActive) return;
    dragActive = false;
    mindState.dragNodeId = null;
    el.classList.remove("mind-node--dragging");
    try {
      el.releasePointerCapture(event.pointerId);
    } catch {
      /* ignore */
    }
  };

  el.addEventListener("pointerdown", startPointer);
  el.addEventListener("pointermove", movePointer);
  el.addEventListener("pointerup", endPointer);
  el.addEventListener("pointercancel", endPointer);

  el.addEventListener("click", () => {
    mindState.focusedNodeId = node.id;
    document.querySelectorAll(".mind-node--active").forEach((n) => n.classList.remove("mind-node--active"));
    el.classList.add("mind-node--active");
    if (mindCurrentStep) {
      mindCurrentStep.textContent = `Langkah yang dipilih: ${node.label}`;
    }
  });
}

function setupToolbar() {
  if (mindTemplateSelect) {
    mindTemplateSelect.addEventListener("change", () => {
      buildMindMapFromTemplate(mindTemplateSelect.value);
    });
  }
  if (resetMindMapBtn) {
    resetMindMapBtn.addEventListener("click", () => {
      const key = (mindTemplateSelect && mindTemplateSelect.value) || "webdev";
      buildMindMapFromTemplate(key);
      if (mindNotesInput) {
        mindNotesInput.value = "";
      }
    });
  }
}

function initMindPage() {
  initParticles();
  setupToolbar();
  const defaultTemplate = (mindTemplateSelect && mindTemplateSelect.value) || "webdev";
  buildMindMapFromTemplate(defaultTemplate);

  if (mindStage) {
    let panMoved = false;

    mindStage.addEventListener("pointerdown", (event) => {
      const targetIsNode = event.target instanceof Element && Boolean(event.target.closest(".mind-node"));
      if (targetIsNode) {
        return;
      }
      mindState.stagePanning.active = true;
      mindState.stagePanning.pointerId = event.pointerId;
      mindState.stagePanning.startX = event.clientX;
      mindState.stagePanning.startY = event.clientY;
      mindState.stagePanning.startScrollLeft = mindStage.scrollLeft;
      mindState.stagePanning.startScrollTop = mindStage.scrollTop;
      panMoved = false;
      try {
        mindStage.setPointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    });

    mindStage.addEventListener("pointermove", (event) => {
      if (!mindState.stagePanning.active || mindState.stagePanning.pointerId !== event.pointerId) {
        return;
      }
      const dx = event.clientX - mindState.stagePanning.startX;
      const dy = event.clientY - mindState.stagePanning.startY;
      if (Math.hypot(dx, dy) > 3) {
        panMoved = true;
      }
      mindStage.scrollLeft = mindState.stagePanning.startScrollLeft - dx;
      mindStage.scrollTop = mindState.stagePanning.startScrollTop - dy;
    });

    const endPan = (event) => {
      if (!mindState.stagePanning.active || mindState.stagePanning.pointerId !== event.pointerId) {
        return;
      }
      mindState.stagePanning.active = false;
      mindState.stagePanning.pointerId = null;
      try {
        mindStage.releasePointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    };

    mindStage.addEventListener("pointerup", endPan);
    mindStage.addEventListener("pointercancel", endPan);
  }
}

if (mindStage && mindLinesSvg && mindNodesLayer) {
  window.addEventListener("load", initMindPage);
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

if (mindFullscreenToggle && mindCard) {
  mindFullscreenToggle.addEventListener("click", () => {
    if (!isFullscreenActive()) {
      enterFullscreen(mindCard);
    } else {
      exitFullscreen();
    }
  });

  const syncMindFullscreen = () => {
    const active = isFullscreenActive();
    mindCard.classList.toggle("mind-card--fullscreen", active);
    if (active) {
      mindFullscreenToggle.textContent = "✖ Keluar layar penuh";
    } else {
      mindFullscreenToggle.textContent = "⛶ Layar penuh mind map";
    }
  };

  document.addEventListener("fullscreenchange", syncMindFullscreen);
  document.addEventListener("webkitfullscreenchange", syncMindFullscreen);
  document.addEventListener("msfullscreenchange", syncMindFullscreen);
}

