import '../styles/AppMenu.css';
import '../ResetStyle.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoginContext } from '../App';

const AppMenu = () => {

    const loginContext = useContext(LoginContext);

    return (
        <div className='appmenu'>
            <div className='appmenulogo'>
                <Link className='appmenuatag' to={'/'}>
                    이유승 블로그
                </Link>
            </div>

            <div className='appmenubutton'>
                <Link className='appmenuatag' to={'/dailyrecord'}>
                    <p>하루일지</p> <div className='dailyrecordicon'/>
                </Link>
                <Link className='appmenuatag' to={'/mystudyrecord'}>
                    <p>공부기록</p> <div className='mystudyrecordicon'/>
                </Link>
                <Link className='appmenuatag' to={'/myproject'}>
                    <p>포트폴리오</p> <div className='myprojecticon'/>
                </Link>
            </div>

            <div className='membermenubutton'>

                {loginContext.isLogin ? 
                    <>
                        <div className='appmenuatag' onClick={loginContext.logoutEvent}>
                            <p>로그아웃</p>

                            <div className='usericon'/>
                        </div>
                    </> 
                    : 
                    <>
                        <Link className='appmenuatag' to={'/login'}>
                            <p>로그인</p>

                            <div className='usericon'/>
                        </Link>
                    </>
                    }


            </div>
        </div>
    );
};

export default AppMenu;