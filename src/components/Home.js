import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Platform,
  Alert,
} from "react-native";
import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

import color from "./colors";
import Restaraunts from "./Restaraunts";
import data from "./data";
import LottiePreloader from "./LottiePreloader";
import StarRating from "./StarRating";

const add = require("../../assets/adds.jpg");
const adds2 = require("../../assets/adds2.jpg");

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Home() {
  const [region, setRegion] = React.useState(null);
  const [currLocation, setCurrLocation] = React.useState(null);
  const [state, setState] = React.useState(data);

  const _map = React.useRef(null);
  const flatlist_ref = React.useRef(null);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const interpolations = state.map((data, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });
    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    flatlist_ref.current.scrollToIndex({ index: markerID, animated: true });
  };

  const regionTimeoutRef = React.useRef(null);

  React.useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.length) {
        index = state.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeoutRef.current);

      regionTimeoutRef.current = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            500
          );
        }
      }, 10);
    });
  });

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return Alert.alert("Permission to access location was denied");
      }

      let locationCoords = await Location.getCurrentPositionAsync({});
      setCurrLocation(locationCoords.coords);
      setRegion({
        latitude: locationCoords.coords.latitude,
        longitude: locationCoords.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    })();
  }, []);

  const onUserLocationChange = (event) => {
    setRegion({
      ...region,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const handleSearchReults = (item) => {
  };

  const renderItem = (item) => {
    return (
      <>
        <Restaraunts
          imagesrc={adds2}
          handlePress={() => handleSearchReults(item)}
          RestarauntName={item.name}
          RestarauntContacts={item.contacts}
          StarRatingProp={StarRating(item)}
        />
      </>
    );
  };
  return (
    <View style={styles.parentContainer}>
      {currLocation ? (
        <>
          <MapView
            ref={_map}
            style={styles.map}
            initialRegion={region}
            showsUserLocation={true}
            onUserLocationChange={onUserLocationChange}
            showsMyLocationButton={true}
            showsPointsOfInterest={false}
            showsCompass={true}
          >
            {state.map((item, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.coordinate.latitude,
                    longitude: item.coordinate.longitude,
                  }}
                  pinColor={color.primary}
                  onPress={(e) => onMarkerPress(e)}
                  title={item.name}
                >
                  {/* <Callout>
                    <Text>{item.name}</Text>
                  </Callout> */}
                  <Animated.View style={[styles.markerWrap, ]}>
                    <Animated.Image
                      source={require("../../assets/map_marker.png")}
                      style={[styles.marker, scaleStyle]}
                      resizeMode="cover"
                    />
                  </Animated.View>
                </Marker>
              );
            })}
          </MapView>
          <View style={styles.flatListRestaurants}>
            <Animated.FlatList
              data={data}
              ref={flatlist_ref}
              style={styles.flatList}
              renderItem={({ item }) => renderItem(item)}
              horizontal={true}
              contentInset={{
                top: 0,
                left: SPACING_FOR_CARD_INSET,
                bottom: 0,
                right: SPACING_FOR_CARD_INSET,
              }}
              contentContainerStyle={{
                paddingHorizontal:
                  Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
              }}
              pagingEnabled
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment="center"
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: mapAnimation,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
            />
          </View>
        </>
      ) : (
        <LottiePreloader />
      )}
    </View>
  );
}
const flatListRestaurantsHeight = 250;
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: color.third,
    color: color.primary,
  },
  flatListRestaurants: {
    position: "absolute",
    height: flatListRestaurantsHeight,
    width: "100%",
    bottom: 0,
    backgroundColor: color.secondary,
    borderTopEndRadius: 10,
    flexDirection: "row",
  },
  map: {
    width: width,
    height: height - flatListRestaurantsHeight,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  flatList: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    backgroundColor: "white",
    flex: 0.8,
    borderWidth: 1,
    borderColor: color.primary,
    paddingLeft: 10,
  },
  searchButton: {
    flex: 0.2,
    backgroundColor: color.secondary,
    color: color.primary,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  budgetText: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  AlertButton: {
    backgroundColor: "#ffaa00",
    borderColor: "#ffaa00",
    color: "white",
    padding: 10,
    margin: 5,
    width: "60%",
    borderRadius: 5,
  },
});
