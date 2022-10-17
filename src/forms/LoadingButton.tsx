const LoadingButton = (props: LoadingButtonProps) => {

  if (props.isLoading) {
    return <div className="loading-spinner"></div>
  };

  return (
    <button className="loading-button">
      {props.label}
    </button>
  );
};

interface LoadingButtonProps {
  isLoading: boolean,
  label: string,
};

LoadingButton.defaultProps = {
  isLoading: false,
};

export default LoadingButton;