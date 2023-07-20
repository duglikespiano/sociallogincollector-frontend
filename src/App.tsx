import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import KakaoRedirect from './platforms/kakao/KakaoRedirect';

function App() {
	return (
		<Routes>
			<Route path="" element={<Main />} />
			<Route path="/kakaoredirect" element={<KakaoRedirect />} />
		</Routes>
	);
}

export default App;
