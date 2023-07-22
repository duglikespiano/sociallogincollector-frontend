import { useState, useEffect, Fragment } from 'react';
import { pageReturn } from '../../common/commonFunctions';
import LoadingPage from '../../common/LoadingPage';

function GoogleRedirect() {
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);

	useEffect(() => {
		setIsReadyToFetch(true);
		if (isReadyToFecth) {
		}
		const googleAccessTokenUrl = window.location.href;

		const googleAccessToken = googleAccessTokenUrl.slice(
			googleAccessTokenUrl.indexOf('access_token=') + 'access_token='.length,
			googleAccessTokenUrl.indexOf('&token_type')
		);

		localStorage.setItem('googleaccesstoken', googleAccessToken);
		localStorage.setItem('loggedinplatform', 'google');

		pageReturn();

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

export default GoogleRedirect;
