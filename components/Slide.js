import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import styled from "styled-components";
import { makeImgPath } from "../utills";
import Poster from "./Poster";

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : "black")};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const OverView = styled.Text`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

const Votes = styled(OverView)`
  margin-top: 5px;
  font-size: 12px;
`;

const Slide = ({
  backdropPath,
  originalTitle,
  posterPath,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        blurRadius={20}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <View>
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 && <Votes> ⭐️ {voteAverage} / 10</Votes>}
            <OverView isDark={isDark}>{overview.slice(0, 90)}...</OverView>
          </Column>
        </Wrapper>
      </View>
    </View>
  );
};

export default Slide;
