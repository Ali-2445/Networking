import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { calculateHeight, calculateWidth } from "@/theme/utils";
import { useTheme } from "@/theme";
import DropDown from "@/theme/assets/svgs/DropDown";
import { RFValue } from "react-native-responsive-fontsize";

const CustomPicker = ({
  items,
  selectedValue,
  onValueChange,
  style,
  placeholder,
}: any) => {
  const { fonts } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const openPickerModal = () => {
    setModalVisible(true);
  };

  const closePickerModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={openPickerModal} style={styles.button}>
        <Text style={[styles.text]}>{selectedValue || ""}</Text>
        <DropDown />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closePickerModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              placeholder={placeholder}
              onValueChange={(value) => {
                onValueChange(value);
                closePickerModal();
              }}
              style={{ width: "100%" }}
              itemStyle={{
                fontSize: 22,
              }}
            >
              {items.map((item: any, index: number) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            onPress={closePickerModal}
            style={styles.closeButton}
          >
            <Text style={[fonts.blue, fonts.size_18]}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderLeftWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    // padding: 10,
    paddingVertical: calculateHeight(4),
    width: calculateWidth(79),
    paddingHorizontal: calculateWidth(8),
    alignItems: "center",
    justifyContent: "center",
    // overflow: "hidden",
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  closeButton: {
    backgroundColor: "lightgray",
    padding: 10,
    alignItems: "center",
  },
  text: { fontFamily: "NotoSans-Regular", fontSize: RFValue(16, 1200) },
});

export default CustomPicker;
