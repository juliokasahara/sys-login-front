import { React } from "react";
import { Platform } from "react-native";

import { Background, Container, Logo, AreaInput, Input, SubmitButton ,SubmitText, Link , LinkText } from "./styles";

import { useNavigation } from "@react-navigation/native";

export default function SignIn() {

    const navigation = useNavigation();

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <Logo source={require("../../assets/Logo.png")} />
            
                <AreaInput>
                    <Input placeholder="Email"/>
                </AreaInput>
                <AreaInput>
                    <Input placeholder="Password"/>
                </AreaInput>

                <SubmitButton actveOpacity={0.8}>
                    <SubmitText>Access</SubmitText>
                </SubmitButton>
                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Create an account</LinkText>
                </Link>
            </Container>

        </Background>
    );
}