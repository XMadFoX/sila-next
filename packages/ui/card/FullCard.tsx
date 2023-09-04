import { AppRouter } from '@sila/api';
import { inferRouterOutputs } from '@trpc/server';
import { Card } from '.';
import { getBadges } from './utils';

type RouterOutput = inferRouterOutputs<AppRouter>;
type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type ItemType = Omit<
	ArrayElement<RouterOutput['events']['find']>['events'],
	'eventTypeId' | 'registrationUrl'
>;
type BaseType = ArrayElement<RouterOutput['events']['find']>['base_content'];
type UserType = ArrayElement<RouterOutput['events']['find']>['users'];

export default function FullCard<T>({
	kind,
	item,
	user,
	base,
	big,
	gradientClass,
}: {
	kind: 'event' | 'project';
	item: ItemType;
	user: UserType;
	base: BaseType;
	big?: true;
	gradientClass?: string;
}) {
	return (
		<Card
			kind={kind}
			key={item.id}
			id={item.id}
			big={big}
			gradientClass={gradientClass}
		>
			<Card.Preview
				image={item.coverImage}
				alt=""
				badges={getBadges({
					entryType: item.entryType,
					isOnline: item.isOnline ?? false,
				})}
				big={big}
			/>
			<Card.Details
				kind={kind}
				date={item.date}
				title={base.title}
				org={{ link: '', name: user.name }}
				location={
					item.city && item.address
						? {
								city: item.city,
								address: item.address,
						  }
						: null
				}
				description={item.description}
			/>
		</Card>
	);
}
