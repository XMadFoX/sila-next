import AboutSection from 'components/about/AboutSection';
import AccardionSection from 'components/about/AccardionSection';

export default function Page() {
	return (
		<main className=" w-full max-w-[1400px] mt-10 px-4 2xl:px-0 text-black">
			<AboutSection />
			<AccardionSection />
		</main>
	);
}
