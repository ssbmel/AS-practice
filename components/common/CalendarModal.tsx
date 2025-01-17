import { View, Text } from 'react-native'
import React from 'react'
import { Calendar } from "react-native-calendars"


type Prop = {
    selected: string;
    setSelected: () => void;
}
export default function CalendarModal({selected, setSelected}: Prop) {
  return (
    <View>
      <Calendar
                    onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
                      setSelected(day.dateString);
                      console.log(selected);
                      
                    }}
                    markedDates={{
                      [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                    }}
                  />
    </View>
  )
}