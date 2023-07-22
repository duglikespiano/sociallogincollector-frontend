export const pageReturn = () => {
	if (window.opener) {
		window.opener.location.href = process.env.REACT_APP_FRONTEND_BASE_URL;
		window.close();
	} else {
		window.location.href = process.env.REACT_APP_FRONTEND_BASE_URL as string;
	}
};
