import MapView, { Callout, Circle, Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import {
  Platform,
  Dimensions,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
import * as Location from "expo-location";
// import { TouchableOpacity } from "react-native-gesture-handler";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currLocation, setCurrLocation] = useState(null);
  const [DistanceRem, setDistanceRem] = useState(null);
  const [DurationRem, setDurationRem] = useState(null);
  const [modeDirections, setModeDirections] = useState("DRIVING");

  const origin = { latitude: -0.2761213, longitude: 36.054829 };
  const destination = { latitude: -0.2871213, longitude: 36.0854829 };

  const mapViewRef = React.useRef(null);

  const moveCamera = async () => {
    const camera = await mapViewRef.current?.getCamera();
    if (camera) {
      camera.center = {
        latitude: -0.2761213,
        longitude: 36.054829,
      };
      mapViewRef.current?.animateCamera(camera, { duration: 2000 });
    } //if camera
    console.log("Moved");
  };

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialRegion = {
    latitude: -0.2761213,
    longitude: 36.054829,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setCurrLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    // console.log(currLocation);
  }
  return (
    <View style={styles.container}>
      {currLocation ? (
        <>
          <MapView
            ref={mapViewRef}
            style={styles.map}
            initialRegion={{
              latitude: currLocation.latitude,
              longitude: currLocation.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <Marker coordinate={origin} />
            <Marker coordinate={currLocation} />
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey="AIzaSyAOH7vGd4LbvlziEm-eFy7fh9BJBpjIut4"
              strokeWidth={3}
              strokeColor="hotpink"
              mode={modeDirections}
              optimizeWaypoints={true}
              onStart={(params) => {
                // console.log(
                //   `Started routing between "${params.origin}" and "${params.destination}"`
                // );
              }}
              onReady={(result) => {
                setDistanceRem(`Distance: ${result.distance} km`);
                setDurationRem(`Duration: ${result.duration} min.`);
              }}
              onError={(errorMessage) => {
                console.log(errorMessage);
              }}
            />
          </MapView>

          <View style={styles.searchContainer}>
            <Text>{DistanceRem}</Text>
            <Text>{DurationRem}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModeDirections("WALKING");
                }}
              >
                <Text>Walking</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModeDirections("DRIVING");
                }}
              >
                <Text style={{}}>Driving</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={moveCamera}>
                <Text style={{}}>moveCamera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Text style={{ flex: 1 }}>{text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    flexDirection: "column",
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 8,
    marginLeft: 8,
    zIndex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 0.5,
    backgroundColor: "#abdbe3",
    padding: 8,
    width: "90%",
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    margin: 8,
  },
});

export default Map;
