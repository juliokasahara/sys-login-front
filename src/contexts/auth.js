import React,{createContext, useState} from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    async function singUp(username, email, telefone, password, matchingPassword) {
        try{
            loading(true);
            const response = await api.post('/user/save', {
                username: username,
                email: email,
                telefone: telefone,
                password: password,
                matchingPassword: matchingPassword
            })

            loading(false);
            navigation.goBack();
            console.log("Resposta da API:", response.data);
        } catch (error) {
            loading(false);
            console.log("Erro desconhecido:", error);
        }
    }

    async function singIn(email, password) {

        try {
            loading(true);
            const response = await api.post('/auth/login', {
                email: email,
                password: password
            });

            console.log("Resposta da API:", response.data);
            const { email: userEmail, accessToken } = response.data.data;

            const data = {
                userEmail,
                accessToken,
            };

            api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

            setUser({
                userEmail,
                accessToken,
            })

            // navigation.navigate('Home');
        } catch (error) {
            loading(false);
            console.log("❌ Erro na requisição!");
        
            if (axios.isAxiosError(error)) {
                console.log("⚠️ Erro do Axios:", error.message);
        
                if (error.response) {
                    const { status, data, headers } = error.response;
                    
                    console.log("📡 Status HTTP:", status);
                    console.log("📄 Resposta do servidor:", JSON.stringify(data, null, 2));
                    console.log("🔍 Cabeçalhos da resposta:", headers);
        
                    if (data?.fieldErrors) {
                        Object.entries(data.fieldErrors).forEach(([campo, mensagem]) => {
                            console.log(`🚨 Erro no campo '${campo}': ${mensagem}`);
                        });
                    } else {
                        console.log("⚠️ Mensagem de erro:", data.message || "Erro desconhecido no servidor.");
                    }
                } else if (error.request) {
                    console.log("🕵️‍♂️ Sem resposta do servidor. A requisição foi feita, mas não houve retorno.");
                    console.log("📡 Detalhes da requisição:", error.request);
                } else {
                    console.log("❌ Erro inesperado:", error.message);
                }
            } else {
                loading(false);
                console.log("❌ Erro desconhecido:", error);
            }
        }
        
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, singIn, singUp , loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;