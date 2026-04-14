import HarvsQuizzy from "../resources/images/Harvs-Quizzy.png";
import Coolours from "../resources/images/Coolours.png";
import Harvgram from "../resources/images/Harvgram.png";
import RockPaperScissors from "../resources/images/RockPaperScissors.png";
import NavigationMenu from "../resources/gifs/navigation-menu.gif";
import TextBasedAdventure from "../resources/gifs/text-based-adventure.gif";
import FantasyFightPicker from "../resources/images/ffp.png";

export const projects = [
  {
    name: "Fantasy Fight Picker",
    description: {
      EN: "Fantasy Fight Picker is a prediction app built with React and AWS. Browse upcoming fight cards, research fighters, make picks before lock, and earn points based on prediction accuracy.",
      ES: "Fantasy Fight Picker es una aplicacion de predicciones creada con React y AWS. Explora carteleras de combate, analiza luchadores, haz tus elecciones antes del cierre y consigue puntos segun la precision de tus predicciones.",
    },
    image: FantasyFightPicker,
    github: "https://github.com/heyitsmeharv/fantasy-fight-picker",
    link: "https://d18kh2aenn5ywj.cloudfront.net",
    tags: ["AWS", "React"],
  },
  {
    name: "Harvgram",
    description: {
      EN: "A full-stack Instagram clone with image uploads, likes, and a followers feed.",
      ES: "Un clon full-stack de Instagram con subida de imagenes, me gusta y un feed de seguidores.",
    },
    image: Harvgram,
    github: "https://github.com/heyitsmeharv/harvgram",
    tags: ["AWS", "React", "Node.js"],
  },
  {
    name: "Text Based Adventure",
    description: {
      EN: "A choose-your-own-adventure game built in React with branching narrative paths.",
      ES: "Un juego de aventura tipo elige tu propio camino creado en React con rutas narrativas ramificadas.",
    },
    image: TextBasedAdventure,
    github: "https://github.com/heyitsmeharv/react-text-based-adventure",
    tags: ["React"],
  },
  {
    name: "Coolours",
    description: {
      EN: "A colour palette generator inspired by Coolors, letting users lock and randomise beautiful palettes.",
      ES: "Un generador de paletas de colores inspirado en Coolors que permite bloquear y aleatorizar paletas atractivas.",
    },
    image: Coolours,
    github: "https://github.com/heyitsmeharv/coolours",
    link: "https://upbeat-lichterman-47bd92.netlify.app",
    tags: ["React"],
  },
  {
    name: "Quiz App",
    description: {
      EN: "A full-stack trivia quiz with multiple categories and a leaderboard.",
      ES: "Un quiz full-stack de preguntas y respuestas con varias categorias y clasificacion.",
    },
    image: HarvsQuizzy,
    github: "https://github.com/heyitsmeharv/quizzy",
    link: "https://harvs-quizzy.com/#/quizzy",
    tags: ["React", "Node.js"],
  },
  {
    name: "Rock Paper Scissors",
    description: {
      EN: "A classic Rock Paper Scissors game with score tracking and animated results.",
      ES: "El clasico juego de piedra, papel o tijera con seguimiento de puntuacion y resultados animados.",
    },
    image: RockPaperScissors,
    github: "https://github.com/heyitsmeharv/rock-paper-scissors",
    link: "https://heyitsmeharv-rockpaperscissors.herokuapp.com/",
    tags: ["React"],
  },
  {
    name: "Navigation Menu",
    description: {
      EN: "An animated responsive navigation menu component with smooth hover transitions.",
      ES: "Un componente de menu de navegacion responsive y animado con transiciones suaves al pasar el cursor.",
    },
    image: NavigationMenu,
    github: "https://github.com/heyitsmeharv/navigation-menu",
    tags: ["JavaScript", "CSS"],
  },
];
