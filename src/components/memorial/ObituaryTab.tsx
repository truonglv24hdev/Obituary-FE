import React from "react";
import {
  RectangleEllipsis,
  Book,
  TreePine,
  BookHeart,
  Hourglass,
  Calendar,
  BookCopy,
} from "lucide-react";

const tabs = [
  { icon: RectangleEllipsis, label: "Words from family" },
  { icon: Book, label: "Life Story" },
  { icon: TreePine, label: "Family Tree" },
  { icon: BookHeart, label: "Favorites" },
  { icon: Hourglass, label: "Timeline" },
  { icon: Calendar, label: "Events" },
  { icon: BookCopy, label: "Guest Book" },
];

const ObituaryTab = ({ premium }: { premium?: boolean }) => {
  const visibleTabs = premium
    ? tabs
    : tabs.filter((tab) =>
        ["Words from family", "Life Story", "Events"].includes(tab.label)
      );

  return (
    <>
      {visibleTabs.map((tab, idx) => (
        <div key={idx} className="flex gap-2 justify-between items-center">
          <tab.icon className="w-6 h-6 text-emerald-600" />
          <span className="text-lg museo">{tab.label}</span>
        </div>
      ))}
    </>
  );
};

export default ObituaryTab;
