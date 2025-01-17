import Modal from "react-native-modal";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AntDesign from "@expo/vector-icons/AntDesign";
import dayjs from "dayjs";
import CalendarModal from "../common/CalendarModal";


type Props = {
  isModalOpen: boolean;
  handleModalOpen: () => void;
};

const MODAL_HEIGHT = Platform.OS === 'android' ? 760 : 650;

export default function FilterModal({ isModalOpen, handleModalOpen }: Props) {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [translateY] = useState(new Animated.Value(0));
  const [modalHeight, setModalHeight] = useState(MODAL_HEIGHT);
  const [fromCalendarVisible, setFromCalendarVisible] = useState(false);
  const [toCalendarVisible, setToCalendarVisible] = useState(false);
  const [selected, setSelected] = useState('');

  const handleFromCalendarVisible = () => {
    setFromCalendarVisible((prev) => !prev)
    console.log("From");
    
  }

  const handleToCalendarVisible = () => {
    setToCalendarVisible((prev) => !prev)
  }

  return (
    <Modal
      isVisible={isModalOpen}
      onBackButtonPress={handleModalOpen}
      onBackdropPress={handleModalOpen}
      style={{ margin: 0, justifyContent: "flex-end" }}
      swipeDirection={["up", "down"]}
      // onSwipeComplete={handleModalOpen}
      onSwipeMove={(percentage)=>{
        console.log(percentage)
        if(Keyboard.isVisible()) 
          setModalHeight(percentage > 0.5 ? MODAL_HEIGHT * percentage : MODAL_HEIGHT * 0.5)
       
        const targetHeight = percentage > 0.5 ? 400 : 0; // 원하는 높이 조절
        Animated.spring(translateY, {
          toValue: targetHeight,
          useNativeDriver: false,
        }).start();
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" >
          <View style={[styles.container, {height: modalHeight}]}>
            <Text style={styles.modalHeader}>상세 필터</Text>

            <View style={styles.statusContainer}>
              <Text style={styles.statusHeader}>상태</Text>
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
                  inputIOS: styles.categories,
                  viewContainer: styles.categories,
                }}
              />
            </View>

            <View style={styles.period}>
              <Text style={styles.periodHeader}>기간설정</Text>

              <View style={styles.periodHeaderRight}>
                <AntDesign
                  name="exclamationcircleo"
                  size={16}
                  color="#E0E0E0"
                />
                <Text style={styles.periodHeaderRightText}>
                  최대 1년까지 조회가 가능합니다.
                </Text>
              </View>
            </View>
            <View style={styles.monthContainer}>
              <TouchableOpacity style={styles.monthButton}>
                <Text>1개월</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.monthButton}>
                <Text>3개월</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.monthButton}>
                <Text>6개월</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.monthButton}>
                <Text>직접선택</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.calendarContainer}>
              <TouchableOpacity style={styles.calendar} onPress={handleFromCalendarVisible}>
                <Text numberOfLines={1} style={styles.calendarText}>
                  {currentDate}
                </Text>
                <AntDesign name="calendar" size={24} color="black" />
              </TouchableOpacity>
              <Text>~</Text>
              <TouchableOpacity style={styles.calendar} onPress={handleToCalendarVisible}>
                <Text numberOfLines={1} style={styles.calendarText}>
                  {currentDate}
                </Text>
                <AntDesign name="calendar" size={24} color="black" />
              </TouchableOpacity>
            </View>


            {fromCalendarVisible && <CalendarModal selected={selected} setSelected={setSelected}/>
            }

            <View>
              <Text style={styles.inputTitle}>고객명</Text>
              <TextInput style={styles.custNmInput} />
            </View>

            <View>
              <Text style={styles.inputTitle}>연락처</Text>
              <TextInput 
                style={styles.telInput} 
                keyboardType="number-pad"
              />
            </View>

            <View>
              <Text style={styles.inputTitle}>주소</Text>
              <TextInput style={styles.addrInput} />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleModalOpen}>
                <Text>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>조회</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...Platform.select({
    //   ios: {
    //     height: 650,
    //   },
    //   android: {
    //     height: 750,
    //   },
    // }),
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  modalHeader: {
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: 500,
    borderBottomWidth: 0.5,
    borderColor: "#E0E0E0",
  },
  statusHeader: {
    fontSize: 16,
  },
  statusContainer: {
    gap: 10,
  },
  categories: {
    fontSize: 14,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: "E0E0E0",
  },
  period: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodHeader: {
    fontSize: 16,
  },
  periodHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  periodHeaderRightText: {
    color: "#9E9FA3",
    fontSize: 14,
  },
  monthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthButton: {
    width: 80,
    textAlign: "center",
    alignItems: "center",
    padding: 12,
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: "E0E0E0",
  },
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  calendar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "black",
  },
  calendarText: {
    fontSize: 16,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    padding: 12,
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: "E0E0E0",
  },
  custNmInput: {
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: "E0E0E0",
  },
  telInput: {
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: "E0E0E0",
  },
  addrInput: {
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: "E0E0E0",
  },
  inputTitle: {
    marginBottom: 10,
  },
});
