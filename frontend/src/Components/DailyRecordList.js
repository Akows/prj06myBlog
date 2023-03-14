import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appFireStore } from '../configs/firebase';
import { useCollection } from '../customhooks/useCollection';

import styles from '../styles/DailyRecord.module.css'

export const DailyRecordList = ({ currentMonth }) => {
    const navigate = useNavigate();
    const { error, state } = useCollection('dailyrecord', ['createdMonth', '==', currentMonth]);
    const [data, setData] = useState();
    const [err, setErr] = useState();

    const listUpdate = async (currentMonth) => {
        try {
            const colRef = collection(appFireStore, 'dailyrecord');
            const querys = query(colRef, where('createdMonth', '==', currentMonth), orderBy('createdTime', 'desc')); 
            const querySnap = await getDocs(querys);
            const mappingData = querySnap.docs.map((doc) => ({
                id: doc.id,
                time: doc.data().createdTime.toDate().toLocaleString(),
                ...doc.data()
            }));
            setData(mappingData); 
        } 
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setData(state.document);
        setErr(error);
        // eslint-disable-next-line
    }, [state]);

    useEffect(() => {
        listUpdate(currentMonth);
    }, [currentMonth]);

    return (
        <>
            {state.isReady ? 
                <div className={styles.dailyrecorditems}>
                    {data?.map((item) => (
                        <div className={styles.dailyrecorditem} key={item.id} onClick={() => {navigate(`/dailyrecord/${item.id}`)}}>
                           <div className={styles.dailyrecorditeminfo1}>
                                {item.title}
                           </div>
                           <div className={styles.dailyrecorditeminfo2}>
                                {item.writer}
                           </div>
                           <div className={styles.dailyrecorditeminfo3}>
                                {item.time}
                           </div>
                        </div>
                    ))}
                    {error && <strong>{err}</strong>}
                </div>
                : 
                'loading...' 
            }
        </>
    );
};