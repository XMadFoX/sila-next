import { trpc } from './lib';

export default function useSession() {
	const { data, status } = trpc.auth.session.useQuery();
	return { status: status, data: data?.user ? data : null };
}
