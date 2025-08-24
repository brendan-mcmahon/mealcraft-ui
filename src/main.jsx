import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import { registerSW } from 'virtual:pwa-register';

// Register service worker for PWA functionality
const updateSW = registerSW({
	onNeedRefresh() {
		// Show a prompt to user for refreshing
		if (confirm('New content available. Reload?')) {
			updateSW(true);
		}
	},
	onOfflineReady() {
		console.log('App ready to work offline');
	},
});

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);