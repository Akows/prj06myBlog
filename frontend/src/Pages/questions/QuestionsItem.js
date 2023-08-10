import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../customhooks/useAuthContext';
import { useFirestore } from '../../customhooks/useFirestore';
import { useFirestoreComt } from '../../customhooks/useFirestoreComt';
import styles from '../../styles/QuestionsItem.module.css'

const QuestionsItem = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();
    const [commentsData, setCommentsData] = useState([]);
    const { getDocument, deleteDocument, downloadFile, response } = useFirestore('questions');
    const { getComments, addComments, responseData } = useFirestoreComt('comment');

    const [commentsList, setCommentsList] = useState([]);
    const [isReRender, setIsReRender] = useState(false);

    const pageType = 'qs';

    const onSubmitEvent = (event) => {
        event.preventDefault();
        addComments(commentsData, id, pageType);
        setCommentsData([]);
        setIsReRender(true);
    };
    const onChangeEvent = (event) => {
        setCommentsData(event.target.value);
    };
    const onUpdate = () => {
        navigate(`/texteditor/qs/${id}`);
    };
    const onDelete = () => {
        deleteDocument(id, 'qs');
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = '공부기록';
        getDocument(id);
        getComments(id);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (Array.isArray(responseData.document)) {
            setCommentsList(responseData.document);
        };
    }, [responseData]);


    useEffect(() => {
        if (isReRender) {
            getComments(id);

            if (Array.isArray(responseData.document)) {
                setCommentsList(responseData.document);
            };

            setIsReRender(false);
        };
        // eslint-disable-next-line
    }, [isReRender]);

    return (
        <div className={styles.questions}>
            <div className={styles.questionsboard}>
                <div className={styles.questionsutil}>
                    <div className={styles.questionsdesc}>
                        <div>
                            글 조회 페이지
                        </div>
                        <div className={styles.questionsdesctimewrt}>
                            <p className={styles.todaytime}>{response.document?.createdTime.toDate().toLocaleString()}</p>
                            <p>{response.document?.writer}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.questionsitems}>
                    <div className={styles.questionstitle}>
                        <div className={['default2_icon', `${response.document?.type}_icon`].join(' ')} />
                        <div>{response.document?.title}</div>
                    </div>
                    <div className={styles.questionstext}>
                        <div dangerouslySetInnerHTML={{ __html: response.document?.text }} />
                    </div>
                    <div className={styles.questionsdetech}>
                        {response.document?.file === 'No file' ?
                            <>
                                <p>첨부파일 없음.</p>
                            </>
                            :
                            <>
                                <p onClick={() => { downloadFile(response.document?.file) }}>{response.document?.file}</p>
                            </>
                        }
                    </div>
                    <div className={styles.questionsdelwribtn}>
                        {user ?
                            <div className={styles.questionswritebtu}>
                                <div className={styles.button} onClick={() => { onUpdate() }}>수정</div>
                                <div className={styles.button} onClick={() => { onDelete() }}>삭제</div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className={styles.questionscomments}>

                        {commentsList?.length !== 0 ?
                            <>
                                {commentsList?.map((item) => (
                                    <div className={styles.questionscommenttext} key={item.id}>
                                        <p>{item.comments}</p>
                                        <p className={styles.commentsinfo}>{item.writer}, {item.createdTime}</p>
                                    </div>
                                ))}
                            </>
                            :
                            <>
                                <p>댓글이 존재하지 않습니다.</p>
                            </>
                        }

                        <form onSubmit={onSubmitEvent}>
                            <div className={styles.questionscommentutil}>
                                <input name='Text' type='text' placeholder='댓글을 입력해주세요..' maxLength='30' className={styles.questionscommentinput} value={commentsData.text} onChange={onChangeEvent} />
                                <button type='submit' className={styles.commentsubmitbtu}>
                                    작성
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsItem;