import * as React from 'react';

export const ProgressBar = ({ value, total }) => {
  const percentage = Math.ceil((value / total) * 100);
  return <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-between">
      <div>
      </div>
      <div className="text-right">
        <span className="text-xs font-semibold inline-block text-white">{percentage} %</span>
      </div>
    </div>
    <div className="overflow-hidden h-10 mb-4 text-xs flex rounded bg-white">
      <div style={{ width: percentage + "%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500 transition-width"></div>
    </div>
  </div>
};
