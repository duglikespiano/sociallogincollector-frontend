import { useState, useEffect, Fragment } from 'react';
import { kakaoLogoutWindowOpen } from './kakaoVariables';
import './KakaoLoggedInPage.css';

function KakaoLoggedInPage() {
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);
	const [kakaoUserInfo, setKakaoUserInfo] = useState<{
		nickname: string;
		profile_image_url: string;
		birthday: string;
		email: string;
	}>({ nickname: '', profile_image_url: '', birthday: '', email: '' });

	useEffect(() => {
		setIsReadyToFetch(true);
		if (isReadyToFecth) {
			const accessTokenObject = {
				kakaoAccessToken: localStorage.getItem('kakaoaccesstoken'),
			};

			fetch(
				`${process.env.REACT_APP_BACKEND_BASE_URL}/kakao/userinfo` as string,
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(accessTokenObject),
				}
			)
				.then((res) => res.json())
				.then((data) => {
					setKakaoUserInfo(data.kakaoUserInfo);
				});
		}
		return () => {
			setIsReadyToFetch(false);
		};
	}, [isReadyToFecth, setKakaoUserInfo]);

	return (
		<Fragment>
			<div id="kakaoUserInfoBox">
				You are logged in with Kakao
				<button id="kakaoLogoutButton" onClick={kakaoLogoutWindowOpen}>
					Log out
				</button>
				<div>
					Nickname : {kakaoUserInfo.nickname ? kakaoUserInfo.nickname : 'N/A'}
				</div>
				<div>Email : {kakaoUserInfo.email ? kakaoUserInfo.email : 'N/A'}</div>
				<div>
					Birthday : {kakaoUserInfo.birthday ? kakaoUserInfo.birthday : 'N/A'}
				</div>
				<div>
					Profile image :{' '}
					{kakaoUserInfo.profile_image_url ? (
						<img
							id="kakaoProfileImage"
							src={kakaoUserInfo.profile_image_url as string}
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

export default KakaoLoggedInPage;
