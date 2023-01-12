import '../styles/MyStudyRecordEditor.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FirebaseContext, LoginContext } from '../App';

import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

const MyStudyRecordEditor = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const firebaseContext = useContext(FirebaseContext);
    const loginContext = useContext(LoginContext);

    const [isUpdate, setIsUpdate] = useState(false);

    const [data, setData] = useState([]);

    const [inputRecordData, setInputRecordData] = useState({
        Title: '',
        Text: '',
    });

    const [inputRecordSelectData, setInputRecordSelectData] = useState('언어');

    const boardLoad = async (id) => {
        try {
            const docRef = doc(firebaseContext.fireStoreDB, 'MyStudyRecord', id);
            const docSnap = await getDoc(docRef);
            setData(docSnap.data());
            setInputRecordData({
                Title: docSnap.data().Title,
                Text: docSnap.data().Text,
                Type: docSnap.data().Type
            });
        } 
        catch (error) {
            console.log(error);  
        }
    };

    const boardCreate = async () => {
        try {
            await addDoc(collection(firebaseContext.fireStoreDB, 'MyStudyRecord'), {
                Title: inputRecordData.Title,
                Text: inputRecordData.Text,
                Create_date: loginContext.Time.now,
                Writer: loginContext.whoLogin,
                Type: inputRecordSelectData
            });
            alert('글이 작성되었습니다.');
            navigate('/mystudyrecord', { replace: true });
        } 
        catch (error) {
            console.error(error);
        }
    };

    const boardUpdate = async (id) => {
        try {
            const docRef = doc(firebaseContext.fireStoreDB, 'MyStudyRecord', id);
            await setDoc(docRef, {
                Title: inputRecordData.Title,
                Text: inputRecordData.Text,
                Type: inputRecordSelectData
            }, { merge: true });
            alert('글이 수정되었습니다.');
            navigate('/mystudyrecord', { replace: true });
        } 
        catch (error) {
            console.error(error);
        }
    };

    const onChangeEvent = (event) => {
        setInputRecordData({
            ...inputRecordData,
            [event.target.name] : event.target.value
        })
    };

    const onChangeSelectEvent = (event) => {
        setInputRecordSelectData(event.target.value);
    };

    const test = () => {
        console.log(inputRecordData);
        console.log(inputRecordSelectData);
    }

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        
        if (id === 'write') {
            titleElement.innerHTML = '글 작성하기';
            setIsUpdate(false);
        }
        else {
            titleElement.innerHTML = '글 수정하기';
            setIsUpdate(true);
            boardLoad(id);
        }

        // eslint-disable-next-line
    }, []);

    return (
        <div className='recordeditor'>
            <div className='recordeditorboard'>

                <div className='recordeditorutil'>

                    <div className='recordeditordesc'>
                        <div>
                            {isUpdate ? <>글 수정 페이지</> : <>글 작성 페이지</>}
                        </div>
                        <div>
                            {isUpdate ? 
                                <>
                                    작성일은<p className='todaytime'>{data.Create_date}</p>입니다.
                                </>
                            : 
                                <>
                                    오늘은<p className='todaytime'>{loginContext.Time.now}</p>입니다.
                                </>
                            }
                        </div>
                    </div>

                    {isUpdate ? 
                        <div className='recordeditorwritebtu' onClick={() => {boardUpdate(id)}}>
                            <div className='writeicon'/>
                        </div>
                    : 
                        <div className='recordeditorwritebtu' onClick={() => {boardCreate()}}>
                            <div className='writeicon'/>
                        </div>
                    }

                </div>

                <div className='recordeditoritems'>

                    <div className='recordeditoritemsselect'>
                        <select onChange={onChangeSelectEvent}>
                            <option value='언어'>언어</option>
                            <option value='리액트'>리액트</option>
                            <option value='알고리즘'>알고리즘</option>
                            <option value='프로젝트'>프로젝트</option>
                        </select>
                    </div>

                    <div onClick={test}> dasdasd</div>

                    <input maxLength={50} name='Title' type='text' className='recordeditorinputtitle' placeholder='제목을 입력해주세요' value={inputRecordData.Title} onChange={onChangeEvent}/>
                    <textarea name='Text' type='text' className='recordeditorinputtext' placeholder='본문을 입력해주세요' value={inputRecordData.Text} onChange={onChangeEvent}/>
                </div>

            </div>
        </div>
    );
};

export default MyStudyRecordEditor;