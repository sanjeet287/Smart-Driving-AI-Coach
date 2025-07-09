import React, { useState } from 'react';
import { View,Text,TextInput,Button,Image,StyleSheet,Alert,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../services/firebaseInit';
import { useNavigation } from '@react-navigation/native';

export default function DriverProfileScreen() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const userId = auth.currentUser.uid;
    const storageRef = ref(storage, `profilePhotos/${userId}.jpg`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const saveProfile = async () => {
    try {
      const userId = auth.currentUser.uid;
      const photoURL = imageUri ? await uploadImage(imageUri) : null;

      await setDoc(doc(db, 'users', userId), {
        name,
        contactNumber,
        licenseNumber,
        vehicleNumber,
        vehicleType,
        photoURL,
      });

      Alert.alert('Success', 'Profile updated!');
      navigation.replace('HomeScreen');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 Driver Profile</Text>
      <Button title="Pick Profile Photo" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="License Number" value={licenseNumber} onChangeText={setLicenseNumber} />
      <TextInput style={styles.input} placeholder="Vehicle Number" value={vehicleNumber} onChangeText={setVehicleNumber} />
      <TextInput style={styles.input} placeholder="Vehicle Type (2W/4W/16W)" value={vehicleType} onChangeText={setVehicleType} />

      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
  image: { width: 100, height: 100, marginVertical: 10, borderRadius: 50 },
});
