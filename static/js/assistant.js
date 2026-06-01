/* Nexi — Asisten Karir Virtual untuk Career Nexus.
   Maskot bisa diklik untuk membuka chatbox AI. Jawaban masih berupa
   template/simulasi (rule-based) yang bertema karir SMK, BELUM terhubung
   ke API AI sungguhan. Mudah diganti ke API nyata di kemudian hari:
   cukup ubah fungsi generateReply() menjadi pemanggilan fetch ke backend. */
(function () {
  "use strict";

  const widget = document.getElementById("nexiWidget");
  if (!widget) return;

  const launcher = document.getElementById("nexiLauncher");
  const panel = document.getElementById("nexiPanel");
  const closeBtn = document.getElementById("nexiClose");
  const messages = document.getElementById("nexiMessages");
  const form = document.getElementById("nexiForm");
  const input = document.getElementById("nexiInput");
  const suggestWrap = document.getElementById("nexiSuggest");
  const teaser = document.getElementById("nexiTeaser");
  const badge = document.getElementById("nexiBadge");
  const pupils = widget.querySelectorAll(".pupil");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------- Basis pengetahuan ----------------------------- */
  const KB = [
    {
      keys: ["halo", "hai", "hi", "hallo", "assalam", "pagi", "siang", "sore", "malam", "hey"],
      reply:
        "Halo! 👋 Aku <b>Nexi</b>, asisten karir virtualmu. Aku bisa bantu soal jurusan SMK, skill yang perlu dikuasai, kisaran gaji, sampai jalur kuliah/kerja. Pilih topik di bawah atau ketik pertanyaanmu ya."
    },
    {
      keys: ["siapa kamu", "kamu siapa", "nexi", "kamu apa", "kamu ini"],
      reply:
        "Aku <b>Nexi</b>, maskot sekaligus asisten karir di Career Nexus. Tugasku menemani kamu mengenali minat, jurusan, dan jalur karir yang cocok. Anggap aku teman ngobrol soal masa depanmu! 🚀"
    },
    {
      keys: ["rpl", "rekayasa perangkat lunak", "programmer", "ngoding", "coding", "web", "aplikasi", "developer", "software"],
      reply:
        "Jurusan <b>RPL (Rekayasa Perangkat Lunak)</b> cocok buat kamu yang suka membuat program & aplikasi. Jalur karirnya: Junior Web Developer → Frontend/Backend Developer → Software Engineer. Skill kunci: HTML, CSS, JavaScript, dasar database, dan Git. Tips: bangun portofolio dari proyek kecil dulu. 💻"
    },
    {
      keys: ["tkj", "teknik komputer", "jaringan", "network", "cisco", "server", "cyber", "keamanan", "security", "hacker"],
      reply:
        "Jurusan <b>TKJ (Teknik Komputer & Jaringan)</b> pas buat yang suka jaringan & perangkat. Jalur karir: Network Technician → Network/System Admin → Cybersecurity Analyst. Skill kunci: konsep jaringan (IP, routing), Linux dasar, dan keamanan. Sertifikasi seperti Cisco/CompTIA bikin nilai tambah. 🌐"
    },
    {
      keys: ["dkv", "desain", "design", "grafis", "ui", "ux", "ilustrasi", "gambar", "kreatif", "figma"],
      reply:
        "Jurusan <b>DKV (Desain Komunikasi Visual)</b> cocok buat jiwa kreatif. Jalur karir: Graphic Designer → UI/UX Designer → Art Director. Skill kunci: prinsip desain, Figma, Adobe (Photoshop/Illustrator), dan storytelling visual. Tips: rajin bikin portofolio di Behance/Dribbble. 🎨"
    },
    {
      keys: ["akl", "akuntansi", "keuangan", "audit", "pajak", "pembukuan", "finance", "accounting"],
      reply:
        "Jurusan <b>AKL (Akuntansi & Keuangan Lembaga)</b> pas buat yang teliti dengan angka. Jalur karir: Accounting Staff → Auditor/Finance Analyst → Finance Manager. Skill kunci: pembukuan, Excel, software akuntansi, dan pemahaman pajak dasar. 📊"
    },
    {
      keys: ["bdp", "bisnis", "pemasaran", "marketing", "jualan", "penjualan", "wirausaha", "digital marketing", "sosmed", "social media"],
      reply:
        "Jurusan <b>BDP (Bisnis Daring & Pemasaran)</b> cocok buat yang suka berinteraksi & jualan. Jalur karir: Sales/Marketing Staff → Digital Marketing Specialist → Marketing Manager. Skill kunci: copywriting, social media, dasar SEO, dan analitik. 📈"
    },
    {
      keys: ["gaji", "salary", "penghasilan", "pendapatan", "bayaran", "upah", "duit", "uang"],
      reply:
        "Kisaran gaji tergantung bidang & pengalaman. Sebagai gambaran posisi awal di Indonesia: Developer ±Rp4,5–7jt, Desainer ±Rp3,5–6jt, Network/IT ±Rp4–6jt, Akuntansi ±Rp3,5–5jt, Marketing ±Rp3,5–6jt. Makin tinggi skill & jam terbang, makin besar potensinya. 💰 Buka menu <b>Info Karir</b> untuk detail tiap profesi."
    },
    {
      keys: ["skill", "kemampuan", "keahlian", "harus bisa apa", "belajar apa", "dibutuhkan", "diperlukan"],
      reply:
        "Skill yang banyak dicari sekarang: <b>1)</b> kemampuan teknis sesuai jurusan, <b>2)</b> literasi digital & AI, <b>3)</b> komunikasi, <b>4)</b> problem solving, dan <b>5)</b> kemauan belajar terus. Kombinasi skill teknis + soft skill bikin kamu menonjol. Mau aku rinci skill untuk jurusan tertentu? Sebut saja jurusannya. 🎯"
    },
    {
      keys: ["soft skill", "softskill", "komunikasi", "kerja tim", "kepemimpinan", "leadership"],
      reply:
        "Soft skill itu penentu jangka panjang: komunikasi, kerja tim, manajemen waktu, adaptasi, dan inisiatif. Latih lewat organisasi sekolah, kerja kelompok, atau jadi panitia acara. Perekrut sering melihat ini sepenting skill teknis. 🤝"
    },
    {
      keys: ["kuliah", "lanjut", "kampus", "universitas", "jurusan kuliah", "d3", "s1", "studi"],
      reply:
        "Setelah SMK kamu bisa langsung kerja, kuliah (D3/S1), atau ambil kursus/sertifikasi. Kalau mau kuliah, pilih jurusan yang sejalan dengan minat & jurusan SMK-mu biar nyambung. Banyak juga jalur beasiswa & kelas malam buat yang sambil kerja. 🎓"
    },
    {
      keys: ["sertifikasi", "sertifikat", "kursus", "pelatihan", "bootcamp"],
      reply:
        "Sertifikasi memperkuat CV-mu. Contoh: BNSP (nasional), Cisco/CompTIA (jaringan), sertifikasi cloud (AWS/Google), atau kursus online (Dicoding, Coursera, RevoU). Pilih yang relevan dengan jalur karir incaranmu. 🏅"
    },
    {
      keys: ["portofolio", "portfolio", "karya", "proyek", "project"],
      reply:
        "Portofolio adalah bukti nyata kemampuanmu — sering lebih meyakinkan daripada ijazah. Kumpulkan tugas sekolah, proyek pribadi, atau hasil magang. Developer pakai GitHub, desainer pakai Behance/Dribbble. Mulai dari yang kecil, yang penting konsisten. 📁"
    },
    {
      keys: ["magang", "pkl", "intern", "praktek kerja", "kerja lapangan"],
      reply:
        "Magang/PKL itu emas! Kamu dapat pengalaman nyata, relasi, dan kadang tawaran kerja. Tips: tunjukkan inisiatif, banyak bertanya, dan catat hasil kerjamu untuk portofolio. Manfaatkan momen PKL semaksimal mungkin. 🧰"
    },
    {
      keys: ["bingung", "galau", "belum tahu", "gak tahu", "tidak tahu", "ragu", "takut", "minder", "stres", "cemas", "khawatir"],
      reply:
        "Tenang, wajar kok merasa bingung soal masa depan — kamu nggak sendiri. 💙 Yuk pelan-pelan: mulai dari mengenali apa yang kamu suka & kuasai. Coba kerjakan <b>Quiz Karir</b> untuk lihat peta minatmu, lalu kita bahas hasilnya. Setiap orang punya waktunya masing-masing."
    },
    {
      keys: ["quiz", "kuis", "tes", "minat", "bakat"],
      reply:
        "Buka menu <b>Quiz Karir</b> 🎯 — di sana ada 12 pertanyaan untuk memetakan minatmu per bidang plus <b>Indikator Kematangan Karier</b>. Hasilnya bisa kamu simpan dan jadikan bahan diskusi dengan guru BK. Mau aku jelaskan cara membaca hasilnya?"
    },
    {
      keys: ["mind planning", "mind", "rencana", "planning", "peta pikiran", "mindmap"],
      reply:
        "Menu <b>Mind Planning</b> 🧠 membantumu menyusun rencana jalur karir secara visual — dari kondisi sekarang sampai cita-cita. Cocok untuk memetakan langkah konkret per tahap. Coba buka dan susun rencanamu di sana ya."
    },
    {
      keys: ["cara pakai", "gimana pakai", "fitur", "menu", "navigasi", "bingung pakai", "petunjuk"],
      reply:
        "Career Nexus punya 4 menu utama: <b>Peta Karir</b> (isi data & lihat jaringan karir), <b>Mind Planning</b> (rencana visual), <b>Info Karir</b> (video + tips tiap profesi), dan <b>Quiz Karir</b> (tes minat & kematangan). Mulai dari Peta Karir biar dapat rekomendasi awal. 🧭"
    },
    {
      keys: ["freelance", "remote", "kerja rumah", "wfh", "lepas", "sampingan"],
      reply:
        "Banyak bidang kini bisa dikerjakan freelance/remote — terutama developer, desainer, penulis, dan digital marketer. Modal utamanya: portofolio kuat, disiplin, dan komunikasi. Platform seperti Upwork, Fiverr, atau Sribulancer bisa jadi awal. 🌍"
    },
    {
      keys: ["ai", "masa depan", "prospek", "tren", "robot", "kecerdasan buatan", "otomasi"],
      reply:
        "AI mengubah cara kerja, bukan menghapus semua pekerjaan. Yang aman & berkembang: orang yang bisa <i>bekerja bersama</i> AI. Kuasai skill dasarmu, lalu pelajari cara memanfaatkan AI sebagai alat bantu. Adaptasi adalah kunci masa depan. 🤖"
    },
    {
      keys: ["terima kasih", "makasih", "thanks", "thx", "trims", "mantap", "keren", "oke", "ok", "sip"],
      reply:
        "Sama-sama! 😊 Semangat terus mengejar cita-citamu. Kalau ada yang mau ditanyakan lagi soal karir, aku selalu di sini. Kamu pasti bisa! 💪"
    }
  ];

  const FALLBACK = [
    "Hmm, aku belum punya jawaban pasti untuk itu 😅 (aku masih versi demo). Tapi coba tanyakan soal <b>jurusan</b> (RPL, TKJ, DKV, AKL, BDP), <b>skill</b>, <b>gaji</b>, <b>kuliah</b>, atau <b>quiz minat</b> — aku siap bantu!",
    "Pertanyaan menarik! Untuk saat ini aku paling jago soal karir SMK: jurusan, skill, jalur kerja/kuliah, dan tips. Coba pilih salah satu topik di bawah ya. 🙂"
  ];

  const SUGGESTIONS = [
    "Jurusan RPL kerja apa?",
    "Skill yang lagi dibutuhkan?",
    "Aku masih bingung pilih karir",
    "Berapa kisaran gaji?",
    "Cara pakai websitenya?"
  ];

  /* Pencocokan sederhana: hitung berapa kata kunci yang muncul, ambil skor tertinggi. */
  function generateReply(text) {
    const q = " " + text.toLowerCase().replace(/[^\w\s]/g, " ") + " ";
    let best = null;
    let bestScore = 0;
    for (const item of KB) {
      let score = 0;
      for (const key of item.keys) {
        if (q.includes(" " + key + " ") || q.includes(key)) {
          score += key.split(" ").length; // frasa lebih panjang lebih kuat
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }
    if (best && bestScore > 0) return best.reply;
    return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
  }

  /* ----------------------------- UI helpers ----------------------------- */
  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function appendMessage(text, who) {
    const row = document.createElement("div");
    row.className = "nexi-msg nexi-msg--" + who;
    const bubble = document.createElement("div");
    bubble.className = "nexi-bubble";
    bubble.innerHTML = text;
    row.appendChild(bubble);
    messages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function showTyping() {
    const row = document.createElement("div");
    row.className = "nexi-msg nexi-msg--bot nexi-msg--typing";
    row.innerHTML =
      '<div class="nexi-bubble nexi-typing"><span></span><span></span><span></span></div>';
    messages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function botRespond(text) {
    const typing = showTyping();
    const delay = reduceMotion ? 250 : 600 + Math.min(1200, text.length * 8);
    window.setTimeout(() => {
      typing.remove();
      appendMessage(generateReply(text), "bot");
    }, delay);
  }

  function buildSuggestions() {
    if (!suggestWrap) return;
    suggestWrap.innerHTML = "";
    for (const s of SUGGESTIONS) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "nexi-chip";
      chip.textContent = s;
      chip.addEventListener("click", () => {
        appendMessage(s, "user");
        botRespond(s);
      });
      suggestWrap.appendChild(chip);
    }
  }

  let greeted = false;
  function openChat() {
    widget.setAttribute("data-open", "true");
    launcher.setAttribute("aria-expanded", "true");
    if (badge) badge.hidden = true;
    if (teaser) teaser.hidden = true;
    stopTeaser();
    if (!greeted) {
      greeted = true;
      appendMessage(
        "Halo! 👋 Aku <b>Nexi</b>, asisten karir virtualmu di Career Nexus. Tanyakan apa saja seputar jurusan, skill, gaji, atau jalur karir. Ada yang bisa kubantu hari ini?",
        "bot"
      );
    }
    window.setTimeout(() => input && input.focus(), reduceMotion ? 0 : 280);
  }

  function closeChat() {
    widget.setAttribute("data-open", "false");
    launcher.setAttribute("aria-expanded", "false");
    startTeaser();
  }

  function toggleChat() {
    if (widget.getAttribute("data-open") === "true") closeChat();
    else openChat();
  }

  /* ----------------------------- Teaser bubble berputar ----------------------------- */
  const teaserTips = [
    "Hai! Tanya aku soal karir ya ✨",
    "Bingung pilih jurusan? Klik aku 💬",
    "Mau tahu skill yang dicari? 🎯",
    "Yuk ngobrol soal masa depanmu! 🚀"
  ];
  let teaserTimer = null;
  let teaserIndex = 0;
  function startTeaser() {
    if (!teaser || teaserTimer) return;
    teaser.hidden = false;
    teaserTimer = window.setInterval(() => {
      teaserIndex = (teaserIndex + 1) % teaserTips.length;
      teaser.textContent = teaserTips[teaserIndex];
    }, 5000);
  }
  function stopTeaser() {
    if (teaserTimer) {
      window.clearInterval(teaserTimer);
      teaserTimer = null;
    }
  }

  /* ----------------------------- Mata mengikuti kursor ----------------------------- */
  function moveEyes(clientX, clientY) {
    for (const pupil of pupils) {
      const eye = pupil.parentElement;
      if (!eye) continue;
      const rect = eye.getBoundingClientRect();
      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const max = 4;
      const tx = (dx / dist) * Math.min(max, dist * 0.2);
      const ty = (dy / dist) * Math.min(max, dist * 0.2);
      pupil.style.transform = `translate(${tx}px, ${ty}px)`;
    }
  }

  /* ----------------------------- Event wiring ----------------------------- */
  launcher.addEventListener("click", toggleChat);
  launcher.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleChat();
    }
  });
  if (closeBtn) closeBtn.addEventListener("click", closeChat);

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = (input.value || "").trim();
      if (!value) return;
      appendMessage(value, "user");
      input.value = "";
      botRespond(value);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && widget.getAttribute("data-open") === "true") closeChat();
  });

  if (pupils.length) {
    document.addEventListener("pointermove", (e) => moveEyes(e.clientX, e.clientY));
  }

  buildSuggestions();
  startTeaser();

  /* API publik supaya script lain (mis. hasil form) bisa "berbicara" lewat Nexi. */
  window.Nexi = {
    open: openChat,
    close: closeChat,
    say(text) {
      if (teaser && widget.getAttribute("data-open") !== "true") {
        teaser.hidden = false;
        teaser.textContent = text;
      }
    },
    pushBot(text) {
      openChat();
      appendMessage(text, "bot");
    }
  };
})();
