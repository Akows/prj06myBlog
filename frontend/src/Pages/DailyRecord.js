import '../styles/DailyRecord.css';
import '../ResetStyle.css';

import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { DatebaseContext } from '../App';

const DailyRecord = () => {

    const navigate = useNavigate();

    const datebaseContext = useContext(DatebaseContext);

    useEffect(() => {
        datebaseContext.boardLoad();

        // console.log(datebaseContext.data);
        // eslint-disable-next-line
    }, []);

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

                    <div className='dailyrecordwritebtu' onClick={() => {navigate('/recordeditor/write');}}>
                        <div className='writeicon'/>
                    </div>

                </div>

                <div className='dailyrecorditems'>
                    {datebaseContext.data.map((item) => (
                        <div className='dailyrecorditem' key={item.id} onClick={() => {navigate(`/recorditem/${item.id}`);}}>
                            <p>{item.Create_date}</p> <p>{item.Title}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DailyRecord;