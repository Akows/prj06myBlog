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
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'isPending':
            return { isPending: true, document: null, success: false, error: null };
        case 'addDoc':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'getDoc':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'updateDoc':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'deleteDoc':
            return { isPending: false, document: null, success: true, error: null };
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload };
        default:
            return state;
    };
};

export const useFirestore = (transaction) => {

    const navigate = useNavigate();
    const [response, dispatch] = useReducer(storeReducer, initState);
    const colRef = collection(appFireStore, transaction);
    const { user } = useAuthContext();
    const createdTime = timeStamp.fromDate(new Date());

    const addDocument = async (doc) => {

        dispatch({ type: 'isPending' });

        let fileName = 'No file';
        if (doc.fileData) {
            fileName = doc.fileData[0].name;
        };

        if (doc.type === 'qs') {
            try {
                const docRef = await addDoc(colRef, {
                    title: doc.titleData,
                    text: doc.postData,
                    file: fileName,
                    writer: user.displayName,
                    type: doc.selectTypeData,
                    createdTime,
                });

                if (doc.fileData) {
                    const imagesRef = ref(storageRef, fileName);
                    await uploadBytes(imagesRef, doc.fileData);
                };

                dispatch({ type: 'addDoc', payload: docRef });
                alert('글 작성이 완료되었습니다.');
                navigate('/questions', { replace: true });
            }
            catch (error) {
                alert(error.message);
                navigate('/questions', { replace: true });
            };
        }
        else if (doc.type === 'sr') {
            try {
                const docRef = await addDoc(colRef, {
                    title: doc.titleData,
                    text: doc.postData,
                    file: fileName,
                    writer: user.displayName,
                    type: doc.selectTypeData,
                    createdTime,
                });

                if (doc.fileData) {
                    const imagesRef = ref(storageRef, fileName);
                    await uploadBytes(imagesRef, doc.fileData);
                }

                dispatch({ type: 'addDoc', payload: docRef });
                alert('글 작성이 완료되었습니다.');
                navigate('/studyrecord', { replace: true });
            }
            catch (error) {
                alert(error.message);
                navigate('/studyrecord', { replace: true });
            };
        }
        else if (doc.type === 'dr') {
            try {
                const docRef = await addDoc(colRef, {
                    title: doc.titleData,
                    text: doc.postData,
                    writer: user.displayName,
                    createdMonth: createdTime.toDate().getMonth() + 1,
                    createdTime,
                });

                dispatch({ type: 'addDoc', payload: docRef });
                alert('글 작성이 완료되었습니다.');
                navigate('/dailyrecord', { replace: true });
            }
            catch (error) {
                alert(error.message);
                navigate('/dailyrecord', { replace: true });
            };
        };
    };

    const getDocument = async (docid) => {
        dispatch({ type: 'isPending' });
        try {
            const docRef = doc(colRef, docid);
            const docSnap = await getDoc(docRef);
            dispatch({ type: 'getDoc', payload: docSnap.data() });
        }
        catch (error) {
            dispatch({ type: 'error', payload: error.message });
            alert(error.message);
        }
    };

    const updateDocument = async (props) => {
        const docRef = doc(appFireStore, transaction, props.id);

        dispatch({ type: 'isPending' });

        let fileName = 'No file';
        if (props.fileData) {
            fileName = props.fileData.fileName;
        }

        if (props.type === 'qs') {
            try {
                await setDoc(docRef, {
                    title: props.titleData,
                    text: props.postData,
                    fileName: fileName,
                    type: props.selectTypeData,
                    createdTime,
                }, { merge: true });

                if (props.fileData) {
                    const imagesRef = ref(storageRef, fileName);
                    await uploadBytes(imagesRef, props.fileData);
                }

                dispatch({ type: 'updateDoc', payload: docRef });
                alert('글 수정이 완료되었습니다.');
                navigate('/questions', { replace: true });
            }
            catch (error) {
                alert(error.message);
                dispatch({ type: 'error', payload: error.message });
                navigate('/questions', { replace: true });
            };
        }

        else if (props.type === 'sr') {
            try {
                await setDoc(docRef, {
                    title: props.titleData,
                    text: props.postData,
                    fileName: fileName,
                    type: props.selectTypeData,
                    createdTime,
                }, { merge: true });

                if (props.fileData) {
                    const imagesRef = ref(storageRef, fileName);
                    await uploadBytes(imagesRef, props.fileData);
                }

                dispatch({ type: 'updateDoc', payload: docRef });
                alert('글 수정이 완료되었습니다.');
                navigate('/studyrecord', { replace: true });
            }
            catch (error) {
                alert(error.message);
                dispatch({ type: 'error', payload: error.message });
                navigate('/studyrecord', { replace: true });
            };
        }

        else if (props.type === 'dr') {
            try {
                await setDoc(docRef, {
                    title: props.titleData,
                    text: props.postData,
                    createdMonth: createdTime.toDate().getMonth() + 1,
                    createdTime,
                }, { merge: true });
                dispatch({ type: 'updateDoc', payload: docRef });
                alert('글 수정이 완료되었습니다.');
                navigate('/dailyrecord', { replace: true });
            }
            catch (error) {
                alert(error.message);
                dispatch({ type: 'error', payload: error.message });
                navigate('/dailyrecord', { replace: true });
            };
        };
    };

    const deleteDocument = async (id, pageType) => {
        dispatch({ type: 'isPending' });

        try {
            const docRef = await deleteDoc(doc(colRef, id));
            dispatch({ type: 'deleteDoc', payload: docRef });
            alert('글 삭제가 완료되었습니다.');
            if (pageType === 'sr') {
                navigate('/studyrecord', { replace: true });
            }
            else if (pageType === 'dr') {
                navigate('/dailyrecord', { replace: true });
            }
            else if (pageType === 'qs') {
                navigate('/questions', { replace: true });
            }
        }
        catch (e) {
            dispatch({ type: 'error', payload: e.message });
            alert('에러 발생', e);
            if (pageType === 'sr') {
                navigate('/studyrecord', { replace: true });
            }
            else if (pageType === 'dr') {
                navigate('/dailyrecord', { replace: true });
            }
            else if (pageType === 'qs') {
                navigate('/questions', { replace: true });
            }
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