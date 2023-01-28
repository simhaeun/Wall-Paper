import styled from 'styled-components';

const HeroTitle = styled.h1`
    margin: 8px 0px;
`;

const HeroTitleLink = styled.a`
    text-decoration: none;
    color: var(--text);
    &:hover {
        color: var(--highlight);
    }
`;

const HeroSubtitle = styled.p`
    margin: 0px;
    color: var(--highlight);
    font: 24px;
`;

const Title = () => {
    return (
        <>
            <HeroTitle>
                <HeroTitleLink href="./">배경화면 검색 엔진</HeroTitleLink>
            </HeroTitle>
            <HeroSubtitle>오늘 나의 배경화면은? 👀</HeroSubtitle>
        </>
    );
};

export default Title;
