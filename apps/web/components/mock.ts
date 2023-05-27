import Image from 'next/image';

export const cardMock = {
	preview: {
		alt: 'Random image',
		image: 'https://picsum.photos/624/330',
		badges: ['Free'],
		as: Image,
	},
	details: {
		title: 'Hellow world',
		location: {
			city: 'Tbilisi',
			address: 'My St. 12',
		},
		date: new Date('2023-07-31 19:00'),
		description: 'Long text',
		org: {
			name: 'Aboba',
			link: 'https://google.com',
		},
	},
};
