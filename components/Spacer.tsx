import { View } from "react-native";

type SpacerProps = {
  size?: number;
  horizontal?: boolean;
};

export default function Spacer({ size = 8, horizontal = false }: SpacerProps) {
  return (
    <View style={{ width: horizontal ? size : 0, height: horizontal ? 0 : size }} />
  );
}
