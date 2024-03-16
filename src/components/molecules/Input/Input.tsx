// CustomInput.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import { useTheme } from "@/theme";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

interface CustomInputProps {
  title?: string;
  icon?: any;
  onIconPress?: () => void;
  phoneVerification?: boolean;
  iconLeft?: any;
  containerStyles?: any;
  onChangeText: (text: string) => void;
  localValue?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  title,
  icon,
  onIconPress,
  phoneVerification,
  iconLeft,
  containerStyles,
  onChangeText,
  localValue,
}) => {
  const { colors, backgrounds, fonts } = useTheme();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  return (
    <View style={[styles.container]}>
      {phoneVerification ? (
        <CodeField
          ref={ref}
          {...propss}
          value={value || localValue}
          onChangeText={(value) => {
            setValue(value);
            onChangeText(value);
          }}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              style={[
                styles.cell,
                isFocused && { borderColor: colors.blue, borderWidth: 1 },
                {
                  backgroundColor: colors.white,
                  shadowColor: "rgba(219, 218, 222, 1)",
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.41,
                  shadowRadius: 9.11,
                },
              ]}
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
            >
              <Text style={[fonts.size_16, fonts[400], fonts.blue]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      ) : (
        <>
          {title && (
            <Text style={[fonts.size_15, fonts[400], fonts.blue]}>{title}</Text>
          )}
          <View
            style={[
              styles.inputContainer,
              { borderColor: colors.blue},
              backgrounds.white,
              containerStyles,
            ]}
          >
            {iconLeft && <>{iconLeft}</>}
            <TextInput
              style={[styles.input, fonts.size_16,fonts.black]}
              onChangeText={(value) => {
                setValue(value);
                onChangeText(value);
              }}
              value={localValue}
            />
            {icon && (
              <TouchableOpacity
                onPress={onIconPress}
                style={styles.iconContainer}
              >
                {icon}
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: calculateHeight(16),
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: calculateWidth(6),
    paddingHorizontal: calculateWidth(14),
    width: calculateWidth(430),
    height: calculateHeight(45),
  },
  input: {
    flex: 1,
    // height: calculateHeight(35),
  },
  iconContainer: {
    // padding: 10,
  },
  codeFieldRoot: { marginTop: calculateHeight(6) },
  cell: {
    width: calculateWidth(51),
    height: calculateHeight(41),

    alignItems: "center",
    justifyContent: "center",
    borderRadius: calculateWidth(8),
  },
});

export default CustomInput;
