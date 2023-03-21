import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appFireStore } from '../../configs/firebase';
import { useAuthContext } from '../../customhooks/useAuthContext';
import styles from '../../styles/Questions.module.css'

export default function Questions () {

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [choiceType, setChoiceType] = useState('all');

    const boardListLoad = async (choiceType) => {
        const collectionRef = collection(appFireStore, 'questions');
        if (choiceType === 'all') {
            try {
                const querys = query(collectionRef, orderBy('createdTime', 'desc')); 
                const querySnap = await getDocs(querys);
                const mappingData = querySnap.docs.map((doc) => ({
                    id: doc.id,
                    time: doc.data().createdTime.toDate().toLocaleString(),
                    ...doc.data()
                }));
                setData(mappingData);
            } 
            catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const querys = query(collectionRef, where('type', '==', choiceType), orderBy('createdTime', 'desc')); 
                const querySnap = await getDocs(querys);            
                const mappingData = querySnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(mappingData);
            } 
            catch (error) {
                console.log(error);
            };
        };
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
    }, [choiceType]);

    return (
        <div className={styles.questions}>
            <div className={styles.questionsboard}>
                <div className={styles.questionsutil}>
                    <div className={styles.questionspagenation}>

                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('all')}}>
                            전체
                        </div>
                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('html')}}>
                            HTML
                        </div>
                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('css')}}>
                            CSS
                        </div>
                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('js')}}>
                            JS
                        </div>
                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('ts')}}>
                            TS
                        </div>
                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('react')}}>
                            React.js
                        </div>
                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('next')}}>
                            Next.js
                        </div>
                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('redux')}}>
                            Redux
                        </div>
                        <div className={styles.pagenationbtu} onClick={() => {setChoiceType('firebase')}}>
                            Firebase
                        </div>

                    </div>

                    {!user.isAnonymous ? 
                        <div className={styles.questionswritebtu} onClick={() => {navigate('/texteditor/qs/write');}}>
                            글쓰기
                        </div>
                    : 
                        <div>
                            {/* 익명사용자는 글 쓰기 버튼이 아예 안보이도록 */}
                        </div>
                    }
                </div>

                <div className={styles.questionsitemlist}>
                    {data.map((item) => (
                        <div className={styles.questionsitem}key={item.id} onClick={() => {navigate(`/questions/${item.id}`);}}>
                            <div className={styles.questionsitemicon}>
                                
                            </div>
                            <div className={styles.questionsiteminfo1}>
                                <div className={['default2_icon', `${item.type}_icon`].join(' ')}/>
                                {item.title}
                            </div>
                            <div className={styles.questionsiteminfo2}>
                                {item.writer}
                            </div>
                            <div className={styles.questionsiteminfo3}>
                                {item.time}
                            </div>
                        </div>
                    ))}

                    {data && <><br/> 작성한 글이 없습니다.</>}
                </div>
            </div>
        </div>
    );
};