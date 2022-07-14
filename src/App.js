import React from 'react';
import { View, StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <View>
        <Text>Seoul</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato"
  }
})
