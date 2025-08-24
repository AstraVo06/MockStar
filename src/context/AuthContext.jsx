import {createContext, useContext, useState, useEffect} from 'react';
import {supabase } from '../supabaseClient';
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    // Sign up
    const signUp = async (email, password) => {
        const { data,error} = await supabase.auth.signUp({
        email: email,
        password: password,      
    });

    if(error) {
        console.error('There was a problem signing up:', error);
        return {success: false, error};
    }
    return {success: true, data};
    };

    // Sign in

    const signIn = async (email, password)=> {
    try {
        const {data, error} = await supabase.auth.signIn({
            email: email,
            password: password,
        });

        if (error) {
            console.error ('Sign in error occurred:', error);
            return {sucess:false, error: error.message};
    }
        console.log('Sign in successful:', data);
        return {success: true, data};
    } catch (error) {
            console.error('an error occurred:',error);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        })
    }, []);

    //Sign out

    const signOut= () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error('There was a problem signing out:', error);

        }
    };


    return (
        <AuthContext.Provider value={{ session, signUp, signOut, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};