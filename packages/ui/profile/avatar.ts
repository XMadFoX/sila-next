export function getAvatarUrl(img: string | null, seed: string) {
	return img || `https://api.dicebear.com/6.x/lorelei/svg?seed=${seed}`;
}
