import * as React from 'react';

export function Button(props: any) {
	return (
		<button className="bg-green-400" {...props}>
			{props.children || 'Hi'}
		</button>
	);
}
