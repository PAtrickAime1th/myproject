import React from "react";
import OptionButton from "./OptionButton";

export default function QuestionCard({ question, onSelect }) {
  return (
    <div className="border border-primary rounded p-4 my-4 bg-secondary text-primary">
      <p className="font-semibold mb-2">{question.question_text}</p>
      <div className="flex flex-col space-y-2">
        {question.options?.map(opt => (
          <OptionButton key={opt.id} option={opt} onSelect={() => onSelect(question.id, opt.id)} />
        ))}
      </div>
    </div>
  );
}