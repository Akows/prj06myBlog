import { useEffect } from 'react';
import styles from '../../styles/Main.module.css'

export default function Main () {
    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = '이유승 블로그';
    }, []);

    return (
        <div className={styles.background}>
            <div className={styles.welcometext}>
                <p>프론트엔드 웹 프로그래머를 지망하는</p>
                <p>이유승의 개발 블로그</p>
            </div>
        </div>
    );
};