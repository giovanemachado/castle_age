import useFinishMatch from "../../shared/useFinishMatch";

const Surrender = () => {
  const finishMatch = useFinishMatch();

  const handleClick = () => {
    finishMatch();
  };

  return (
    <button onClick={handleClick} className={"btn btn-error"}>
      Surrender
    </button>
  );
};

export default Surrender;
