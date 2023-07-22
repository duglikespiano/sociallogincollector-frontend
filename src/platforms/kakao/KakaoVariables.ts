import { pageReturn } from '../../common/commonFunctions';
const kakaoBaseURL = 'https://kauth.kakao.com/oauth';
const kakaoRedirectURI = `${process.env.REACT_APP_FRONTEND_BASE_URL}/kakaoredirect`;

const kakaoAuthRequestURL = `${kakaoBaseURL}/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${kakaoRedirectURI}&response_type=code`;
let kakaoAccessTokenRequestURL = `${kakaoBaseURL}/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${kakaoRedirectURI}&code=`;

export const kakaoAuthRequest = () => {
	window.open(kakaoAuthRequestURL, 'popup', 'width = 400, height = 700')!;
};

export const kakaoUserInfoFetchWithAccesstoken = () => {
	let kakaoAccessToken: string;
	let kakaoAccessTokenRequestURLWithCode: string;

	const kakaoAuthorizeCode = new URL(window.location.href).searchParams.get(
		'code'
	);
	kakaoAccessTokenRequestURLWithCode =
		kakaoAccessTokenRequestURL + kakaoAuthorizeCode;

	fetch(kakaoAccessTokenRequestURLWithCode)
		.then((res) => res.json())
		.then((data) => {
			kakaoAccessToken = data.access_token;
			localStorage.setItem('kakaoaccesstoken', kakaoAccessToken);
			localStorage.setItem('loggedinplatform', 'kakao');
			return { accessToken: kakaoAccessToken };
		})
		.then((accessTokenObject) => {
			fetch(
				`${process.env.REACT_APP_BACKEND_BASE_URL}/kakao/userinfo` as string,
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(accessTokenObject),
				}
			).then((res) => res.json());
		})
		.catch((error) => console.error(error))
		.finally(() => {
			pageReturn();
		});
};

export const kakaoLogoutWindowOpen = () => {
	window.open(
		`https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.REACT_APP_FRONTEND_BASE_URL}&state=kakaologgedout`,
		'popup',
		'width = 400, height = 700'
	)!;
};

export const kakaoLogout = () => {
	const accessTokenObject = {
		accessToken: localStorage.getItem('kakaoaccesstoken'),
	};
	fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/kakao/unlink` as string, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(accessTokenObject),
	})
		.then((res) => res.json())
		.finally(() => {
			localStorage.clear();
			window.location.href = process.env.REACT_APP_FRONTEND_BASE_URL as string;
			pageReturn();
		});
};
