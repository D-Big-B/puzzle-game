import { useEffect, useRef, useState } from "react";
import puzzleInit from "../utils/puzzle";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Puzzle() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const puzzleRef = useRef();
  const overlayRef = useRef();
  const [level, setLevel] = useState(user?.level);
  const [time, setTime] = useState(new Date().getTime());
  useEffect(() => {
    puzzleInit(puzzleRef, overlayRef, level, time, dispatch, user?._id);
  }, []);
  console.log(user);

  const handleClose = () => {
    overlayRef.current.style.display = "none";
    window.location.href = "/";
  };
  return (
    <>
      <div className="main__puzzle" ref={puzzleRef}></div>
      <div className="puzzle__level"> Level : {user?.level}</div>
      <div ref={overlayRef} className="overlay">
        <div className="overlay__container">
          <span className="overlay__heading">Congratulations !</span>
          <p className="overlay__body">You Just Advanced Next Level.</p>
          <span className="overlay__smile">😊</span>
          <AiOutlineCloseCircle
            className="overlay__close"
            onClick={handleClose}
          />
        </div>
      </div>
    </>
  );
}
