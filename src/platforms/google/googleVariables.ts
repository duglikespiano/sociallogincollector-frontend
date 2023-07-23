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
	const dataForFetch = {
		accessTokkenRevokeURL: `https://oauth2.googleapis.com/revoke?token=${localStorage.getItem(
			'googleaccesstoken'
		)}`,
	};

	fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/google/token`, {
		method: 'delete',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(dataForFetch),
	})
		.then((res) => res.json())
		.then(() => {
			localStorage.clear();
			pageReturn();
		})
		.catch((error) => console.error(error));
};
