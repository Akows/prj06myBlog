import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../customhooks/useAuthContext';
import { useFirestore } from '../../customhooks/useFirestore';
import { useFirestoreComt } from '../../customhooks/useFirestoreComt';
import styles from '../../styles/DailyRecordItem.module.css'

const DailyRecordItem = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { id } = useParams();
    const [commentsData, setCommentsData] = useState('');
    const { getDocument, deleteDocument, downloadFile, response } = useFirestore('dailyrecord');
    const { getComments, addComments, responseData } = useFirestoreComt('comment');

    const onSubmitEvent = (event) => {
        event.preventDefault();
        addComments({ commentsData, id });
    };
    const onChangeEvent = (event) => {
        setCommentsData(event.target.value);
    };
    const onUpdate = () => {
        if (user) {
            if (response.document?.writer === user.displayName) {
                navigate(`/recordeditor/${id}`);
            }
            else {
                alert('본인이 작성한 글만 수정할 수 있습니다.');
            }

        }
        else {
            alert('본인이 작성한 글만 수정할 수 있습니다.');
        }
    };
    const onDelete = () => {
        if (user) {
            if (response.document?.writer === user.displayName) {
                deleteDocument(id);
            }
            else {
                alert('본인이 작성한 글만 삭제할 수 있습니다.');
            }
        }
        else {
            alert('본인이 작성한 글만 수정할 수 있습니다.');
        }
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = '일일기록';
        getDocument(id);
        getComments(id);
        // eslint-disable-next-line
    }, []);

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
                        <div dangerouslySetInnerHTML={{ __html:response.document?.text }}/>
                    </div>
                    <div className={[styles.recorditemitem, styles.recorditemdetech].join(' ')}>
                        {response.document?.file === 'No file' ?
                            <>
                                <p>첨부파일 없음.</p>
                            </>
                        :
                            <>
                                <p onClick={() => {downloadFile(response.document?.file)}}>{response.document?.file}</p>
                            </>
                        }
                    </div>
                    <div className={styles.recorditemdelwribtn}>
                        <div className={styles.recorditemwritebtu}>
                            <div className={styles.button} onClick={() => {onUpdate()}}>수정</div>
                            <div className={styles.button} onClick={() => {onDelete()}}>삭제</div>
                        </div>
                    </div>
                    <div className={styles.recorditemcomments}>
                        {responseData.document?.length !== 0 ?
                            <>
                                {responseData.document?.map((item) => (
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
                                <input name='Text' type='text' placeholder='댓글을 입력해주세요' maxLength='30' className={styles.recorditemcommentinput} value={commentsData.text} onChange={onChangeEvent}/> 
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

export default DailyRecordItem;