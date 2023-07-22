import { useState, useEffect, Fragment } from 'react';
import {
	kakaoAuthRequest,
	kakaoLogout,
} from './platforms/kakao/kakaoVariables';
import { naverAuthRequest } from './platforms/naver/naverVariables';
import { googleAuthRequest } from './platforms/google/googleVariables';
import kakaoLoginImage from './images/kakaoLoginImage.png';
import naverLoginImage from './images/naverLoginImage.png';
import googleLoginImage from './images/googleLoginImage.png';
import LoggedInMainPage from './common/LoggedInMainPage';
import './Main.css';

function Main() {
	const [isLoggedIn, setIsLoggedIn] = useState('');
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);

	useEffect(() => {
		if (window.location.href.includes('?state=kakaologgedout')) {
			kakaoLogout();
		}

		if (localStorage.getItem('loggedinplatform')) {
			setIsLoggedIn(localStorage.getItem('loggedinplatform') as string);
		}

		return () => {
			setIsReadyToFetch(false);
		};
	}, [isReadyToFecth]);

	return (
		<Fragment>
			{isLoggedIn ? (
				<LoggedInMainPage
					loggedInPlatform={localStorage.getItem('loggedinplatform')!}
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
							onClick={naverAuthRequest}
						/>
					</div>
					<div className="loginImageBox">
						<img
							className="loginImages"
							src={googleLoginImage}
							alt="googleLoginImage"
							onClick={googleAuthRequest}
						/>
					</div>
				</div>
			)}
		</Fragment>
	);
}

export default Main;
