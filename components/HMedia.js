import React from "react";
import styled from "styled-components";
import Poster from "./Poster";
import { useColorScheme } from "react-native";

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const OverView = styled.Text`
  color: ${(props) => (props.isDark ? "white" : "black")};
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: ${(props) => (props.isDark ? "white" : "black")};
  font-size: 12px;
  margin-vertical: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text`
  color: ${(props) => (props.isDark ? "white" : "black")};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const HMedia = ({ posterPath, originalTitle, overview, releaseDate }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <HMovie>
      <Poster path={posterPath} />
      <HColumn>
        <Title isDark={isDark}>{originalTitle}</Title>
        <Release>{new Date(releaseDate).toLocaleDateString("ko")}</Release>
        <OverView isDark={isDark}>
          {overview !== "" && overview.length > 140
            ? `${overview.slice(0, 140)}...`
            : overview}
        </OverView>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;
