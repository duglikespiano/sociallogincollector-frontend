import { useState, useEffect, Fragment } from 'react';
import { pageReturn } from './common/commonFunctions';
import { kakaoAuthRequest } from './platforms/kakao/variables';
import kakaoLoginImage from './images/kakaoLoginImage.png';
import LoggedInPage from './common/LoggedInPage';
import './Main.css';

function Main() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);

	useEffect(() => {
		if (
			window.location.href ===
			`${process.env.REACT_APP_FRONTEND_BASE_URL}/?state=kakaologgedout`
		) {
			const accessTokenObject = {
				accessToken: localStorage.getItem('kakaoaccesstoken'),
			};
			fetch(
				`${process.env.REACT_APP_BACKEND_BASE_URL}/kakao/unlink` as string,
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(accessTokenObject),
				}
			)
				.then((res) => res.json())
				.then((data) => console.log(data))
				.finally(() => {
					localStorage.clear();
					window.location.href = process.env
						.REACT_APP_FRONTEND_BASE_URL as string;
					pageReturn();
				});
		}

		if (localStorage.getItem('kakaoaccesstoken')) {
			setIsLoggedIn(true);
		}

		return () => {
			setIsReadyToFetch(false);
		};
	}, [isReadyToFecth]);

	return (
		<Fragment>
			{isLoggedIn ? (
				<LoggedInPage />
			) : (
				<div id="loginImageBox">
					<img
						className="loginImages"
						src={kakaoLoginImage}
						alt="kakaoLoginImage"
						onClick={kakaoAuthRequest}
					/>
				</div>
			)}
		</Fragment>
	);
}

export default Main;
