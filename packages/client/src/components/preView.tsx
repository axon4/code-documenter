import { useEffect, useRef } from 'react';
import './preView.css';

const iFrameHTML = `
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

interface PreViewProps {
	code: string;
	error: string;
};

const PreView: React.FC<PreViewProps> = ({ code, error }) => {
	const iFrameReference = useRef<HTMLIFrameElement | any>();

	useEffect(() => {
		iFrameReference.current.srcdoc = iFrameHTML;

		setTimeout(() => {
			iFrameReference.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className='preview-container'>
			<iframe ref={iFrameReference} title='PreView' srcDoc={iFrameHTML} sandbox='allow-scripts' />
			{error && <div className='preview-error'>{error}</div>}
		</div>
	);
};

export default PreView;