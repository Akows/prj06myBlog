import '../styles/RecordEditor.css';
import '../ResetStyle.css';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DatebaseContext } from '../App';

const RecordEditor = () => {

    const { id } = useParams();
    const datebaseContext = useContext(DatebaseContext);

    const [isUpdate, setIsUpdate] = useState(false);

    const onChangeEvent = (event) => {
        datebaseContext.setDailyRecordData({
            ...datebaseContext.dailyRecordData,
            [event.target.name] : event.target.value
        })
    };

    const onSubmit = () => {
        datebaseContext.boardCreate();
    };

    const onUpdate = (id) => {
        datebaseContext.boardUpdate(id);       
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '글 작성/수정';

        if (id === 'write')
            setIsUpdate(false);
        else
            setIsUpdate(true);
            datebaseContext.boardItemLoad(id);
            datebaseContext.setDailyRecordData({
                Create_date: '',
                Title: datebaseContext.data.Title,
                Text: datebaseContext.data.Text,
                Writer: ''
            })
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
                                    작성일은<p className='todaytime'>{datebaseContext.data.Create_date}</p>입니다.
                                </>
                            : 
                                <>
                                    오늘은<p className='todaytime'>{datebaseContext.setTimeinfo()}</p>입니다.
                                </>
                            }
                        </div>
                    </div>

                    {isUpdate ? 
                        <div className='recordeditorwritebtu' onClick={onUpdate(id)}>
                            <div className='writeicon'/>
                        </div>
                    : 
                        <div className='recordeditorwritebtu' onClick={onSubmit}>
                            <div className='writeicon'/>
                        </div>
                    }



                </div>

                <div className='recordeditoritems'>
                    <input name='Title' type='text' className='recordeditorinputtitle' placeholder='제목을 입력해주세요' value={datebaseContext.dailyRecordData.Title} onChange={onChangeEvent}/>
                    <input name='Text' type='text' className='recordeditorinputtext' placeholder='본문을 입력해주세요' value={datebaseContext.dailyRecordData.Text} onChange={onChangeEvent}/>
                </div>

            </div>
        </div>
    );
};

export default RecordEditor;