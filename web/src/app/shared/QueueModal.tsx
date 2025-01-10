'use client'

import { QueueModalProps } from "../../../types";

export default function QueueModal({ title, description, width, children }: QueueModalProps) {
  return (
    <div className={`bg-white text-coal-black p-4 rounded-lg ${width && width}`}>
      <h1 className="text-2xl font-bold mb-4">{ title }</h1>
      <p className="mb-8">{ description }</p>
      {children}
    </div>
  );
};
