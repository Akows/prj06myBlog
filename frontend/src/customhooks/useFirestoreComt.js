import { useReducer } from 'react'
import { appFireStore, timeStamp } from '../configs/firebase'
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';

const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'isPending':
            return { isPending: true, document: null, success: false, error: null }
        case 'addComment':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'getComment':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    };
};

export const useFirestoreComt = (transaction) => {
    const [responseData, dispatch] = useReducer(storeReducer, initState);
    const colRef = collection(appFireStore, transaction);
    const { user } = useAuthContext();

    const navigate = useNavigate();

    const getComments = async (id) => {
        try {
            const querys = query(colRef, where('targetDoc', '==', id), orderBy('createdTime', 'desc'));
            const querySnap = await getDocs(querys);
            const mappingData = querySnap.docs.map((doc) => ({
                comments: doc.data().comments,
                createdTime: doc.data().createdTime.toDate().toLocaleString(),
                targetDoc: doc.data().targetDoc,
                writer: doc.data().writer,
            }));

            dispatch({ type: 'getComment', payload: mappingData });
        }
        catch (error) {
            console.log(error);
        }
    };

    const addComments = async (commentsData, id, pageType) => {
        try {
            const createdTime = timeStamp.fromDate(new Date());

            let writerName = '';

            if (!user) {
                writerName = '익명사용자';
            }
            else {
                writerName = user.displayName;
            };

            const docRef = await addDoc(colRef, {
                comments: commentsData,
                createdTime: createdTime,
                writer: writerName,
                targetDoc: id,
            });
            dispatch({ type: 'addComment', payload: docRef });
            alert('댓글 작성이 완료되었습니다.');

            if (pageType === 'dr') {
                navigate(`/dailyrecord/${id}`, { replace: true });

                // window.location.replace(`/dailyrecord/${id}`);
            }
            else if (pageType === 'sr') {
                navigate(`/studyrecord/${id}`, { replace: true });


                // window.location.replace(`/studyrecord/${id}`);
            };
        }
        catch (error) {
            console.error(error);
        }
    };

    return { getComments, addComments, responseData };
};