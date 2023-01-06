import '../styles/RecordEditor.css';
import '../ResetStyle.css';

import { useContext } from 'react';
import { DatebaseContext } from '../App';

const RecordEditor = () => {

    const datebaseContext = useContext(DatebaseContext);

    const onChangeEvent = (event) => {
        datebaseContext.setDailyRecordData({
            ...datebaseContext.dailyRecordData,
            [event.target.name] : event.target.value
        })
    };

    const onSubmit = () => {
        datebaseContext.boardCreate();
    };

    return (
        <div className='recordeditor'>
            <div className='recordeditorboard'>

                <div className='recordeditorutil'>

                    <div className='recordeditordesc'>
                        <div>
                            글 작성/수정 페이지
                        </div>
                        <div>
                            오늘은<p className='todaytime'>2023년 01월 01일</p>입니다.
                        </div>
                    </div>

                    <div className='recordeditorwritebtu' onClick={onSubmit}>
                        <div className='writeicon'/>
                    </div>

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