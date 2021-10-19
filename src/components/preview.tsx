import { useEffect, useRef } from 'react';
import './preview.css';

const iframeHTML = `
<html style='background-color: white'>
	<head></head>
	<body>
		<div id='root'></div>
		<script>
			window.addEventListener('message', event => {
				try {
					eval(event.data);
				} catch (error) {
					const root = document.getElementById('root');
					root.innerHTML = '<div>' + error + '</div>';
					console.error(error);
				};
			}, false);
		</script>
	</body>
</html>
`;

interface PreviewProps {
	code: string;
};

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframeRef = useRef<any>();

	useEffect(() => {
		iframeRef.current.srcdoc = iframeHTML;
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className='preview-wrapper'>
			<iframe
				ref={iframeRef}
				title='Preview'
				srcDoc={iframeHTML}
				sandbox='allow-scripts'
			/>
		</div>
	);
};

export default Preview;