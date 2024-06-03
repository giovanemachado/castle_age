"use client";

export type ShareCodeProps = {
  handleCancelMatch: () => void;
  matchCode: string;
};

export default function ShareCode({
  handleCancelMatch,
  matchCode,
}: ShareCodeProps) {
  return (
    <div className="hero h-full bg-base-100">
      <div className="hero-content flex-col">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">
            Share this Match code with your opponent:
          </h2>
          <h1 className="text-lg font-bold text-center">{matchCode}</h1>
          <button onClick={handleCancelMatch} className="my-4 btn btn-error">
            Cancel Match
          </button>
        </div>
      </div>
    </div>
  );
}
