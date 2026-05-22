"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  ExternalLink,
  CheckCircle,
  FileText,
  UserCheck,
  Zap,
  Compass,
  ArrowRight,
  ShieldCheck,
  BookMarked,
  Sliders,
  Type,
  Moon,
  Sun,
  FlameKindling,
  Printer,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { Lora, Be_Vietnam_Pro } from "next/font/google";

const lora = Lora({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

const filterSimulationData = {
  queries: [
    {
      id: "q1",
      label: "1. Giải quyết mâu thuẫn cá nhân",
      rawText: "Làm thế nào để giải quyết mâu thuẫn với một người bạn?",
    },
    {
      id: "q2",
      label: "2. Định hướng phát triển bản thân",
      rawText: "Làm cách nào để phát triển sự nghiệp của tôi trong tương lai?",
    },
    {
      id: "q3",
      label: "3. Đánh giá một mô hình khởi nghiệp",
      rawText: "Tôi có nên khởi nghiệp bằng mô hình cà phê tự phục vụ vào lúc này không?",
    }
  ],
  filters: {
    comprehensive: {
      name: "Quan điểm Toàn diện",
      systemPrompt: "Khóa các câu trả lời hời hợt, một chiều. Ép AI phải phân tích vấn đề đa chiều, đánh giá cả mặt tích cực lẫn tiêu cực, yếu tố bên trong lẫn bên ngoài.",
      simulationResult: {
        q1: "Không chỉ nhìn từ cảm xúc cá nhân của bản thân, mà cần phải đặt mình vào hoàn cảnh của bạn mình để hiểu nguyên nhân khách quan. Đồng thời, phân tích xung đột trong mối quan hệ tổng thể (lịch sử tình bạn, tính cách của cả hai) và các tác nhân gián tiếp từ bên ngoài (stress công việc, gia đình) thay vì chỉ đánh giá một hiện tượng nhất thời.",
        q2: "Phát triển bản thân không thuần túy là nâng cao kỹ năng nghề nghiệp. Cần đánh giá toàn diện các mối liên hệ cấu thành cuộc sống: sức khỏe thể chất, đời sống tinh thần, các mối quan hệ xã hội, năng lực tài chính và đạo đức cá nhân. Tránh thiên lệch hoặc đánh đổi một yếu tố này để lấy các giá trị ngắn hạn khác.",
        q3: "Cần đánh giá mô hình kinh doanh đa chiều: Khách quan (nhu cầu phân khúc trẻ, tiết kiệm chi phí nhân công) và Chủ quan (vốn đầu tư hiện có, kỹ năng quản trị). Đánh giá cả các nhân tố tích cực (xu hướng trải nghiệm công nghệ mới) lẫn tiêu cực (thói quen thích được phục vụ tại chỗ ở Việt Nam, chi phí thuê mặt bằng cố định lớn)."
      }
    },
    development: {
      name: "Quan điểm Phát triển",
      systemPrompt: "Ngăn chặn tư duy tĩnh tại. Buộc AI không chỉ mô tả thực trạng hiện tại mà phải dự báo được xu hướng biến đổi và đề xuất lộ trình trong tương lai.",
      simulationResult: {
        q1: "Mối quan hệ không phải là bất biến. Mâu thuẫn là trạng thái tạm thời, có thể đóng vai trò là động lực thúc đẩy hai bên hiểu sâu sắc về nhau hơn nếu được giải quyết đúng hướng. Hãy chủ động mở lối trò chuyện và đề xuất hướng kết nối mới để tình bạn phát triển bền vững hơn trong tương lai.",
        q2: "Tránh tư duy tĩnh tại rằng năng lực của bạn là cố định. Cần phân bổ lộ trình phát triển thành các giai đoạn: Tích lũy về lượng (1-2 năm tích lũy kiến thức căn bản) -> Chuyển đổi về chất (nhận các vị trí dẫn dắt hoặc tự chủ dự án) -> Chuẩn bị cho các bước nhảy vọt xa hơn.",
        q3: "Phải đánh giá sự vận động của thị trường thay vì phân tích số liệu tĩnh ở hiện tại. Xu hướng dịch chuyển hành vi tiêu dùng trong 3-5 năm tới sẽ ra sao? Lộ trình thích ứng công nghệ của quán cần biến đổi như thế nào? Cần thiết lập dự phòng rủi ro để quán có thể tự điều chỉnh theo chu kỳ thị trường."
      }
    },
    historical: {
      name: "Quan điểm Lịch sử - Cụ thể",
      systemPrompt: "Chặn đứng các lý thuyết suông mang tính khuôn mẫu. Yêu cầu AI phải đặt giải pháp vào đúng không gian, thời gian và giới hạn nguồn lực của bối cảnh hiện tại.",
      simulationResult: {
        q1: "Giải pháp giải quyết mâu thuẫn phụ thuộc chặt chẽ vào bản chất mối quan hệ (bạn học, đồng nghiệp hay đối tác) và không gian - thời gian xảy ra sự việc cụ thể. Tránh áp dụng các lời khuyên đắc nhân tâm chung chung. Hãy chọn đúng thời điểm cả hai đều bình tĩnh để bắt đầu trao đổi riêng tư.",
        q2: "Định hướng phát triển phải gắn liền với hoàn cảnh sống cụ thể của bạn: độ tuổi hiện tại, giới hạn ngân sách tự học, và đặc thù ngành nghề bạn lựa chọn tại Việt Nam ở thời điểm kinh tế hiện nay. Không sao chép nguyên mẫu lộ trình thành công của người khác.",
        q3: "Không có câu trả lời có hay không một cách trừu tượng. Phải đặt giải pháp vào không gian cụ thể (địa điểm thuê mặt bằng tại khu vực nào, mật độ dân cư ra sao), thời gian (giai đoạn thắt chặt chi tiêu sau biến động kinh tế) và tiềm lực tài chính thực tế của bạn ở thời điểm hiện tại."
      }
    },
    practice: {
      name: "Quan điểm Thực tiễn",
      systemPrompt: "Xóa bỏ sự ảo tưởng, bay bổng của thuật toán bằng cách ràng buộc mọi đề xuất phải có tính khả thi. Buộc AI phải đưa ra các bước hành động cụ thể (actionable steps) và tiêu chí kiểm chứng kết quả bằng thực tế.",
      simulationResult: {
        q1: "Đưa ra các hành động cụ thể: 1) Nhắn tin hẹn gặp trực tiếp tại địa điểm yên tĩnh. 2) Chủ động lắng nghe phản hồi của đối phương không phán xét trong 15 phút đầu. 3) Nhận lỗi cụ thể về phần mình trước. Tiêu chuẩn kiểm chứng chân lý: Sự chuyển biến trong thái độ hợp tác thực tế của người bạn.",
        q2: "Kế hoạch phát triển bản thân phải được kiểm nghiệm qua hành động cụ thể hàng ngày. Thay vì lập kế hoạch vĩ mô, hãy thực hiện ngay: cam kết dành 45 phút mỗi ngày học viết mã/ngoại ngữ, hoàn thành ít nhất 1 sản phẩm thực tế mỗi tuần. Sự tiến bộ của sản phẩm chính là thước đo năng lực thực tế.",
        q3: "Kiểm chứng trước khi đưa ra quyết định đầu tư lớn: 1) Khảo sát thực tế ít nhất 5 quán có mô hình tương tự tại khu vực, thống kê lượng khách từng khung giờ. 2) Thử nghiệm pha chế và bán quy mô nhỏ trong 1 tháng. Hiệu quả kinh doanh và phản hồi thực tế của tháng thử nghiệm là tiêu chuẩn đánh giá tính khả thi."
      }
    }
  }
};

export default function AIReportPage() {
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [selectedQuery, setSelectedQuery] = useState("q1");
  const [activeFilter, setActiveFilter] = useState("comprehensive");
  const [isSigned, setIsSigned] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");

  const sectionRefs = {
    introduction: useRef<HTMLElement>(null),
    "usage-log": useRef<HTMLElement>(null),
    verification: useRef<HTMLElement>(null),
    creativity: useRef<HTMLElement>(null),
    integrity: useRef<HTMLElement>(null)
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const sections = ["introduction", "usage-log", "verification", "creativity", "integrity"];
      for (const section of sections) {
        const ref = sectionRefs[section as keyof typeof sectionRefs];
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getThemeClass = () => {
    switch (theme) {
      case "sepia":
        return "bg-[#f8f5ee] text-[#332a1e] border-neutral-300/60";
      case "dark":
        return "bg-[#18181b] text-[#f4f4f5] border-neutral-700/60";
      default:
        return "bg-white text-neutral-900 border-neutral-200";
    }
  };

  const getBodyFontClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-base leading-relaxed";
      case "lg":
        return "text-xl leading-relaxed";
      default:
        return "text-lg leading-relaxed";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentQueryObj = filterSimulationData.queries.find(q => q.id === selectedQuery);
  const currentFilterObj = filterSimulationData.filters[activeFilter as keyof typeof filterSimulationData.filters];

  return (
    <div className={`min-h-screen ${lora.variable} ${beVietnamPro.variable} ${getThemeClass()} transition-colors duration-200 font-[family-name:var(--font-lora)] print:bg-white print:text-black`}>

      {/* Non-print Top Controls Bar */}
      <div className={`sticky top-0 z-50 flex items-center justify-between px-6 py-3 border-b shadow-sm backdrop-blur-md print:hidden ${theme === "dark"
        ? "bg-[#1f1f23]/95 border-neutral-800 text-neutral-300"
        : theme === "sepia"
          ? "bg-[#f1ebe0]/95 border-[#e2d8c3] text-[#4d3e2c]"
          : "bg-neutral-50/95 border-neutral-200 text-neutral-800"
        }`}>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-1 text-sm font-semibold hover:underline opacity-80 hover:opacity-100"
          >
            <ArrowLeft size={16} /> Trang chủ
          </a>
          <span className="opacity-30">|</span>
          <span className="text-xs uppercase tracking-wider font-bold font-[family-name:var(--font-be-vietnam)]">
            Báo cáo Ứng dụng AI (Tiêu chí 4)
          </span>
        </div>

        <div className="flex items-center gap-6 font-[family-name:var(--font-be-vietnam)]">
          {/* Font size selectors */}
          <div className="flex items-center gap-1.5 border-r pr-4 border-neutral-300/50">
            <Type size={14} className="opacity-60" />
            <button
              onClick={() => setFontSize("sm")}
              className={`w-6 h-6 rounded text-xs font-bold ${fontSize === "sm" ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900" : "hover:bg-neutral-200/50 dark:hover:bg-neutral-800"}`}
              title="Cỡ chữ nhỏ"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("md")}
              className={`w-6 h-6 rounded text-xs font-bold ${fontSize === "md" ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900" : "hover:bg-neutral-200/50 dark:hover:bg-neutral-800"}`}
              title="Cỡ chữ thường"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`w-6 h-6 rounded text-xs font-bold ${fontSize === "lg" ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900" : "hover:bg-neutral-200/50 dark:hover:bg-neutral-800"}`}
              title="Cỡ chữ lớn"
            >
              A+
            </button>
          </div>

          {/* Theme selectors */}
          <div className="flex items-center gap-2 border-r pr-4 border-neutral-300/50">
            <button
              onClick={() => setTheme("light")}
              className={`p-1 rounded ${theme === "light" ? "bg-neutral-200 dark:bg-neutral-800" : "opacity-60 hover:opacity-100"}`}
              title="Giao diện Sáng (Ivory)"
            >
              <Sun size={15} />
            </button>
            <button
              onClick={() => setTheme("sepia")}
              className={`p-1 rounded ${theme === "sepia" ? "bg-neutral-200 dark:bg-neutral-800" : "opacity-60 hover:opacity-100"}`}
              title="Giao diện Sepia (Dịu mắt)"
            >
              <FlameKindling size={15} />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-1 rounded ${theme === "dark" ? "bg-neutral-200 dark:bg-neutral-800" : "opacity-60 hover:opacity-100"}`}
              title="Giao diện Tối"
            >
              <Moon size={15} />
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 flex gap-12">

        {/* Simple Document Navigator - Left Sidebar (Desktop only) */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start print:hidden font-[family-name:var(--font-be-vietnam)]">
          <div className="border-l border-neutral-300/60 pl-4 py-2 space-y-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Mục lục văn bản
            </span>
            <button
              onClick={() => sectionRefs.introduction.current?.scrollIntoView({ behavior: "smooth" })}
              className={`block text-xs text-left hover:underline w-full ${activeSection === "introduction" ? "font-bold text-cyan-600 dark:text-cyan-400" : "opacity-70"}`}
            >
              Thông tin chung
            </button>
            <button
              onClick={() => sectionRefs["usage-log"].current?.scrollIntoView({ behavior: "smooth" })}
              className={`block text-xs text-left hover:underline w-full ${activeSection === "usage-log" ? "font-bold text-cyan-600 dark:text-cyan-400" : "opacity-70"}`}
            >
              1. Nhật ký Sử dụng AI
            </button>
            <button
              onClick={() => sectionRefs.verification.current?.scrollIntoView({ behavior: "smooth" })}
              className={`block text-xs text-left hover:underline w-full ${activeSection === "verification" ? "font-bold text-cyan-600 dark:text-cyan-400" : "opacity-70"}`}
            >
              2. Kiểm chứng Nguồn gốc
            </button>
            <button
              onClick={() => sectionRefs.creativity.current?.scrollIntoView({ behavior: "smooth" })}
              className={`block text-xs text-left hover:underline w-full ${activeSection === "creativity" ? "font-bold text-cyan-600 dark:text-cyan-400" : "opacity-70"}`}
            >
              3. Minh chứng Sáng tạo
            </button>
            <button
              onClick={() => sectionRefs.integrity.current?.scrollIntoView({ behavior: "smooth" })}
              className={`block text-xs text-left hover:underline w-full ${activeSection === "integrity" ? "font-bold text-cyan-600 dark:text-cyan-400" : "opacity-70"}`}
            >
              4. Cam kết Liêm chính
            </button>
          </div>
        </aside>

        {/* Main Document Content */}
        <main className="flex-1 max-w-3xl min-w-0">

          {/* Formal Cover Header */}
          <section
            id="introduction"
            ref={sectionRefs.introduction}
            className="mb-12 pb-10 border-b border-neutral-300/60 text-center md:text-left"
          >
            <div className="border-b-4 border-double border-neutral-800 dark:border-neutral-200 pb-6 mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white uppercase">
                Báo cáo Ứng dụng AI Có trách nhiệm
              </h1>
              <p className="text-base sm:text-lg tracking-wide uppercase opacity-85 font-semibold">
                Minh bạch công cụ – Tôn trọng thực tiễn – Bảo vệ liêm chính học thuật
              </p>
            </div>

            {/* Academic Metadata Sheet */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm max-w-xl mb-8 font-[family-name:var(--font-be-vietnam)] text-left">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">Học phần</span>
                <span className="font-semibold">Lý luận Chính trị - Triết học Mác - Lênin</span>
              </div>
            </div>

            <div className={`${getBodyFontClass()} text-justify space-y-4`}>
              <p>
                Nhằm đáp ứng yêu cầu giảng dạy và học tập học phần Lý luận chính trị, nhóm tác giả PhiloPrompt đã nghiên cứu, thiết kế và phát triển hệ sinh thái phần mềm hỗ trợ học tập trực quan. Trong suốt quá trình triển khai dự án, nhóm đã áp dụng triệt để nguyên tắc ứng dụng công nghệ thông minh (AI) đi đôi với trách nhiệm học thuật và tính liêm chính nghiêm ngặt.
              </p>
              <p>
                Văn bản này trình bày chi tiết về nhật ký sử dụng công cụ AI, cơ chế đối chiếu kiểm chứng nguồn gốc tài liệu giáo khoa chính thống, giới hạn phạm vi đóng góp của AI và cam kết chịu trách nhiệm của các thành viên đối với toàn bộ nội dung sản phẩm cuối cùng.
              </p>
            </div>
          </section>

          {/* Section 1: Nhật Ký Sử Dụng AI (Tiêu chí 4.1) */}
          <section
            id="usage-log"
            ref={sectionRefs["usage-log"]}
            className="mb-16 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold tracking-tight mb-4 border-b border-neutral-300 pb-2">
              1. Nhật Ký Sử Dụng AI - AI Usage Log (Tiêu chí 4.1)
            </h2>

            <p className={`${getBodyFontClass()} text-justify mb-6`}>
              Bảng dưới đây phân định rõ ràng giữa đầu ra thô ban đầu do AI gợi ý (AI Output) và phần can thiệp, biên soạn lại hoặc cấu trúc lại của sinh viên (Human Edit) để phù hợp với lý thuyết Triết học chính thống và thiết kế thực tế của hệ thống.
            </p>

            {/* Formal Report Table */}
            <div className="overflow-x-auto border border-neutral-300 rounded-lg shadow-sm mb-6 print:overflow-visible">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-b border-neutral-300">
                    <th className="border-r border-neutral-300 p-3 font-bold w-1/4">Công cụ & Mục đích</th>
                    <th className="border-r border-neutral-300 p-3 font-bold w-1/4">Câu lệnh chính (Prompt)</th>
                    <th className="border-r border-neutral-300 p-3 font-bold w-1/4">Kết quả thô (AI Output)</th>
                    <th className="p-3 font-bold w-1/4">Sinh viên Biên soạn (Human Edit)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-300 text-neutral-800 dark:text-neutral-300">
                  <tr className="align-top">
                    <td className="border-r border-neutral-300 p-3 font-semibold bg-neutral-50/50 dark:bg-neutral-900/50">
                      Antigravity IDE
                      <span className="block text-[10px] font-normal opacity-70 mt-1 font-[family-name:var(--font-be-vietnam)]">Mục đích: Thiết kế Component</span>
                    </td>
                    <td className="border-r border-neutral-300 p-3 font-mono text-[11px] leading-relaxed">
                      "Tạo component cho thẻ Flip Card (thẻ lật) hiển thị nội dung JSON. Áp dụng hiệu ứng kính mờ (glass morphism) bằng CSS."
                    </td>
                    <td className="border-r border-neutral-300 p-3 text-xs">
                      Khởi tạo được khung layout cơ bản và các class CSS tĩnh, nhưng chưa render được dữ liệu động và vỡ layout trên màn hình nhỏ.
                    </td>
                    <td className="p-3 text-xs bg-emerald-500/5 dark:bg-emerald-500/10 font-medium">
                      Nhóm tự thiết kế lại luồng truyền dữ liệu (props) từ file JSON, sửa lỗi hiển thị trên thiết bị di động (Responsive) và tinh chỉnh hiệu ứng chuyển cảnh cho khớp với kịch bản game.
                    </td>
                  </tr>
                  <tr className="align-top">
                    <td className="border-r border-neutral-300 p-3 font-semibold bg-neutral-50/50 dark:bg-neutral-900/50">
                      Gemini
                      <span className="block text-[10px] font-normal opacity-70 mt-1 font-[family-name:var(--font-be-vietnam)]">Mục đích: Biên soạn lỗi văn bản</span>
                    </td>
                    <td className="border-r border-neutral-300 p-3 font-mono text-[11px] leading-relaxed">
                      "Đóng vai người duyệt bản thảo. Rà soát lỗi chính tả trong đoạn JSON sau. Tuyệt đối không thay đổi các thuật ngữ Triết học chuyên ngành."
                    </td>
                    <td className="border-r border-neutral-300 p-3 text-xs">
                      Phát hiện một số lỗi gõ phím, diễn đạt lặp từ và đề xuất cách ngắt câu cho gãy gọn hơn.
                    </td>
                    <td className="p-3 text-xs bg-emerald-500/5 dark:bg-emerald-500/10 font-medium">
                      Nhóm kiểm duyệt thủ công từng đề xuất của Gemini. Chỉ áp dụng các sửa đổi về mặt ngữ pháp, kiên quyết từ chối các đề xuất làm mất đi tính hàn lâm và bản chất cốt lõi của lý thuyết Triết học.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: Trung Tâm Kiểm Chứng Nguồn Gốc (Tiêu chí 4.2) */}
          <section
            id="verification"
            ref={sectionRefs.verification}
            className="mb-16 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold tracking-tight mb-4 border-b border-neutral-300 pb-2">
              2. Trung Tâm Kiểm Chứng Nguồn Gốc (Tiêu chí 4.2)
            </h2>

            <p className={`${getBodyFontClass()} text-justify mb-6`}>
              Nhằm đảm bảo tính chính xác khoa học lý luận, mọi nội dung thông tin do AI gợi ý hoặc kiểm tra đều được nhóm thực hiện quy trình đối chiếu chéo (cross-reference) nghiêm ngặt với các tài liệu chính thống. Cụ thể đối với học phần **Chương II: Chủ nghĩa Duy vật Biện chứng**:
            </p>

            <ul className="space-y-4 font-[family-name:var(--font-be-vietnam)] text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-emerald-600 dark:text-emerald-400 shrink-0"><CheckCircle size={16} /></span>
                <div>
                  <strong>Giáo trình Chính trị gốc (Textbook):</strong> Nguồn giáo trình chuẩn của Bộ Giáo dục & Đào tạo.
                  <a
                    href="https://drive.google.com/file/d/1aRcwVpM1m93bCbhdlRriEuCIqVcYi-3D/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline ml-2"
                  >
                    Xem tài liệu drive <ExternalLink size={12} />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-emerald-600 dark:text-emerald-400 shrink-0"><CheckCircle size={16} /></span>
                <div>
                  <strong>Hệ thống Bài giảng Canva (Slot 2, 3, 4):</strong> Tài liệu giảng dạy chính thức được duyệt trên lớp của giảng viên môn Triết học Mác - Lênin.
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs">
                    <a
                      href="https://www.canva.com/design/DAHJZbu3RFA/bq8Dr5ClV8FGUK0Yo2xxpA/edit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                    >
                      Slide Slot 2 <ExternalLink size={10} />
                    </a>
                    <a
                      href="https://www.canva.com/design/DAHKAoXbjS0/h90EKJmN5oBgy0K8R6n-Gw/edit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                    >
                      Slide Slot 3 <ExternalLink size={10} />
                    </a>
                    <a
                      href="https://www.canva.com/design/DAHJ_2o_30E/AxPZtUdEoDyDmyyGVBxhwQ/edit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                    >
                      Slide Slot 4 <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: Minh Chứng Ứng Dụng Sáng Tạo (Tiêu chí 4.3) */}
          <section
            id="creativity"
            ref={sectionRefs.creativity}
            className="mb-16 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold tracking-tight mb-4 border-b border-neutral-300 pb-2">
              3. Minh Chứng Ứng Dụng Sáng Tạo (Tiêu chí 4.3)
            </h2>

            <div className={`${getBodyFontClass()} text-justify space-y-4 mb-6`}>
              <p>
                Vai trò của AI trong dự án hoàn toàn mang tính chất hỗ trợ kỹ thuật (tạo khung giao diện, soát lỗi văn bản, và tối ưu cú pháp lập trình) chứ không được sử dụng để viết thế tư duy của con người.
              </p>
              <p>
                <strong>Scroll-telling Infographic:</strong> Nhóm phát triển thuật toán cuộn trang trực quan hóa. AI hỗ trợ chuyển hóa mối quan hệ biện chứng thành mã JavaScript tương tác động thay vì các trang thuyết trình tĩnh truyền thống.
              </p>
              <p>
                <strong>Jailbreak AI Game (Module 4):</strong> Ứng dụng AI giúp sinh khung câu hỏi trắc nghiệm khách quan để nhóm cấu trúc lại thành trò chơi giải cứu hệ thống bảo mật qua quét mã QR Code thực tế.
              </p>
              <p>
                <strong>Gương Ma Thuật (Module 2 - Interactive Prompt Builder):</strong> Thiết kế màng lọc hệ thống (System Prompts) nắn chỉnh tư duy của mô hình ngôn ngữ AI theo đúng phương pháp luận triết học Mác - Lênin. Khi người dùng nhập câu lệnh, hệ thống tự động gắn thêm các quy tắc ràng buộc chặt chẽ sau:
              </p>
            </div>

            {/* Interactive Mind-Filter Table Suite */}
            <div className={`p-6 border rounded-xl shadow-sm mb-6 ${theme === "dark" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-50 border-neutral-200"
              }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-300 mb-6 font-[family-name:var(--font-be-vietnam)]">
                <div>
                  <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
                    Kiểm thử màng lọc triết học "Gương Ma Thuật"
                  </h4>
                  <span className="text-xs opacity-70">Mô phỏng tác động của System Prompt ẩn vào câu hỏi thô</span>
                </div>

                {/* Minimal Select */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold opacity-70">Câu hỏi thử:</span>
                  <select
                    value={selectedQuery}
                    onChange={(e) => setSelectedQuery(e.target.value)}
                    className={`text-xs font-medium py-1 px-2 rounded border focus:outline-none focus:ring-1 focus:ring-neutral-400 ${theme === "dark"
                      ? "bg-neutral-800 border-neutral-700 text-neutral-200"
                      : "bg-white border-neutral-300 text-neutral-800"
                      }`}
                  >
                    {filterSimulationData.queries.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Input section */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1">
                  Đầu vào thô (Raw Query)
                </span>
                <p className="text-sm border-l-2 border-neutral-400 pl-3 italic opacity-90">
                  "{currentQueryObj?.rawText}"
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 font-[family-name:var(--font-be-vietnam)]">
                {Object.entries(filterSimulationData.filters).map(([key, filter]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${activeFilter === key
                      ? "bg-neutral-800 text-white border-neutral-800 dark:bg-neutral-200 dark:text-neutral-900 dark:border-neutral-200 font-bold"
                      : "bg-transparent border-neutral-300 hover:border-neutral-400 opacity-70 hover:opacity-100"
                      }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>

              {/* Result blocks */}
              <div className="space-y-4 text-xs font-[family-name:var(--font-be-vietnam)]">
                <div className="bg-neutral-200/40 dark:bg-neutral-850 p-4 rounded border border-neutral-300/50">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 block mb-1.5">
                    Hệ thống chèn System Prompt ẩn:
                  </span>
                  <p className="italic opacity-80">{currentFilterObj.systemPrompt}</p>
                </div>

                <div className="bg-white dark:bg-neutral-950 p-4 rounded border border-neutral-300/70">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1.5">
                    Đầu ra sau khi qua màng lọc ({currentFilterObj.name}):
                  </span>
                  <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                    {currentFilterObj.simulationResult[selectedQuery as keyof typeof currentFilterObj.simulationResult]}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Cam Kết Liêm Chính Học Thuật (Tiêu chí 4.4) */}
          <section
            id="integrity"
            ref={sectionRefs.integrity}
            className="mb-16 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold tracking-tight mb-4 border-b border-neutral-300 pb-2">
              4. Cam Kết Liêm Chính Học Thuật (Tiêu chí 4.4)
            </h2>

            {/* Formal academic pledge certificate border */}
            <div className={`p-8 border-2 border-neutral-400 rounded-lg text-justify max-w-2xl mx-auto ${theme === "dark" ? "bg-neutral-900/40" : "bg-neutral-50/50"
              }`}>
              <h3 className="text-xl font-bold text-center uppercase tracking-wide mb-6">
                Bản Cam Kết Liêm Chính Học Thuật
              </h3>

              <div className={`${getBodyFontClass()} space-y-4 mb-8 font-light leading-relaxed`}>
                <p>
                  Thực hiện dự án xây dựng ứng dụng PhiloPrompt này, tập thể nhóm chúng em xin gửi lời cam kết chân thành và nghiêm túc nhất về tính liêm chính trong học thuật.
                </p>
                <p>
                  Toàn bộ nền tảng lý luận, cách chúng em xây dựng cấu trúc logic cũng như thông điệp cốt lõi gửi gắm trong sản phẩm đều là kết quả của quá trình tự học hỏi, tự nghiên cứu và chắt lọc từ giáo trình lý luận chính trị và các bài giảng chính thống được cung cấp trên lớp học.
                </p>
                <p>
                  Chúng em xin chịu trách nhiệm hoàn toàn về tính chính xác, tính trung thực và giá trị khoa học của sản phẩm cuối cùng này.
                </p>
              </div>

              {/* Signature Sheet */}
              {/* <div className="border-t border-neutral-300 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 font-[family-name:var(--font-be-vietnam)] text-sm">
                <div>
                  <span className="block text-xs opacity-60">ĐẠI DIỆN TÁC GIẢ</span>
                  <span className="font-semibold">PhiloPrompt Group</span>
                </div>
                
                <div className="text-center sm:text-right">
                  {isSigned ? (
                    <div>
                      <span className="block text-xs opacity-60">Xác nhận ký điện tử:</span>
                      <span className="font-semibold italic text-blue-600 dark:text-blue-400 text-base">
                        /s/ PhiloPrompt_Group_2026
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsSigned(true)}
                      className="px-4 py-2 border border-neutral-800 dark:border-neutral-200 text-xs font-bold uppercase rounded hover:bg-neutral-800 hover:text-white dark:hover:bg-neutral-200 dark:hover:text-neutral-900 transition-all cursor-pointer"
                    >
                      Ký xác nhận cam kết
                    </button>
                  )}
                </div>
              </div> */}
            </div>
          </section>

          {/* Simple Academic Footer */}
          <div className="mt-16 pt-6 border-t border-neutral-300/50 flex flex-col sm:flex-row items-center justify-between text-xs opacity-60 font-[family-name:var(--font-be-vietnam)]">
            <p>© 2026 PhiloPrompt. Báo cáo đánh giá ứng dụng trợ lý học tập.</p>
            <p className="print:hidden">Văn bản định dạng tối giản, hỗ trợ in ấn chính thức.</p>
          </div>

        </main>
      </div>
    </div>
  );
}
