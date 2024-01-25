import { Ionicons } from '@expo/vector-icons';
import { LeftArrowProps } from '@/types';

export default function LeftArrow({size, color}: LeftArrowProps): React.JSX.Element {
  return (
    <Ionicons name="arrow-back" size={size} color={color} />
  );
}