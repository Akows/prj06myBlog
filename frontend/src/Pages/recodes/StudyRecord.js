import { collection, getCountFromServer, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appFireStore } from '../../configs/firebase';
import { useAuthContext } from '../../customhooks/useAuthContext';

import Pagination from '../../components/Pagenation';

import styles from '../../styles/StudyRecord.module.css'
import '../../styles/StudyRecord.css'

export default function StudyRecord () {

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [dataLangth, setDataLangth] = useState(0);
    const [choiceType, setChoiceType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4; 
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;

    const boardListLoad = async (choiceType) => {
        const collectionRef = collection(appFireStore, 'studyrecord');

        if (choiceType === 'all') {
            try {
                const querys = query(collectionRef, orderBy('createdTime', 'desc')); 
                const querySnap = await getDocs(querys);
                const getCounts = await getCountFromServer(querys);
                const mappingData = querySnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            
                setDataLangth(getCounts.data().count);
                setData(mappingData.slice(firstItemIndex, lastItemIndex));
            } 
            catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const querys = query(collectionRef, where('type', '==', choiceType), orderBy('createdTime', 'desc')); 
                const querySnap = await getDocs(querys);
                const getCounts = await getCountFromServer(querys);
                
                const mappingData = querySnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            
                setDataLangth(getCounts.data().count);
                setData(mappingData.slice(firstItemIndex, lastItemIndex));
            } 
            catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '공부기록';
        boardListLoad(choiceType);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        boardListLoad(choiceType);
        // eslint-disable-next-line
    }, [choiceType, currentPage]);

    const setPageNumber = async (pagenumber) => {
        setCurrentPage(pagenumber);
    }

    return (
        <div className={styles.mystudyrecord}>
            <div className={styles.mystudyrecordboard}>

                <div className={styles.mystudyrecordutil}>

                    <div className={styles.mystudyrecordpagenation}>

                        <div onClick={() => {setChoiceType('all')}}>
                            전체
                        </div>
                        <div onClick={() => {setChoiceType('language')}}>
                            언어
                        </div>
                        <div onClick={() => {setChoiceType('react')}}>
                            리액트
                        </div>
                        <div onClick={() => {setChoiceType('algorithm')}}>
                            알고리즘
                        </div>
                        <div onClick={() => {setChoiceType('project')}}>
                            프로젝트
                        </div>

                    </div>

                    {user ? 
                        <>
                            <div className={styles.mystudyrecordwritebtu} onClick={() => {navigate('/recordeditorst/write');}}>
                                글쓰기
                            </div>
                        </>
                    : 
                        <>
                            <div className={styles.mystudyrecordwritebtu} onClick={() => {alert('블로그 주인만 글을 작성할 수 있습니다.')}}>
                                권한없음
                            </div>
                        </>
                    }

                </div>

                <div className={styles.mystudyrecorditems}>

                    {data.map((item) => (
                        <div className={styles.mystudyrecorditem} key={item.id} onClick={() => {navigate(`/studyrecord/${item.id}`);}}>
                            <div className={styles.mystudyrecorditemicon}>
                                <div className={`${styles}.${item.type}_icon`}/>

                                <div className={`${item.type}_icon`}/>
                            </div>

                            <div className={styles.mystudyrecorditemtitle}>
                                <p>{item.type}</p>
                                <p>{item.writer}</p>
                                <p>{item.title}</p>
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
