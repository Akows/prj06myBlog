import '../styles/RecordItem.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FirebaseContext } from '../App';

import { deleteDoc, doc, getDoc } from 'firebase/firestore';

const RecordItem = () => {

    const navigate = useNavigate();

    const firebaseContext = useContext(FirebaseContext);

    const { id } = useParams();

    const [data, setData] = useState([]);

    const boardLoad = async (id) => {
        try {
            const docRef = doc(firebaseContext.fireStoreDB, 'DailyRecord', id);

            const docSnap = await getDoc(docRef);

            setData(docSnap.data());
        } 
        catch (error) {
            console.log(error);  
        }
    };

    const boardDelete = async (id) => {
        try {
            const docRef = doc(firebaseContext.fireStoreDB, 'DailyRecord', id);
            await deleteDoc(docRef);
            alert('글이 삭제되었습니다.');
            navigate('/dailyrecord', { replace: true });
        } 
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '일일기록';

        boardLoad(id);
        // eslint-disable-next-line
    }, []);


    return (
        <div className='recorditem'>
            <div className='recorditemboard'>

                <div className='recorditemutil'>

                    <div className='recorditemdesc'>
                        <div>
                            글 조회 페이지
                        </div>
                        <div>
                            작성일은<p className='todaytime'>2023년 01월 01일</p>입니다.
                        </div>
                    </div>

                    <div className='recorditemwritebtu'>
                        <div className='deleteicon' onClick={() => {boardDelete(id)}}/>
                        <div className='updateicon' onClick={() => {navigate(`/recordeditor/${id}`)}}/>
                    </div>

                </div>

                <div className='recorditemitems'>

                    <div className='recorditemitem recorditemtitle'>
                        <p>{data.Title}</p>
                    </div>

                    <div className='recorditemitem recorditemtext'>
                        <p>{data.Text}</p>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default RecordItem;