import React from "react";

export default function OptionButton({ option, onSelect }) {
  return (
    <button
      className="border border-primary rounded px-4 py-2 bg-primary text-secondary hover:bg-secondary hover:text-primary transition-colors"
      onClick={onSelect}
    >
      {option.option_text}
    </button>
  );
}