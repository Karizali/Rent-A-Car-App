import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import { StyleSheet, View,ActivityIndicator } from 'react-native';
import * as Location from "expo-location";

export default function Food() {
  const [loading,setLoading]=useState(false);
  const mapRef = useRef(null);
  let latitude;
  let longitude;
  const [markerCoordinates, setMarkerCoordinates] = useState({latitude:0,longitude:0})
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status)
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      setLoading(true)
      var location = await Location.getCurrentPositionAsync({});
       latitude = parseFloat(location?.coords?.latitude);
       longitude = parseFloat(location?.coords?.longitude);
       setMarkerCoordinates({latitude:latitude,longitude:longitude})
       setLoading(false)
      console.log(latitude);
      console.log(longitude);

      const region = {
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0092,
        latitude,
        longitude,
      };
      mapRef.current?.animateToRegion(region, 1000);
    })();
  }, [])



  return (
    <View style={styles.container}>
      <MapView
        onPress={(e) => {
          setMarkerCoordinates(e?.nativeEvent?.coordinate)
          console.log(e?.nativeEvent?.coordinate)
        }}
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          longitudeDelta: 0,
          latitudeDelta: 0,
        }}
        showsUserLocation={true}
      >
            {(markerCoordinates)?<Marker coordinate={{
              latitude: markerCoordinates?.latitude,
              longitude: markerCoordinates?.longitude
            }}
              pinColor={"red"}
              title={"title"}
              description={"description"} /> :null}
        
      </MapView>
      <ActivityIndicator animating={loading} size="large"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
