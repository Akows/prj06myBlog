import '../styles/MyProject.css';
import '../ResetStyle.css';

const MyProject = () => {
    return (
        <div className='myproject'>
            <div className='myprojectboard'>

                <div className='myprojectitems'>

                    <div className='myprojectitem'>
                        <div className='myprojectitemimg'>
                            IMG
                        </div>

                        <div className='myprojectitemdesc'>

                            <div className='myprojectitemtitle'>   
                                <p>Prj01 - 프로젝트 제목</p>
                            </div>
                            
                            <div className='myprojectitemintro'>   
                                <p>프로젝트 설명</p>
                                <p>프로젝트 설명</p>
                                <p>프로젝트 설명</p>
                                <p>프로젝트 설명</p>
                                <p>프로젝트 설명</p>
                                <p>프로젝트 설명</p>
                                <p>프로젝트 설명</p>
                            </div>

                            <div className='myprojectitembtu'>   
                                <p>노션 / 깃 버튼</p>
                            </div>
                            
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default MyProject;