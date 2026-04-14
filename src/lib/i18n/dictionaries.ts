export type Locale = 'en' | 'vi'

export const dictionaries = {
  vi: {
    nav: {
      about: "Giới thiệu",
      projects: "Dự án",
      skills: "Kỹ năng",
      journey: "Hành trình",
      blog: "Blog",
      contact: "Liên hệ",
      hire: "Tuyển dụng"
    },
    hero: {
      status: "Đang xây dựng: Portfolio HQ v1.0",
      engineering: "Thiết kế kỹ thuật",
      ecosystems: "Hệ sinh thái số",
      subheadline: "Tôi xây dựng các sản phẩm hiệu suất cao, có khả năng mở rộng với kiến trúc sạch và sự tỉ mỉ tối đa. Tập trung vào Backend và Fullstack Engineering.",
      viewProjects: "Xem Dự Án",
      getInTouch: "Liên hệ ngay"
    },
    projects: {
      label: "Sản phẩm",
      title: "Dự án tiêu biểu",
      description: "Một tập hợp các sản phẩm được chọn lọc — mỗi sản phẩm đều được thiết kế cho thực tế và trau chuốt đến từng pixel.",
      live: "Trực tuyến",
      upcoming: "Sắp ra mắt",
      items: {
        taskflow: {
          title: "TaskFlow",
          tag: "Nền tảng SaaS",
          description: "Quản lý dự án được xây dựng lại để đạt tốc độ tối đa. Ưu tiên bàn phím, đồng bộ hóa thời gian thực và được thiết kế cho các nhóm làm việc nhanh. Các tính năng bao gồm sắp xếp công việc dự đoán và bảng trắng cộng tác."
        },
        codecraft: {
          title: "CodeCraft",
          tag: "Công cụ lập trình",
          description: "Một trình soạn thảo mã thông minh với sự hỗ trợ của AI tích hợp. Phân tích cú pháp, tự động tái cấu trúc và không gian làm việc không gây xao nhãng."
        },
        mailpilot: {
          title: "MailPilot",
          tag: "Năng suất",
          description: "Email được tái định nghĩa. Ưu tiên hộp thư đến thông minh, gửi theo lịch trình và chế độ đọc cực nhanh."
        },
        'ai-bot': {
          title: "AI Recruiter",
          tag: "Sắp ra mắt",
          description: "Một bot AI nhận thức ngữ cảnh được đào tạo trên portfolio và CV của tôi. Sẵn sàng trả lời các câu hỏi tuyển dụng trong thời gian thực."
        }
      }
    },
    skills: {
      label: "Bộ công cụ",
      title: "Nền tảng của sự tinh xảo",
      description: "Danh sách các công nghệ tôi sử dụng để xây dựng các sản phẩm có khả năng mở rộng và hệ sinh thái kỹ thuật số chuyên nghiệp."
    },
    journey: {
      label: "Quá trình",
      title: "Hành trình sự nghiệp",
      description: "Các cột mốc quan trọng trong quá trình phát triển sự nghiệp của tôi.",
      items: [
        {
          period: "2026 - Hiện tại",
          role: "Lead Fullstack Engineer",
          company: "Personal Lab / HQ",
          description: "Kiến trúc hệ sinh thái kỹ thuật số chuyên nghiệp và các công cụ tự động hóa AI. Tập trung vào hiệu suất, khả năng mở rộng và trải nghiệm người dùng."
        },
        {
          period: "2024 - 2026",
          role: "Kỹ sư Backend Cấp cao",
          company: "TechNova Solutions",
          description: "Mở rộng kiến trúc microservices xử lý hơn 100k+ người dùng đồng thời. Tối ưu hóa truy vấn cơ sở dữ liệu và triển khai giao tiếp gRPC."
        },
        {
          period: "2022 - 2024",
          role: "Lập trình viên Fullstack",
          company: "Creative Pulse Agency",
          description: "Xây dựng các trang web marketing cao cấp và các công cụ SaaS tùy chỉnh cho các thương hiệu toàn cầu. Làm chủ sự giao thoa giữa thiết kế và kỹ thuật."
        },
        {
          period: "2020 - 2022",
          role: "Lập trình viên Web Sơ cấp",
          company: "Đóng góp Mã nguồn mở",
          description: "Bắt đầu hành trình bằng cách đóng góp cho các thư viện quan trọng và xây dựng các tiện ích web tập trung vào cộng đồng."
        }
      ]
    },
    contact: {
       label: "Kết nối",
       title: "Hãy cùng xây dựng <br /> <span class='text-primary'>điều gì đó tuyệt vời</span> <br /> cùng nhau.",
       subheadline: "Tôi luôn sẵn sàng cho các dự án thú vị, hợp tác và các cuộc trò chuyện về kỹ thuật sản phẩm.",
       formTitle: "Liên hệ",
       name: "Họ và tên",
       email: "Địa chỉ Email",
       message: "Lời nhắn",
       send: "Gửi tin nhắn"
    },
    footer: {
      tagline: "Xây dựng những công cụ thực sự hữu ích.",
      rights: "Đã đăng ký bản quyền."
    }
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      journey: "Journey",
      blog: "Blog",
      contact: "Contact",
      hire: "Hire Me"
    },
    hero: {
      status: "Currently Building: Portfolio HQ v1.0",
      engineering: "Engineering",
      ecosystems: "Digital Ecosystems",
      subheadline: "I build high-performance, scalable products with clean architecture and obsessive attention to craft. Focused on Backend and Fullstack Engineering.",
      viewProjects: "View Projects",
      getInTouch: "Get in touch"
    },
    projects: {
      label: "Showcase",
      title: "Featured Projects",
      description: "A curated selection of products — each designed for production and polished to the last pixel.",
      live: "Live",
      upcoming: "Upcoming",
      items: {
        taskflow: {
          title: "TaskFlow",
          tag: "SaaS Platform",
          description: "Project management rebuilt for speed. Keyboard-first, real-time sync, and designed for teams that ship fast. Features include predictive task sorting and collaborative whiteboards."
        },
        codecraft: {
          title: "CodeCraft",
          tag: "Developer Tool",
          description: "An intelligent code editor with built-in AI assistance. Syntax analysis, auto-refactoring, and a zero-distraction workspace."
        },
        mailpilot: {
          title: "MailPilot",
          tag: "Productivity",
          description: "Email, reimagined. Smart inbox prioritization, scheduled sends, and a lightning-fast reading mode."
        },
        'ai-bot': {
          title: "AI Recruiter",
          tag: "Upcoming",
          description: "A context-aware AI bot trained on my portfolio and CV. Ready to answer recruitment queries in real-time."
        }
      }
    },
    skills: {
      label: "Technical Toolkit",
      title: "The Stack behind the Craft",
      description: "A curated list of technologies I use to build scalable products and professional digital ecosystems."
    },
    journey: {
      label: "Evolution",
      title: "Professional Journey",
      description: "Key milestones in my career development.",
      items: [
        {
          period: "2026 - Present",
          role: "Lead Fullstack Engineer",
          company: "Personal Lab / HQ",
          description: "Architecting professional digital ecosystems and AI automation tools. Focusing on performance, scalability, and UX."
        },
        {
          period: "2024 - 2026",
          role: "Senior Backend Developer",
          company: "TechNova Solutions",
          description: "Scaled microservices architecture handling 100k+ concurrent users. Optimized database queries and implemented gRPC communication."
        },
        {
          period: "2022 - 2024",
          role: "Fullstack Developer",
          company: "Creative Pulse Agency",
          description: "Built high-end marketing sites and custom SaaS tools for global brands. Mastered the intersection of design and engineering."
        },
        {
          period: "2020 - 2022",
          role: "Junior Web Developer",
          company: "Open Source Contributor",
          description: "Started the journey by contributing to mission-critical libraries and building community-focused web utilities."
        }
      ]
    },
    contact: {
       label: "Get in Touch",
       title: "Let's build <br /> <span class='text-primary'>something amazing</span> <br /> together.",
       subheadline: "I'm always open to interesting projects, collaborations, and conversations about product engineering.",
       formTitle: "Contact Me",
       name: "Full Name",
       email: "Email Address",
       message: "Message",
       send: "Send Message"
    },
    footer: {
      tagline: "Building tools people actually use.",
      rights: "All rights reserved."
    }
  }
}
