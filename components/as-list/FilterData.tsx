import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FilterModal from "./FilterModal";

export default function FilterData() {
  const { width } = Dimensions.get("window");
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isModalOpen, setIsModalOpen] = useState(true);


  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };


  return (
    <View style={[styles.container, { width: width }]}>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "전체", inputLabel: "전체", value: "total" },
          { label: "접수", inputLabel: "접수", value: "receipt" },
          { label: "완료", inputLabel: "완료", value: "complete" },
        ]}
        placeholder={{}}
        style={{
          inputAndroid: styles.categories,
        }}
      />

      <TouchableOpacity onPress={handleModalOpen} style={styles.date}>
        <Text numberOfLines={1}>
          {selectedDate} ~ {selectedDate}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleModalOpen}>
        <View style={styles.settingIcon}>
          <MaterialIcons name="display-settings" size={24} color="black" />
        </View>
      </TouchableOpacity>

      {isModalOpen && <FilterModal isModalOpen={isModalOpen} handleModalOpen={handleModalOpen} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  categories: {
    width: 120,
    height: 60,
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
  },
  date: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "black",
  },
  settingIcon: {
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 7,
  },
});
