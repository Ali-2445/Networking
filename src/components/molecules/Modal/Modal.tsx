import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import { useTheme } from "@/theme";
import Button from "../Button/Button";
import Close from "@/theme/assets/svgs/Close";

interface CustomModalProps {
  isVisible?: boolean;
  children?: React.ReactNode;
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonClick?: () => void;
  rightButtonClick?: () => void;
  hideLeftButton?: boolean;
  hideRightButton?: boolean;
  onClose?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  children,
  leftButtonText,
  rightButtonText,
  leftButtonClick,
  rightButtonClick,
  hideLeftButton,
  hideRightButton,
  onClose,
}) => {
  const { layout, fonts, gutters, backgrounds } = useTheme();
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={leftButtonClick}
    >
      <View style={[styles.modalOverlay, backgrounds.backdrop]}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={[
              gutters.marginRight_12,
              gutters.marginTop_12,
              { marginLeft: "auto" },
            ]}
            onPress={onClose}
          >
            <Close />
          </TouchableOpacity>
          {children}

          <View
            style={[
              layout.row,
              layout.fullWidth,
              layout.itemsCenter,
              layout.justifyCenter,
            ]}
          >
            {!hideLeftButton && (
              <TouchableOpacity
                onPress={leftButtonClick}
                style={[
                  {
                    height: calculateHeight(34),
                    borderRadius: calculateHeight(4),
                    paddingHorizontal: calculateWidth(14),
                    paddingVertical: calculateHeight(6),
                  },
                  layout.itemsCenter,
                  layout.justifyCenter,
                  backgrounds.lightGray,
                  {
                    shadowColor: "rgba(165, 163, 174, 0.30)",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 5.46,

                    elevation: 9,
                  },
                ]}
              >
                <Text style={[fonts.size_14, fonts[500], fonts.gray]}>
                  {leftButtonText || "Cancel"}
                </Text>
              </TouchableOpacity>
            )}

            {!hideRightButton && (
              <TouchableOpacity
                onPress={rightButtonClick}
                style={[
                  {
                    height: calculateHeight(34),
                    borderRadius: calculateHeight(4),
                    paddingHorizontal: calculateWidth(14),
                    paddingVertical: calculateHeight(6),
                  },
                  layout.itemsCenter,
                  layout.justifyCenter,
                  backgrounds.blue,
                  gutters.marginLeft_10,
                ]}
              >
                <Text style={[fonts.size_14, fonts[500], fonts.white]}>
                  {rightButtonText || "Get Permission"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: calculateHeight(6),
    width: calculateWidth(518),
    height: calculateHeight(348),
  },
});

export default CustomModal;
