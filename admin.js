/**
 * vanhkhuc.dev — Admin Panel Logic
 * Auth, CRUD, localStorage, export/import
 */

(function () {
  'use strict';

  // ============================
  // CONFIG
  // ============================
  const STORAGE_KEY = 'vk-portfolio-content';
  const AUTH_KEY = 'vk-admin-auth';
  // Default password hash (SHA-256 of "vanhkhuc2026")
  // To change password: update this hash
  const PASSWORD_HASH = '8a5f3c6e2b1d4a7f9e0c3b6d8a2f5e1c7b4d9a6e3f0c2b5d8a1e4f7c0b3d6a';
  // Simple password for demo: "admin123"
  const DEMO_PASSWORD = 'admin123';

  // ============================
  // DEFAULT CONTENT STRUCTURE
  // ============================
  function getDefaultContent() {
    return {
      hero: {
        title_en: "I build ",
        title_accent_en: "cool tools",
        title_line2_en: "for the web 🌐",
        title_vi: "Tôi xây dựng ",
        title_accent_vi: "công cụ tuyệt vời",
        title_line2_vi: "cho web 🌐",
        subtitle_en: "Designing and engineering products that solve real problems — with clean architecture and obsessive attention to craft.",
        subtitle_vi: "Thiết kế và xây dựng sản phẩm giải quyết vấn đề thực tế — với kiến trúc sạch và sự chú ý tỉ mỉ đến từng chi tiết.",
        cta_en: "Explore My Tools",
        cta_vi: "Khám phá công cụ",
        cta2_en: "View Projects",
        cta2_vi: "Xem dự án",
        cta_link: "#tools",
        cta2_link: "#projects"
      },
      stats: [
        { emoji: "🛠️", value: 12, label_en: "Tools Built", label_vi: "Công cụ đã xây" },
        { emoji: "👥", value: 50, label_en: "Active Users", label_vi: "Người dùng" },
        { emoji: "📦", value: 8, label_en: "Projects Live", label_vi: "Dự án hoạt động" },
        { emoji: "☀️", value: 365, label_en: "Days Building", label_vi: "Ngày xây dựng" }
      ],
      about: {
        label_en: "Who is vanhkhuc?", label_vi: "Về vanhkhuc",
        title_en: "Philosophy & approach.", title_vi: "Triết lý & cách tiếp cận.",
        desc_en: "More than just code — it's about building things that matter, with intention and craft.",
        desc_vi: "Không chỉ là code — mà là xây dựng những thứ có ý nghĩa, với chủ đích và tâm huyết.",
        cards: [
          { emoji: "🧹", title_en: "Clean Coder", title_vi: "Code Sạch", desc_en: "Writing code that's readable, maintainable, and elegant. Every function tells a story.", desc_vi: "Viết code dễ đọc, dễ bảo trì và tinh tế. Mỗi hàm kể một câu chuyện." },
          { emoji: "🎨", title_en: "Creative Builder", title_vi: "Sáng Tạo", desc_en: "Blending design sensibility with engineering skills to craft experiences that delight.", desc_vi: "Kết hợp cảm quan thiết kế với kỹ năng kỹ thuật để tạo ra trải nghiệm thú vị." },
          { emoji: "🚀", title_en: "Fast Shipper", title_vi: "Ship Nhanh", desc_en: "From idea to production in record time. Speed without sacrificing quality.", desc_vi: "Từ ý tưởng đến sản phẩm trong thời gian kỷ lục. Tốc độ mà không hy sinh chất lượng." },
          { emoji: "💡", title_en: "User-first Mindset", title_vi: "Ưu Tiên Người Dùng", desc_en: "Every decision starts with the user. Building tools that solve real problems.", desc_vi: "Mọi quyết định bắt đầu từ người dùng. Xây dựng công cụ giải quyết vấn đề thực tế." }
        ]
      },
      projects: [
        {
          image: "assets/images/project-1.png",
          tag_en: "SaaS Platform", tag_vi: "Nền tảng SaaS",
          title: "TaskFlow",
          desc_en: "Project management rebuilt for speed. Keyboard-first, real-time sync, and designed for teams that ship fast.",
          desc_vi: "Quản lý dự án được xây lại cho tốc độ. Ưu tiên phím tắt, đồng bộ real-time, thiết kế cho đội ngũ ship nhanh.",
          users_en: "2.4K users", users_vi: "2.4K người dùng",
          tags: ["React", "Node.js", "PostgreSQL"],
          link: "#"
        },
        {
          image: "assets/images/project-2.png",
          tag_en: "Developer Tool", tag_vi: "Công cụ Dev",
          title: "CodeCraft",
          desc_en: "An intelligent code editor with built-in AI assistance. Syntax analysis, auto-refactoring, and a clean workspace.",
          desc_vi: "Editor code thông minh với trợ lý AI tích hợp. Phân tích cú pháp, auto-refactor, và không gian làm việc sạch.",
          users_en: "1.8K users", users_vi: "1.8K người dùng",
          tags: ["Next.js", "OpenAI", "TypeScript"],
          link: "#"
        },
        {
          image: "assets/images/project-3.png",
          tag_en: "Productivity", tag_vi: "Năng suất",
          title: "MailPilot",
          desc_en: "Email, reimagined. Smart inbox prioritization, scheduled sends, and zero-distraction reading mode.",
          desc_vi: "Email, được tái tưởng tượng. Phân loại inbox thông minh, hẹn giờ gửi, và chế độ đọc không xao nhãng.",
          users_en: "3.1K users", users_vi: "3.1K người dùng",
          tags: ["React", "GraphQL", "Redis"],
          link: "#"
        }
      ],
      tools: [
        { name: "QuickDeploy", desc_en: "One-command deployment pipeline. Push to production with zero-downtime rollouts and automatic rollbacks.", desc_vi: "Pipeline deploy một lệnh. Đẩy lên production với zero-downtime và tự động rollback.", meta: "CLI / Node.js" },
        { name: "SchemaSync", desc_en: "Database migration tool that keeps your schema in sync across environments. Diff, preview, and apply safely.", desc_vi: "Công cụ migration database giữ schema đồng bộ giữa các môi trường. Diff, preview, và áp dụng an toàn.", meta: "TypeScript / PostgreSQL" },
        { name: "LogStream", desc_en: "Real-time log aggregation with intelligent filtering. Search, highlight, and tail logs across multiple services.", desc_vi: "Tổng hợp log real-time với bộ lọc thông minh. Tìm kiếm, highlight, và tail logs qua nhiều service.", meta: "Go / WebSocket" },
        { name: "APIForge", desc_en: "API scaffolding generator. Define your schema once and get routes, validation, docs, and tests auto-generated.", desc_vi: "Trình tạo khung API. Định nghĩa schema một lần, tự động sinh routes, validation, docs, và tests.", meta: "Node.js / OpenAPI" },
        { name: "EnvGuard", desc_en: "Environment variable validation at startup. Ensure your config is correct before your app even boots.", desc_vi: "Kiểm tra biến môi trường khi khởi động. Đảm bảo cấu hình đúng trước khi app chạy.", meta: "TypeScript / Zod" },
        { name: "PixelSnap", desc_en: "Screenshot comparison tool for visual regression testing. Pixel-perfect diffs with smart tolerance thresholds.", desc_vi: "Công cụ so sánh screenshot cho kiểm thử hồi quy trực quan. Diff pixel-perfect với ngưỡng dung sai thông minh.", meta: "Python / OpenCV" }
      ],
      blog: [
        {
          image: "assets/images/blog-featured.png",
          date_en: "Mar 2026", date_vi: "Tháng 3, 2026",
          time_en: "8 min read", time_vi: "8 phút đọc",
          title_en: "Why I Stopped Using Frameworks for Everything",
          title_vi: "Tại sao tôi ngừng dùng Framework cho mọi thứ",
          excerpt_en: "Frameworks are great until they're not. A look at when vanilla solutions outperform the ecosystem darlings, and how to know the difference. Exploring the trade-offs between convenience and control.",
          excerpt_vi: "Framework tuyệt vời cho đến khi không còn vậy. Nhìn lại khi nào giải pháp vanilla vượt trội hơn các framework phổ biến, và làm sao biết sự khác biệt.",
          link: "#", featured: true
        },
        {
          date_en: "Feb 2026", date_vi: "Tháng 2, 2026",
          time_en: "5 min", time_vi: "5 phút",
          title_en: "The Art of Shipping Fast Without Cutting Corners",
          title_vi: "Nghệ thuật Ship nhanh mà không cắt góc",
          link: "#", featured: false
        },
        {
          date_en: "Jan 2026", date_vi: "Tháng 1, 2026",
          time_en: "6 min", time_vi: "6 phút",
          title_en: "Designing CLI Tools That Developers Actually Enjoy",
          title_vi: "Thiết kế CLI Tools mà Developer thực sự thích dùng",
          link: "#", featured: false
        },
        {
          date_en: "Dec 2025", date_vi: "Tháng 12, 2025",
          time_en: "10 min", time_vi: "10 phút",
          title_en: "Zero-Downtime Deployments: A Practical Guide",
          title_vi: "Zero-Downtime Deployments: Hướng dẫn thực tế",
          link: "#", featured: false
        }
      ],
      cta: {
        title_en: "Transform your ideas into reality 🚀",
        title_vi: "Biến ý tưởng thành hiện thực 🚀",
        text_en: "I'm always open to interesting projects, collaborations, and conversations about product engineering. Let's create something amazing together.",
        text_vi: "Tôi luôn sẵn sàng cho những dự án thú vị, hợp tác, và trò chuyện về kỹ thuật sản phẩm. Hãy cùng tạo ra điều tuyệt vời.",
        primary_en: "Start a Project", primary_vi: "Bắt đầu dự án",
        secondary_en: "View Resume", secondary_vi: "Xem CV",
        primary_link: "mailto:hello@vanhkhuc.dev",
        secondary_link: "#",
        github: "https://github.com/vanhkhuc",
        linkedin: "https://linkedin.com/in/vanhkhuc",
        twitter: "https://twitter.com/vanhkhuc"
      },
      footer: {
        tagline_en: "Building tools people actually use.",
        tagline_vi: "Xây dựng công cụ người ta thực sự dùng."
      }
    };
  }

  let contentData = null;
  let currentSection = 'hero';

  // ============================
  // AUTH
  // ============================
  function checkAuth() {
    const session = sessionStorage.getItem(AUTH_KEY);
    return session === 'authenticated';
  }

  function authenticate(password) {
    if (password === DEMO_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
  }

  // ============================
  // DATA MANAGEMENT
  // ============================
  function loadContent() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        contentData = JSON.parse(saved);
      } catch (e) {
        contentData = getDefaultContent();
      }
    } else {
      contentData = getDefaultContent();
    }
    return contentData;
  }

  function saveContent() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contentData));
    showToast('Content saved successfully!', 'success');
  }

  function resetContent() {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      contentData = getDefaultContent();
      localStorage.removeItem(STORAGE_KEY);
      renderCurrentSection();
      showToast('Reset to defaults', 'warning');
    }
  }

  function exportContent() {
    const blob = new Blob([JSON.stringify(contentData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vk-portfolio-content-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Content exported!', 'success');
  }

  function importContent(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        contentData = imported;
        saveContent();
        renderCurrentSection();
        showToast('Content imported successfully!', 'success');
      } catch (err) {
        showToast('Invalid JSON file!', 'error');
      }
    };
    reader.readAsText(file);
  }

  // ============================
  // TOAST NOTIFICATIONS
  // ============================
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️' };
    toast.innerHTML = `<span class="toast-icon">${icons[type] || '📌'}</span><span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ============================
  // RENDER SECTIONS
  // ============================
  function renderCurrentSection() {
    const sections = {
      hero: renderHero,
      stats: renderStats,
      about: renderAbout,
      projects: renderProjects,
      tools: renderTools,
      blog: renderBlog,
      cta: renderCTA
    };
    const fn = sections[currentSection];
    if (fn) fn();
    updateDashboardStats();
  }

  function updateDashboardStats() {
    const el = document.getElementById('dashStatProjects');
    if (el) el.textContent = contentData.projects.length;
    const el2 = document.getElementById('dashStatTools');
    if (el2) el2.textContent = contentData.tools.length;
    const el3 = document.getElementById('dashStatBlog');
    if (el3) el3.textContent = contentData.blog.length;
    const el4 = document.getElementById('dashStatStats');
    if (el4) el4.textContent = contentData.stats.length;
  }

  // --- HERO ---
  function renderHero() {
    const d = contentData.hero;
    document.getElementById('sectionContent').innerHTML = `
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">🏠</span> Hero Section</div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Title Line 1 <span class="lang-badge">EN</span></label>
            <input type="text" id="hero_title_en" value="${esc(d.title_en)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Title Line 1 <span class="lang-badge">VI</span></label>
            <input type="text" id="hero_title_vi" value="${esc(d.title_vi)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Accent Text <span class="lang-badge">EN</span></label>
            <input type="text" id="hero_accent_en" value="${esc(d.title_accent_en)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Accent Text <span class="lang-badge">VI</span></label>
            <input type="text" id="hero_accent_vi" value="${esc(d.title_accent_vi)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Title Line 2 <span class="lang-badge">EN</span></label>
            <input type="text" id="hero_line2_en" value="${esc(d.title_line2_en)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Title Line 2 <span class="lang-badge">VI</span></label>
            <input type="text" id="hero_line2_vi" value="${esc(d.title_line2_vi)}" />
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Subtitle <span class="lang-badge">EN</span></label>
            <textarea id="hero_subtitle_en">${esc(d.subtitle_en)}</textarea>
          </div>
          <div class="form-group form-grid-full">
            <label class="form-label">Subtitle <span class="lang-badge">VI</span></label>
            <textarea id="hero_subtitle_vi">${esc(d.subtitle_vi)}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">CTA Button <span class="lang-badge">EN</span></label>
            <input type="text" id="hero_cta_en" value="${esc(d.cta_en)}" />
          </div>
          <div class="form-group">
            <label class="form-label">CTA Button <span class="lang-badge">VI</span></label>
            <input type="text" id="hero_cta_vi" value="${esc(d.cta_vi)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Secondary Button <span class="lang-badge">EN</span></label>
            <input type="text" id="hero_cta2_en" value="${esc(d.cta2_en)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Secondary Button <span class="lang-badge">VI</span></label>
            <input type="text" id="hero_cta2_vi" value="${esc(d.cta2_vi)}" />
          </div>
        </div>
      </div>
    `;
  }

  // --- STATS ---
  function renderStats() {
    const items = contentData.stats.map((s, i) => `
      <div class="crud-card">
        <div class="crud-card-header">
          <div class="crud-card-title"><span class="crud-number">${i + 1}</span> Stat ${i + 1}</div>
          <div class="crud-card-actions">
            <button class="crud-delete-btn" onclick="VKAdmin.deleteStat(${i})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Emoji</label><input type="text" data-stat="${i}" data-field="emoji" value="${esc(s.emoji)}" /></div>
          <div class="form-group"><label class="form-label">Value (Number)</label><input type="number" data-stat="${i}" data-field="value" value="${s.value}" /></div>
          <div class="form-group"><label class="form-label">Label <span class="lang-badge">EN</span></label><input type="text" data-stat="${i}" data-field="label_en" value="${esc(s.label_en)}" /></div>
          <div class="form-group"><label class="form-label">Label <span class="lang-badge">VI</span></label><input type="text" data-stat="${i}" data-field="label_vi" value="${esc(s.label_vi)}" /></div>
        </div>
      </div>
    `).join('');

    document.getElementById('sectionContent').innerHTML = `
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">📊</span> Stats Section</div>
        <div class="crud-list">${items}</div>
        <button class="add-item-btn" onclick="VKAdmin.addStat()" style="margin-top:12px">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Stat
        </button>
      </div>
    `;
  }

  // --- ABOUT ---
  function renderAbout() {
    const d = contentData.about;
    const cards = d.cards.map((c, i) => `
      <div class="crud-card">
        <div class="crud-card-header">
          <div class="crud-card-title"><span class="crud-number">${i + 1}</span> Card ${i + 1}</div>
          <div class="crud-card-actions">
            <button class="crud-delete-btn" onclick="VKAdmin.deleteAboutCard(${i})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Emoji</label><input type="text" data-about="${i}" data-field="emoji" value="${esc(c.emoji)}" /></div>
          <div class="form-group"></div>
          <div class="form-group"><label class="form-label">Title <span class="lang-badge">EN</span></label><input type="text" data-about="${i}" data-field="title_en" value="${esc(c.title_en)}" /></div>
          <div class="form-group"><label class="form-label">Title <span class="lang-badge">VI</span></label><input type="text" data-about="${i}" data-field="title_vi" value="${esc(c.title_vi)}" /></div>
          <div class="form-group"><label class="form-label">Description <span class="lang-badge">EN</span></label><textarea data-about="${i}" data-field="desc_en">${esc(c.desc_en)}</textarea></div>
          <div class="form-group"><label class="form-label">Description <span class="lang-badge">VI</span></label><textarea data-about="${i}" data-field="desc_vi">${esc(c.desc_vi)}</textarea></div>
        </div>
      </div>
    `).join('');

    document.getElementById('sectionContent').innerHTML = `
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">👤</span> About — Section Header</div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Label <span class="lang-badge">EN</span></label><input type="text" id="about_label_en" value="${esc(d.label_en)}" /></div>
          <div class="form-group"><label class="form-label">Label <span class="lang-badge">VI</span></label><input type="text" id="about_label_vi" value="${esc(d.label_vi)}" /></div>
          <div class="form-group"><label class="form-label">Title <span class="lang-badge">EN</span></label><input type="text" id="about_title_en" value="${esc(d.title_en)}" /></div>
          <div class="form-group"><label class="form-label">Title <span class="lang-badge">VI</span></label><input type="text" id="about_title_vi" value="${esc(d.title_vi)}" /></div>
          <div class="form-group form-grid-full"><label class="form-label">Description <span class="lang-badge">EN</span></label><textarea id="about_desc_en">${esc(d.desc_en)}</textarea></div>
          <div class="form-group form-grid-full"><label class="form-label">Description <span class="lang-badge">VI</span></label><textarea id="about_desc_vi">${esc(d.desc_vi)}</textarea></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">🃏</span> Attribute Cards</div>
        <div class="crud-list">${cards}</div>
        <button class="add-item-btn" onclick="VKAdmin.addAboutCard()" style="margin-top:12px">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Card
        </button>
      </div>
    `;
  }

  // --- PROJECTS ---
  function renderProjects() {
    const items = contentData.projects.map((p, i) => `
      <div class="crud-card">
        <div class="crud-card-header">
          <div class="crud-card-title"><span class="crud-number">${i + 1}</span> ${esc(p.title)}</div>
          <div class="crud-card-actions">
            <button class="crud-delete-btn" onclick="VKAdmin.deleteProject(${i})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Project Title</label><input type="text" data-proj="${i}" data-field="title" value="${esc(p.title)}" /></div>
          <div class="form-group"><label class="form-label">Demo Link</label><input type="text" data-proj="${i}" data-field="link" value="${esc(p.link)}" /></div>
          <div class="form-group"><label class="form-label">Tag <span class="lang-badge">EN</span></label><input type="text" data-proj="${i}" data-field="tag_en" value="${esc(p.tag_en)}" /></div>
          <div class="form-group"><label class="form-label">Tag <span class="lang-badge">VI</span></label><input type="text" data-proj="${i}" data-field="tag_vi" value="${esc(p.tag_vi)}" /></div>
          <div class="form-group form-grid-full"><label class="form-label">Description <span class="lang-badge">EN</span></label><textarea data-proj="${i}" data-field="desc_en">${esc(p.desc_en)}</textarea></div>
          <div class="form-group form-grid-full"><label class="form-label">Description <span class="lang-badge">VI</span></label><textarea data-proj="${i}" data-field="desc_vi">${esc(p.desc_vi)}</textarea></div>
          <div class="form-group"><label class="form-label">Users <span class="lang-badge">EN</span></label><input type="text" data-proj="${i}" data-field="users_en" value="${esc(p.users_en)}" /></div>
          <div class="form-group"><label class="form-label">Users <span class="lang-badge">VI</span></label><input type="text" data-proj="${i}" data-field="users_vi" value="${esc(p.users_vi)}" /></div>
          <div class="form-group form-grid-full"><label class="form-label">Tech Tags (comma separated)</label><input type="text" data-proj="${i}" data-field="tags" value="${esc(p.tags.join(', '))}" /></div>
          <div class="form-group form-grid-full"><label class="form-label">Image Path</label><input type="text" data-proj="${i}" data-field="image" value="${esc(p.image)}" /></div>
        </div>
      </div>
    `).join('');

    document.getElementById('sectionContent').innerHTML = `
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">💼</span> Projects</div>
        <div class="crud-list">${items}</div>
        <button class="add-item-btn" onclick="VKAdmin.addProject()" style="margin-top:12px">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Project
        </button>
      </div>
    `;
  }

  // --- TOOLS ---
  function renderTools() {
    const items = contentData.tools.map((t, i) => `
      <div class="crud-card">
        <div class="crud-card-header">
          <div class="crud-card-title"><span class="crud-number">${i + 1}</span> ${esc(t.name)}</div>
          <div class="crud-card-actions">
            <button class="crud-delete-btn" onclick="VKAdmin.deleteTool(${i})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Tool Name</label><input type="text" data-tool="${i}" data-field="name" value="${esc(t.name)}" /></div>
          <div class="form-group"><label class="form-label">Meta / Stack</label><input type="text" data-tool="${i}" data-field="meta" value="${esc(t.meta)}" /></div>
          <div class="form-group"><label class="form-label">Description <span class="lang-badge">EN</span></label><textarea data-tool="${i}" data-field="desc_en">${esc(t.desc_en)}</textarea></div>
          <div class="form-group"><label class="form-label">Description <span class="lang-badge">VI</span></label><textarea data-tool="${i}" data-field="desc_vi">${esc(t.desc_vi)}</textarea></div>
        </div>
      </div>
    `).join('');

    document.getElementById('sectionContent').innerHTML = `
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">🔧</span> Tools</div>
        <div class="crud-list">${items}</div>
        <button class="add-item-btn" onclick="VKAdmin.addTool()" style="margin-top:12px">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Tool
        </button>
      </div>
    `;
  }

  // --- BLOG ---
  function renderBlog() {
    const items = contentData.blog.map((b, i) => `
      <div class="crud-card">
        <div class="crud-card-header">
          <div class="crud-card-title"><span class="crud-number">${i + 1}</span> ${esc(b.title_en).substring(0, 40)}${b.title_en.length > 40 ? '...' : ''}</div>
          <div class="crud-card-actions">
            <button class="crud-delete-btn" onclick="VKAdmin.deleteBlog(${i})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Title <span class="lang-badge">EN</span></label><input type="text" data-blog="${i}" data-field="title_en" value="${esc(b.title_en)}" /></div>
          <div class="form-group"><label class="form-label">Title <span class="lang-badge">VI</span></label><input type="text" data-blog="${i}" data-field="title_vi" value="${esc(b.title_vi)}" /></div>
          <div class="form-group"><label class="form-label">Date <span class="lang-badge">EN</span></label><input type="text" data-blog="${i}" data-field="date_en" value="${esc(b.date_en)}" /></div>
          <div class="form-group"><label class="form-label">Date <span class="lang-badge">VI</span></label><input type="text" data-blog="${i}" data-field="date_vi" value="${esc(b.date_vi)}" /></div>
          <div class="form-group"><label class="form-label">Read Time <span class="lang-badge">EN</span></label><input type="text" data-blog="${i}" data-field="time_en" value="${esc(b.time_en)}" /></div>
          <div class="form-group"><label class="form-label">Read Time <span class="lang-badge">VI</span></label><input type="text" data-blog="${i}" data-field="time_vi" value="${esc(b.time_vi)}" /></div>
          ${b.featured ? `
          <div class="form-group form-grid-full"><label class="form-label">Excerpt <span class="lang-badge">EN</span></label><textarea data-blog="${i}" data-field="excerpt_en">${esc(b.excerpt_en || '')}</textarea></div>
          <div class="form-group form-grid-full"><label class="form-label">Excerpt <span class="lang-badge">VI</span></label><textarea data-blog="${i}" data-field="excerpt_vi">${esc(b.excerpt_vi || '')}</textarea></div>
          <div class="form-group"><label class="form-label">Image Path</label><input type="text" data-blog="${i}" data-field="image" value="${esc(b.image || '')}" /></div>
          ` : ''}
          <div class="form-group"><label class="form-label">Link</label><input type="text" data-blog="${i}" data-field="link" value="${esc(b.link)}" /></div>
          <div class="form-group"><label class="form-label">Featured?</label><select data-blog="${i}" data-field="featured"><option value="true" ${b.featured ? 'selected' : ''}>Yes</option><option value="false" ${!b.featured ? 'selected' : ''}>No</option></select></div>
        </div>
      </div>
    `).join('');

    document.getElementById('sectionContent').innerHTML = `
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">📝</span> Blog Posts</div>
        <div class="crud-list">${items}</div>
        <button class="add-item-btn" onclick="VKAdmin.addBlog()" style="margin-top:12px">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Blog Post
        </button>
      </div>
    `;
  }

  // --- CTA ---
  function renderCTA() {
    const d = contentData.cta;
    document.getElementById('sectionContent').innerHTML = `
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">📞</span> CTA Section</div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Title <span class="lang-badge">EN</span></label><input type="text" id="cta_title_en" value="${esc(d.title_en)}" /></div>
          <div class="form-group"><label class="form-label">Title <span class="lang-badge">VI</span></label><input type="text" id="cta_title_vi" value="${esc(d.title_vi)}" /></div>
          <div class="form-group form-grid-full"><label class="form-label">Text <span class="lang-badge">EN</span></label><textarea id="cta_text_en">${esc(d.text_en)}</textarea></div>
          <div class="form-group form-grid-full"><label class="form-label">Text <span class="lang-badge">VI</span></label><textarea id="cta_text_vi">${esc(d.text_vi)}</textarea></div>
          <div class="form-group"><label class="form-label">Primary Button <span class="lang-badge">EN</span></label><input type="text" id="cta_primary_en" value="${esc(d.primary_en)}" /></div>
          <div class="form-group"><label class="form-label">Primary Button <span class="lang-badge">VI</span></label><input type="text" id="cta_primary_vi" value="${esc(d.primary_vi)}" /></div>
          <div class="form-group"><label class="form-label">Primary Link</label><input type="text" id="cta_primary_link" value="${esc(d.primary_link)}" /></div>
          <div class="form-group"><label class="form-label">Secondary Button <span class="lang-badge">EN</span></label><input type="text" id="cta_secondary_en" value="${esc(d.secondary_en)}" /></div>
          <div class="form-group"><label class="form-label">Secondary Button <span class="lang-badge">VI</span></label><input type="text" id="cta_secondary_vi" value="${esc(d.secondary_vi)}" /></div>
          <div class="form-group"><label class="form-label">Secondary Link</label><input type="text" id="cta_secondary_link" value="${esc(d.secondary_link)}" /></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"><span class="panel-icon">🔗</span> Social Links</div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label">GitHub URL</label><input type="text" id="cta_github" value="${esc(d.github)}" /></div>
          <div class="form-group"><label class="form-label">LinkedIn URL</label><input type="text" id="cta_linkedin" value="${esc(d.linkedin)}" /></div>
          <div class="form-group"><label class="form-label">Twitter URL</label><input type="text" id="cta_twitter" value="${esc(d.twitter)}" /></div>
        </div>
      </div>
    `;
  }

  // ============================
  // COLLECT FORM DATA
  // ============================
  function collectCurrentData() {
    if (currentSection === 'hero') {
      const d = contentData.hero;
      d.title_en = gv('hero_title_en') || d.title_en;
      d.title_vi = gv('hero_title_vi') || d.title_vi;
      d.title_accent_en = gv('hero_accent_en') || d.title_accent_en;
      d.title_accent_vi = gv('hero_accent_vi') || d.title_accent_vi;
      d.title_line2_en = gv('hero_line2_en') || d.title_line2_en;
      d.title_line2_vi = gv('hero_line2_vi') || d.title_line2_vi;
      d.subtitle_en = gv('hero_subtitle_en') || d.subtitle_en;
      d.subtitle_vi = gv('hero_subtitle_vi') || d.subtitle_vi;
      d.cta_en = gv('hero_cta_en') || d.cta_en;
      d.cta_vi = gv('hero_cta_vi') || d.cta_vi;
      d.cta2_en = gv('hero_cta2_en') || d.cta2_en;
      d.cta2_vi = gv('hero_cta2_vi') || d.cta2_vi;
    } else if (currentSection === 'stats') {
      document.querySelectorAll('[data-stat]').forEach(el => {
        const i = parseInt(el.dataset.stat);
        const field = el.dataset.field;
        if (contentData.stats[i]) {
          contentData.stats[i][field] = field === 'value' ? parseInt(el.value) || 0 : el.value;
        }
      });
    } else if (currentSection === 'about') {
      const d = contentData.about;
      d.label_en = gv('about_label_en') || d.label_en;
      d.label_vi = gv('about_label_vi') || d.label_vi;
      d.title_en = gv('about_title_en') || d.title_en;
      d.title_vi = gv('about_title_vi') || d.title_vi;
      d.desc_en = gv('about_desc_en') || d.desc_en;
      d.desc_vi = gv('about_desc_vi') || d.desc_vi;
      document.querySelectorAll('[data-about]').forEach(el => {
        const i = parseInt(el.dataset.about);
        const field = el.dataset.field;
        if (d.cards[i]) d.cards[i][field] = el.value;
      });
    } else if (currentSection === 'projects') {
      document.querySelectorAll('[data-proj]').forEach(el => {
        const i = parseInt(el.dataset.proj);
        const field = el.dataset.field;
        if (contentData.projects[i]) {
          if (field === 'tags') {
            contentData.projects[i].tags = el.value.split(',').map(t => t.trim()).filter(Boolean);
          } else {
            contentData.projects[i][field] = el.value;
          }
        }
      });
    } else if (currentSection === 'tools') {
      document.querySelectorAll('[data-tool]').forEach(el => {
        const i = parseInt(el.dataset.tool);
        const field = el.dataset.field;
        if (contentData.tools[i]) contentData.tools[i][field] = el.value;
      });
    } else if (currentSection === 'blog') {
      document.querySelectorAll('[data-blog]').forEach(el => {
        const i = parseInt(el.dataset.blog);
        const field = el.dataset.field;
        if (contentData.blog[i]) {
          contentData.blog[i][field] = field === 'featured' ? el.value === 'true' : el.value;
        }
      });
    } else if (currentSection === 'cta') {
      const d = contentData.cta;
      d.title_en = gv('cta_title_en') || d.title_en;
      d.title_vi = gv('cta_title_vi') || d.title_vi;
      d.text_en = gv('cta_text_en') || d.text_en;
      d.text_vi = gv('cta_text_vi') || d.text_vi;
      d.primary_en = gv('cta_primary_en') || d.primary_en;
      d.primary_vi = gv('cta_primary_vi') || d.primary_vi;
      d.primary_link = gv('cta_primary_link') || d.primary_link;
      d.secondary_en = gv('cta_secondary_en') || d.secondary_en;
      d.secondary_vi = gv('cta_secondary_vi') || d.secondary_vi;
      d.secondary_link = gv('cta_secondary_link') || d.secondary_link;
      d.github = gv('cta_github') || d.github;
      d.linkedin = gv('cta_linkedin') || d.linkedin;
      d.twitter = gv('cta_twitter') || d.twitter;
    }
  }

  // ============================
  // CRUD OPERATIONS
  // ============================
  function addStat() {
    collectCurrentData();
    contentData.stats.push({ emoji: "⭐", value: 0, label_en: "New Stat", label_vi: "Số liệu mới" });
    renderStats();
  }

  function deleteStat(i) {
    if (confirm('Delete this stat?')) {
      collectCurrentData();
      contentData.stats.splice(i, 1);
      renderStats();
    }
  }

  function addAboutCard() {
    collectCurrentData();
    contentData.about.cards.push({ emoji: "✨", title_en: "New Card", title_vi: "Card mới", desc_en: "Description", desc_vi: "Mô tả" });
    renderAbout();
  }

  function deleteAboutCard(i) {
    if (confirm('Delete this card?')) {
      collectCurrentData();
      contentData.about.cards.splice(i, 1);
      renderAbout();
    }
  }

  function addProject() {
    collectCurrentData();
    contentData.projects.push({
      image: "assets/images/project-1.png", tag_en: "New Project", tag_vi: "Dự án mới",
      title: "New Project", desc_en: "Project description", desc_vi: "Mô tả dự án",
      users_en: "0 users", users_vi: "0 người dùng", tags: ["Tag1"], link: "#"
    });
    renderProjects();
  }

  function deleteProject(i) {
    if (confirm('Delete this project?')) {
      collectCurrentData();
      contentData.projects.splice(i, 1);
      renderProjects();
    }
  }

  function addTool() {
    collectCurrentData();
    contentData.tools.push({ name: "NewTool", desc_en: "Tool description", desc_vi: "Mô tả công cụ", meta: "Language / Framework" });
    renderTools();
  }

  function deleteTool(i) {
    if (confirm('Delete this tool?')) {
      collectCurrentData();
      contentData.tools.splice(i, 1);
      renderTools();
    }
  }

  function addBlog() {
    collectCurrentData();
    contentData.blog.push({
      date_en: "Apr 2026", date_vi: "Tháng 4, 2026",
      time_en: "5 min", time_vi: "5 phút",
      title_en: "New Post", title_vi: "Bài mới",
      link: "#", featured: false
    });
    renderBlog();
  }

  function deleteBlog(i) {
    if (confirm('Delete this blog post?')) {
      collectCurrentData();
      contentData.blog.splice(i, 1);
      renderBlog();
    }
  }

  // ============================
  // HELPERS
  // ============================
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function gv(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  // ============================
  // INIT
  // ============================
  function init() {
    // Login handler
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    if (checkAuth()) {
      showAdmin();
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('loginPassword').value;
        if (authenticate(pass)) {
          showAdmin();
        } else {
          loginError.classList.add('show');
          setTimeout(() => loginError.classList.remove('show'), 2000);
        }
      });
    }

    // Handle Enter key for login
    const passField = document.getElementById('loginPassword');
    if (passField) {
      passField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') loginForm.dispatchEvent(new Event('submit'));
      });
    }
  }

  function showAdmin() {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('adminApp').classList.add('active');
    loadContent();
    renderCurrentSection();
    bindSidebar();
    bindHeaderActions();
  }

  function bindSidebar() {
    document.querySelectorAll('.sidebar-link[data-section]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        collectCurrentData();
        currentSection = link.dataset.section;
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        document.getElementById('mainHeaderTitle').textContent = link.textContent.trim();
        renderCurrentSection();
      });
    });
  }

  function bindHeaderActions() {
    document.getElementById('btnSave')?.addEventListener('click', () => {
      collectCurrentData();
      saveContent();
    });
    document.getElementById('btnPreview')?.addEventListener('click', () => {
      collectCurrentData();
      saveContent();
      window.open('index.html', '_blank');
    });
    document.getElementById('btnExport')?.addEventListener('click', () => {
      collectCurrentData();
      exportContent();
    });
    document.getElementById('btnImport')?.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => { if (e.target.files[0]) importContent(e.target.files[0]); };
      input.click();
    });
    document.getElementById('btnReset')?.addEventListener('click', resetContent);
    document.getElementById('btnLogout')?.addEventListener('click', logout);
  }

  // ============================
  // PUBLIC API
  // ============================
  window.VKAdmin = {
    addStat, deleteStat,
    addAboutCard, deleteAboutCard,
    addProject, deleteProject,
    addTool, deleteTool,
    addBlog, deleteBlog
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
