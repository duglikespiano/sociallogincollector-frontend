import { useState, useEffect, Fragment } from 'react';
import LoadingPage from '../../common/LoadingPage';
import { accessTokenRequestURL } from './variables';
import { pageReturn } from '../../common/commonFunctions';

function KaKaoredirect() {
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line
		let refreshToken: string;
		let accessToken: string;
		let accessTokenRequestURLWithCode: string;

		setIsReadyToFetch(true);

		if (isReadyToFecth) {
			const kakaoAuthorizeCode = new URL(window.location.href).searchParams.get(
				'code'
			);
			accessTokenRequestURLWithCode =
				accessTokenRequestURL + kakaoAuthorizeCode;

			fetch(accessTokenRequestURLWithCode)
				.then((res) => res.json())
				.then((data) => {
					accessToken = data.access_token;
					refreshToken = data.refresh_token;
					localStorage.setItem('kakaoaccesstoken', accessToken);
					return { accessToken };
				})
				.then((accessTokenObject) => {
					//
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
							localStorage.setItem('kakaouserinfo', JSON.stringify(data));
						});
				})
				//
				.catch((error) => console.error(error))
				.finally(() => {
					pageReturn();
				});
		}

		return () => {
			setIsReadyToFetch(false);
		};
	}, [isReadyToFecth]);

	return (
		<Fragment>
			<LoadingPage />
		</Fragment>
	);
}

export default KaKaoredirect;
