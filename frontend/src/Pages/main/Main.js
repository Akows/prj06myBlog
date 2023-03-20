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
                <p>프론트엔드 웹 프로그래머를 지망하는 이유승입니다.</p>

                <br/>

                <p>저는 이런 사람입니다. 자기소개</p>

                <br/>

                <p>저의 이력은 이렇습니다. 커리어</p>
                                
                <br/>

                <p>제가 다룰줄 아는 기술은 이렇습니다. 기술 스택</p>
                                
                <br/>

                <p>저는 이런 프로젝트를 준비해왔습니다. 프로젝트 소개</p>
            </div>
        </div>
    );
};