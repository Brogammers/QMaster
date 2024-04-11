import { QueueModalProps } from "../../../types";

export default function QueueModal({ title, children }: QueueModalProps) {
  return (
    <div className="bg-white text-coal-black p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{ title }</h1>
      {children}
    </div>
  );
};
