import Typography from "./Typography";

const Title = (props: TitleProps) => {
  const hrStyle: React.CSSProperties = {
    margin: 'var(--container-padding) 0',
    height: '3px',
    backgroundColor: 'var(--light-color)',
  }
  
  return (
    <>
      <Typography variant="title" textAlign="center">{props.label}</Typography>
      <hr style={hrStyle} />
    </>
  );
};

interface TitleProps {
  label: string,
}

export default Title;