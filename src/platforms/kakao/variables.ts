const kakaoBaseURL = 'https://kauth.kakao.com/oauth';
const kakaoRedirectURI = `${process.env.REACT_APP_FRONTEND_BASE_URL}/kakaoredirect`;

export const authRequestURL = `${kakaoBaseURL}/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${kakaoRedirectURI}&response_type=code`;
export let accessTokenRequestURL = `${kakaoBaseURL}/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${kakaoRedirectURI}&code=`;

export const kakaoAuthRequest = () => {
	window.open(authRequestURL, 'popup', 'width = 400, height = 700')!;
};

export const kakaoLogout = () => {
	window.open(
		`https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_CLIENT_ID}&logout_redirect_uri=${process.env.REACT_APP_FRONTEND_BASE_URL}&state=kakaologgedout`,
		'popup',
		'width = 400, height = 700'
	)!;
};
