import { ChildrenProps } from "../../../types";

export default function QueueModal({ children }: ChildrenProps) {
  return (
    <div className="bg-white p-4">
      {children}
    </div>
  );
};
