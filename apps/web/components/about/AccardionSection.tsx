import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'ui/@/components/ui/accordion';
import { faqItems, ruleItems } from './items';

export default function AccardionSection() {
	return (
		<section className="mt-10 lg:max-w-5xl xl:mt-24">
			<h2 className="text-xl font-medium xl:text-3xl">
				Часто задаваемые вопросы
			</h2>
			<Accordion type="single" collapsible className="w-full">
				{faqItems.map((item) => (
					<AccordionItem key={item.value} value={item.value}>
						<AccordionTrigger>{item.triggerText}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<h2 className="mt-10 text-xl font-medium xl:text-3xl">
				Правила для участников проекта
			</h2>
			<Accordion type="single" collapsible className="w-full">
				{ruleItems.map((item) => (
					<AccordionItem key={item.value} value={item.value}>
						<AccordionTrigger>{item.triggerText}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
