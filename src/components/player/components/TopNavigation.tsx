import React from "react";
import { ArrowLeft } from "lucide-react";
import { IconButton } from "@mui/material";

interface TopNavigationProps {
  onBack: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onBack }) => {
  return (
    <div className="top-navigation">
      <IconButton onClick={onBack} className="back-btn" aria-label="Go back">
        <ArrowLeft size={22} />
      </IconButton>
    </div>
  );
};
