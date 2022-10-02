import styled from 'styled-components';
import Typography from './Typography';

type StarsType = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

const SkillContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 5px;

  > * {
    margin-bottom: 5px;
  }

  > .svg {
    animation-name: svg;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .star-container > div {
    animation-name: rotate;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  > .star-container > div:nth(1) {
    animation-delay: 100ms;
  }

  > .star-container > div:nth(2) {
    animation-delay: 200ms;
  }

  > .star-container > div:nth(3) {
    animation-delay: 300ms;
  }

  > .star-container > div:nth(4) {
    animation-delay: 400ms;
  }

  > .star-container > div:nth(5) {
    animation-delay: 500ms;
  }

  @keyframes svg {
    0% {
      transform: rotateY(0);
    }
    25% {
      transform: rotateY(30deg);
    }
    75% {
      transform: rotateY(-30deg);
    }
    100% {
      transform: rotateY(0);
    }
  }

  @keyframes rotate {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(360deg);
    }
  }
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const StarContainer = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
`;

const Skill = (props: SkillProps) => {
  return (
    <SkillContainer>
      <Typography variant="body">{props.title}</Typography>
      <div className="svg">
        {props.svg}
      </div>
      <StarsContainer className="star-container">
        {[1,2,3,4,5].map(index => {
            const style: React.CSSProperties = {};
            if (index <= props.stars) {
              style.backgroundColor = 'yellow';
            } else if (index - .5 === props.stars) {
              style.background = 'linear-gradient(90deg, yellow 50%, rgba(0,0,0,0) 50%)';
            }
            return <StarContainer style={style} />;
        })}
      </StarsContainer>
    </SkillContainer>
  );
};

interface SkillProps {
  title: string,
  stars: StarsType,
  svg: React.ReactNode,
}

export default Skill;