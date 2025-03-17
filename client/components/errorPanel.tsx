import React from "react";

const ErrorPanel = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="relative h-60 w-90 bg-white rounded-2xl p-8 items-center justify-center flex grid grid-rows gap-4 text-center text-black font-bold">
      {children}
      <button className="rounded-full closeButton w-50 h-10" onClick={onClose}>Close</button>
    </div>
  </div>
);

export default ErrorPanel;