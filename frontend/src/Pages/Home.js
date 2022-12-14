import '../styles/Home.css';
import '../ResetStyle.css';

import { useEffect } from 'react';

const Home = () => {

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = '이유승 블로그';
    }, []);

    return (
        <div className='home'>

            <div className='hometitle'>
                <p>프론트엔드 웹 프로그래머를 지망하는 이유승입니다.</p>
                <br/>
                <p>저의 블로그에 오신 것을 환영합니다.</p>
            </div>


        </div>
    );
};

export default Home;