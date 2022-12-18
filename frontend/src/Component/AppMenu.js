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
                    메뉴 1
                </Link>
                <Link className='appmenuatag' to={'/mystudyrecord'}>
                    메뉴 2
                </Link>
                <Link className='appmenuatag' to={'/myproject'}>
                    메뉴 3
                </Link>
            </div>
        </div>
    );
};

export default AppMenu;