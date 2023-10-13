import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '../android/environments';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from "react-native-geolocation-service";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 35.106224,
  longitude: 128.966235,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const reverseGeocode = (latitude, longitude, callback) => {
  const apiKey = GOOGLE_MAPS_APIKEY; // 자신의 Google Maps API 키로 대체

  // Google Maps Geocoding API 호출
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=ko`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        console.log('주소:', address);
        // 여기서 address 변수에 위치의 주소가 저장됩니다.
        callback(address); // 주소 정보를 콜백으로 전달
      } else {
        console.log('주소 반환 실패');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};



function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "ko",
        }}
      />
    </>
  );
}

function Maps({ navigation, route }) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef(null);
  const user_id = route.params.user_id;
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };
  const edgePaddingValue = 70;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  useEffect(() => {
    // origin과 destination 값이 존재할 때만 실행
    if (origin && destination) {
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
    else {
      if (!origin)
        moveTo(destination)
      if (!destination)
        moveTo(origin)
    }
  }, [origin, destination]);

  const checkRoute = () => {
    // 출발지, 도착지 데이터 전송
    if (origin && destination) {
      reverseGeocode(origin.latitude, origin.longitude, (startAddress) => {
        reverseGeocode(destination.latitude, destination.longitude, (endAddress) => {
          navigation.navigate('Create_room', {
            startDestination: startAddress, // 출발지 주소
            endDestination: endAddress, // 목적지 주소
            origin: origin,
            destination: destination,
            user_id: user_id,
          });
        });
      });
    }
  };

  const onplaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin}
          image={require('../assets/images/origin.png')} />}
        {destination && <Marker coordinate={destination}
          image={require('../assets/images/destination.png')} />}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="#6644ff"
            strokeWidth={5}
            onReady={traceRouteOnReady}
            mode="TRANSIT"
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        {/* <TouchableOpacity>
          <Text style = {styles.buttonText2}>내 위치 가져오기</Text>
        </TouchableOpacity> */}
        <InputAutocomplete label="출발지 설정" onPlaceSelected={(details) => {
          onplaceSelected(details, "origin");
        }} />
        <InputAutocomplete label="도착지 설정" onPlaceSelected={(details) => {
          onplaceSelected(details, "destination");
        }} />
        {/* <TouchableOpacity
          style={styles.button}
          onPress={traceRoute}
        >
          <Text style={styles.buttonText}>경로 보기</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={checkRoute}
        >
          <Text style={styles.buttonText}>선택</Text>
        </TouchableOpacity>

        {distance && duration ? (
          <View>
            <Text>거리 : {distance.toFixed(2)} Km</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '71%',
    top: 0,
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    padding: 8,
    borderRadius: 8,
    bottom: 0,
    // left: 18,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
    color : 'white'
  },
  buttonText2: {
    textAlign: 'right',
    color: 'blue',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Maps;