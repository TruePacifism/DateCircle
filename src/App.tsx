import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import DateWheel, { pointType } from "./DateWheel/DateWheel";

const randomYear = () => {
  return Math.floor(Math.random() * 50 + 1990);
};

const exampleDates: pointType[] = [
  {
    name: "Игры",
    infos: [
      {
        year: randomYear(),
        text: "Game Jam - мероприятие соревнований по созданию компьютерных игр",
      },
      {
        year: randomYear(),
        text: "Выход новой части серии Call of Duty с турниром для фанатов",
      },
      {
        year: randomYear(),
        text: "Мастер-класс по созданию игровых уровней в игровой индустрии",
      },
      {
        year: randomYear(),
        text: 'Турнир по настольным стратегическим играм среди клубов хобби "На гранях мира"',
      },
      {
        year: randomYear(),
        text: "Конкурс косплея персонажей из популярных видеоигр.",
      },
    ],
  },
  {
    name: "Фильмы",
    infos: [
      {
        year: randomYear(),
        text: 'Премьера нового блокбастера "Полет космического дельфина"',
      },
      {
        year: randomYear(),
        text: "Фестиваль независимого кино в центре города",
      },
      {
        year: randomYear(),
        text: 'Онлайн-трансляция классического фильма "Крепкий орешек"',
      },
      {
        year: randomYear(),
        text: "Встреча с режиссером после показа его последнего фильма",
      },
      {
        year: randomYear(),
        text: "Ретроспектива фильмов Хичкока в местном кинотеатре.",
      },
    ],
  },
  {
    name: "Сериалы",
    infos: [
      {
        year: randomYear(),
        text: 'Запуск нового сезона "Игра престолов".',
      },
      {
        year: randomYear(),
        text: 'Марафон просмотра сериала "Черное зеркало".',
      },
      {
        year: randomYear(),
        text: 'Выход нового эпизода "Мандалорца" на стриминговом сервисе',
      },
      {
        year: randomYear(),
        text: 'День фаната "Друзей": мероприятие с квизами и викторинами',
      },
      {
        year: randomYear(),
        text: 'Дискуссия в клубе по поводу разочарования финалом сериала "Lost".',
      },
    ],
  },
  {
    name: "Аниме",
    infos: [
      {
        year: randomYear(),
        text: "Конвент аниме-культуры с косплеем и ярмаркой.",
      },
      {
        year: randomYear(),
        text: 'Выход нового сезона "Атаки титанов"',
      },
      {
        year: randomYear(),
        text: 'Вечер встречи фанатов манги "Наруто" с розыгрышем призов',
      },
      {
        year: randomYear(),
        text: "Лекция об истории развития аниме-индустрии в Японии",
      },
      {
        year: randomYear(),
        text: "Творческий мастер-класс по рисованию аниме-стиля.",
      },
    ],
  },
  {
    name: "Мультфильмы",
    infos: [
      {
        year: randomYear(),
        text: 'Открытие выставки "История Уолта Диснея" в музее мультфильмов',
      },
      {
        year: randomYear(),
        text: "День детского анимационного кино с показом классических мультфильмов",
      },
      {
        year: randomYear(),
        text: "Воркшоп по созданию стоп-моушн мультиков для детей",
      },
      {
        year: randomYear(),
        text: "Показ новой короткометражки Pixar на фестивале мультфильмов.",
      },
      {
        year: randomYear(),
        text: 'Специальный показ мультфильма "Король Лев" под открытым небом в парке.',
      },
    ],
  },
  {
    name: "Книги",
    infos: [
      {
        year: randomYear(),
        text: 'Авторская презентация нового романа "Мистические песни сирен".',
      },
      {
        year: randomYear(),
        text: "Книжная ярмарка с распродажей бестселлеров и подписными сессиями авторов.",
      },
      {
        year: randomYear(),
        text: "Чтение книги вслух в детской библиотеке с представлением автора",
      },
      {
        year: randomYear(),
        text: "Литературный клуб для обсуждения произведений классической литературы",
      },
      {
        year: randomYear(),
        text: "Работа над собственным рукописным романом на литературном воркшопе",
      },
    ],
  },
];
function App() {
  return (
    <div className="App">
      <DateWheel data={exampleDates} />
    </div>
  );
}

export default App;
