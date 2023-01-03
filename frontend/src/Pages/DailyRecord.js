import '../styles/DailyRecord.css';
import '../ResetStyle.css';

import { useNavigate } from 'react-router-dom';

const DailyRecord = () => {

    const navigate = useNavigate();

    return (
        <div className='dailyrecord'>
            <div className='dailyrecordboard'>

                <div className='dailyrecordutil'>

                    <div className='dailyrecordpagenation'>

                        <div>
                            11월
                        </div>
                        <div>
                            12월
                        </div>
                        <div>
                            <p className='year'>2023.</p>1월
                        </div>
                        <div>
                            2월
                        </div>

                    </div>

                    <div className='dailyrecordwritebtu' onClick={() => {navigate('/recordeditor');}}>
                        <div className='writeicon'/>
                    </div>

                </div>

                <div className='dailyrecorditems'>

                    <div className='dailyrecorditem' onClick={() => {navigate('/recorditem');}}>
                        <p>11월 01일</p>
                    </div>

                    <div className='dailyrecorditem' onClick={() => {navigate('/recorditem');}}>
                        <p>11월 02일</p>
                    </div>

                    <div className='dailyrecorditem' onClick={() => {navigate('/recorditem');}}>
                        <p>11월 03일</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DailyRecord;