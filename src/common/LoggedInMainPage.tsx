import { Fragment } from 'react';
import KakaoLoggedinPage from '../platforms/kakao/KakaoLoggedInPage';
import './LoggedInMainPage.css';

interface Props {
	loggedInPlatform: string;
}

function LoggedInMainPage(props: Props) {
	return (
		<Fragment>
			{props.loggedInPlatform === 'kakao' ? <KakaoLoggedinPage /> : null}
		</Fragment>
	);
}

export default LoggedInMainPage;
