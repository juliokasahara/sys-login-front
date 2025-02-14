import React from "react";
import { Container, Mensagem, Name, LogautButton, LogaoutText } from "./styles";

import { AuthContext } from "../../contexts/auth";

export default function Profile() {

    const { user, singOut } = React.useContext(AuthContext);

    return (
        <Container>

            <Mensagem>Perfil</Mensagem>
            <Name numberOfLines={1}>{user && user.username}</Name>

            <LogautButton onPress={() => singOut()}>
                <LogaoutText>Sair</LogaoutText>
            </LogautButton>

        </Container>
    );
}