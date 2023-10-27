import { GradientWrapper, Heading } from 'ui';
import Image from 'next/image';

export default function AboutSection() {
	return (
		<section className="flex flex-col flex-wrap min-[900px]:flex-nowrap max-w-5xl justify-between w-full md:flex-row ">
			<div className="min-[900px]:max-w-md lg:max-w-xl text-lg md:mr-14">
				<Heading
					centerOnSmall={false}
					className="text-transparent bg-clip-text bg-primary bg-[length:200%] bg-[275%] uppercase text-2xl text-left font-bold xl:text-3xl xl:text-black xl:normal-case lg:before:hidden"
					as="h1"
				>
					О проекте
				</Heading>
				<p className="mt-5 ">
					Цель проекта “Сила взаимопомощи” в развитие социальной сети
					взаимоподдержки. Здесь вы сможете искать партнеров для коммерческого
					или социального проекта, принять участие в группе психологической
					помощи, узнавать о новых интересных культурных событиях или предложить
					свое, а также получать полезную информацию по психологии и другим
					направлениям.
				</p>
				<p className="mt-4">
					Мы приглашаем к участию в проекте тех, кто разделяет гуманистические
					ценности, принципы терпимости и уважения к каждому человеку.
				</p>
				<p className="mt-4">
					В перспективе мы также планируем запустить кассу взаимопомощи, для
					участников проекта которые находятся в трудной ситуации и нуждаются в
					финансовой поддержке.
				</p>
			</div>
			<Image
				src="/about/about.avif"
				height={320}
				width={390}
				alt="Руки на дереве"
				className="w-full xl:w-[480px] mt-8 min-[900px]:mt-0"
			/>
		</section>
	);
}
