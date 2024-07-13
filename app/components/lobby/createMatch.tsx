export type CreateMatchProps = {
  handleCreateMatch: () => void;
  handleJoinMatch: () => void;
  onChangeInput: (value: string) => void;
};

export default function CreateMatch({
  handleCreateMatch,
  handleJoinMatch,
  onChangeInput,
}: CreateMatchProps) {
  return (
    <div className="hero h-full bg-base-100">
      <div className="hero-content flex-col">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">Create a new Match.</h1>
          <button onClick={handleCreateMatch} className="btn btn-primary">
            Create
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-center">
            Or join a Match with a Match Code.
          </h1>
          <div className="join">
            <input
              className="input input-bordered join-item"
              placeholder="Match code"
              onChange={(v) => onChangeInput(v.target.value)}
            />
            <button
              onClick={handleJoinMatch}
              className="btn btn-primary join-item rounded-r-full"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
