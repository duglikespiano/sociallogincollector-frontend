import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import KakaoRedirect from './platforms/kakao/KakaoRedirect';
import NaverRedirect from './platforms/naver/NaverRedirect';
import GoogleRedirect from './platforms/google/GoogleRedirect';

function App() {
	return (
		<Routes>
			<Route path="" element={<Main />} />
			<Route path="/kakaoredirect" element={<KakaoRedirect />} />
			<Route path="/naverredirect" element={<NaverRedirect />} />
			<Route path="/googleredirect" element={<GoogleRedirect />} />
		</Routes>
	);
}

export default App;
