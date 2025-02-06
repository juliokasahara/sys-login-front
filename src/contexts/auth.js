import React,{createContext, use, useState} from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    async function login(username, email, telefone, password, matchingPassword) {

        setLoading(true);

        try{
            const response = await api.post('/user/save', {
                username: username,
                email: email,
                telefone: telefone,
                password: password,
                matchingPassword: matchingPassword
            })

            setLoading(false);
            navigation.goBack();
            console.log("Resposta da API:", response.data);
        } catch (error) {
            console.log("Erro desconhecido:", error);
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login , loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;