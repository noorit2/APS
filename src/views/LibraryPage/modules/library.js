import { and, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./fire";

import { query, collection, and, where, getDocs } from "firebase/firestore";


export const get_active_completed_modules = async (Deprartment_id, program, level) => {
  const q = query(
    collection(db, "activemodule"),
    and(
      where("Deprartment_id", "==", Deprartment_id),
      where("level", "==", level),
      where("type", "==", program),
      where("activated", "==", true)
    )
  );
  const docs = await getDocs(q);
  const data = docs.docs.map((doc) => ({
    ...doc.data(),
    value: doc.data().name,
    id: doc.id,
  }));
  return data ? data : [];
};
export const get_Subjects = async (Deprartment_id) => {
  const q = query(
    collection(db, "subjects"),
    where("Deprartment_id", "==", Deprartment_id)
  );
  const docs = await getDocs(q);
  const data = docs.docs.map((doc) => ({
    ...doc.data(),
    value: doc.data().name,
    id: doc.id,
  }));
  return data;
};
export const get_progs = async (Deprartment_id) => {
  const q = query(
    collection(db, "programs"),
    where("Deprartment_id", "==", Deprartment_id)
  );
  const docs = await getDocs(q);
  const data = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return data;


};

