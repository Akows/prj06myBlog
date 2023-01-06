import '../styles/RecordItem.css';
import '../ResetStyle.css';
import { useContext, useEffect } from 'react';
import { DatebaseContext } from '../App';
import { useParams } from 'react-router-dom';

const RecordItem = () => {
    const { id } = useParams();

    const datebaseContext = useContext(DatebaseContext);

    useEffect(() => {
        datebaseContext.boardItemLoad(id);

        console.log(datebaseContext.data);
        // eslint-disable-next-line
    }, []);


    return (
        <div className='recorditem'>
            <div className='recorditemboard'>

                <div className='recorditemutil'>

                    <div className='recorditemdesc'>
                        <div>
                            글 조회 페이지d
                        </div>
                        <div>
                            작성일은<p className='todaytime'>2023년 01월 01일</p>입니다.
                        </div>
                    </div>

                    <div className='recorditemwritebtu'>
                        <div className='deleteicon'/>
                        <div className='updateicon'/>
                    </div>

                </div>

                <div className='recorditemitems'>

                    <div className='recorditemitem recorditemtitle'>
                        <p>{datebaseContext.data.Title}</p>
                    </div>

                    <div className='recorditemitem recorditemtext'>
                        <p>{datebaseContext.data.Text}</p>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default RecordItem;