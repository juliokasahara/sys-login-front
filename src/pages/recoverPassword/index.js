import React, {useContext, useState} from "react";
import { Platform, ActivityIndicator } from "react-native";

import {  Background, Container, AreaInput, Input, SubmitButton,SubmitText} from "../SignIn/styles";

import { AuthContext } from "../../contexts/auth";

export default function RecoverPassword() {

    const { recoverPassword, loading }  = useContext(AuthContext);
    const [email, setEmail] = useState('');

    function recover() {
        if(email === '') {
            return;
        }
        recoverPassword(email);
    }

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>

                <AreaInput>
                    <Input value={email} placeholder="Email" onChangeText={(text) => setEmail(text)}/>
                </AreaInput>

                <SubmitButton actveOpacity={0.8} onPress={recover}>
                        {loading ? (
                            <ActivityIndicator size={20} color="#FFF"/>
                        ) : (
                            <SubmitText>Enviar chave</SubmitText>
                        )}
                </SubmitButton>
            </Container>
        </Background>
    );
}