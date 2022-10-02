import Page from "../Layout/Page";
import Typography from "../utils/Typography";
import styled from 'styled-components';

const ImageAndTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 75px;

  > * {
    width: 45%;
  }
  span {
    width: 100%;
  }
  img {
    max-width: 300px;
    border-radius: 5px;
  }

  @media (max-width: 655px) {
    flex-direction: column;
    align-items: center;
    * {
      width: 100%;
    }
    img {
      padding-bottom: var(--container-padding);
    }
  }
`;

const LandingPage = () => {
  return (
    <Page>
      <Typography variant="title" textAlign="center">About Elias Proctor</Typography>
      <ImageAndTextContainer>
        <img src="/selfie.jpg" alt="Portrait" />
        <div className="center">
          <Typography variant="body" textAlign="center">
            Hello, my name is Elias Proctor. I fell in love with programming in college, and the love hasn't stopped
            since. Currently, I work as a software developer at Paycom, and I also enjoy programming in my free time.
            I created this website using C# ASP.NET core for the backend, and React with Typescript for the frontend.
          </Typography>
        </div>
      </ImageAndTextContainer>
    </Page>
  )
};

export default LandingPage;