import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
	return (
		<Html lang='en'>
			<Head>
				<meta charSet="utf-8" />
				{/* <link rel="shortcut icon" href="/images/favicon.png" /> */}

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

				<script defer src="https://unpkg.com/peerjs@1.4.5/dist/peerjs.min.js" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
	
export default Document;
