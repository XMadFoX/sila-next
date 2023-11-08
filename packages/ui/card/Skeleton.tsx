'use client';

import clsx from 'clsx';
import { GradientWrapper } from '../general';
import { motion } from 'framer-motion';

export function CardSkeleton({ big, idx }: { big?: boolean; idx: number }) {
	return (
		<motion.div
			style={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2, delay: idx / 10 }}
		>
			<GradientWrapper
				className={clsx(
					'flex flex-col',
					'overflow-hidden rounded-[20px] bg-primary',
					big ? 'max-w-[670px] h-[640px]' : 'max-w-[427px]',
					'hover:shadow-xl transition-all duration-300 relative'
				)}
			>
				<div className="p-6 w-full h-full bg-white rounded-[19px]">
					<div
						className={clsx(
							'animate-pulse rounded-lg 1w-[624px] w-[377px] h-[200px] 1h-[320px] bg-grey'
						)}
					></div>
					<figcaption className="flex flex-col mt-4">
						<span className="w-72 h-7 font-medium rounded-lg animate-pulse bg-dark-grey"></span>
						<span className="mt-4 w-16 rounded-lg animate-pulse h-[22px] bg-dark-grey"></span>
						<span className="mt-1 w-48 h-5 rounded-lg animate-pulse bg-dark-grey"></span>
						<span className="mt-4 w-40 rounded-lg animate-pulse h-[22px] bg-dark-grey"></span>
						<div className="flex flex-wrap gap-1 mt-4 w-full h-16">
							{new Array(15).fill(0).map((_, idx) => (
								<span
									key={idx}
									className="inline-block h-4 rounded-lg animate-pulse bg-dark-grey"
									style={{ width: randomInt(20, 100) }}
								></span>
							))}
						</div>
						<span
							className="mt-5 w-32 h-5 rounded-lg animate-pulse bg-grey"
							data-clickable
						></span>
					</figcaption>
				</div>
			</GradientWrapper>
		</motion.div>
	);
}

function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
