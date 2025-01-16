import { View, StyleSheet } from 'react-native'
import React from 'react'
import FilterData from '@/components/as-list/FilterData'

export default function index() {
  return (
    <View style={styles.container}>
      <FilterData/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E0E0E0"
  }
})