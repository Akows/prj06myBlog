import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../App';

import { collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter, startAt } from 'firebase/firestore';

const Test = () => {

    // 파이어베이스 설정을 가져올 Context.
    const firebaseContext = useContext(FirebaseContext);





    // 출력용 data를 제어하는 useState. 초기값은 빈 배열.
    const [data, setData] = useState([]);

    // 페이지 당 출력할 데이터의 갯수를 제어할 useState. 초기값은 12.
    const [itemsPerPage, setItemsPerPage] = useState(12);

    // 데이터의 전체 Langth를 제어하는 useState. 초기값은 0.
    const [dataLangth, setDataLangth] = useState(0);

    // 데이터의 첫 위치와 마지막 위치를 제어하는 useState. 초기값은 빈 배열.
    const [firstDoc, setFirstDoc] = useState([]);
    const [lastDoc, setLastDoc] = useState([]);





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





    // queryPage 메소드들.
    const queryPagePrev = async () => {
        console.log('queryPagePrev active.');

        // collection 특정, query문 날리기. (여기서는 12개 데이터만 가져오도록 설정.)
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');

        // 마지막에 해당하는 Docs의 값을 기준으로 그 이후 Docs를 가져오는 쿼리문.
        const nextDocsQuery = query(collectionRef, orderBy('Create_date', 'asc'), startAt(lastDoc), limit(itemsPerPage));

        // 해당하는 Docs 모두 가져오기.
        const nextDocumentSnapshots = await getDocs(nextDocsQuery);

        // 받아온 Docs를 map 함수를 이용하여 배열에 풀어놓기.
        const mappingData = nextDocumentSnapshots.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        // 풀려진 Docs를 출력.
        console.log(mappingData);
    };

    const queryPageNext = async () => {
        console.log('queryPageNext active.');

        // collection 특정, query문 날리기. (여기서는 12개 데이터만 가져오도록 설정.)
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');

        // 마지막에 해당하는 Docs의 값을 기준으로 그 이후 Docs를 가져오는 쿼리문.
        const nextDocsQuery = query(collectionRef, orderBy('Create_date', 'desc'), startAfter(lastDoc), limit(itemsPerPage));

        // 해당하는 Docs 모두 가져오기.
        const nextDocumentSnapshots = await getDocs(nextDocsQuery);

        // 받아온 Docs를 map 함수를 이용하여 배열에 풀어놓기.
        const mappingData = nextDocumentSnapshots.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        // 풀려진 Docs를 출력.
        console.log(mappingData);
    };

    const queryPageLast = async () => {
        console.log('queryPageLast active.');

        // collection 특정, query문 날리기. 
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
        const querys = query(collectionRef, orderBy('Create_date', 'desc')); 

        // 해당하는 Docs 모두 가져오기.
        const documentSnapshots = await getDocs(querys);

        // 처음과 마지막에 해당하는 Docs의 값을 계산하여 set.

        console.log((documentSnapshots.docs.length - 1) - itemsPerPage);
        console.log(documentSnapshots.docs.length - 1);

        setFirstDoc(documentSnapshots.docs[(documentSnapshots.docs.length - 1) - itemsPerPage]);
        setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

        // 마지막에 해당하는 Docs의 값을 기준으로 그 이후 Docs를 가져오는 쿼리문.
        const nextDocsQuery = query(collectionRef, orderBy('Create_date', 'asc'), startAfter(lastDoc), limit(itemsPerPage));

        // 해당하는 Docs 모두 가져오기.
        const nextDocumentSnapshots = await getDocs(nextDocsQuery);

        // 받아온 Docs를 map 함수를 이용하여 배열에 풀어놓기.
        const mappingData = nextDocumentSnapshots.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        // 풀려진 Docs를 출력.
        console.log(mappingData);
    };














    // collection의 전체 길이를 구하는 메소드. (useEffect로 자동 실행.)
    const setRecordLangth = async () => {
        // collection 특정, query문 날리기.
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
        const querys = query(collectionRef, orderBy('Create_date', 'desc')); 

        // 해당하는 data의 전체 Count를 구하기.
        const getCounts = await getCountFromServer(querys);

        // 반환받은 data의 실제 data 부분의 Count를 계산하여 변수에 대입하고 콘솔에 출력.
        setDataLangth(getCounts.data().count);
    };

    // 페이지네이션을 위한 변수값 선언 메소드. (itemsPerPage는 12.)
    const setPagenationValue = async () => {
        // collection 특정, query문 날리기. 
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
        const querys = query(collectionRef, orderBy('Create_date', 'desc'), limit(itemsPerPage)); 

        // 해당하는 Docs 모두 가져오기.
        const documentSnapshots = await getDocs(querys);

        // 처음과 마지막에 해당하는 Docs의 값을 계산하여 set.
        setFirstDoc(documentSnapshots.docs[0]);
        setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '테스트 페이지';

        // 컴포넌트가 출력되면 모든 데이터의 길이를 받아와서 변수에 대입.
        setRecordLangth();

        // 화면에 출력할 특정 갯수의 데이터의 처음과 끝 위치를 변수에 대입.
        setPagenationValue();

        // eslint-disable-next-line
    }, []);



    const getFunctionValue = () => {
        console.log('itemsPerPage : ' + itemsPerPage);
        console.log('dataLangth : ' + dataLangth);
        console.log('firstDocTitle : ' + firstDoc.data().Title);
        console.log('lastDocTitle : ' + lastDoc.data().Title);
    };

    const setItemsPerPageNumber6 = () => {
        setItemsPerPage(6);
    };
    const setItemsPerPageNumber12 = () => {
        setItemsPerPage(12);
    };



    return (
        <div className='home'>

            <div className='hometitle'>
                <p>개발용 테스트 페이지. ,</p>

                <br/>
                <br/>

                <button onClick={getFunctionValue}>
                    getFunctionValue
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

                <button onClick={queryPagePrev}>
                    queryPagePrev
                </button>
                <button onClick={queryPageNext}>
                    queryPageNext
                </button>

                <br/>

                <button onClick={queryPageLast}>
                    queryPageLast
                </button>

                <br/>
                <br/>

                <button onClick={setItemsPerPageNumber6}>
                    get6
                </button>
                <button onClick={setItemsPerPageNumber12}>
                    get12
                </button>

            </div>




        </div>
    );
};

export default Test;