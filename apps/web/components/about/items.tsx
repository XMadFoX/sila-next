const faqItems = [
	{
		value: 'item-1',
		triggerText: 'Зачем нужен проект Сила взаимопомощи?',
		content: (
			<p>
				Цель проекта в том, чтобы самые разные люди могли поддерживать и
				помогать друг другу в наши трудные времена: совместно реализовывать
				социальные или коммерческие проекты, оказывать друг другу
				психологическую поддержку, проводить культурные или благотворительные
				мероприятия, делиться друг с другом новыми знаниями.
			</p>
		),
	},
	{
		value: 'item-2',
		triggerText: 'Кто может принять участие в проекте “Сила взаимопомощи”?',
		content: (
			<p>
				В проекте могут участвовать все желающие вне зависимости от возраста,
				места жительства, дохода. В первую очередь проект направлен на
				русскоязычных людей, разделяющих гуманистическое отношение к людям и
				представление о ценности человеческой жизни.
			</p>
		),
	},
	{
		value: 'item-3',
		triggerText: 'Какие есть формы участия в проекте?',
		content: (
			<div>
				<p>
					В проекте могут участвовать как зарегистрированные, так и не
					зарегистрированные пользователи.
				</p>
				<p className="mt-2">
					Если вы зарегистрируетесь на сайте вы сможете рассказывать другим
					пользователям о ваших идеях социальных и коммерческих проектов,
					находить людей, которые помогут вам эти идеи реализовать, публиковать
					информацию о проводимых вами культурных или благотворительных
					мероприятиях, участвовать в работе групп психологической поддержки.
				</p>
				<p className="mt-2">
					Без регистрации вы сможете знакомиться с информацией, опубликованной
					на сайте другими пользователями и читать статьи, которые будут
					публиковаться в разделе блог.
				</p>
			</div>
		),
	},
	{
		value: 'item-4',
		triggerText:
			'Каким образом заполняется раздел блог? А я могу туда написать?',
		content: (
			<div>
				<p>
					В блоге публикуются статьи пользователей сайта на самые разные темы:
					история, социология, психология, компьютерная безопасность и т.д.
				</p>
				<p className="mt-2">
					Если вы хотите поделиться своей статьей, свяжитесь с администрацией
					сайта по электронной почте и мы с вами лично все обсудим.
				</p>
			</div>
		),
	},
	{
		value: 'item-5',
		triggerText: 'Что нельзя делать на сайте?',
		content: (
			<div>
				<p>
					Мы просим вас не публиковать коммерческую рекламу, не оскорблять
					других пользователей, а также соблюдать принятое в России
					законодательство.
				</p>
				<p className="mt-2">
					С правилами пользования сайтом подробнее можно ознакомиться по ссылке.
				</p>
			</div>
		),
	},
	{
		value: 'item-6',
		triggerText: 'Будут ли на сайте какие-то еще функции на сайте?',
		content: (
			<p>
				Да, мы планируем постепенно добавлять на сайт новые функции и разделы.
			</p>
		),
	},
];

const ruleItems = [
	{
		value: 'item-1',
		triggerText: 'Правила общения на сайте',
		content: (
			<div>
				<h3 className="font-bold">Дорогие друзья</h3>
				<p className="mt-4">
					Для нас очень важно, чтобы пользователи нашего сайта чувствовали себя
					максимально комфортно и безопасно. В связи с этим, мы убедительно
					просим вас при общении с другими соблюдать следующие правила:
				</p>
				<ul className="mt-4 list-disc list-inside marker:text-black">
					<li>
						воздерживаться от оскорблений, проявления агрессии или ненависти по
						отношению к отдельным людям или социальным группам,
					</li>
					<li>не публиковать призывы к насилию или суицидальным действиям,</li>
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
					Мы оставляем за собой права закрывать возможность использования нашего
					сайта для пользователей, которые нарушают перечисленные выше правила.
				</p>
				<p className="mt-4">
					Кроме того, в целях вашей безопасности, мы также напоминаем вам о том,
					что политические высказывания, подпадающие под статьи о дискредитации
					армии, распространение фейков и оскорбление власти могут быть связаны
					для вас с определенными рисками и просим вас воздерживаться от таких
					высказываний на нашем сайте.
				</p>
			</div>
		),
	},
	{
		value: 'item-2',
		triggerText: 'Правила информационной безопасности',
		content: (
			<p className="mt-4">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Non autem
				deleniti consectetur, nisi earum consequatur tempore sint impedit vero,
				vel, eum nam. Magnam facilis, velit aut consectetur maiores optio
				voluptates.
			</p>
		),
	},
];

export { faqItems, ruleItems };
