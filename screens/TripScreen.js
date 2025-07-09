import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { useNavigation } from '@react-navigation/native';
import { saveTripToFirestore } from '../services/tripService';
import { useUserProfile } from '../hooks/useUserProfile';
import DriverNavbar from '../components/DriverNavbar';

export default function TripScreen() {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [distractionCount, setDistractionCount] = useState(0);
  const [acceleration, setAcceleration] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const driver = useUserProfile();

//   const driver = {
//   name: "Sanjeet Kumar",
//   contactNumber: "+91-9001234567",
//   photoURL: "https://via.placeholder.com/100"
// };


  // Permissions & initial setup
  useEffect(() => {
    (async () => {
      const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
      const { status: camStatus } = await Camera.requestCameraPermissionsAsync();

      if (locStatus !== 'granted') {
        Alert.alert('Location permission not granted');
        return;
      }

      setHasCameraPermission(camStatus === 'granted');
      setStartTime(Date.now());
    })();
  }, []);

  // Location tracking
  useEffect(() => {
  let subscription;

  const startTracking = async () => {
    subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (loc) => {
        setLocation(loc.coords);
        setRoute((prev) => [...prev, loc.coords]);
      }
    );
  };

  startTracking();

  return () => {
    if (subscription && typeof subscription.remove === 'function') {
      subscription.remove();
    }
  };
}, []);


  // Accelerometer tracking (skip on web)
  useEffect(() => {
    if (Platform.OS === 'web') return;

    Accelerometer.setUpdateInterval(1000);
    const accelSub = Accelerometer.addListener((data) => {
      setAcceleration(data);
    });

    return () => {
      accelSub && accelSub.remove();
    };
  }, []);

  // Face detection (only on mobile)
  const handleFacesDetected = ({ faces }) => {
    if (faces.length === 0) {
      setDistractionCount((prev) => prev + 1);
    }
  };

  const endTrip = async () => {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    const tripData = {
      route,
      distractionCount,
      duration,
      distance: calculateDistance(route),
    };

    const tripId = await saveTripToFirestore(tripData);

    if (tripId) {
      navigation.navigate('ReportScreen', { tripData });
    } else {
      Alert.alert('Error', 'Failed to save trip.');
    }
  };

  const calculateDistance = (routeArray) => {
    if (routeArray.length < 2) return 0;
    let total = 0;
    for (let i = 1; i < routeArray.length; i++) {
      const prev = routeArray[i - 1];
      const curr = routeArray[i];
      total += getDistanceFromLatLonInKm(
        prev.latitude,
        prev.longitude,
        curr.latitude,
        curr.longitude
      );
    }
    return total.toFixed(2);
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <View style={styles.container}>
        <DriverNavbar driver={driver} tripStatus="in_progress" />
      <Text style={styles.title}>Trip In Progress</Text>
      <Text>Lat: {location?.latitude?.toFixed(4)}</Text>
      <Text>Lon: {location?.longitude?.toFixed(4)}</Text>
      <Text>Speed: {(location?.speed * 3.6 || 0).toFixed(2)} km/h</Text>
      <Text>Route Points: {route.length}</Text>
      <Text>Accel: x={acceleration?.x?.toFixed(2)} y={acceleration?.y?.toFixed(2)}</Text>
      <Text style={styles.danger}>Distractions: {distractionCount}</Text>

      {hasCameraPermission && Platform.OS !== 'web' && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
          }}
        />
      )}

      <Button title="End Trip" onPress={endTrip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  danger: { color: 'red', fontWeight: 'bold', marginTop: 10 },
  camera: { width: 100, height: 100, position: 'absolute', top: 10, right: 10 },
});
