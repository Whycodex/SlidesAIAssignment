"use client";

import React from "react";

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: ()=>void;
}) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-black p-2 rounded w-full hover:bg-slate-900"
    >
      {children}
    </button>
  );
};
