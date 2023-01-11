import '../styles/RecordEditor.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FirebaseContext, LoginContext } from '../App';
import { addDoc, collection, increment } from 'firebase/firestore';

const RecordEditor = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const firebaseContext = useContext(FirebaseContext);
    const loginContext = useContext(LoginContext);

    const [isUpdate, setIsUpdate] = useState(false);

    const [inputRecordData, setInputRecordData] = useState({
        Title: '',
        Text: ''
    });

    const boardCreate = async () => {
        try {
            await addDoc(collection(firebaseContext.fireStoreDB, 'DailyRecord'), {
                Item_Number: increment(1),
                Title: inputRecordData.Title,
                Text: inputRecordData.Text,
                Create_date: loginContext.Time.now,
                Create_Month: loginContext.Time.month,
                Writer: loginContext.whoLogin
            });
            alert('글이 작성되었습니다.');
            navigate('/dailyrecord', { replace: true });
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

    const onSubmit = () => {
        boardCreate();
    };


    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '글 작성/수정';

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
                                    작성일은<p className='todaytime'>{''}</p>입니다.
                                </>
                            : 
                                <>
                                    오늘은<p className='todaytime'>{''}</p>입니다.
                                </>
                            }
                        </div>
                    </div>

                    {isUpdate ? 
                        <div className='recordeditorwritebtu' onClick={''}>
                            <div className='writeicon'/>
                        </div>
                    : 
                        <div className='recordeditorwritebtu' onClick={onSubmit}>
                            <div className='writeicon'/>
                        </div>
                    }



                </div>

                <div className='recordeditoritems'>
                    <input name='Title' type='text' className='recordeditorinputtitle' placeholder='제목을 입력해주세요' value={inputRecordData.Title} onChange={onChangeEvent}/>
                    <input name='Text' type='text' className='recordeditorinputtext' placeholder='본문을 입력해주세요' value={inputRecordData.Text} onChange={onChangeEvent}/>
                </div>

            </div>
        </div>
    );
};

export default RecordEditor;