import  React, {useState,useContext} from "react";
import { Platform } from "react-native";

import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitButtonGreen ,SubmitText, Link , LinkText } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
    const navigation = useNavigation();
    const { singIn, loading } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if(email === '', password === '') {
            return;
        }
        singIn(email, password);
    }


    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <Logo source={require("../../assets/Logo.png")} />
            
                <AreaInput>
                    <Input 
                        placeholder="Email" 
                        value={email} 
                        onChangeText={ (text) => setEmail(text) }
                    />
                </AreaInput>
                <AreaInput>
                    <Input 
                        placeholder="Password" 
                        value={password} 
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButtonGreen actveOpacity={0.8} onPress={handleLogin}>  
                    <SubmitText>Entrar</SubmitText>
                </SubmitButtonGreen>

                <SubmitButton actveOpacity={0.8} onPress={() => navigation.navigate('SignUp')}>  
                    <SubmitText>Criar conta</SubmitText>
                </SubmitButton>

                <Link onPress={() => navigation.navigate('RecoverPassword')}>
                    <LinkText>Esquecia senha</LinkText>
                </Link>

            </Container>

        </Background>
    );
}