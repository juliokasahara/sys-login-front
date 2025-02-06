import React,{createContext, use, useState} from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [user, setUser] = useState({
        name: "Lucas",
    });

    const navigation = useNavigation();

    async function login(username, email, telefone, password, matchingPassword) {

        try{
            const response = await api.post('/user/save', {
                username: username,
                email: email,
                telefone: telefone,
                password: password,
                matchingPassword: matchingPassword
            })
            navigation.goBack();
            console.log("Resposta da API:", response.data);
        } catch (error) {
            console.log("Erro desconhecido:", error);
          if (axios.isAxiosError(error)) {
            console.log("Erro Axios:", error.message);
            console.log("Detalhes:", error.response ? error.response.data : "Sem resposta do servidor");
          } else {
            console.log("Erro desconhecido:", error);
          }
        }
    }

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;