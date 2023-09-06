import BlogSection from '../components/landing/sections/BlogSection';
import BusinessCooperationSection from '../components/landing/sections/BusinessCooperationSection';
import EventsSection from '../components/landing/sections/EventsSection';
import HeroSection from '../components/landing/sections/HeroSection';

export default function Page() {
	return (
		<div className="flex flex-col items-center text-black">
			<HeroSection />
			<EventsSection />
			<BusinessCooperationSection />
			{/* <BlogSection /> */}
		</div>
	);
}
