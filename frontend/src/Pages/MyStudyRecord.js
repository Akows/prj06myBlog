import '../styles/MyStudyRecord.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseContext, LoginContext } from '../App';

import { collection, getCountFromServer, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore';
import Pagination from '../components/Pagenation';

const MyStudyRecord = () => {

    const navigate = useNavigate();

    const firebaseContext = useContext(FirebaseContext);
    const loginContext = useContext(LoginContext);

    const [data, setData] = useState([]);

    const [dataLangth, setDataLangth] = useState(0);

    const [choiceType, setChoiceType] = useState('전체');

    const [itemsPerPage, setItemsPerPage] = useState(12); 
    const [currentPage, setCurrentPage] = useState(1);
    const [firstDoc, setFirstDoc] = useState([]);
    const [lastDoc, setLastDoc] = useState([]);

    const lastIndex = currentPage * itemsPerPage;





    
    const postPerPage = 12;
    const lastItemIndex = currentPage * postPerPage; // 12
    const firstItemIndex = lastItemIndex - postPerPage; // 0


    const boardListLoad = async (choiceType) => {
        if (choiceType === '전체') {
            try {
                const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
                const querys = query(collectionRef, orderBy('Create_date', 'desc')); 
    
                const querySnap = await getDocs(querys);

                const mappingData = querySnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            
                setData(mappingData.slice(firstItemIndex, lastItemIndex));
            } 
            catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
                const querys = query(collectionRef, where('Type', '==', choiceType), orderBy('Create_date', 'desc')); 
    
                const querySnap = await getDocs(querys);

                const mappingData = querySnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            
                setData(mappingData.slice(firstItemIndex, lastItemIndex));
            } 
            catch (error) {
                console.log(error);
            }
        }
    };

    const setRecordLangth = async () => {
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
        const querys = query(collectionRef, orderBy('Create_date', 'desc')); 

        const getCounts = await getCountFromServer(querys);

        setDataLangth(getCounts.data().count);
    };

    const setPagenationAxis = async (currentPage) => {
        const collectionRef = collection(firebaseContext.fireStoreDB, 'MyStudyRecord');
        const querys = query(collectionRef, orderBy('Create_date', 'desc'), limit(itemsPerPage)); 

        const documentSnapshots = await getDocs(querys);

        setFirstDoc(documentSnapshots.docs[0]);
        setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '공부기록';

        boardListLoad(choiceType);

        setRecordLangth();
        setPagenationAxis(currentPage);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        boardListLoad(choiceType);

        setRecordLangth();
        setPagenationAxis(currentPage);
        // eslint-disable-next-line
    }, [choiceType]);



    const setItemPerPageCount = (event) => {
        setItemsPerPage(event.target.value);
    };

    const setPageNumber = async (pagenumber) => {
        setCurrentPage(pagenumber);
    }

    return (
        <div className='mystudyrecord'>
            <div className='mystudyrecordboard'>

                <div className='mystudyrecordutil'>

                    <div className='mystudyrecordpagenation'>

                        <div onClick={() => {setChoiceType('전체')}}>
                            전체
                        </div>
                        <div onClick={() => {setChoiceType('언어')}}>
                            언어
                        </div>
                        <div onClick={() => {setChoiceType('리액트')}}>
                            리액트
                        </div>
                        <div onClick={() => {setChoiceType('알고리즘')}}>
                            알고리즘
                        </div>
                        <div onClick={() => {setChoiceType('프로젝트')}}>
                            프로젝트
                        </div>

                    </div>

                    {loginContext.isLogin ? 
                        <>
                            <div className='mystudyrecordwritebtu' onClick={() => {navigate('/mystudyrecordeditor/write');}}>
                                <div className='writeicon'/>
                            </div>
                        </>
                    : 
                        <>
                            <div className='mystudyrecordwritebtu' onClick={() => {alert('블로그 주인만 글을 작성할 수 있습니다.')}}>
                                <div className='writeicon'/>
                            </div>
                        </>
                    }

                </div>

                <div className='pagenationutil'>
                    <div className='recordeditoritemsselect'>
                        <select onChange={setItemPerPageCount}>
                            <option value={4}>4개씩</option>
                            <option value={8}>8개씩</option>
                            <option value={12}>12개씩</option>
                            <option value={16}>16개씩</option>
                        </select>
                    </div>
                </div>

                <div className='mystudyrecorditems'>

                    {data.map((item) => (
                        <div className='mystudyrecorditem' key={item.id} onClick={() => {navigate(`/mystudyrecorditem/${item.id}`);}}>
                            <div className='mystudyrecorditemicon'>
                                <div className={`${item.Type}_icon`}/>
                            </div>

                            <div className='mystudyrecorditemtitle'>
                                <p>{item.Type}</p>
                                <p>{item.Title}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <Pagination 
                    postsPerPage={itemsPerPage} 
                    totalPosts={dataLangth}
                    paginate={setPageNumber}
                />

            </div>
        </div>
    );
};

export default MyStudyRecord;