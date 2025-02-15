import React, {useContext, useState} from "react";
import { Platform, ActivityIndicator } from "react-native";

import {  Background, Container, AreaInput, Input, SubmitButton,SubmitText} from "../SignIn/styles";

import { AuthContext } from "../../contexts/auth";

export default function SingUp() {

    const { singUp, loading }  = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [password, setPassword] = useState('');
    const [matchingPassword, setMatchingPassword] = useState('');

    function handleSingUp() {
        if(username === '' || email === '' || telefone === '' || password === '' || matchingPassword === '') {
            return;
        }
        singUp(username, email, telefone, password, matchingPassword);
    }

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>

                <AreaInput>
                    <Input value={username} placeholder="Nome" onChangeText={(text) => setUsername(text)}/>
                </AreaInput>
                <AreaInput>
                    <Input value={email} placeholder="Email" onChangeText={(text) => setEmail(text)}/>
                </AreaInput>
                <AreaInput>
                    <Input value={telefone} placeholder="Telefone" onChangeText={(text) => setTelefone(text)}/>
                </AreaInput>
                <AreaInput>
                    <Input value={password} placeholder="Senha" onChangeText={(text) => setPassword(text)} secureTextEntry={true}/>
                </AreaInput>
                <AreaInput>
                    <Input value={matchingPassword} placeholder="Confirma senha" onChangeText={(text) => setMatchingPassword(text)} secureTextEntry={true}/>
                </AreaInput>

                <SubmitButton actveOpacity={0.8} onPress={handleSingUp}>
                        {loading ? (
                            <ActivityIndicator size={20} color="#FFF"/>
                        ) : (
                            <SubmitText>Create</SubmitText>
                        )}
                </SubmitButton>
            </Container>
        </Background>
    );
}