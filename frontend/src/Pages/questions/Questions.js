import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../customhooks/useAuthContext';
import styles from '../../styles/Questions.module.css'

export default function Questions () {

    const { user } = useAuthContext();
    const navigate = useNavigate();

    return (
        <div className={styles.questions}>
            <div className={styles.questionsboard}>
                <div className={styles.questionsutil}>
                    <div className={styles.questionspagenation}>

                        <div className={styles.pagenationbtu}>
                            전체
                        </div>
                        <div className={styles.pagenationbtu}>
                            HTML
                        </div>
                        <div className={styles.pagenationbtu}>
                            CSS
                        </div>
                        <div className={styles.pagenationbtu}>
                            JS
                        </div>
                        <div className={styles.pagenationbtu}>
                            TS
                        </div>
                        <div className={styles.pagenationbtu}>
                            React.js
                        </div>
                        <div className={styles.pagenationbtu}>
                            Next.js
                        </div>
                        <div className={styles.pagenationbtu}>
                            Redux
                        </div>
                        <div className={styles.pagenationbtu}>
                            Firebase
                        </div>

                    </div>

                    {!user.isAnonymous ? 
                        <div className={styles.questionswritebtu} onClick={() => {navigate('/texteditor/dr/write');}}>
                            글쓰기
                        </div>
                    : 
                        <div>
                            {/* 익명사용자는 글 쓰기 버튼이 아예 안보이도록 */}
                        </div>
                    }
                </div>

                <div className={styles.questionsitemlist}>
                    <div className={styles.questionsitem}>
                        <div className={styles.questionsiteminfo1}>
                            제목
                        </div>
                        <div className={styles.questionsiteminfo2}>
                            작성자
                        </div>
                        <div className={styles.questionsiteminfo3}>
                            작성시간
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};