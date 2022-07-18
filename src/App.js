import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "fce3f24279fbed525432cb299d839c7d";

export default function App() {

  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      { useGoogleMaps: false }
    );
    setCity(location[0].region);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=matric`
    );
    const json = await response.json();
    setDays(json.daliy);
  };

  useEffect(()=> {
    getWeather();
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>        
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white"  style={{marginTop: 10}} size="large" />
          </View>
        ) : (
          days.map((day, index) => (
          <View key={index} style={styles.day}>
            <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
            <Text style={styles.descriptrions}>{dqy.weather[0].main}</Text>
          </View>))
        )};
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato"
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500"
  },
  weather: {

  },
  day: {
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  descriptrion: {
    marginTop: -30,
    fontSize: 60,
  }
})
