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
        <props.svg />
      </div>
      <StarsContainer className="star-container">
        {[1,2,3,4,5].map(index => {
            const style: React.CSSProperties = {};
            if (index <= props.stars) {
              style.backgroundColor = 'yellow';
            } else if (index - .5 === props.stars) {
              style.background = 'linear-gradient(90deg, yellow 50%, rgba(0,0,0,0) 50%)';
            }
            return <StarContainer key={index} style={style} />;
        })}
      </StarsContainer>
    </SkillContainer>
  );
};

export interface SkillProps {
  title: string,
  stars: StarsType,
  svg: () => JSX.Element,
}

export default Skill;