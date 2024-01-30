import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextStyle,
  ViewStyle,
  StyleProp,
} from "react-native";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import { useTheme } from "@/theme";

interface ButtonProps extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: any;
}

const Button: React.FC<ButtonProps> = ({
  containerStyle,
  text,
  textStyle,
  onPress,
  icon,
  ...props
}) => {
  const { layout, fonts, backgrounds } = useTheme();

  return (
    <TouchableOpacity
      style={[
        { height: calculateHeight(44), width: calculateWidth(270) },
        backgrounds.blue,
        layout.itemsCenter,
        layout.justifyCenter,
        layout.row,
        containerStyle,
      ]}
      onPress={onPress}
      {...props}
    >
      {icon}
      <Text style={[fonts.white, fonts.size_16, fonts[500], textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
