import { useState, useEffect, Fragment } from 'react';
// import { naverLogoutWindowOpen } from './naverVariables';
import './NaverLoggedInPage.css';

function NaverLoggedInPage() {
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);
	const [naverUserInfo, setNaverUserInfo] = useState<{
		nickname: string;
		profile_image_url: string;
		birthday: string;
		email: string;
	}>({ nickname: '', profile_image_url: '', birthday: '', email: '' });

	useEffect(() => {
		setIsReadyToFetch(true);
		if (isReadyToFecth) {
			const accessTokenObject = {
				naverAccessToken: localStorage.getItem('naveraccesstoken'),
			};

			fetch(
				`${process.env.REACT_APP_BACKEND_BASE_URL}/naver/userinfo2` as string,
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
					setNaverUserInfo({
						nickname: data.data.response.nickname,
						profile_image_url: data.data.response.profile_image,
						birthday: data.data.response.birthday,
						email: data.data.response.email,
					});
				});
		}
		return () => {
			setIsReadyToFetch(false);
		};
	}, [isReadyToFecth, setNaverUserInfo]);

	return (
		<Fragment>
			<div id="naverUserInfoBox">
				You are logged in with Naver
				<button id="naverLogoutButton" onClick={() => console.log('클릭 ㅋ')}>
					Log out
				</button>
				<div>
					Nickname : {naverUserInfo.nickname ? naverUserInfo.nickname : 'N/A'}
				</div>
				<div>Email : {naverUserInfo.email ? naverUserInfo.email : 'N/A'}</div>
				<div>
					Birthday : {naverUserInfo.birthday ? naverUserInfo.birthday : 'N/A'}
				</div>
				<div>
					Profile image :{' '}
					{naverUserInfo.profile_image_url ? (
						<img
							id="naverProfileImage"
							src={naverUserInfo.profile_image_url as string}
							alt="naverProfileImage"
						/>
					) : (
						'N/A'
					)}
				</div>
			</div>
		</Fragment>
	);
}

export default NaverLoggedInPage;
