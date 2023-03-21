import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DailyRecordList } from '../../components/DailyRecordList';
import { useAuthContext } from '../../customhooks/useAuthContext';
import styles from '../../styles/DailyRecord.module.css'

export default function DailyRecord () {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const navigate = useNavigate();
    const { user } = useAuthContext();

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = '일일기록'
    }, []);

    return (
        <div className={styles.dailyrecord}>
            <div className={styles.dailyrecordboard}>
                <div className={styles.dailyrecordutil}>
                    <div className={styles.dailyrecordpagenation}>
                        <div className={styles.month} onClick={() => {setCurrentMonth(11)}}>
                            11월
                        </div>
                        <div className={styles.month} onClick={() => {setCurrentMonth(12)}}>
                            12월 
                        </div>
                        <div className={styles.month} onClick={() => {setCurrentMonth(1)}}>
                            1월
                        </div>
                        <div className={styles.month} onClick={() => {setCurrentMonth(2)}}>
                            2월
                        </div>
                        <div className={styles.month} onClick={() => {setCurrentMonth(3)}}>
                            3월
                        </div>
                    </div>
                    {!user.isAnonymous ? 
                        <div className={styles.dailyrecordwritebtu} onClick={() => {navigate('/texteditor/dr/write');}}>
                            글쓰기
                        </div>
                    : 
                        <div>
                            
                        </div>
                    }
                </div>
                <DailyRecordList currentMonth={currentMonth} />
            </div>
        </div>
    );
};