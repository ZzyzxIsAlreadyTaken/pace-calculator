import { Button } from "./Button";
import type { Dispatch, SetStateAction } from "react";
import type { TabType } from "../types";
import { useRef, useState } from "react";

interface TabsProps {
  activeTab: TabType;
  setActiveTab: Dispatch<SetStateAction<TabType>>;
}

const tabs = [
  { key: "pace", label: "Pace Calculator" },
  { key: "time", label: "Time Calculator" },
  { key: "paceSpeed", label: "Pace Speed Converter" },
  { key: "riegel", label: "Riegel's Formula" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function getTabColor(tabKey: TabKey, isActive: boolean) {
  if (!isActive) return "text-gray-700 hover:bg-gray-200";
  switch (tabKey) {
    case "pace":
      return "bg-blue-600 text-white hover:bg-blue-700";
    case "time":
      return "bg-emerald-600 text-white hover:bg-emerald-700";
    case "paceSpeed":
      return "bg-orange-600 text-white hover:bg-orange-700";
    case "riegel":
      return "bg-purple-600 text-white hover:bg-purple-700";
    default:
      return "";
  }
}

function getTabRounding(idx: number, total: number) {
  if (idx === 0) return "rounded-none sm:rounded-l-lg";
  if (idx === total - 1) return "rounded-none sm:rounded-r-lg";
  return "rounded-none";
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // Hide fade if scrolled to (or near) the end
    setShowFade(el.scrollLeft + el.offsetWidth < el.scrollWidth - 4);
  };

  return (
    <nav className="flex justify-center mt-4 sm:mt-8 mb-4 sm:mb-8 relative">
      <div
        ref={scrollRef}
        className="flex w-full sm:max-w-2xl bg-gray-100 sm:rounded-lg border border-gray-200 min-w-0
          overflow-x-auto whitespace-nowrap scroll-snap-x mandatory sm:overflow-x-visible sm:whitespace-normal sm:scroll-snap-none relative"
        style={{ WebkitOverflowScrolling: "touch" }}
        onScroll={handleScroll}
      >
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.key;
          const colorClass = getTabColor(tab.key, isActive);
          const roundingClass = getTabRounding(idx, tabs.length);
          return (
            <Button
              key={tab.key}
              className={`flex-1 min-w-[120px] max-w-xs px-4 py-4 font-semibold transition-colors text-center whitespace-normal scroll-snap-align-start cursor-grab ${colorClass} ${roundingClass}`}
              onClick={() => setActiveTab(tab.key as TabKey)}
            >
              {tab.label}
            </Button>
          );
        })}
        {/* Fade-out gradient indicator, only on mobile and only if not at end */}
        {showFade && (
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:hidden"
            style={{
              background: "linear-gradient(to left, #f3f4f6 70%, transparent)",
            }}
          />
        )}
      </div>
    </nav>
  );
}
