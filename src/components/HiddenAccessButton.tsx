
import React, { useState } from 'react';

interface HiddenAccessButtonProps {
  onDoubleClick: () => void;
}

const HiddenAccessButton = ({ onDoubleClick }: HiddenAccessButtonProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleClick = () => {
    const now = Date.now();
    const timeDiff = now - lastClickTime;

    if (timeDiff < 500) { // Double click within 500ms
      if (clickCount === 1) {
        onDoubleClick();
        setClickCount(0);
      } else {
        setClickCount(clickCount + 1);
      }
    } else {
      setClickCount(1);
    }
    
    setLastClickTime(now);
  };

  return (
    <button
      onClick={handleClick}
      className="opacity-30 hover:opacity-50 transition-opacity duration-300 p-2"
      title="Double-tap for access"
    >
      <img 
        src="/lovable-uploads/0d3e4780-5a50-4a8e-951a-64f6098b1f99.png" 
        alt="Access" 
        className="w-12 h-12 object-contain"
      />
    </button>
  );
};

export default HiddenAccessButton;
