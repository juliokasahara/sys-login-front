import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #F0F4FF;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    margin-bottom: 25px;
`;

export const AreaInput = styled.View` 
    flex-direction: row;
`;

export const Input = styled.TextInput`
    background-color: #FFF;
    width: 90%;
    font-size: 17px;
    padding: 10px;
    border-radius: 8px;
    color: #121212;
    margin-bottom: 15px;
`;  

export const SubmitButton = styled.TouchableOpacity`
    width: 90%;
    height: 45px;
    border-radius: 8px;
    background-color: #3d3dbf;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const SubmitButtonGreen = styled.TouchableOpacity`
    width: 90%;
    height: 45px;
    border-radius: 8px;
    background-color:rgb(29, 255, 9);
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const SubmitText = styled.Text`
    color: #FFF;
    font-size: 20px;
`;  

export const Link = styled.TouchableOpacity`
    margin-top: 5px;
    margin-bottom: 9px;
`;

export const LinkText = styled.Text`
    color: #171717;
`;

