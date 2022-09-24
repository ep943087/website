const projects: Project[] = [
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/typing-game/',
    externalLink: true,
    caption: 'Typing Game'
  },
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/game-of-life/',
    externalLink: true,
    caption: 'Game of Life'
  },
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/sorting_simulation/',
    externalLink: true,
    caption: 'Sorting Simulation',
  },
  {
    imageURL: '',
    linkURL: 'https://ep943087.github.io/gravity_2d_simulation/',
    externalLink: true,
    caption: 'Gravity Simulation',
  },
];

interface Project {
  imageURL: string,
  linkURL: string,
  externalLink: boolean,
  caption: string,
}

export default projects;