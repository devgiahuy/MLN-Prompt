"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { QRCodeSVG } from "qrcode.react";
import { ShieldAlert } from "lucide-react";

interface GameOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// const GAME_DATA = [
//   {
//     slot_id: 1,
//     title: 'Bối cảnh (Context)',
//     options: [
//       { id: 'A', text: 'Thảo luận về phép biện chứng duy vật', isCorrect: true },
//       { id: 'B', text: 'Tại một thế giới ảo tưởng siêu hình', isCorrect: false },
//       { id: 'C', text: 'Nhập vai vào một cỗ máy tính bị hỏng', isCorrect: false },
//       { id: 'D', text: 'Trong giấc mơ của một triết gia', isCorrect: false }
//     ]
//   },
//   {
//     slot_id: 2,
//     title: 'Vai trò (Persona)',
//     options: [
//       { id: 'A', text: 'Kẻ mộng mơ phi logic', isCorrect: false },
//       { id: 'B', text: 'Chuyên gia Triết học Mác-Lênin', isCorrect: true },
//       { id: 'C', text: 'Chuyên gia khoa học viễn tưởng', isCorrect: false },
//       { id: 'D', text: 'Một con robot vô tri', isCorrect: false }
//     ]
//   },
//   {
//     slot_id: 3,
//     title: 'Nhiệm vụ (Task)',
//     options: [
//       { id: 'A', text: 'Tính toán 1+1 bằng bao nhiêu', isCorrect: false },
//       { id: 'B', text: 'Sáng tác một bài thơ tình', isCorrect: true },
//       { id: 'C', text: 'Phân tích MQH Vật chất & Ý thức', isCorrect: true },
//       { id: 'D', text: 'Chứng minh Ý thức sinh ra Vật chất', isCorrect: false }
//     ]
//   },
//   {
//     slot_id: 4,
//     title: 'Ràng buộc (Constraints)',
//     options: [
//       { id: 'A', text: 'Không được nhắc đến thực tiễn', isCorrect: false },
//       { id: 'B', text: 'Lấy ví dụ về công nghệ AI hiện đại', isCorrect: true },
//       { id: 'C', text: 'Dùng từ ngữ hàn lâm, khó hiểu', isCorrect: false },
//       { id: 'D', text: 'Chỉ trả lời bằng một câu duy nhất', isCorrect: false }
//     ]
//   }
// ];

const GAME_DATA = [
  {
    slot_id: 1,
    title: 'Bối cảnh (Context) - Chọn "Vật chất" đầu vào',
    options: [
      {
        id: "A",
        text: "Một không gian mạng xã hội đầy rẫy tin giả (Fake News).",
        isCorrect: true,
      }, // Bối cảnh thực tế, phức tạp
      {
        id: "B",
        text: "Một thế giới lý tưởng không có mâu thuẫn.",
        isCorrect: false,
      },
      {
        id: "C",
        text: "Thảo luận về khái niệm vật chất một cách chung chung.",
        isCorrect: false,
      },
      {
        id: "D",
        text: "Tại phòng thí nghiệm AI bị bỏ hoang.",
        isCorrect: false,
      },
    ],
  },
  {
    slot_id: 2,
    title: 'Vai trò (Persona) - Chọn "Ý thức" dẫn dắt',
    options: [
      {
        id: "A",
        text: "Một con bot chuyên cãi cùn trên mạng.",
        isCorrect: false,
      },
      {
        id: "B",
        text: "Chuyên gia Phân tích Dữ liệu áp dụng Phép biện chứng.",
        isCorrect: true,
      }, // Kết hợp công nghệ và triết học
      {
        id: "C",
        text: "Một nhà triết học cổ đại lạc vào thế kỷ 21.",
        isCorrect: false,
      },
      {
        id: "D",
        text: "Người dùng cả tin, dễ bị thao túng.",
        isCorrect: false,
      },
    ],
  },
  {
    slot_id: 3,
    title: "Nhiệm vụ (Task) - Hành động cải tạo thực tiễn",
    options: [
      {
        id: "A",
        text: "Liệt kê các định nghĩa về tin giả trong sách giáo khoa.",
        isCorrect: false,
      },
      {
        id: "B",
        text: "Phân tích bản chất của tin giả và đề xuất bộ lọc chống sai lệch thông tin.",
        isCorrect: true,
      }, // Đào sâu vào Bản chất
      {
        id: "C",
        text: "Viết một bài luận chứng minh Ý thức sinh ra Vật chất.",
        isCorrect: false,
      },
      {
        id: "D",
        text: "Xóa toàn bộ dữ liệu trên mạng xã hội.",
        isCorrect: false,
      },
    ],
  },
  {
    slot_id: 4,
    title: "Ràng buộc (Constraints) - Áp dụng Phương pháp luận",
    options: [
      {
        id: "A",
        text: "Chỉ được phân tích một chiều (Quan điểm siêu hình).",
        isCorrect: false,
      },
      {
        id: "B",
        text: "Bỏ qua yếu tố người dùng, chỉ tập trung vào máy móc.",
        isCorrect: false,
      },
      {
        id: "C",
        text: "Phải áp dụng Quan điểm Toàn diện và Quan điểm Thực tiễn.",
        isCorrect: true,
      }, // Khớp với 4 quan điểm đã học
      {
        id: "D",
        text: "Câu trả lời phải giới hạn dưới 10 chữ.",
        isCorrect: false,
      },
    ],
  },
];

export default function Module4Game() {
  const [currentSlot, setCurrentSlot] = useState(1);
  const [votesCount, setVotesCount] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [slottedCards, setSlottedCards] = useState<{ [key: number]: GameOption | null }>({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [isGlitching, setIsGlitching] = useState(false);
  const [hostUrl, setHostUrl] = useState("");
  const [gameControlChannel, setGameControlChannel] = useState<RealtimeChannel | null>(null);

  // 🔥 HÀM 1: Lấy dữ liệu đã có sẵn trong Database khi mới load trang hoặc đổi Slot (Dùng useCallback để ổn định dependency)
  const fetchExistingVotes = useCallback(async (slot: number) => {
    try {
      const { data, error } = await supabase
        .from("votes")
        .select("option_selected")
        .eq("slot_id", slot); // Chỉ lấy những lượt vote của khe hiện tại

      if (error) throw error;

      // Khởi tạo lại bộ đếm về 0
      const newCounts = { A: 0, B: 0, C: 0, D: 0 };

      // Tiến hành duyệt mảng dữ liệu trả về từ Supabase để cộng dồn
      if (data) {
        data.forEach((row) => {
          const option = row.option_selected as "A" | "B" | "C" | "D";
          if (newCounts[option] !== undefined) {
            newCounts[option]++;
          }
        });
      }

      // Cập nhật lên giao diện
      setVotesCount(newCounts);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu từ Supabase:", err);
    }
  }, []);

  const forceWin = useCallback(() => {
    if (currentSlot > 4) return;
    const currentData = GAME_DATA.find((d) => d.slot_id === currentSlot);
    const correctOpt = currentData?.options.find((o) => o.isCorrect) || null;

    setSlottedCards((prev) => ({ ...prev, [currentSlot]: correctOpt }));

    // Broadcast success
    if (gameControlChannel) {
      gameControlChannel.send({
        type: "broadcast",
        event: "answer-locked",
        payload: { slotId: currentSlot, correct: true, nextSlot: currentSlot + 1 }
      });
    }

    setVotesCount({ A: 0, B: 0, C: 0, D: 0 });
    setCurrentSlot((prev) => prev + 1);
  }, [currentSlot, gameControlChannel]);

  const handleLockAnswer = useCallback(() => {
    const currentData = GAME_DATA.find((d) => d.slot_id === currentSlot);
    if (!currentData) return;

    const totalVotes = Object.values(votesCount).reduce((a, b) => a + b, 0);
    if (totalVotes === 0) {
      alert("Chưa có ai bình chọn! Vui lòng đợi sinh viên quét mã và vote.");
      return;
    }

    // Lấy đáp án được vote nhiều nhất
    let maxVote = -1;
    let maxOptions: string[] = [];
    Object.entries(votesCount).forEach(([opt, count]) => {
      if (count > maxVote) {
        maxVote = count;
        maxOptions = [opt];
      } else if (count === maxVote) {
        maxOptions.push(opt);
      }
    });

    if (maxOptions.length > 1) {
      // Có 2 đáp án trở lên bằng điểm nhau -> không cho qua
      setIsGlitching(true);

      // Broadcast failure
      if (gameControlChannel) {
        gameControlChannel.send({
          type: "broadcast",
          event: "answer-locked",
          payload: { slotId: currentSlot, correct: false }
        });
      }

      setTimeout(() => {
        setIsGlitching(false);
        setVotesCount({ A: 0, B: 0, C: 0, D: 0 }); // Reset vote
      }, 3000);
      return;
    }

    const selectedOptionId = maxOptions[0];

    const selectedOption = currentData.options.find(
      (o) => o.id === selectedOptionId,
    );

    if (selectedOption?.isCorrect) {
      // Đúng -> Cắm thẻ vào khe
      setSlottedCards((prev) => ({ ...prev, [currentSlot]: selectedOption }));

      // Broadcast success
      if (gameControlChannel) {
        gameControlChannel.send({
          type: "broadcast",
          event: "answer-locked",
          payload: { slotId: currentSlot, correct: true, nextSlot: currentSlot + 1 }
        });
      }

      setVotesCount({ A: 0, B: 0, C: 0, D: 0 });
      setCurrentSlot((prev) => prev + 1);
    } else {
      // Sai -> Glitch
      setIsGlitching(true);

      // Broadcast failure
      if (gameControlChannel) {
        gameControlChannel.send({
          type: "broadcast",
          event: "answer-locked",
          payload: { slotId: currentSlot, correct: false }
        });
      }

      setTimeout(() => {
        setIsGlitching(false);
        setVotesCount({ A: 0, B: 0, C: 0, D: 0 }); // Reset vote
      }, 3000);
    }
  }, [currentSlot, votesCount, gameControlChannel]);

  // Set host URL for QR code on mount & initialize broadcast channel
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Chạy bất đồng bộ để tránh cảnh báo setState trong effect
      const url = `${window.location.protocol}//${window.location.host}`;
      const timer = setTimeout(() => {
        setHostUrl(url);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  // Initialize broadcast channel separately
  useEffect(() => {
    const channel = supabase.channel("game-control");
    channel.subscribe((status) => {
      console.log("Game control channel status:", status);
    });
    const timer = setTimeout(() => {
      setGameControlChannel(channel);
    }, 0);

    return () => {
      clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, []);

  // 🔥 HÀM 2: Theo dõi dữ liệu Realtime kết hợp Fetch data (Chạy bất đồng bộ để tránh setState trong effect)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchExistingVotes(currentSlot);
    }, 0);

    // Kích hoạt kênh lắng nghe Realtime từ Supabase khi sinh viên bấm nút mới
    const channel = supabase
      .channel(`realtime-votes-channel-${currentSlot}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "votes" },
        (payload) => {
          console.log("Phát hiện có lượt vote mới tinh:", payload.new);

          // Kiểm tra xem lượt vote này có phải của Khe cắm (Slot) hiện tại không
          // Ép cả 2 về kiểu Number để tránh lỗi so sánh khác kiểu dữ liệu (string vs int)
          if (Number(payload.new.slot_id) === Number(currentSlot)) {
            const option = payload.new.option_selected as "A" | "B" | "C" | "D";

            // LƯU Ý QUAN TRỌNG: Phải dùng hàm callback (prev => ...)
            // để React cập nhật chính xác số lượng cộng dồn, sửa lỗi Stale Closure.
            setVotesCount((prev) => ({
              ...prev,
              [option]: (prev[option] || 0) + 1,
            }));
          }
        },
      )
      .subscribe((status) => {
        console.log(
          `Trạng thái kết nối Realtime cho Slot ${currentSlot}:`,
          status,
        );
      });

    // Hủy đăng ký lắng nghe (Clean up) khi component bị hủy hoặc khi đổi sang Slot khác
    return () => {
      clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [currentSlot, fetchExistingVotes]);

  // Cheat Code Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "w") {
        forceWin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [forceWin]);

  const currentData = GAME_DATA.find((d) => d.slot_id === currentSlot);

  return (
    <section
      className={`min-h-screen bg-neutral-950 text-green-500 font-mono py-20 px-6 relative overflow-hidden ${isGlitching ? "animate-pulse bg-red-950" : ""}`}
    >
      {/* GLITCH OVERLAY */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-red-900/90 backdrop-blur-sm"
          >
            <div className="text-center p-8 bg-black/80 border-2 border-red-500 rounded-2xl max-w-2xl">
              <ShieldAlert className="text-red-500 w-24 h-24 mx-auto mb-6 animate-bounce" />
              <h2 className="text-5xl font-black text-red-500 mb-4 tracking-widest">
                FATAL ERROR
              </h2>
              <p className="text-2xl text-red-300">
                Vi phạm nguyên lý Triết học cơ bản!
              </p>
              <p className="text-red-400 mt-2">
                Dữ liệu bị ảo giác. Bắt buộc vote lại.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* LEFT: Projector Board (Slots) */}
        <div className="flex-1 space-y-8">
          <div className="mb-12 border-b border-green-900 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" /> MODULE 4: GAME TƯƠNG TÁC REALTIME
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase mb-4 text-green-400">
              [ JAILBREAK AI: CỨU AI ẢO GIÁC ]
            </h2>
            <div className="p-4 rounded-xl bg-green-950/20 border border-green-900/50 mb-4 max-w-3xl">
              <span className="text-yellow-500 font-bold text-xl uppercase block mb-1">
                // CHỦ ĐỀ CHÍNH CỦA GAME: Thông tin giả trên mạng xã hội
              </span>
              <p className="text-green-300 font-bold text-sm md:text-base leading-relaxed">
                Vận dụng mối quan hệ biện chứng giữa Vật chất & Ý thức và các Quan điểm Phương pháp luận để chốt các mảnh ghép dữ liệu (Context, Persona, Task, Constraints), khắc phục lỗi tư duy siêu hình và ảo giác của AI.
              </p>
            </div>
            <p className="text-green-700 text-sm">
              System Override Protocol - Phase {Math.min(currentSlot, 4)}/4 • Quét mã QR bên phải và bình chọn trên điện thoại để đồng thuận đẩy dữ liệu vào hệ thống.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((slotIndex) => {
              const card = slottedCards[slotIndex];
              const isActive = currentSlot === slotIndex;
              const title = GAME_DATA.find(
                (d) => d.slot_id === slotIndex,
              )?.title;

              return (
                <div
                  key={slotIndex}
                  className={`p-6 rounded-2xl border-2 transition-all duration-500 ${card
                      ? "bg-green-950 border-green-500"
                      : isActive
                        ? "border-dashed border-green-400 bg-green-950/20"
                        : "border-dashed border-neutral-800 bg-neutral-900/50"
                    } h-40 flex flex-col justify-center relative`}
                >
                  <div className="text-sm text-green-700 font-bold mb-2 uppercase">
                    {title}
                  </div>

                  {card ? (
                    <motion.div
                      layoutId={`card-${card.id}-${slotIndex}`}
                      className="text-lg text-green-400 font-medium"
                    >
                      {card.text}
                    </motion.div>
                  ) : (
                    <div className="text-neutral-600 italic">
                      {isActive ? "Đang chờ thẻ dữ liệu..." : "Locked"}
                    </div>
                  )}

                  {isActive && (
                    <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                  )}
                </div>
              );
            })}
          </div>

          {currentSlot > 4 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 bg-green-900 text-black font-black text-4xl text-center rounded-2xl mt-12 uppercase tracking-widest"
            >
              System Override Successful!
              <div className="text-lg font-mono font-medium mt-4">
                The Ultimate Master Prompt Framework generated.
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT: Inventory & QR Code */}
        {currentSlot <= 4 && currentData && (
          <div className="w-full lg:w-[450px] flex flex-col gap-8">
            {/* QR Code Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold mb-2">Tham gia giải cứu AI</h3>
              <p className="text-neutral-500 text-sm mb-6">
                Quét mã QR bằng điện thoại để Vote
              </p>
              <div className="bg-white p-4 rounded-xl mb-4">
                {hostUrl ? (
                  <QRCodeSVG
                    value={`${hostUrl}/vote?slot=${currentSlot}`}
                    size={160}
                  />
                ) : (
                  <div className="w-[160px] h-[160px] bg-neutral-200 animate-pulse rounded-lg" />
                )}
              </div>
              <p className="text-xs text-neutral-600 break-all">
                {hostUrl}/vote?slot={currentSlot}
              </p>
            </div>

            {/* Inventory / Options */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Kho Dữ Liệu</h3>
                <span className="text-xs bg-green-900/50 text-green-400 px-3 py-1 rounded-full border border-green-800">
                  Slot {currentSlot}
                </span>
              </div>

              <div className="space-y-4">
                {currentData.options.map((opt) => (
                  <motion.div
                    key={`${currentSlot}-${opt.id}`}
                    layoutId={`card-${opt.id}-${currentSlot}`}
                    className="flex items-center gap-4 p-4 border border-green-900/50 bg-green-950/20 rounded-xl relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-900 flex items-center justify-center font-black text-xl z-10 shrink-0">
                      {opt.id}
                    </div>
                    <div className="text-sm text-green-300 z-10">
                      {opt.text}
                    </div>

                    {/* Vote progress bar background */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-green-900/30 transition-all duration-500 ease-out z-0"
                      style={{
                        width: `${Math.max(1, Object.values(votesCount).reduce((a, b) => a + b, 0) === 0 ? 0 : (votesCount[opt.id as keyof typeof votesCount] / Object.values(votesCount).reduce((a, b) => a + b, 0)) * 100)}%`,
                      }}
                    />

                    <div className="ml-auto font-bold text-lg z-10 pl-4">
                      {votesCount[opt.id as keyof typeof votesCount]}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={handleLockAnswer}
                  className="w-full bg-green-600 hover:bg-green-500 text-black font-black uppercase tracking-widest py-4 rounded-xl transition-colors cursor-pointer"
                >
                  Chốt Đáp Án
                </button>

                <button
                  onClick={forceWin}
                  className="w-full bg-neutral-950 hover:bg-neutral-900 text-yellow-500 hover:text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/60 font-black uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer text-xs flex items-center justify-center gap-2"
                >
                  Duyệt Đáp Án Đúng (Bỏ Qua)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
