import { useEffect } from 'react';
import { trpc } from './lib';

export default function useLogout() {
	const { mutate, isSuccess } = trpc.auth.logout.useMutation();
	const utils = trpc.useContext();
	useEffect(() => {
		utils.auth.session.invalidate();
	}, [isSuccess, utils]);

	return () => mutate();
}
