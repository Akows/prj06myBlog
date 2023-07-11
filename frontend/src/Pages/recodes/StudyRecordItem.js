import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../customhooks/useAuthContext';
import { useFirestore } from '../../customhooks/useFirestore';
import { useFirestoreComt } from '../../customhooks/useFirestoreComt';
import styles from '../../styles/DailyRecordItem.module.css'

const StudyRecordItem = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();
    const [commentsData, setCommentsData] = useState('');
    const { getDocument, deleteDocument, downloadFile, response } = useFirestore('studyrecord');
    const { getComments, addComments, responseData } = useFirestoreComt('comment');

    const [commentsList, setCommentsList] = useState([]);
    const [isReRender, setIsReRender] = useState(false);

    const pageType = 'sr';

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
        navigate(`/texteditor/sr/${id}`);
    };
    const onDelete = () => {
        deleteDocument(id, 'sr');
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = '일일기록';
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
        <div className={styles.recorditem}>
            <div className={styles.recorditemboard}>
                <div className={styles.recorditemutil}>
                    <div className={styles.recorditemdesc}>
                        <div>
                            글 조회 페이지
                        </div>
                        <div className={styles.recorditemdesctimewrt}>
                            <p className={styles.todaytime}>{response.document?.createdTime.toDate().toLocaleString()}</p>
                            <p>{response.document?.writer}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.recorditemitems}>
                    <div className={[styles.recorditemitem, styles.recorditemtitle].join(' ')}>
                        {response.document?.title}
                    </div>
                    <div className={[styles.recorditemitem, styles.recorditemtext].join(' ')}>
                        <div dangerouslySetInnerHTML={{ __html: response.document?.text }} />
                    </div>
                    <div className={[styles.recorditemitem, styles.recorditemdetech].join(' ')}>
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
                    <div className={styles.recorditemdelwribtn}>
                        {user ?
                            <div className={styles.recorditemwritebtu}>
                                <div className={styles.button} onClick={() => { onUpdate() }}>수정</div>
                                <div className={styles.button} onClick={() => { onDelete() }}>삭제</div>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className={styles.recorditemcomments}>
                        {commentsList?.length !== 0 ?
                            <>
                                {commentsList?.map((item) => (
                                    <div className={styles.recorditemcommenttext} key={item.id}>
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
                            <div className={styles.recorditemcommentutil}>
                                <input name='Text' type='text' placeholder='댓글을 입력해주세요' maxLength='30' className={styles.recorditemcommentinput} value={commentsData.text} onChange={onChangeEvent} />
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

export default StudyRecordItem;