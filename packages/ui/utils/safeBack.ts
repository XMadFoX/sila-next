import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function isBackSafe(window: Window) {
	return window.history.length > 2 ? true : false;
}

export default function safeBack(window: Window, router: AppRouterInstance) {
	isBackSafe(window) ? router.back() : router.replace('/');
}
