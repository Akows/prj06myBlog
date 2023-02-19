import { appFireStore } from '../configs/firebase'
import { useEffect, useReducer, useState } from 'react'
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

const colReducer = (state, action) => {
    switch (action.type) {
        case 'isReady':
            return { ...state, isReady: true, document: action.payload };   
        default:
            return state;
    }
}

export const useCollection = (transaction, myQuery) => {
    const [state, dispatch] = useReducer(colReducer, {
        isReady: false
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        let que;
        if (myQuery) {
            que = query(collection(appFireStore, transaction), where(...myQuery), orderBy('createdTime', 'desc'));
        }
        const unsubscribe = onSnapshot((myQuery ? que : query(collection(appFireStore, transaction), orderBy('createdTime', 'desc'))),
            (snapshot) => {
                let result = []; 
                snapshot.docs.forEach((doc) => {
                    result.push({ 
                        ...doc.data(), 
                        time: doc.data().createdTime.toDate().toLocaleString(), 
                        id: doc.id
                    });
                })
                setError(null);
                dispatch({ type: 'isReady', payload: result }) 
            },
            (error) => {
                setError(error.message);
            });
        return unsubscribe;
        
    // eslint-disable-next-line
    }, [collection]); 

    return { error, state };
};