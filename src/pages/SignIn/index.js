import  React, {useState,useContext} from "react";
import { Platform } from "react-native";

import { Background, Container, Logo, AreaInput, Input, SubmitButton ,SubmitText, Link , LinkText } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
    const navigation = useNavigation();
    const { singIn, loading } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
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
                        onChangeText={ (text) => setPassword(text) }
                    />
                </AreaInput>

                <SubmitButton actveOpacity={0.8} onPress={handleLogin}>  
                    <SubmitText>Access</SubmitText>
                </SubmitButton>

                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Create an account</LinkText>
                </Link>
            </Container>

        </Background>
    );
}