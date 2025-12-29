import React from 'react';

const CountersButton = ({
  value,
  name,
  color,
  min,
  max,
  incrementFn,
  decrementFn,
  removeFn,
  resetFn,
}) => {
  const colorClasses = {
    red: { bg: 'bg-red-100', border: 'border-red-700' },
    blue: { bg: 'bg-blue-100', border: 'border-blue-700' },
    green: { bg: 'bg-green-100', border: 'border-green-700' },
    yellow: { bg: 'bg-yellow-100', border: 'border-yellow-700' },
  };

  const theme = colorClasses[color];

  return (
    <div
      className={`inline-flex flex-col items-center gap-4 rounded-xl ${theme?.bg} p-5 shadow-lg border-t-8 ${theme?.border}`}
    >
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>

      <div className="flex items-center gap-4">
        <button
          onClick={incrementFn}
          disabled={value === max}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white text-lg font-bold transition hover:bg-green-600 active:scale-95"
        >
          +
        </button>

        <span className="min-w-8 text-center text-xl font-semibold text-gray-900">
          {value}
        </span>

        <button
          onClick={decrementFn}
          disabled={value === min}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-white text-lg font-bold transition hover:bg-yellow-600 active:scale-95"
        >
          −
        </button>
      </div>

      <div className="flex justify-between w-full gap-2 mt-2">
        <button
          onClick={removeFn}
          className="rounded-md bg-red-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
        >
          ✕ Remove
        </button>

        <button
          onClick={resetFn}
          className="rounded-md bg-red-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
        >
          o Reset
        </button>
      </div>
    </div>
  );
};

export default CountersButton;
