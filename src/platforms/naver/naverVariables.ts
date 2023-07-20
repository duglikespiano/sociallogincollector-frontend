const naverBaseURL = 'https://kauth.kakao.com/oauth';
const naverRedirectURI = `${process.env.REACT_APP_FRONTEND_BASE_URL}/kakaoredirect`;

export const naverAuthRequestURL = `${naverBaseURL}/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${naverRedirectURI}&response_type=code`;
export let naverAccessTokenRequestURL = `${naverBaseURL}/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${naverRedirectURI}&code=`;

export const naverAuthRequest = () => {
	window.open(naverAuthRequestURL, 'popup', 'width = 400, height = 700')!;
};
