import MapView, { Callout, Circle, Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
import * as Location from "expo-location";

import LottiePreloader from "../components/LottiePreloader";
import color from "../components/colors";
// import { TouchableOpacity } from "react-native-gesture-handler";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currLocation, setCurrLocation] = useState(null);
  const [currLocation2, setCurrLocation2] = useState({
    latitude: null,
    longitude: null,
  });
  const [DistanceRem, setDistanceRem] = useState(null);
  const [DurationRem, setDurationRem] = useState(null);
  const [modeDirections, setModeDirections] = useState("DRIVING");

  const mapViewRef = React.useRef(null);

  const moveCamera = async () => {
    const camera = await mapViewRef.current?.getCamera();
    if (camera) {
      camera.center = currLocation2;
      mapViewRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const handleTraceRoute = () => {
    const edgePaddingConst = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    };
    mapViewRef.current?.fitToCoordinates([currLocation, currLocation2], {
      edgePadding: edgePaddingConst,
      animated: true,
    });
  };

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return Alert.alert("Permission to access location was denied");
        }

        let locationCoords = await Location.getCurrentPositionAsync({});
        setLocation(locationCoords);

        setCurrLocation({
          latitude: locationCoords.coords.latitude,
          longitude: locationCoords.coords.longitude,
        });
        setCurrLocation2({
          latitude: locationCoords.coords.latitude,
          longitude: locationCoords.coords.longitude + 0.03,
        });
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    })();
  }, []);

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
            <Marker coordinate={currLocation2} pinColor={color.primary} />
            <Marker coordinate={currLocation} />
            <MapViewDirections
              origin={currLocation}
              destination={{
                latitude: currLocation2.latitude,
                longitude: currLocation2.longitude,
              }}
              apikey="AIzaSyAOH7vGd4LbvlziEm-eFy7fh9BJBpjIut4"
              strokeWidth={3}
              strokeColor="hotpink"
              mode={modeDirections}
              optimizeWaypoints={true}
              onStart={(params) => {
                handleTraceRoute();
              }}
              onReady={(result) => {
                setDistanceRem(`Distance: ${result.distance.toFixed(3)} km`);
                setDurationRem(`Duration: ${Math.ceil(result.duration)} min.`);
              }}
              onError={(errorMessage) => {
                Alert.alert("Error", errorMessage);
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleTraceRoute}
              >
                <Text style={{}}>TraceRoute</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <LottiePreloader />
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
