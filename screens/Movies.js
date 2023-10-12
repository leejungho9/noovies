import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Header = styled.View``;
const Column = styled.View``;
const Footer = styled.View``;

const Movies = ({ navigation: { navigate } }) => (
  <Header>
    <Column>
      <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
        <Title>Movies</Title>
      </Btn>
    </Column>
    <Footer></Footer>
  </Header>
);

// const styles = StyleSheet.create({
//   btn: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
// ! 아직 js 코드 , 우리는 css 코드를 작성하는데 익숙하기 때문에 어려움이 있음
// ! align-items 의 경우 alignItems 로 작성해야함, 이를 해결하기 위해 styled-component 사용

export default Movies;
