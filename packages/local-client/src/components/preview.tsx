import { useEffect, useRef } from 'react';
import './preview.css';

const iframeHTML = `
<html style='background-color: white'>
	<head></head>
	<body>
		<div id='root'></div>
		<script>
			const handleError = error => {
				const root = document.getElementById('root');
				root.innerHTML = '<div style="color: red">' + error + '</div>';
				console.error(error);
			};

			window.addEventListener('error', event => {
				event.preventDefault();
				handleError(event.error);
			});
			
			window.addEventListener('message', event => {
				try {
					eval(event.data);
				} catch (error) {
					handleError(error);
				};
			}, false);
		</script>
	</body>
</html>
`;

interface PreviewProps {
	code: string;
	error: string;
};

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
	const iframeRef = useRef<any>();

	useEffect(() => {
		iframeRef.current.srcdoc = iframeHTML;
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className='preview-container'>
			<iframe
				ref={iframeRef}
				title='Preview'
				srcDoc={iframeHTML}
				sandbox='allow-scripts'
			/>
			{error && <div className='preview-error'>{error}</div>}
		</div>
	);
};

export default Preview;