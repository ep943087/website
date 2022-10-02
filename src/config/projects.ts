const projects: Project[] = [
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/typing-game/',
    externalLink: true,
    caption: 'Typing Game'
  },
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/sorting_simulation/',
    externalLink: true,
    caption: 'Sorting Simulation',
  },
  {
    imageURL: '',
    linkURL: 'https://ep-snakegame.herokuapp.com/',
    externalLink: true,
    caption: 'Multiplayer Snake Game',
  },
];

interface Project {
  imageURL: string,
  linkURL: string,
  externalLink: boolean,
  caption: string,
}

export default projects;