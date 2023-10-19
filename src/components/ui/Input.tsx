import * as React from "react";

import { cn } from "utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
}

export function Input({ className, prefixIcon, ...props }: InputProps) {
  return (
    <div
      className={cn(
        "flex h-9 w-full py-1 rounded-md border border-slate-700 bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-600 focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        prefixIcon && "px-3 items-center",
        className
      )}
    >
      {prefixIcon}
      <input className="flex-1 px-3 outline-none" {...props} />
    </div>
  );
}
