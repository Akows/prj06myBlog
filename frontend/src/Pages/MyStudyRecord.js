import '../styles/MyStudyRecord.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseContext, LoginContext } from '../App';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const MyStudyRecord = () => {

    const navigate = useNavigate();
    const firebaseContext = useContext(FirebaseContext);
    const loginContext = useContext(LoginContext);

    const [data, setData] = useState([]);
    const [choiceType, setChoiceType] = useState('전체');

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
            
                setData(mappingData);
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
            
                setData(mappingData);
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
    }, [choiceType]);

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
            </div>
        </div>
    );
};

export default MyStudyRecord;