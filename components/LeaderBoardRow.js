export default function LeaderBoardRow({ ranking, image, name, level }) {
  return (
    <div className="leaderBoard__row">
      <span className="leaderBoard__row__ranking">{ranking}</span>
      <span className="leaderBoard__row__image">
        <img src={image} alt={name}></img>
      </span>
      <span className="leaderBoard__row__name">{name}</span>
      <span className="leaderBoard__row__level">Level : {level}</span>
    </div>
  );
}
