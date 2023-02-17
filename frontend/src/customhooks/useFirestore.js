import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import { appFireStore, storageRef, timeStamp } from '../configs/firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useAuthContext } from './useAuthContext'

const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'isPending':
            return { isPending: true, document: null, success: false, error: null }
        case 'addDoc':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'getDoc':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'updateDoc':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'deleteDoc':
            return { isPending: false, document: null, success: true, error: null }
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (transaction) => {

    const [response, dispatch] = useReducer(storeReducer, initState);

    const navigate = useNavigate();

    const colRef = collection(appFireStore, transaction);

    const { user } = useAuthContext();

    const addDocument = async (doc) => {
        let file = '';
        let fileName = 'No file';

        if (doc.imageData) {
            file = doc.imageData;
            fileName = doc.imageData.name;
        }

        dispatch({ type: 'isPending' });
        try {
            const createdTime = timeStamp.fromDate(new Date());
            const imagesRef = ref(storageRef, fileName);

            const docRef = await addDoc(colRef, { 
                title: doc.titleData,
                text: doc.textData,
                file: fileName,
                writer: user.displayName,
                createdMonth: createdTime.toDate().getMonth() + 1,
                createdTime,
            });

            if (doc.imageData) {
                await uploadBytes(imagesRef, file);    
            }
            dispatch({ type: 'addDoc', payload: docRef });
            alert('글 작성이 완료되었습니다.');
            navigate('/dailyrecord', { replace: true });
        } 
        catch (e) {
            dispatch({ type: 'error', payload: e.message });
            console.log(e.message);
            alert('에러 발생!');
            navigate('/dailyrecord', { replace: true });
        }
    }

    const getDocument = async (docid) => {
        try {
            const docRef = doc(colRef, docid);
            const docSnap = await getDoc(docRef);
            dispatch({ type: 'getDoc', payload: docSnap.data() });
        } 
        catch (e) {
            dispatch({ type: 'error', payload: e.message });
            console.log(e.message);
        }
    };

    const updateDocument = async ({ id, titleData, textData, imageData }) => {
        let file = '';
        let fileName = 'No file';

        if (imageData) {
            file = imageData;
            fileName = imageData.name;
        }

        dispatch({ type: 'isPending' });
        try {
            const createdTime = timeStamp.fromDate(new Date());
            const imagesRef = ref(storageRef, fileName);

            const docRef = doc(appFireStore, transaction, id);
            
            await setDoc(docRef, {
                title: titleData,
                text: textData,
                file: fileName,
                createdMonth: createdTime.toDate().getMonth() + 1,
                createdTime,
            }, { merge: true });

            if (doc.imageData) {
                await uploadBytes(imagesRef, file);    
            }

            dispatch({ type: 'updateDoc', payload: docRef });
            alert('글 수정이 완료되었습니다.');
            navigate('/dailyrecord', { replace: true });
        } 
        catch (e) {
            dispatch({ type: 'error', payload: e.message });
            console.log(e.message);
            alert('에러 발생!');
            navigate('/dailyrecord', { replace: true });
        }
    };

    const deleteDocument = async (id) => {
        dispatch({ type: 'isPending' });
        try {
            const docRef = await deleteDoc(doc(colRef, id));
            dispatch({ type: 'deleteDoc', payload: docRef });
            alert('글 삭제가 완료되었습니다.');
            navigate('/dailyrecord', { replace: true });
        } catch (e) {
            dispatch({ type: 'error', payload: e.message });
            alert('에러 발생', e.message);
            navigate('/dailyrecord', { replace: true });
        }
    }

    const downloadFile = async (fileName) => {
        const imagesRef = ref(storageRef, fileName);
        await getDownloadURL(imagesRef)
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = () => {
            const blob = xhr.response;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(link.href);
          };
          xhr.open('GET', url);
          xhr.send();
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error);
        });
    };

    return { addDocument, getDocument, updateDocument, deleteDocument, downloadFile, response };
}