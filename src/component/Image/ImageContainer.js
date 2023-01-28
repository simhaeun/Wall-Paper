import styled from 'styled-components';
import ImageCard from './ImageCard';
// import Pagination from './Pagination';
// import EmptyResult from './EmptyResult';
import React, { useState, Suspense } from 'react';
// import ImageModal from './ImageModal';
const ImageModal = React.lazy(() => import('./ImageModal'));

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = ({ data, page, setPage, numOfPages }) => {
    const [currentImageDetail, setCurrentImageDetail] = useState(null);
    return (
        <Container>
            <Suspense fallback={<h1>로딩중...</h1>}>
                {currentImageDetail && (
                    <ImageModal
                        currentImageDetail={currentImageDetail}
                        setCurrentImageDetail={setCurrentImageDetail}
                    />
                )}
            </Suspense>
            {/* {data.hits?.length > 0 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    numOfPages={numOfPages}
                />
            )} */}
            <ResultsWrapper>
                {data.hits?.length > 0 &&
                    data.hits?.map((imgData) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={() => setCurrentImageDetail(imgData)}
                        />
                    ))}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
