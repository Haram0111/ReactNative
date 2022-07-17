import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "fce3f24279fbed525432cb299d839c7d";

export default function App() {

  const [city, setCity] = useState("Loading...");
  const [ days, setDays] = useState([]);
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
    console.log(location)
    setCity(location[0].region);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}`)
    const json = await response.json();
    console.log(json)
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
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descriptrion}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descriptrion}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descriptrion}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descriptrion}>Sunny</Text>
        </View>
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
