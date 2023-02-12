## pixabay API 연동

- [Pixabay API](https://pixabay.com/api/docs/)를 연동해 화면을 렌더링
- 개인 API key는 .env로 관리
- fetch API 라이브러리 사용


## 배경화면 검색 기능

- 검색어를 입력하지 않아도 어플리케이션 시작 시 최초 1회는 이미지 가져오기
- 검색창에 검색어를 입력하고 `Enter` 키를 입력하면 입력한 검색어로 이미지를 검색
- 검색 후 input 값은 빈 문자열 상태로 만들기 - 비제어 컴포넌트 useRef 사용
- 검색 결과가 없을 시 검색 결과 없음


## 최근 검색어 기능

- 검색이 일어날 때마다 (Enter) 최근 검색어가 추가
- 최근 검색어를 클릭하면 해당 검색어로 검색이 실행되고, 검색창 input 값도 해당 검색어로 변경
- 최근 검색어의 x 버튼을 클릭하면 해당 검색어가 삭제
- 새로고침을 하거나, 새 창을 열어도 최근 검색어 유지


## 검색 옵션(정렬/필터링) 기능

- (1) 최신순/인기순 정렬 (2) 사진 방향 필터링 을 구현
- 검색 창의 `검색 옵션 열기` 텍스트 버튼을 통해 여닫는 검색 옵션 창에 구현
- 유저가 선택하지 않아도 검색 옵션은 초기 값(인기순, 모두)에 맞게 선택
- 라디오 버튼을 클릭하면 검색 옵션 해당 옵션에 맞게 재검색을 실행


## 배경화면 상세 보기 모달

- 카드를 클릭하면 해당 배경 화면의 정보를 바탕으로 상세 보기 모달 열기/닫기 기능 구현
- 상세 보기 모달에서 제공하는 정보는 (1) 태그 (2) 좋아요 수 (3) 조회 수


## 다크 모드

- css variable 값 활용
```css
html {
  --primary: #ffffff;
  --secondary: aliceblue;
  --highlight: #4cabff;
  --overlay: #8ac8ff;
  --text: black;
}
html[data-theme='dark'] {
  --primary: #1e1f21;
  --secondary: #292a2d;
  --text: #ffffff;
}
```
```jsx
const ToggleThemeButton = () => {
  const initialTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
  const [theme, setTheme] = useState(initialTheme);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? (
        <DarkIcon width="48" height="48" fill="var(--primary)" />
      ) : (
        <LightIcon width="48" height="48" fill="var(--primary)" />
      )}
    </Button>
  );
};
```
- 모드는 저장되어, 새로고침 혹은 새로운 창으로 접근했을 때도 해당 모드에 맞게 (다크/일반) 렌더링


## 무한 스크롤
```jsx
function App() {
  const target = useRef(null);
  
  const callback: IntersectionObserverCallback = ([entries]) => {
    if (entries.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };
    
  useEffect(() => {
    if (!target.current) return;
    const observer = new IntersectionObserver(callback, {
        threshold: 1,
    });
    observer.observe(target.current);
  }, []);

  return (
    {page !== numOfPages && (
      <div ref={target}>
        <EmptyResult isLoading={data.totalHits} />
      </div>
    )}
)}
```



### 리팩토링
- import 간결화 (index.js 활용 / module alias 활용)
- 한 컴포넌트는 가급적 한가지 역할을 하도록 하기
- 기능 별로 파일 분리하기 (유틸, 타입 등)
- 역할을 잘 드러내는 일관성 있는 네이밍
- 함께 변경되는 state 라면 하나로 묶기
- Styled component를 활용하여 재사용 가능 컴포넌트 구현
