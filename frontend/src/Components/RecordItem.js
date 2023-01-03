import '../styles/RecordItem.css';
import '../ResetStyle.css';

const RecordItem = () => {
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
                        <div className='updateicon'/>
                    </div>

                </div>

                <div className='recorditemitems'>

                    <div className='recorditemitem recorditemtitle'>
                        <p>제목</p>
                    </div>

                    <div className='recorditemitem recorditemtext'>
                        <p>본문</p>
                        <p>본문</p>
                        <p>본문</p>
                        <p>본문</p>
                        <p>본문</p>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default RecordItem;