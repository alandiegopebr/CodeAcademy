'use client';

import { useMemo, useState } from 'react';

const questions = [
  {
    question: 'What hook is used to manage local component state?',
    options: ['useEffect', 'useState', 'useMemo', 'useContext'],
    answer: 'useState',
  },
  {
    question: 'Which tool is commonly used to style a Next.js app quickly?',
    options: ['Tailwind CSS', 'Docker', 'Redux', 'MongoDB'],
    answer: 'Tailwind CSS',
  },
  {
    question: 'What does Firebase Firestore store?',
    options: ['Only images', 'Documents in collections', 'Machine code', 'SSH keys'],
    answer: 'Documents in collections',
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = useMemo(() => questions[step], [step]);

  function handleAnswer(option: string) {
    setSelected(option);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    if (step === questions.length - 1) {
      setFinished(true);
      return;
    }
    setSelected(null);
    setStep((prev) => prev + 1);
  }

  function resetQuiz() {
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-6 text-slate-100">
        <h2 className="text-lg font-semibold text-white">Practice quiz complete</h2>
        <p className="mt-3 text-sm text-slate-400">You scored {score} out of {questions.length}.</p>
        <button onClick={resetQuiz} className="mt-5 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Try again
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/70 p-6 text-slate-100">
      <h2 className="text-lg font-semibold text-white">Practice quiz</h2>
      <p className="mt-2 text-sm text-slate-400">Review your knowledge with short, interactive questions.</p>
      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <p className="text-sm text-slate-400">Question {step + 1} of {questions.length}</p>
        <p className="mt-3 text-lg font-semibold text-white">{currentQuestion.question}</p>
        <div className="mt-4 space-y-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={Boolean(selected)}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${selected === option ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100' : 'border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-500'}`}
            >
              {option}
            </button>
          ))}
        </div>
        {selected && (
          <button onClick={nextQuestion} className="mt-5 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            {step === questions.length - 1 ? 'Finish' : 'Next question'}
          </button>
        )}
      </div>
    </section>
  );
}
