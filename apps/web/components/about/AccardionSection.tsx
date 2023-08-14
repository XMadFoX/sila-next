import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'ui/@/components/ui/accordion';
export default function AccardionSection() {
	return (
		<section className="mt-10 xl:mt-24 xl:w-9/12">
			<h2 className="text-xl font-medium xl:text-3xl">
				Часто задаваемые вопросы
			</h2>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>
						Зачем нужен проект Сила взаимопомощи?
					</AccordionTrigger>
					<AccordionContent>
						<p>
							Цель проекта в том, чтобы самые разные люди могли поддерживать и
							помогать друг другу в наши трудные времена : совместно
							реализовывать социальные или коммерческие проектов, оказывать друг
							другу психологическую поддержку, проводить культурные или
							благотворительные мероприятия, делиться друг с другом новыми
							знаниями.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>
						Кто может принять участие в проекте “Сила взаимопомощи”?
					</AccordionTrigger>
					<AccordionContent>
						<p>
							В проекте могут участвовать все желающие вне зависимости от
							возраста, места жительства, дохода. В первую очередь проект
							направлен на русскоязычных людей, разделяющих гуманистическое
							отношение к людям и представление о ценности человеческой жизни.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>
						Какие есть формы участия в проекте?
					</AccordionTrigger>
					<AccordionContent>
						<p>
							В проекте могут участвовать как зарегистрированные, так и не
							зарегистрированные пользователи. 
						</p>{' '}
						<p className="mt-2">
							Если вы зарегистрируетесь на сайте вы сможете рассказывать другим
							пользователям о ваших идеях социальных и коммерческих проектов,
							находить людей, которые помогут вам эти идеи реализовать,
							публиковать информацию о проводимых вами культурных или
							благотворительных мероприятиях, участвовать в работе групп
							психологической поддержки. 
						</p>{' '}
						<p className="mt-2">
							Без регистрации вы сможете знакомиться с информацией,
							опубликованной на сайте другими пользователями и читать статьи,
							которые будут публиковаться в разделе блог.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger>
						Каким образом заполняется раздел блог? А я могу туда написать?
					</AccordionTrigger>
					<AccordionContent>
						<p>
							В блоге публикуются статьи пользователей сайта на самые разные
							темы: история, социология, психология, компьютерная безопасность и
							т.д.
						</p>{' '}
						<p className="mt-2">
							Если вы хотите поделиться своей статьей, свяжитесь с
							администрацией сайта по электронной почте и мы с вами лично все
							обсудим.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-5">
					<AccordionTrigger>Что нельзя делать на сайте?</AccordionTrigger>
					<AccordionContent>
						<p>
							Мы просим вас не публиковать коммерческую рекламу, не оскорблять
							других пользователей, а также соблюдать принятое в России
							законодательство.
						</p>{' '}
						<p className="mt-2">
							С правилами пользования сайтом подробнее можно ознакомиться по
							ссылке.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-6">
					<AccordionTrigger>
						Будут ли на сайте какие-то еще функции на сайте?
					</AccordionTrigger>
					<AccordionContent>
						<p>
							Да, мы планируем постепенно добавлять на сайт новые функции и
							разделы.
						</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<h2 className="text-xl font-medium mt-10 xl:text-3xl">
				Правила для участников проекта
			</h2>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>Правила общения на сайте</AccordionTrigger>
					<AccordionContent>
						<h3 className="font-bold">Дорогие друзья</h3>
						<p className="mt-4">
							Для нас очень важно, чтобы пользователи нашего сайта чувствовали
							себя максимально комфортно и безопасно. В связи с этим, мы
							убедительно просим вас при общении с другими соблюдать следующие
							правила:
						</p>
						<ul className="mt-4 marker:text-black list-inside list-disc">
							<li>
								воздерживаться от оскорблений, проявления агрессии или ненависти
								по отношению к отдельным людям или социальным группам,
							</li>
							<li>
								не публиковать призывы к насилию или суицидальным действиям,
							</li>
							<li>
								не публиковать порнографические материалы, информацию о
								наркотических средствах и другой контент, нарушающий уголовное 
								законодательство,
							</li>
							<li>
								мы также просим вас помнить о том, что наш проект носит 
								некоммерческий характер и не использовать наш сайт для
								одностороннего продвижение ваших товаров и услуг.
							</li>
						</ul>
						<p className="mt-4">
							Мы оставляем за собой права закрывать возможность использования
							нашего сайта для пользователей, которые нарушают перечисленные
							выше правила.
						</p>
						<p className="mt-4">
							Кроме того, в целях вашей безопасности, мы также напоминаем вам о
							том, что политические высказывания, подпадающие под статьи о
							дискредитации армии, распространение фейков и оскорбление власти
							могут  быть связаны для вас с определенными рисками и просим вас
							воздерживаться от таких высказываний на нашем сайте.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>
						Правила информационной безопасности
					</AccordionTrigger>
					<AccordionContent>
						<p className="mt-4">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Non autem
							deleniti consectetur, nisi earum consequatur tempore sint impedit
							vero, vel, eum nam. Magnam facilis, velit aut consectetur maiores
							optio voluptates.
						</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
}
