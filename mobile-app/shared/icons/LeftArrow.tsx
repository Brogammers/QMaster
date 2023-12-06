import { Ionicons } from '@expo/vector-icons';

interface LeftArrowProps {
  size: number;
  color: string;
}

export default function LeftArrow({size, color}: LeftArrowProps): React.JSX.Element {
  return (
    <Ionicons name="arrow-back" size={size} color={color} />
  );
}