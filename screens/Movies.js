import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  useColorScheme,
} from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import { MOVIE_API_KEY } from "@env";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

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

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComming, setUpComming] = useState([]);
  const [trending, setTrending] = useState([]);
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
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <VMedia
              key={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      {upComming.map((movie) => (
        <HMedia
          key={movie.id}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          overview={movie.overview}
          releaseDate={movie.release_date}
        />
      ))}
    </Container>
  );
};

export default Movies;
