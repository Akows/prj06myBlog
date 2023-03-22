import '../styles/Pagination.css';

import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    // 1페이지부터 끝 페이지까지의 숫자를 저장할 빈 배열.
    const pageNumbers = [];

    // 전체 게시글의 숫자와 페이지당 게시글 숫자를 받아와서..
    // 계산하여 페이지는 몇 페이지까지 나오는지를 계산한 다음..
    // 소수점을 올림처리하여 정수로 맞추고 그 횟수만큼 빈 배열에 숫자를 저장.
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 그리고 빈 배열에 채워진 숫자만큼 map 함수로 풀어 출력한다.
    // 페이지 하나당 버튼 하나를 만들고 현재 페이지가 몇 페이지인지 등록하는 함수를 연결.
    return (
        <div className='paganation-outer'>
            {pageNumbers.map(number => (
                <div className='paganation-btu' key={number}>
                    <button className='paganation-button gifont' onClick={() => paginate(number)}>{number}</button>
                </div>
            ))}
        </div>
    );
};

export default Pagination;