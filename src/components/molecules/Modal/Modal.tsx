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

interface CustomModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  onPermissionClick?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isVisible,
  onClose,
  children,
  onPermissionClick,
}) => {
  const { layout, fonts, gutters, backgrounds } = useTheme();
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, backgrounds.backdrop]}>
        <View style={styles.modalContent}>
          {children}

          {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
          <View
            style={[
              layout.row,
              layout.fullWidth,
              layout.itemsCenter,
              layout.justifyCenter,
            ]}
          >
            <TouchableOpacity
              onPress={onClose}
              style={[
                {
                  height: calculateHeight(34),
                  //   width: calculateWidth(76),
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
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPermissionClick}
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
                Get Permission
              </Text>
            </TouchableOpacity>
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
