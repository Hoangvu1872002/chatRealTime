import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";


const useFirestore = (collectionName, condition) => {
    const [document, setDocument] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    let q
    // console.log(condition);
   
      if (!condition?.compareValue || !condition?.compareValue?.length) {
        return;
      }else{
        // console.log(condition);
        q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue), orderBy("createAt"));
        // console.log('f');
      }
     
    // console.log(collectionRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocument(data)
      // console.log({ data, snapshot, docs: snapshot.docs });
    });
    return unsubscribe;
  }, [collectionName, condition]);
  return document;
};

export default useFirestore;
