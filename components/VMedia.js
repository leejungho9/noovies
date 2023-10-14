import React from "react";
import styled from "styled-components";
import { useColorScheme } from "react-native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => (props.isDark ? "white" : "black")};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const VMedia = ({ posterPath, originalTitle, voteAverage }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title isDark={isDark}>
        {originalTitle.slice(0, 13)}
        {originalTitle.length > 13 && "..."}
      </Title>
      <Votes voteAverage={voteAverage} />
    </Movie>
  );
};

export default VMedia;
