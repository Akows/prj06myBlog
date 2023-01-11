import '../styles/RecordItem.css';
import '../ResetStyle.css';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RecordItem = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        // console.log(datebaseContext.data);
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
                        <div className='deleteicon'/>
                        <div className='updateicon' onClick={() => {navigate(`/recordeditor/${id}`)}}/>
                    </div>

                </div>

                <div className='recorditemitems'>

                    <div className='recorditemitem recorditemtitle'>
                        <p>{'Title'}</p>
                    </div>

                    <div className='recorditemitem recorditemtext'>
                        <p>{'Text'}</p>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default RecordItem;