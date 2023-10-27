import { trpc } from './lib';

export default function useSession() {
	const { data, status } = trpc.auth.session.useQuery();
	const utils = trpc.useContext();
	return {
		status: status,
		data: data?.user ? data : null,
		invalidate: () => utils.invalidate(),
	};
}
