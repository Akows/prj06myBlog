import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../App';

import { collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';

const Test = () => {

    // 파이어베이스 설정을 가져올 Context.
    const firebaseContext = useContext(FirebaseContext);





    // 출력용 data를 제어할 useState.
    const [data, setData] = useState([]);





    // collection의 전체 길이를 구하는 메소드.
    const checkRecordLangth = async () => {
        console.log('checkRecordLangth active.');

        // collection 특정, query문 날리기.
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
        const querys = query(collectionRef, orderBy('Create_date', 'desc')); 

        // 해당하는 data의 전체 Count를 구하기.
        const getCounts = await getCountFromServer(querys);

        // 반환받은 data의 실제 data 부분의 Count를 계산.
        console.log('recordLangth is : ' + getCounts.data().count);
    };





    // 특정 collection의 모든 Docs 가져오기.
    const callAllDocs = async () => {
        console.log('callAllDocs active.');

        // collection 특정, query문 날리기.
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
        const querys = query(collectionRef, orderBy('Create_date', 'desc')); 

        // 해당하는 Docs 모두 가져오기.
        const documentSnapshots = await getDocs(querys);

        // 받아온 Docs를 map 함수를 이용하여 배열에 풀어놓기.
        const mappingData = documentSnapshots.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        // 풀려진 Docs를 변수에 대입.
        setData(mappingData);

        console.log(data);
    };





    // 특정 Doc 가져오기.
    const callOneDoc = async (docId) => {
        console.log('callOneDoc active.');

        // 어떤 collection에서 Doc를 가져올 것인지 설정.
        // 가지고 올 Doc의 ID값을 이용하여 collection에서 Doc를 특정하기.
        const docRef = doc(firebaseContext.fireStoreDB, 'MyStudyRecord', docId);

        // 해당하는 Doc 가져오기.
        const docSnap = await getDoc(docRef);

        setData(docSnap.data());

        console.log(data);
    };





    // queryPage.
    const queryPage = async () => {
        console.log('queryPage active.');

        // collection 특정, query문 날리기. (여기서는 12개 데이터만 가져오도록 설정.)
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
        const querys = query(collectionRef, orderBy('Create_date', 'desc'), limit(12)); 

        // 해당하는 Docs 모두 가져오기.
        const documentSnapshots = await getDocs(querys);

        // 처음과 마지막에 해당하는 Docs의 값을 제어하도록.
        // const firstVisible = documentSnapshots.docs[0];
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        // 정상적으로 데이터를 불러오는지 확인하는 구문. (정상 작동 확인함.)
        // console.log(firstVisible.data());
        // console.log(lastVisible.data());



        // 마지막에 해당하는 Docs의 값을 기준으로 그 이후 Docs를 가져오는 쿼리문.
        const nextDocsQuery = query(collectionRef, orderBy('Create_date', 'desc'), startAfter(lastVisible), limit(12));

        // 해당하는 Docs 모두 가져오기.
        const nextDocumentSnapshots = await getDocs(nextDocsQuery);

        // 받아온 Docs를 map 함수를 이용하여 배열에 풀어놓기.
        const mappingData = nextDocumentSnapshots.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        // 풀려진 Docs를 변수에 대입.
        setData(mappingData);

        console.log(data);
    };





    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '테스트 페이지';
    }, []);

    return (
        <div className='home'>

            <div className='hometitle'>
                <p>개발용 테스트 페이지.</p>

                <br/>
                <br/>

                <button onClick={checkRecordLangth}>
                    checkRecordLangth
                </button>

                <br/>
                <br/>

                <button onClick={callAllDocs}>
                    callAllDocs
                </button>

                <br/>
                <br/>

                <button onClick={() => {callOneDoc('UBmOeUPSeVRKgNwegVwU')}}>
                    callOneDoc
                </button>

                <br/>
                <br/>

                <button onClick={queryPage}>
                    queryPage
                </button>

            </div>




        </div>
    );
};

export default Test;