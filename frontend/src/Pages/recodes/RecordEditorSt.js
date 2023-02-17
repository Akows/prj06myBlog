import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import styles from '../../styles/RecordEditor.module.css'

import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { appFireStore, storageRef, timeStamp } from '../../configs/firebase'
import { ref, uploadBytes } from 'firebase/storage';
import { useAuthContext } from '../../customhooks/useAuthContext';

export default function RecordEditorSt () {

    const [isUpdate, setIsUpdate] = useState(false);

    const [titleData, setTitleData] = useState();
    const [rawTextData, setRawTextData] = useState(EditorState.createEmpty());
    const [imageData, setImageData] = useState();
    const [timeData, setTimeData] = useState();
    const [selectData, setSelectData] = useState('language');

    const today = new Date();
    const Time = today.getFullYear() + '년 ' +  (today.getMonth() + 1) + '월 ' + today.getDate() + '일';

    const { id } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const onSubmitEvent = (event) => {
        event.preventDefault();
        if (isUpdate) {
            let textData = draftToHtml(convertToRaw(rawTextData.getCurrentContent()));
            boardUpdate({ id, titleData, textData, imageData, selectData });
        }
        else {
            let textData = draftToHtml(convertToRaw(rawTextData.getCurrentContent()));
            boardCreate({ titleData, textData, imageData, selectData });
        }
    };

    const onChangeTitle = (event) => {
        setTitleData(event.target.value);
    };

    const onChangeText = (editorState) => {
        setRawTextData(editorState);
    };

    const onChangeImageUpload = (e) => {
        setImageData(...e.target.files);
    };

    const onChangeSelectEvent = (event) => {
        setSelectData(event.target.value);
    };

    const collectionRef = collection(appFireStore, 'studyrecord');

    const boardCreate = async ({ titleData, textData, imageData, selectData }) => {
        try {
            const createdTime = timeStamp.fromDate(new Date());

            let file = '';
            let fileName = 'No file';
    
            if (imageData) {
                file = imageData;
                fileName = imageData.name;
            }

            const imagesRef = ref(storageRef, fileName);
    
            await addDoc(collectionRef, {
                title: titleData,
                text: textData,
                file: fileName,
                writer: user.displayName,
                type: selectData,
                createdTime,
            });
            if (imageData) {
                await uploadBytes(imagesRef, file);    
            }

            alert('글 작성이 완료되었습니다.');
            navigate('/studyrecord', { replace: true });
        }
        catch (error) {
            console.error(error);
        }
    };

    const boardUpdate = async ({ id, titleData, textData, imageData, selectData }) => {
        let file = '';
        let fileName = 'No file';

        if (imageData) {
            file = imageData;
            fileName = imageData.name;
        }

        try {
            const createdTime = timeStamp.fromDate(new Date());
            const imagesRef = ref(storageRef, fileName);

            const docRef = doc(appFireStore, 'studyrecord', id);
            
            await setDoc(docRef, {
                title: titleData,
                text: textData,
                file: fileName,
                writer: user.displayName,
                type: selectData,
                createdTime,
            }, { merge: true });

            if (doc.imageData) {
                await uploadBytes(imagesRef, file);    
            }
            alert('글 수정이 완료되었습니다.');
            navigate('/studyrecord', { replace: true });
        } 
        catch (e) {
            console.log(e.message);
            alert('에러 발생!');
            navigate('/studyrecord', { replace: true });
        }
    };

    const boardLoad = async (id) => {
        try {
            const colRef = collection(appFireStore, 'studyrecord');

            const docRef = doc(colRef, id);

            const docSnap = await getDoc(docRef);

            const htmlToEditor = docSnap.data().text;

            const blocksFromHtml = htmlToDraft(htmlToEditor);
    
            if (blocksFromHtml) {
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                const editorState = EditorState.createWithContent(contentState);
                setRawTextData(editorState);
                setTitleData(docSnap.data().title);
                setImageData('');
                setTimeData(docSnap.data().createdTime.toDate().toLocaleString());
            }
        } 
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];

        if (id === 'write') {
            titleElement.innerHTML = '기록 작성';
            setIsUpdate(false);
        }
        else {
            titleElement.innerHTML = '기록 수정';
            setIsUpdate(true);
            boardLoad(id);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.recordeditor}>

            <div className={styles.recordeditorboard}>

                <div className={styles.recordeditorutil}>

                    <div className={styles.recordeditordesc}>
                        <div>
                            {isUpdate ? <>글 수정 페이지</> : <>글 작성 페이지</>}
                        </div>
                        <div>
                            {isUpdate ? 
                                <>
                                    <p className={styles.todaytime}>{timeData}</p>
                                </>
                            : 
                                <>
                                    <p className={styles.todaytime}>{Time}</p>
                                </>
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.recordeditoritems}>
                    <form onSubmit={onSubmitEvent}>
                        <div className={styles.recordeditoritemsselect}>
                            <select onChange={onChangeSelectEvent}>
                                <option value='language'>언어</option>
                                <option value='react'>리액트</option>
                                <option value='algorithm'>알고리즘</option>
                                <option value='project'>프로젝트</option>
                            </select>
                        </div>

                        <input maxLength={50} name='Title' type='text' className={styles.recordeditorinputtitle} placeholder='제목을 입력해주세요' value={titleData} onChange={onChangeTitle}/>
                        
                        <div className={styles.editors}>
                            <Editor
                                wrapperClassName='wrapper-class'
                                editorClassName='editor-class'
                                toolbarClassName='toolbar-class'
                                toolbar={{
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: false },
                                }} 
                                placeholder='내용을 작성해주세요.'
                                localization={{
                                    locale: 'ko',
                                }}
                                editorState={rawTextData}
                                onEditorStateChange={onChangeText}
                            />
                        </div>            

                        <input className={styles.upload} type='file' onChange={onChangeImageUpload}/>   

                        <button type='submit' className={styles.recordeditorwritebtu}>
                            {isUpdate ? <>글 수정</> : <>글 작성</>}  
                        </button>

    
                    </form>        
                </div>

            </div>
        </div>



    );
};