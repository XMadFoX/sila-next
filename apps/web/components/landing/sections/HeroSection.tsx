import Image from 'next/image';
import React from 'react';
import { Button, GradientWrapper } from 'ui';

export default function HeroSection() {
	return (
		<section className="flex overflow-x-hidden flex-col justify-center p-4 xl:flex-row min-h-[90vh] xl:max-w-[1600px]">
			<div className="flex flex-col justify-center">
				<h1 className="text-3xl md:text-5xl font-bold leading-[130%] uppercase">
					Сила
					<br />
					<GradientWrapper
						className="text-transparent bg-clip-text bg-primary"
						gradientDirection="r"
					>
						Взаимопомощи
					</GradientWrapper>
				</h1>
				<h2 className="text-2xl font-medium md:text-3xl">
					Проект движения Сила Любви
				</h2>
				<p className="mt-5 max-w-xl">
					Цель проекта “Сила взаимопомощи” в развитие социальной сети
					взаимоподдержки. Здесь вы сможете искать партнеров для коммерческого
					или социального проекта, принять участие в группе психологической
					помощи, узнавать о новых интересных культурных событиях или предложить
					свое, а также получать полезную информацию по психологии и другим
					направлениям.
				</p>
				<Button
					href="/auth/login"
					className="mx-auto mt-10 uppercase md:ml-0 bg-primary"
				>
					Присоединиться
				</Button>
			</div>
			<div className="overflow-hidden absolute right-0 my-auto xl:static xl:-ml-20 h-[650px] w-[530px]">
				<Image
					src="/sila.jpg"
					className="absolute top-12 -right-16 h-auto scale-75 md:bottom-auto xl:top-auto xl:right-auto xl:m-0 xl:scale-100 brightness-150 saturate-75 -z-10 xl:relativ xl:brightness-100"
					alt=""
					width={530}
					height={650}
				/>
			</div>
		</section>
	);
}
