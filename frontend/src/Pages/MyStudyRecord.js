import './MyStudyRecord.css';
import '../ResetStyle.css';

const MyStudyRecord = () => {
    return (
        <div className='mystudyrecord'>
            <div className='mystudyrecordboard'>

                <div className='mystudyrecordutil'>

                    <div className='mystudyrecordpagenation'>

                        <div>
                            전체
                        </div>
                        <div>
                            언어
                        </div>
                        <div>
                            리액트
                        </div>
                        <div>
                            알고리즘
                        </div>
                        <div>
                            프로젝트
                        </div>

                    </div>

                    <div className='mystudyrecordwritebtu'>
                        <div className='writeicon'/>
                    </div>

                </div>

                <div className='mystudyrecorditems'>

                    <div className='mystudyrecorditem'>
                        <div className='mystudyrecorditemicon'>
                            <div className='jsicon'/>
                        </div>

                        <div className='mystudyrecorditemtitle'>
                            <p>자바스크립트 - This</p>
                        </div>
                    </div>

                    <div className='mystudyrecorditem'>
                        <div className='mystudyrecorditemicon'>
                            <div className='algorithmicon'/>
                        </div>

                        <div className='mystudyrecorditemtitle'>
                            <p>알고리즘 - 백준 자바스크립트 1246</p>
                        </div>
                    </div>

                    <div className='mystudyrecorditem'>
                        <div className='mystudyrecorditemicon'>
                            <div className='reacticon'/>
                        </div>

                        <div className='mystudyrecorditemtitle'>
                            <p>리액트 - useStates</p>
                        </div>
                    </div>

                    <div className='mystudyrecorditem'>
                        <div className='mystudyrecorditemicon'>
                            <div className='jsicon'/>
                        </div>

                        <div className='mystudyrecorditemtitle'>
                            <p>자바스크립트 - 클로저</p>
                        </div>
                    </div>

                    <div className='mystudyrecorditem'>
                        <div className='mystudyrecorditemicon'>
                            <div className='upcyclingicon'/>
                        </div>

                        <div className='mystudyrecorditemtitle'>
                            <p>프로젝트 리메이크 - Prj03</p>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default MyStudyRecord;