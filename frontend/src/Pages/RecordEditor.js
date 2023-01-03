import '../styles/RecordEditor.css';
import '../ResetStyle.css';

const RecordEditor = () => {
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

                    <div className='recordeditorwritebtu'>
                        <div className='writeicon'/>
                    </div>

                </div>

                <div className='recordeditoritems'>

                    <input className='recordeditorinputtitle' placeholder='제목을 입력해주세요'/>

                    <input className='recordeditorinputtext' placeholder='본문을 입력해주세요'/>


                </div>

            </div>
        </div>
    );
};

export default RecordEditor;