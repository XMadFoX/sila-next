import { BaseContent } from '@sila/api/db/schema';
import Link from 'next/link';

const data = {
	phone: {
		prefix: 'tel:',
		text: 'Телефон для связи',
	},
	email: {
		prefix: 'mailto:',
		text: 'Эл. почта',
	},
	website: {
		prefix: '',
		text: 'Сайт',
	},
	registerUrl: {
		prefix: '',
		text: 'Ссылка для регистрации',
	},
};

export default function ContactInfo(
	contacts: BaseContent['contacts'] & { registerUrl?: string }
) {
	return (
		<table className="w-full max-w-md">
			{Object.entries(contacts).map(([key, value]) => {
				if (value && key in data) {
					const contactData = data[key as keyof typeof data];
					return (
						<tr key={key} className="flex gap-8 w-full">
							<td className="w-full">{contactData.text}:</td>
							<td className="w-full hover:underline shrink">
								<Link href={`${contactData.prefix}${value}`}>{value}</Link>
							</td>
						</tr>
					);
				}
			})}
		</table>
	);
}
