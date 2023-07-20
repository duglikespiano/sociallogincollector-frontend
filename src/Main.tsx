import { useState, useEffect, Fragment } from 'react';
import {
	kakaoAuthRequest,
	kakaoLogout,
} from './platforms/kakao/KakaoVariables';
import { naverAuthRequest } from './platforms/naver/naverVariables';
import kakaoLoginImage from './images/kakaoLoginImage.png';
import naverLoginImage from './images/naverLoginImage.png';
import LoggedInMainPage from './common/LoggedInMainPage';
import './Main.css';

function Main() {
	const [isLoggedIn, setIsLoggedIn] = useState('');
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);

	useEffect(() => {
		if (window.location.href.includes('?state=kakaologgedout')) {
			kakaoLogout();
		}

		if (localStorage.getItem('loggedin')) {
			setIsLoggedIn(localStorage.getItem('loggedin') as string);
		}

		return () => {
			setIsReadyToFetch(false);
		};
	}, [isReadyToFecth]);

	return (
		<Fragment>
			{isLoggedIn ? (
				<LoggedInMainPage
					loggedInPlatform={localStorage.getItem('loggedin')!}
				/>
			) : (
				<div>
					<div className="loginImageBox">
						<img
							className="loginImages"
							src={kakaoLoginImage}
							alt="kakaoLoginImage"
							onClick={kakaoAuthRequest}
						/>
					</div>
					<div className="loginImageBox">
						<img
							className="loginImages"
							src={naverLoginImage}
							alt="naverLoginImage"
							onClick={kakaoAuthRequest}
						/>
					</div>
				</div>
			)}
		</Fragment>
	);
}

export default Main;
