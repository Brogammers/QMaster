"use client";

import { QueueModalProps } from "../../../types";

export default function QueueModal({
  title,
  description,
  width,
  children,
}: QueueModalProps) {
  return (
    <div
      className={`bg-white text-coal-black p-4 rounded-lg ${width && width}`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </div>
      <p className="mb-8">{description}</p>
      {children}
    </div>
  );
}
