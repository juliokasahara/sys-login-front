import styled from "styled-components";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #F0F4FF;
    align-items: center;
`;

export const Mensagem = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-top: 24px;
`;

export const Name = styled.Text`
    font-size: 24px;
    margin-bottom: 24px;
    margin-top: 8px;
    padding: 0 14px;
    color: #121212;
`;

export const LogautButton = styled.TouchableOpacity`
    width: 90%;
    height: 45px;
    border-radius: 8px;
    padding: 8px 16px;
    align-items: center;
    border-width: 1px;
    border-color: #F00;
    justify-content: center;
    margin-bottom: 12px;
`;

export const LogaoutText = styled.Text`
    color: #F00;
    font-size: 18px;
    font-weight: bold;
`;