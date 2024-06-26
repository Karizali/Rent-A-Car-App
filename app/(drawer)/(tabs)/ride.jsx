import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, MarkerAnimated, Polyline } from 'react-native-maps';
import {
  StyleSheet, View, ActivityIndicator,
  TextInput, Text, Button, Modal, Pressable, Alert
} from 'react-native';
import axios, { isCancel, AxiosError } from 'axios';
import * as Location from "expo-location";

export default function Ride() {
  const [loading, setLoading] = useState(false);
  const [locationType, setLocationType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [linePath, setLinePath] = useState([]);
  const [suggestion, setSuggestion] = useState({
    type: "",
    results: []
  });
  const [text, setText] = useState("");
  const mapRef = useRef(null);
  let latitude;
  let longitude;
  const [markerCoordinates, setMarkerCoordinates] = useState({
    currentLocation: {
      latitude: 0, longitude: 0
    },
    pickUp: { latitude: 0, longitude: 0 },
    destination: { latitude: 0, longitude: 0 }
  })


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status)
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      // setLoading(true)
      var location = await Location.getCurrentPositionAsync({});
      latitude = parseFloat(location?.coords?.latitude);
      longitude = parseFloat(location?.coords?.longitude);
      setMarkerCoordinates((prev) => (
        {
          ...prev,
          currentLocation: { latitude: latitude, longitude: longitude }
        }
      ))


      console.log(latitude);
      console.log(longitude);

      const region = {
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0092,
        latitude,
        longitude,
      };
      mapRef.current?.animateToRegion(region, 1000);
      // setLoading(false)
    })();
  }, [])
  //API key
  //fsq3VkJMLOnfb/MMvs56EM1k3P3F4kqzS8e45hOZD6ZfRuk=


  const find = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3T9UmcEoZA/74U/MGDyqIXde/Qm+AVeNAjeuTBy9Bnlk='
      }
    };

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${markerCoordinates?.currentLocation?.latitude},${markerCoordinates?.currentLocation?.longitude}&radius=3000`, options)
      .then(response => response.json())
      .then(response => {
        setSuggestion((prev) => ({
          ...prev,
          results: response?.results
        }
        ));
        console.log(response?.results)
      })
      .catch(err => console.error(err));
  }
  useEffect(() => {
    setSuggestion((prev) => ({ ...prev, type: locationType }));
  }, [locationType])



  useEffect(() => {

    const query = new URLSearchParams({
      profile: 'car',
      point: `point=${(markerCoordinates?.pickUp?.latitude).toFixed(3)},${(markerCoordinates?.pickUp?.longitude).toFixed(3)}&point=${(markerCoordinates?.destination?.latitude).toFixed(3)},${(markerCoordinates?.destination?.longitude).toFixed(3)}`,
      point_hint: 'string',
      snap_prevention: 'string',
      curbside: 'any',
      locale: 'en',
      elevation: 'false',
      details: 'string',
      optimize: 'false',
      instructions: 'true',
      calc_points: 'true',
      debug: 'false',
      points_encoded: 'true',
      'ch.disable': 'false',
      heading: '0',
      heading_penalty: '120',
      pass_through: 'false',
      algorithm: 'round_trip',
      'round_trip.distance': '10000',
      'round_trip.seed': '0',
      'alternative_route.max_paths': '2',
      'alternative_route.max_weight_factor': '1.4',
      'alternative_route.max_share_factor': '0.6',
      key: '5449fa0a-8a5a-4320-8a19-5e380927f35f'
    }).toString();


    (async () => {
      if (markerCoordinates?.destination?.latitude && markerCoordinates?.pickUp?.latitude) {
        try {
          const response = await axios.get(`https://graphhopper.com/api/1/route?${query}`,{method: 'GET'}
          );
          setLinePath(response?.points)
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    })();

  }, [markerCoordinates?.pickUp, markerCoordinates?.destination])


  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log(d)
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  useEffect(() => {
    if (markerCoordinates?.pickUp?.latitude && markerCoordinates?.destination?.latitude) {

      let distance = getDistanceFromLatLonInKm(
        markerCoordinates?.pickUp?.latitude,
        markerCoordinates?.pickUp?.longitude,
        markerCoordinates?.destination?.latitude,
        markerCoordinates?.destination?.longitude);

      console.log("Rs.", Math.ceil(distance) * 200)

    }
  }, [markerCoordinates])


  return (
    <View style={styles.container}>
      <MapView
        onPress={(e) => {
          setMarkerCoordinates((prev) => (
            {
              ...prev,
              currentLocation: e?.nativeEvent?.coordinate
            }
          ))
          console.log("click", e?.nativeEvent?.coordinate)
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
        {(markerCoordinates?.currentLocation) ? <Marker coordinate={{
          latitude: markerCoordinates?.currentLocation?.latitude,
          longitude: markerCoordinates?.currentLocation?.longitude
        }}
          pinColor={"red"}
          title={"title"}
          description={"description"} /> : null}
        {(markerCoordinates?.pickUp) ? <Marker coordinate={{
          latitude: markerCoordinates?.pickUp?.latitude,
          longitude: markerCoordinates?.pickUp?.longitude
        }}
          pinColor={"red"}
          title={"title"}
          description={"description"} /> : null}
        {(markerCoordinates?.destination) ? <Marker coordinate={{
          latitude: markerCoordinates?.destination?.latitude,
          longitude: markerCoordinates?.destination?.longitude
        }}
          pinColor={"red"}
          title={"title"}
          description={"description"} /> : null}
        <Polyline
          coordinates={linePath.map(loc => {
            return {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude
            };
          })}
          strokeColor='red'
          strokeWidth={1}
          lineDashPattern={[1]}
        />
      </MapView>
      <View>

        <Pressable onPress={() => { setModalVisible(!modalVisible); setLocationType("Pick Up") }}><Text>Pick Up</Text></Pressable>
        <Pressable onPress={() => { setModalVisible(!modalVisible); setLocationType("Destination") }}><Text>Destination</Text></Pressable>

      </View>

      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View >
          <View >
            <Text>{locationType}</Text>

            <View>
              <TextInput placeholder='Place' style={styles.input} onChangeText={setText} />
              <Button title='Find' onPress={() => find()} />
            </View>
            {(locationType == "Destination") ?
              suggestion?.results?.map((place, i) => {
                return <Pressable onPress={() => {
                  setMarkerCoordinates((prev) => (
                    {
                      ...prev,
                      destination: place?.geocodes?.main
                    }
                  ))
                  setModalVisible(!modalVisible)
                }} key={i}><Text>{place.name}</Text></Pressable>
              })
              :
              suggestion?.results?.map((place, i) => {
                return <Pressable onPress={() => {
                  setMarkerCoordinates((prev) => (
                    {
                      ...prev,
                      pickUp: place.geocodes.main
                    }
                  ))
                  setModalVisible(!modalVisible)
                }}
                  key={i}><Text>{place.name}</Text></Pressable>
              })
            }
          </View>
        </View>
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '70%',
  },
  input: {
    borderStyle: 'solid',
    borderColor: "black",
    borderWidth: 2,
    width: "50%"
  }
});
