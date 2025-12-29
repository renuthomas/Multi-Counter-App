import { useEffect, useState } from 'react';
import CountersButton from './components/CountersButton.jsx';
import ExportButton from "./components/ExportButton.jsx";

function App() {
  const [counters, setCounters] = useState(()=>{
    const getCounters=JSON.parse(localStorage.getItem("counters")) || [];
    return getCounters;
  });
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [stepCounter, setStepCounter] = useState(1);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [color, setColor] = useState('red');
  const [history, setHistory] = useState(()=>{
    const localHistory=localStorage.getItem("history");
    if(localHistory){
      const getHistory=JSON.parse(localHistory);
      return getHistory;
    }else{
      return [[]];
    }   
  });
  
  const [historyIndex, setHistoryIndex] = useState(()=>{
    const localHistoryIndex=localStorage.getItem("historyIndex");
    if(localHistoryIndex){
      const getHistoryIndex=JSON.parse(localHistoryIndex);
      return getHistoryIndex;
    }else{
      return 0;
    }
  });

  const total = counters.reduce((acc, curr) => acc + curr.value, 0);


  useEffect(()=>{
    localStorage.setItem("counters",JSON.stringify(counters));
  },[counters])

  useEffect(()=>{
    localStorage.setItem("history",JSON.stringify(history));
    localStorage.setItem("historyIndex",historyIndex)
  },[history,historyIndex]);

  const pushHistory = (counter) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(counter);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setCounters(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setCounters(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  const addCounter = () => {
    if (!name.trim()) return;

    const newCounters = [
      ...counters,
      {
        id: Date.now(),
        value: minValue,
        min: minValue,
        max: maxValue,
        name,
        customStepSize: stepCounter,
        customColor: color,
      },
    ];

    setCounters(newCounters);
    pushHistory(newCounters);

    setShowForm(false);
    setMinValue(0);
    setMaxValue(100);
    setName('');
    setStepCounter(1);
    setColor('red');
  };

  const incrementCounter = (id) => {
    const newCounters = counters.map((counter) =>
      counter.id === id
        ? { ...counter, value: Math.min(counter.max, counter.value + counter.customStepSize) }
        : counter
    );
    setCounters(newCounters);
    pushHistory(newCounters);
  };

  const decrementCounter = (id) => {
    const newCounters = counters.map((counter) =>
      counter.id === id
        ? { ...counter, value: Math.max(counter.min, counter.value - counter.customStepSize) }
        : counter
    );
    setCounters(newCounters);
    pushHistory(newCounters);
  };

  const resetCounter = (id) => {
    const newCounters = counters.map((counter) =>
      counter.id === id ? { ...counter, value: counter.min } : counter
    );
    setCounters(newCounters);
    pushHistory(newCounters);
  };

  const removeCounter = (id) => {
    const newCounters = counters.filter((counter) => counter.id !== id);
    setCounters(newCounters);
    pushHistory(newCounters);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Multi-Counter App</h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={undo}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium shadow-md transition hover:bg-blue-700 active:scale-95"
          >
            Undo
          </button>

          <button
            onClick={redo}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium shadow-md transition hover:bg-blue-700 active:scale-95"
          >
            Redo
          </button>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium shadow-md transition hover:bg-blue-700 active:scale-95"
          >
            + Add New Counter
          </button>
            <ExportButton/>
        </div>

        <h2 className="mb-6 text-xl font-semibold">Total Value: {total}</h2>

        {/* Add Counter Form */}
        {showForm && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCounter();
            }}
            className="mx-auto mb-8 max-w-md rounded-xl bg-white p-6 shadow-lg text-left space-y-4"
          >
            {/* Counter Name */}
            <div className="space-y-1">
              <label htmlFor="counter-name" className="block text-sm font-medium text-gray-700">
                Counter Name
              </label>
              <input
                id="counter-name"
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="My Counter"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Step Size */}
            <div className="space-y-1">
              <label htmlFor="step-size" className="block text-sm font-medium text-gray-700">
                Step Size
              </label>
              <input
                id="step-size"
                type="number"
                min={0}
                value={stepCounter}
                onChange={(e) => setStepCounter(Number(e.target.value))}
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Min & Max */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Min & Max Value</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min={0}
                  value={minValue}
                  onChange={(e) => setMinValue(Number(e.target.value))}
                  placeholder="Min"
                  className="w-24 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  min={1}
                  value={maxValue}
                  onChange={(e) => setMaxValue(Number(e.target.value))}
                  placeholder="Max"
                  className="w-24 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Counter Color</label>
              <div className="flex gap-4">
                {['red', 'blue', 'green', 'yellow'].map((c) => {
                  const bgColor = {
                    red: 'bg-red-600',
                    blue: 'bg-blue-600',
                    green: 'bg-green-600',
                    yellow: 'bg-yellow-400',
                  }[c];
                    
                  return (
                    <label key={c} className="cursor-pointer">
                      <input
                        type="radio"
                        value={c}
                        checked={color === c}
                        onChange={(e) => setColor(e.target.value)}
                        className="sr-only peer"
                      />
                      <span
                        className={`inline-block h-6 w-6 rounded-full ${bgColor} peer-checked:ring-2 peer-checked:ring-black peer-checked:ring-offset-2`}
                      />
                    </label>
                  );
                })}
              </div>
            </div>


            {/* Submit */}
            <button type="submit" className="w-full rounded-lg bg-green-600 py-2 text-white font-medium transition hover:bg-green-700 active:scale-95">
              Add Counter
            </button>
          </form>
        )}

        {/* Counters */}
        <div className="flex flex-wrap justify-center gap-6">
          {counters.map((counter) => (
            <CountersButton
              key={counter.id}
              value={counter.value}
              name={counter.name}
              color={counter.customColor}
              min={counter.min}
              max={counter.max}
              incrementFn={() => incrementCounter(counter.id)}
              decrementFn={() => decrementCounter(counter.id)}
              removeFn={() => removeCounter(counter.id)}
              resetFn={() => resetCounter(counter.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
