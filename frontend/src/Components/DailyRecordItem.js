import '../styles/RecordItem.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FirebaseContext, LoginContext } from '../App';

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

const RecordItem = () => {

    const navigate = useNavigate();

    const firebaseContext = useContext(FirebaseContext);
    const loginContext = useContext(LoginContext);

    const { id } = useParams();

    const [inputCommentData, setInputCommentData] = useState({
        Text: ''
    });

    const [data, setData] = useState([]);
    const [commentData, setCommentData] = useState([]);

    const onChangeEvent = (event) => {
        setInputCommentData({
            [event.target.name] : event.target.value
        })
    };

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

    const commentsLoad = async (id) => {
        try {
            const collectionRef = collection(firebaseContext.fireStoreDB, 'Comments');

            const querys = query(collectionRef, where('ID', '==', id)); 

            const querySnap = await getDocs(querys);

            const mappingData = querySnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        
            setCommentData(mappingData);
        } 
        catch (error) {
            console.log(error);  
        }
    };

    const commentsCreate = async () => {
        try {
            await addDoc(collection(firebaseContext.fireStoreDB, 'Comments'), {
                Text: inputCommentData.Text,
                Create_YMD: loginContext.Time.now,
                Create_HMS: (loginContext.Time.hours + '시 ' + loginContext.Time.minutes + '분 ' + loginContext.Time.seconds + '초') ,
                Writer: loginContext.whoLogin,
                ID: id
            });
            alert('댓글이 작성되었습니다.');
            window.location.replace(`/dailyrecorditem/${id}`);
        } 
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '일일기록';

        boardLoad(id);
        commentsLoad(id);
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
                        <div className='updateicon' onClick={() => {navigate(`/dailyrecordeditor/${id}`)}}/>
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

                <div className='recorditemcomments'>
                    {commentData.map((item) => (
                        <div className='recorditemcommenttext' key={item.id}>
                            <p>{item.Text}</p>
                            <p className='commentsinfo'>{item.Writer}, {item.Create_YMD} - {item.Create_HMS}</p>
                        </div>
                    ))}

                    <div className='recorditemcommentutil'>
                        <input name='Text' type='text' placeholder='댓글을 입력해주세요' className='recorditemcommentinput' value={inputCommentData.Title} onChange={onChangeEvent}/> 
                        <div className='commentsubmitbtu' onClick={() => {commentsCreate()}}>
                            댓글작성
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordItem;