import useFinishMatch from "../../shared/useFinishMatch";

const Surrender = () => {
  const finishMatch = useFinishMatch();

  const handleClick = () => {
    finishMatch();
  };

  return (
    <button onClick={handleClick} className={"btn btn-error text-base w-full"}>
      Surrender
    </button>
  );
};

export default Surrender;
