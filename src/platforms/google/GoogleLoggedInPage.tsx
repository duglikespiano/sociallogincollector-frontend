import { useState, useEffect, Fragment } from 'react';
import { googleLogoutWindowOpen } from './googleVariables';
import './GoogleLoggedInPage.css';

function GoogleLoggedInPage() {
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);
	const [googleUserInfo, setGoogleUserInfo] = useState<{
		nickname: string;
		profile_image_url: string;
	}>({ nickname: '', profile_image_url: '' });

	useEffect(() => {
		setIsReadyToFetch(true);
		if (isReadyToFecth) {
			const accessTokenObject = {
				googleAccessToken: localStorage.getItem('googleaccesstoken'),
			};

			fetch(
				`${process.env.REACT_APP_BACKEND_BASE_URL}/google/userinfo` as string,
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(accessTokenObject),
				}
			)
				.then((res) => res.json())
				.then((data) => setGoogleUserInfo(data.data));
		}
		return () => {
			setIsReadyToFetch(false);
		};
	}, [isReadyToFecth, setGoogleUserInfo]);

	return (
		<Fragment>
			<div id="kakaoUserInfoBox">
				You are logged in with Google
				<button id="kakaoLogoutButton" onClick={googleLogoutWindowOpen}>
					Log out
				</button>
				<div>
					Nickname : {googleUserInfo.nickname ? googleUserInfo.nickname : 'N/A'}
				</div>
				<div>
					Profile image :{' '}
					{googleUserInfo.profile_image_url ? (
						<img
							id="kakaoProfileImage"
							src={googleUserInfo.profile_image_url as string}
							alt="kakaoProfileImage"
						/>
					) : (
						'N/A'
					)}
				</div>
			</div>
		</Fragment>
	);
}

export default GoogleLoggedInPage;
