import React,{createContext, useState, useEffect} from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingHome, setLoadingHome] = useState(true);

    const navigation = useNavigation();
    useEffect(() => {  
        
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@user');
 
            if (storageUser) {
                const token = storageUser.replace(/^"|"$/g, '');
                const response = await api.get('/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .catch(() => {
                    console.log("Erro ao tentar logar com o token do AsyncStorage");
                    setUser(null);
                })
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                console.log("🔐 Usuário logado:", response.data.data);
                setUser(response.data.data);
                setLoadingHome(false);
                
            }
            setLoadingHome(false);
        }
        loadStorage();
    }, []);

    async function singUp(username, email, telefone, password, matchingPassword) {
        try{
            setLoading(true);
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
            setLoading(false);
            console.log("Erro desconhecido:", error);
        }
    }

    async function singIn(email, password) {

        try {
            setLoading(true);
            
            const response = await api.post('/auth/login', {
                email: email,
                password: password
            });
    
            console.log("✅ Resposta da API:", response.data);
            const { email: userEmail, accessToken: token, username } = response.data.data;
    
            const data = {
                userEmail,
                username,
                token
            };
    
            // 🔹 Salva o usuário corretamente no AsyncStorage
            await AsyncStorage.setItem('@user', JSON.stringify(token));
    
            // 🔹 Configura o token nos headers da API
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
    
            // 🔹 Atualiza o estado do usuário
            setUser(data);
    
            setLoading(false);  // 🔹 Certifica-se de desligar o loading

            // navigation.navigate('Home');
    
        } catch (error) {
            setLoading(false);  // 🔴 Agora sempre desativa o loading
    
            console.log("❌ Erro na requisição!");
    
            if (axios.isAxiosError(error)) {
                console.log("⚠️ Erro do Axios:", error.message);
    
                if (error.response) {
                    console.log("📡 Status HTTP:", error.response.status);
                    console.log("📄 Resposta do servidor:", JSON.stringify(error.response.data, null, 2));
    
                    if (error.response.data?.fieldErrors) {
                        Object.entries(error.response.data.fieldErrors).forEach(([campo, mensagem]) => {
                            console.log(`🚨 Erro no campo '${campo}': ${mensagem}`);
                        });
                    } else {
                        console.log("⚠️ Mensagem de erro:", error.response.data.message || "Erro desconhecido no servidor.");
                    }
                } else if (error.request) {
                    console.log("🕵️‍♂️ Sem resposta do servidor.");
                } else {
                    console.log("❌ Erro inesperado:", error.message);
                }
            } else {
                console.log("❌ Erro desconhecido:", error);
            }
        }
        
    }

    async function singOut() {  
        await AsyncStorage.clear().then(() => {
            setUser(null);
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, singIn, singUp , singOut, loading, loadingHome }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;