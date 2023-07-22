import { pageReturn } from '../../common/commonFunctions';
const googleBaseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
const googleRedirectURI = `${process.env.REACT_APP_FRONTEND_BASE_URL}/googleredirect`;
const googleAuthScope = 'https://www.googleapis.com/auth/userinfo.profile';
const response_type = 'token';

const googleAuthRequestURL = `${googleBaseURL}?scope=${googleAuthScope}&response_type=${response_type}&redirect_uri=${googleRedirectURI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

export const googleAuthRequest = () => {
	window.open(googleAuthRequestURL, 'popup', 'width = 400, height = 700')!;
};

export const googleLogoutWindowOpen = () => {
	localStorage.clear();
	pageReturn();
};
