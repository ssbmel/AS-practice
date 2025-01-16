import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function FilterData() {
  const { width } = Dimensions.get("window");
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate); // 선택한 날짜를 상태로 저장
    hideDatePicker();
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

<Text style={styles.date} onPress={showDatePicker} numberOfLines={1}>
  {selectedDate} ~ {selectedDate}
</Text>

      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.settingIcon}>
        <MaterialIcons name="display-settings" size={24} color="black" />
      </View>
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
    textAlign: 'center',
  },
  date: {
    flex:1,
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    borderRadius: 5,
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
  caljendar: {
    width: 50,
  },
});
