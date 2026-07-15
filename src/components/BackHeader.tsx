import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface BackHeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: React.ReactNode;
  onRightClick?: () => void;
}

export default function BackHeader({ title, onBack, rightIcon, onRightClick }: BackHeaderProps) {
  const navigate = useNavigate();

  return (
    <div
      className="sticky top-0 z-40 backdrop-blur-md px-4 py-3 flex items-center justify-between animate-[slideIn_0.3s_ease]"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <button
        onClick={() => { if (onBack) onBack(); else navigate(-1); }}
        className="w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-all"
        style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h1 className="text-base font-bold flex-1 text-center" style={{ color: "var(--color-text)" }}>
        {title}
      </h1>
      <div className="w-10 h-10 flex items-center justify-center">
        {rightIcon && (
          <button
            onClick={onRightClick}
            className="w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-all"
            style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}
