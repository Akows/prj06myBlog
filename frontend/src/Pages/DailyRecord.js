import '../styles/DailyRecord.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../App';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const DailyRecord = () => {

    const navigate = useNavigate();
    const firebaseContext = useContext(FirebaseContext);

    const [data, setData] = useState([]);
    const [choiceMonth, setChoiceMonth] = useState(new Date().getMonth() + 1);

    const boardListLoad = async (choiceMonth) => {
        try {
            const collectionRef = collection(firebaseContext.fireStoreDB, 'DailyRecord');

            const querys = query(collectionRef, where('Create_Month', '==', choiceMonth), orderBy('Create_date', 'desc')); 

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
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '일일기록';

        boardListLoad(choiceMonth);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        boardListLoad(choiceMonth);
        // eslint-disable-next-line
    }, [choiceMonth]);

    return (
        <div className='dailyrecord'>
            <div className='dailyrecordboard'>

                <div className='dailyrecordutil'>

                    <div className='dailyrecordpagenation'>

                        <div className={'month'} onClick={() => {setChoiceMonth(11)}}>
                            11월
                        </div>
                        <div className={'month'} onClick={() => {setChoiceMonth(12)}}>
                            12월 
                        </div>
                        <div className={'month'} onClick={() => {setChoiceMonth(1)}}>
                            <p className='year'>2023.</p>1월
                        </div>
                        <div className={'month'} onClick={() => {setChoiceMonth(2)}}>
                            2월
                        </div>

                    </div>

                    <div className='dailyrecordwritebtu' onClick={() => {navigate('/dailyrecordeditor/write');}}>
                        <div className='writeicon'/>
                    </div>

                </div>

                <div className='dailyrecorditems'>
                    {data.map((item) => (
                        <div className='dailyrecorditem' key={item.id} onClick={() => {navigate(`/dailyrecorditem/${item.id}`)}}>
                            <p>{item.Create_date}</p> <p>{item.Title}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DailyRecord;