import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFirestore } from '../../customhooks/useFirestore';

import { Editor } from '@tinymce/tinymce-react';

import styles from '../../styles/RecordEditor.module.css'

// 에디터 설정.
const editorInit = {
    max_width: 800,
    max_height: 800,
    menubar: false,
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
    plugins: [ "image", "code", "table", "link", "media", "codesample", "lists", "autoresize", "codesample" ],
    toolbar:
        'undo redo | fontsize | bold italic backcolor | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'image | bullist numlist | codesample removeformat ',
};

export default function TextEditor () {
    // 글 데이터를 제어할 state.
        // 상단부터 제목, 본문, 첨부파일, 글 종류.
    const [titleData, setTitleData] = useState('');
    const [postData, setPostData] = useState('');
    const [fileData, setFileData] = useState(null);
    const [selectTypeData, setSelectTypeData] = useState('html');

    // 페이지 전환을 위한 state.
        // 글 작성-수정 여부를 제어할 상태 state.
    const [isUpdate, setIsUpdate] = useState(false);
        // 어떤 종류의 글을 작성하는지 여부를 제어할 상태 state.
    const [pageType, setPageType] = useState('dailyrecord');

    // 이전 컴포넌트에서 전달되는 id 값을 가져온다.
    const { type } = useParams();
    const { id } = useParams();

    // 미리 구현해 둔 글 작성, 수정 기능을 불러온다.
    const { addDocument, getDocument, updateDocument, response } = useFirestore(pageType);

    // 에디터에서 글이나 첨부파일을 입력, 등록 했을 때 이를 감지하여 state로 set할 함수.
    const handleOnChangeTitle = (event) => {
        setTitleData(event.target.value);
    }
    const handleOnChangeFile = (event) => {
        setFileData(event.target.files);
    }
    const handleonChangeSelect = (event) => {
        setSelectTypeData(event.target.value);
    };

    // 글 작성 혹은 수정 버튼을 클릭했을 때 작업을 진행시킬 함수.
    const handleOnSubmit = (event) => {
        // submit 기능의 기본 기능 (새로고침) 발동을 차단조치.
        event.preventDefault();

        // isUpdate 여부에 따라서 필요한 함수가 발동되도록.
        if (!isUpdate) {
            addDocument({ type, titleData, postData, fileData, selectTypeData });
        }
        else {
            updateDocument({ type, id, titleData, postData, fileData, selectTypeData });
        }
    };

    // 컴포넌트 랜더링 이후 1번만 발동될 코드.

    useEffect(() => {
        // 탭 제목을 제어하기 위해 document의 getElementsByTagName.
        const titleElement = document.getElementsByTagName('title')[0];

        if (type === 'qs') {
            titleElement.innerHTML = '공부기록';
            setPageType('questions');

            if (id === 'write') {
                titleElement.innerHTML += ' - 작성하기';
                setIsUpdate(false);
            } 
            else {
                titleElement.innerHTML += ' - 수정하기';
                setIsUpdate(true);
                getDocument(id);
            }
        };


        if (type === 'dr') {
            titleElement.innerHTML = '일일기록';
            setPageType('dailyrecord');

            if (id === 'write') {
                titleElement.innerHTML += ' - 작성하기';
                setIsUpdate(false);
            } 
            else {
                titleElement.innerHTML += ' - 수정하기';
                setIsUpdate(true);
                getDocument(id);
            };
        }

        if (type === 'sr') {
            titleElement.innerHTML = '내용정리';
            setPageType('studyrecord');

            if (id === 'write') {
                titleElement.innerHTML += ' - 작성하기';
                setIsUpdate(false);
            } 
            else {
                titleElement.innerHTML += ' - 수정하기';
                setIsUpdate(true);
                getDocument(id);
            }
        };
    // eslint-disable-next-line
    }, [pageType]);

    useEffect(() => {
        // 이전 컴포넌트에서 넘어온 페이지 type을 받아서 조건문 실행.
        // 각 조건문 안에서는 또 글 작성인지 수정인지 여부를 확인.
        if (type === 'qs' && id !== 'write') {
            setTitleData(response.document?.title);
            setPostData(response.document?.text);
        }
        else if (type === 'dr' && id !== 'write') {
            setTitleData(response.document?.title);
            setPostData(response.document?.text);
        }
        else if (type === 'sr' && id !== 'write') {
            setTitleData(response.document?.title);
            setPostData(response.document?.text);
            setSelectTypeData(response.document?.type);
        };
    // eslint-disable-next-line
    }, [response]);

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
                                    {/* <p className={styles.todaytime}>{response.document?.createdTime}</p> */}
                                </>
                            : 
                                <>
                                    <p className={styles.todaytime}>{new Date().getFullYear() + '년 ' +  (new Date().getMonth() + 1) + '월 ' + new Date().getDate() + '일'}</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.recordeditoritems}>
                    <form onSubmit={handleOnSubmit}>

                        {/* 글 타입을 선택하는 화면은 공부기록 작성 시에만 보이도록. */}
                        {pageType === 'questions' &&
                            <div className={styles.recordeditoritemsselect}>
                                <select onChange={handleonChangeSelect} value={selectTypeData}>
                                    <option value='html'>HTML</option>
                                    <option value='css'>CSS</option>
                                    <option value='js'>JS</option>
                                    <option value='js'>TS</option>
                                    <option value='react'>React.js</option>
                                    <option value='next'>Next.js</option>
                                    <option value='redux'>Redux</option>
                                    <option value='firebase'>Firebase</option>
                                </select>
                            </div>  
                        }
                        {pageType === 'studyrecord' &&
                            <div className={styles.recordeditoritemsselect}>
                                <select onChange={handleonChangeSelect} value={selectTypeData}>
                                    <option value='html'>HTML</option>
                                    <option value='css'>CSS</option>
                                    <option value='js'>JS</option>
                                    <option value='js'>TS</option>
                                    <option value='react'>React.js</option>
                                    <option value='next'>Next.js</option>
                                    <option value='redux'>Redux</option>
                                    <option value='firebase'>Firebase</option>
                                </select>
                            </div>  
                        }

                        {/* 제목 입력 창. */}
                        <input maxLength={50} name='Title' type='text' className={styles.recordeditorinputtitle} placeholder='제목을 입력해주세요' value={titleData} onChange={handleOnChangeTitle}/>
                        
                        <div className={styles.editors}>
                            {/* 본문 입력 창 */}
                            <Editor
                                apiKey={process.env.REACT_APP_EDITOR_API_KEY}
                                initialValue={'내용을 입력해주세요.'}
                                value={postData}
                                init={editorInit}
                                onEditorChange={(newValue) => setPostData(newValue)}
                            />
                        </div>

                        {/* 첨부파일 선택은 공부기록 작성 시에만 보이도록. */}
                        {pageType === 'questions' &&
                            <input className={styles.upload} type='file' onChange={handleOnChangeFile}/>   
                        }
                        {pageType === 'studyrecord' &&
                            <input className={styles.upload} type='file' onChange={handleOnChangeFile}/>   
                        }
                        
                        {/* 작성 혹은 수정 버튼. */}
                        <button type='submit' className={styles.recordeditorwritebtu}>
                            {isUpdate ? <>글 수정</> : <>글 작성</>}  
                        </button>
                    </form>        
                </div>
            </div>
        </div>

    );
};