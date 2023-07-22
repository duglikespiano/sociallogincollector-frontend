import { pageReturn } from '../../common/commonFunctions';

const naverBaseURL = 'https://nid.naver.com/oauth2.0';
const naverRedirectURI = encodeURI(
	`${process.env.REACT_APP_FRONTEND_BASE_URL}/naverredirect`
);

const naverAuthRequestURL = `${naverBaseURL}/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${naverRedirectURI}&state=`;
export let naverAccessTokenRequestURL = `${naverBaseURL}/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}&redirect_uri=${naverRedirectURI}&code=`;

export const naverAuthRequest = () => {
	window.open(naverAuthRequestURL, 'popup', 'width = 400, height = 700')!;
};

export const naverUserInfoFetchWithAccesstoken = () => {
	let naverAccessTokenRequestURLWithCode: string;

	const naverAuthorizeCode = new URL(window.location.href).searchParams.get(
		'code'
	);

	naverAccessTokenRequestURLWithCode =
		naverAccessTokenRequestURL + naverAuthorizeCode + '&state=';

	const dataForFetch = {
		naverAccessTokenRequestURLWithCode,
		headers: {
			'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID!,
			'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET!,
		},
	};

	fetch(
		`${process.env.REACT_APP_BACKEND_BASE_URL}/naver/userinfowithouttoken`,
		{
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(dataForFetch),
		}
	)
		.then((res) => res.json())
		.then((data) => {
			localStorage.setItem('naveraccesstoken', data.naverAccessToken);
			localStorage.setItem('loggedinplatform', 'naver');
		})
		.catch((error) => console.error(error))
		.finally(() => {
			pageReturn();
		});
};

export const naverLogout = () => {
	localStorage.clear();
	window.location.reload();
};
