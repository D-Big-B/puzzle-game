import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, login } from "../store/actions/authActions";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleLoginClick = () => {
    dispatch(login());
  };
  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <Head>
        <title>Home | Puzzle Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="home">
        {auth?.loading ? (
          <p>Loading ....</p>
        ) : (
          <>
            {auth?.authenticated ? (
              <>
                <Link href="/leaderBoard" passHref>
                  <div className="home__leaderBoard">Leader Board</div>
                </Link>
                <div className="home__level">Level : {auth?.user?.level}</div>
                <div className="home__welcome">
                  Welcome !
                  <img
                    className="home__image"
                    src={auth?.user?.image}
                    alt={auth?.user?.displayName}
                  />
                </div>
                <div className="home__logout" onClick={handleLogoutClick}>
                  Logout
                </div>
              </>
            ) : (
              <div className="home__login" onClick={handleLoginClick}>
                Login
              </div>
            )}

            <Link href="/game" passHref>
              <div className="home__button">Play !</div>
            </Link>
          </>
        )}
      </section>
    </>
  );
}
