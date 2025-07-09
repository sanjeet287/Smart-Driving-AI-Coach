import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const GradientButton = ({ title, onPress, colors = ['#56CCF2', '#2F80ED'] }) => (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <LinearGradient colors={colors} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('DriverProfileScreen')}>
          <Text style={styles.navItem}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DriverProfileScreen')}>
          <Text style={styles.navItem}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AboutScreen')}>
          <Text style={styles.navItem}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ContactUsScreen')}>
          <Text style={styles.navItem}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Welcome to Smart Driving Coach</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <GradientButton
          title="Start New Trip"
          onPress={() => navigation.navigate('TripScreen')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <GradientButton
          title="View Trip History"
          onPress={() => navigation.navigate('HistoryScreen')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <GradientButton
          title="Logout"
          onPress={() => auth.signOut()}
          colors={['#ff5f6d', '#ffc371']}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    paddingVertical: 15,
    paddingTop: 50,
  },
  navItem: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    marginVertical: 12,
    width: '80%',
    alignSelf: 'center',
  },
  buttonWrapper: {
    shadowColor: '#2F80ED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
