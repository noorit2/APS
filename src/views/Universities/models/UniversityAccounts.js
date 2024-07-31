
import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/fire';

/**
 * Create a new user.
 * @param {Object} info - The user information.
 * @returns {Promise<Object>} - The response from the API.
 */
export const createUser = async (info) => {
    try {
      const res = await fetch(process.env.REACT_APP_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  };



export const fetchUniversities = async (nextdoc, limitNumber) => {
  try {
    const q = nextdoc 
      ? query(
          collection(db, 'users'),
          where('accountType', '==', 'University'),
          orderBy('name'),
          limit(limitNumber),
          startAfter(nextdoc)
        )
      : query(
          collection(db, 'users'),
          where('accountType', '==', 'University'),
          orderBy('name'),
          limit(limitNumber)
        );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      img: doc.data().profilePicture || 'path/to/default/image.jpg',
      name: doc.data().name || 'Unknown',
      id: doc.id,
    }));
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
};
