import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'ui/@/components/ui/accordion';
import { faqItems, ruleItems } from './items';

const sections = [
	{ title: 'Часто задаваемые вопросы', items: faqItems },
	{ title: 'Правила для участников проекта', items: ruleItems },
];

export default function AccardionSection() {
	return (
		<section className="mt-10 lg:max-w-5xl xl:mt-24">
			{sections.map((section) => (
				<Section key={section.title} {...section} />
			))}
		</section>
	);
}

function Section({ title, items }: { title: string; items: typeof faqItems }) {
	return (
		<>
			<h2 className="mt-10 text-xl font-medium xl:text-3xl">{title}</h2>
			<Accordion type="single" collapsible className="w-full">
				{items.map((item) => (
					<AccordionItem key={item.value} value={item.value}>
						<AccordionTrigger>{item.triggerText}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
}
