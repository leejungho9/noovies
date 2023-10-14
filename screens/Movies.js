import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, useColorScheme } from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import { MOVIE_API_KEY } from "@env";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
`;

const Title = styled.Text`
  color: ${(props) => (props.isDark ? "white" : "black")};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
`;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComming, setUpComming] = useState([]);
  const [trending, setTrending] = useState([]);
  const isDark = useColorScheme() === "dark";
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpComming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIE_API_KEY}&language=en-US&page=1`
      )
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 3,
          marginBottom: 20,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            originalTitle={movie.original_title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        style={{ flex: 1 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title isDark={isDark}>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 && "..."}
            </Title>
            {movie.vote_average > 0 && (
              <Votes> ⭐️ {movie.vote_average} / 10</Votes>
            )}
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};

export default Movies;
