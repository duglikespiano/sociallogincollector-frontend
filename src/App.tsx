import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import KaKaoredirect from './platforms/kakao/Kakaoredirect';

function App() {
	return (
		<Routes>
			<Route path="" element={<Main />} />
			<Route path="/kakaoredirect" element={<KaKaoredirect />} />
		</Routes>
	);
}

export default App;
