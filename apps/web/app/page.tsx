import BusinessCooperationSection from '../components/sections/BusinessCooperationSection';
import EventsSection from '../components/sections/EventsSection';
import HeroSection from '../components/sections/HeroSection';

export default function Page() {
	return (
		<div className="flex flex-col items-center text-black">
			<HeroSection />
			<EventsSection />
			<BusinessCooperationSection />
		</div>
	);
}
