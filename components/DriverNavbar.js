import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function DriverNavbar({ driver, tripStatus = 'in_progress' }) {
  // tripStatus: 'in_progress', 'ended', 'not_started'

  const getStatusIcon = () => {
    if (tripStatus === 'in_progress') {
      return (
        <View style={styles.statusGroup}>
          <FontAwesome name="circle" size={12} color="green" />
          <Text style={styles.statusText}>Start</Text>
          <FontAwesome name="circle" size={12} color="blue" style={styles.dotSpacing} />
          <Text style={styles.statusText}>Now</Text>
        </View>
      );
    } else if (tripStatus === 'ended') {
      return (
        <View style={styles.statusGroup}>
          <FontAwesome name="circle" size={12} color="green" />
          <Text style={styles.statusText}>Start</Text>
          <FontAwesome name="circle" size={12} color="red" style={styles.dotSpacing} />
          <Text style={styles.statusText}>End</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.statusGroup}>
          <FontAwesome name="circle" size={12} color="gray" />
          <Text style={styles.statusText}>Not Started</Text>
        </View>
      );
    }
  };

  if (!driver) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: 'gray' }}>Loading driver info...</Text>
      </View>
    );
  }

  return (
    <View style={styles.navbar}>
      <Image
        source={
          driver.photoURL
            ? { uri: driver.photoURL }
            : { uri: 'https://via.placeholder.com/100' }

        }
        style={styles.avatar}
      />
      <View style={styles.driverInfo}>
        <Text style={styles.name}>{driver.name}</Text>
        <Text style={styles.phone}>{driver.contactNumber}</Text>
        {getStatusIcon()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a9d8f',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  driverInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  phone: {
    fontSize: 13,
    color: 'white',
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    color: 'white',
    marginLeft: 4,
    marginRight: 8,
    fontSize: 12,
  },
  dotSpacing: {
    marginLeft: 8,
  },
  loading: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
});
