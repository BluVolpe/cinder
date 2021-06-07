import React, {useState, useEffect} from "react";
import { Header, Message } from "semantic-ui-react";
import "../styles/style.css";
import { useSelector } from "react-redux";

export const RecommendedMovies = (props) => {

  let [movies, setMovies] = useState([]);
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
  const currentUser = useSelector(state=>state.auth.currentUser);
  const token = useSelector(state=>state.auth.token);

  useEffect(() => {
    if (currentUser) {
      let url = "http://localhost:3001/user/recommended/"+currentUser._id;

      fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data.recommendedMovies);
      });
    }
  }, [currentUser])

  return (
    <>
      <Message className="message-container" size="huge" secondary="true">
        <Header size="huge"> Recommended Movies </Header>
        <h1></h1>
      </Message>
      {(() => {
        if (movies.length > 0) {
          console.log(movies);
          return (
            <div>
              <img src={movies[0].Poster} />
              <p>{movies[0].Title}</p>
            </div>
          )
        } else {
          return (<p>You have no recommended movies!</p>)
        }
      })()}
    </>
  );
};

export default RecommendedMovies;