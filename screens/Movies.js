import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text } from "react-native";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import { makeImgPath } from "../utills";
import { MOVIE_API_KEY } from "@env";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Title = styled.Text``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIE_API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
    console.log(MOVIE_API_KEY);
  };

  useEffect(() => {
    getNowPlaying();
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
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              blurRadius={3}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff60", // white의 alpha값 50%
              }}
            >
              <Title>{movie.original_title}</Title>
            </View>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
