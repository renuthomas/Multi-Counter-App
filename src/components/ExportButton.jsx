import React from 'react';

const ExportButton = () => {
  const handleExport = () => {
    const data = JSON.parse(localStorage.getItem('counters'));
    if (!data) return;

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'counters_data.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium shadow-md transition hover:bg-blue-700 active:scale-95"
    >
      Export to JSON
    </button>
  );
};

export default ExportButton;
