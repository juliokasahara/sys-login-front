import React,{createContext, useState, useEffect} from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

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
        setLoading(false);
    }

    async function singIn(email, password) {

        try {
            setLoadingHome(true);
            
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
    
            setLoadingHome(false);  // 🔹 Certifica-se de desligar o loading

            // navigation.navigate('Home');
    
        } catch (error) {
            setLoadingHome(false); // 🔴 Agora sempre desativa o loading
        
            if (axios.isAxiosError(error)) {
                let errorMessage = "";
        
                if (error.response) {
                    const { data } = error.response;
        
                    if (data?.message) {
                        errorMessage += `⚠️ Mensagem: ${data.message}\n`;
                    }
        
                    // ✅ Ajuste para acessar corretamente fieldErrors
                    const fieldErrors = data?.data?.fieldErrors; 
                    if (fieldErrors) {
                        errorMessage += "\n🚨 Erros nos campos:\n";
                        Object.entries(fieldErrors).forEach(([campo, mensagem]) => {
                            errorMessage += `🔹 ${campo}: ${mensagem}\n`;
                        });
                    }
                } else if (error.request) {
                    errorMessage += "🕵️‍♂️ Sem resposta do servidor.";
                } else {
                    errorMessage += `❌ Erro inesperado: ${error.message}`;
                }
        
                alert(errorMessage);
            } else {
                alert(`❌ Erro desconhecido: ${error}`);
            }
        }
        
    }

    async function singOut() {  
        await AsyncStorage.clear().then(() => {
            setUser(null);
        })
    }

    async function recoverPassword(email) {
        try{
            alert(email)
            setLoading(true);
            // const response = await api.post('/user/save', {
            //     username: username,
            //     email: email,
            //     telefone: telefone,
            //     password: password,
            //     matchingPassword: matchingPassword
            // })

            // setLoading(false);
            // navigation.goBack();
            // console.log("Resposta da API:", response.data);
        } catch (error) {
            setLoading(false);
            console.log("Erro desconhecido:", error);
        }
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, singIn, singUp , singOut, recoverPassword, loading, loadingHome }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;