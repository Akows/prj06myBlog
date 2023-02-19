import { Link } from 'react-router-dom';
import { useAuthContext } from '../customhooks/useAuthContext';
import { useLogout } from '../customhooks/useLogout';
import styles from '../styles/TopMenuBar.module.css'

const TopMenuBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const onMove = () => {
        window.open('https://savory-erica-ab8.notion.site/Lee-Yuseung-6f40078f4a3340a1955b62cf823e4b9a');
    };

    return (
        <div className={styles.background}>
            <div className={[styles.titlebutton, styles.centeralignment].join(' ')}>
                <Link to='/'><p className={styles.menutext}>Lee's Blog</p></Link>
            </div>
            <div className={[styles.menubutton, styles.centeralignment].join(' ')}>
                <Link to='/studyrecord'><p className={styles.menutext}>공부기록</p></Link>
                <Link to='/dailyrecord'><p className={styles.menutext}>일기</p></Link>
                <div onClick={onMove}><p className={styles.menutext}>포트폴리오</p></div>
            </div>
            {!user &&
                (<>
                    <div className={[styles.userbutton, styles.centeralignment].join(' ')}>
                        <Link to='/login'><p className={styles.menutext}>로그인</p></Link>
                        <Link to='/signup'><p className={styles.menutext}>회원가입</p></Link>
                    </div>
                </>)
            }
            {user &&
                (<>
                    <div className={[styles.userbutton, styles.centeralignment].join(' ')}>
                        <strong> {user.displayName} 님!</strong>
                        <button className={styles.logoutbutton} onClick={logout}>Logout</button>
                    </div>
                </>)
            }
        </div>
    );
};

export default TopMenuBar;