import { GradientWrapper } from 'ui';
import Image from 'next/image';

export default function AboutSection() {
	return (
		<section className="max-w-[1400px]">
			<GradientWrapper
				as="h1"
				className="text-transparent bg-clip-text bg-primary bg-[length:200%] bg-[275%] uppercase text-2xl text-left font-bold"
			>
				О проекте
			</GradientWrapper>

			<p className="mt-5">
				Цель проекта “Сила взаимопомощи” в развитие социальной сети
				взаимоподдержки. Здесь вы сможете искать партнеров для коммерческого или
				социального проекта, принять участие в группе психологической помощи,
				узнавать о новых интересных культурных событиях или предложить свое, а
				также получать полезную информацию по психологии и другим направлениям.
			</p>
			<p className="mt-2">
				Мы приглашаем к участию в проекте тех, кто разделяет гуманистические
				ценности, принципы терпимости и уважения к каждому человеку.
			</p>
			<p className="mt-2">
				В перспективе мы также планируем запустить кассу взаимопомощи, для
				участников проекта которые находятся в трудной ситуации и нуждаются в
				финансовой поддержке.
			</p>
			<Image
				src="/about/about.avif"
				height={320}
				width={390}
				alt="Руки на дереве"
				className="w-full"
			/>
		</section>
	);
}
