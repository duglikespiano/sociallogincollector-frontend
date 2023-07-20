import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import KakaoRedirect from './platforms/kakao/KakaoRedirect';
import NaverRedirect from './platforms/naver/NaverRedirect';

function App() {
	return (
		<Routes>
			<Route path="" element={<Main />} />
			<Route path="/kakaoredirect" element={<KakaoRedirect />} />
			<Route path="/naverredirect" element={<NaverRedirect />} />
		</Routes>
	);
}

export default App;
