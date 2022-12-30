import './DailyRecord.css';
import '../ResetStyle.css';

const DailyRecord = () => {
    return (
        <div className='dailyrecord'>
            <div className='dailyrecordboard'>

                <div className='dailyrecordutil'>

                    <div className='dailyrecordpagenation'>
                        11월, 12월, 1월 등을 나누는 버튼이 보이는 영역
                    </div>

                </div>

                <div className='dailyrecorditems'>

                    <div className='dailyrecorditem'>
                        게시글 예시
                    </div>

                    <div className='dailyrecorditem'>
                        게시글 예시
                    </div>

                    <div className='dailyrecorditem'>
                        게시글 예시
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DailyRecord;