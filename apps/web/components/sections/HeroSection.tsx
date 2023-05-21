import Image from 'next/image';
import React from 'react';
import { Button, GradientWrapper } from 'ui';

export default function HeroSection() {
	return (
		<section className="flex flex-col justify-center p-4 xl:flex-row min-h-[100vh] max-w-[1600px]">
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
				<Button className="mx-auto mt-10 uppercase md:ml-0 bg-primary">
					Присоединиться
				</Button>
			</div>
			<Image
				src="/sila.jpg"
				className="absolute -right-36 bottom-40 my-auto -ml-16 h-auto md:bottom-auto xl:relative brightness-150 saturate-75 -z-10 xl:right-auto xl:brightness-100"
				alt=""
				width={530}
				height={650}
			/>
		</section>
	);
}
