import React from "react";
import styled from "styled-components";

const Vote = styled.Text`
  color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
`;

const Votes = ({ voteAverage }) => {
  return (
    <Vote>{voteAverage > 0 ? `⭐️ ${voteAverage} / 10` : `Coming soon`}</Vote>
  );
};

export default Votes;
