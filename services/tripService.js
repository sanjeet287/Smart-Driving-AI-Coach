// services/tripService.js
import { collection, addDoc, Timestamp,getDocs, query, orderBy, doc, getDoc  } from 'firebase/firestore';
import { db, auth } from './firebaseInit';

export const saveTripToFirestore = async (tripData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user logged in");

    const docRef = await addDoc(collection(db, `users/${user.uid}/trips`), {
      ...tripData,
      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error saving trip:", error);
    return null;
  }
};

export const getUserTrips = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user logged in");

    const tripsRef = collection(db, `users/${user.uid}/trips`);
    const q = query(tripsRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
};

export const getTripById = async (tripId) => {
  const user = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, `users/${user.uid}/trips`, tripId);
  const snapshot = await getDoc(docRef);

  return snapshot.exists() ? snapshot.data() : null;
};


