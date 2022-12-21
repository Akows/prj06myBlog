import './AppMenu.css';
import '../ResetStyle.css';

import { Link } from 'react-router-dom';

const AppMenu = () => {
    return (
        <div className='appmenu'>
            <div className='appmenulogo'>
                <Link className='appmenuatag' to={'/'}>
                    이유승 블로그
                </Link>
            </div>

            <div className='appmenubutton'>
                <Link className='appmenuatag' to={'/dailyrecord'}>
                    하루일지
                </Link>
                <Link className='appmenuatag' to={'/mystudyrecord'}>
                    공부기록
                </Link>
                <Link className='appmenuatag' to={'/myproject'}>
                    프로젝트
                </Link>
            </div>

            <div className='membermenubutton'>
                <Link className='appmenuatag' to={'/login'}>
                    <p>관리자 로그인</p>

                    <div className='usericon'/>
                </Link>
            </div>
        </div>
    );
};

export default AppMenu;