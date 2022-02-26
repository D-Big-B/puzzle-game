import React, { useRef } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/actions/authActions";

import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Timer() {
  const overlayRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleUpdate = () => {
    dispatch(updateUser(user?.level, 240000, user?._id));
  };
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      if (user) {
        handleUpdate();
      }

      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="puzzle__timer">
          {minutes < 10 ? `0${minutes}` : minutes} :{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );
    }
  };
  const handleClose = () => {
    window.location.href = "/";
  };
  const Completionist = () => {
    overlayRef.current.style.display = "block";
    return <></>;
  };

  return (
    <>
      <Countdown date={Date.now() + 240000} renderer={renderer} />
      <div ref={overlayRef} className="overlay">
        <div className="overlay__container">
          <span className="overlay__heading">Oops !</span>
          <p className="overlay__body">
            You failed to solve the puzzle in time.
          </p>
          <span className="overlay__smile">😔</span>

          <AiOutlineCloseCircle
            className="overlay__close"
            onClick={handleClose}
          />
        </div>
      </div>
    </>
  );
}
