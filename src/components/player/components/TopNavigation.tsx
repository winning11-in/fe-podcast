import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TopNavigationProps {
  onBack: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onBack }) => {
  return (
    <div className="top-navigation">
      <button onClick={onBack} className="back-btn" aria-label="Go back">
        <ArrowLeft size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
};