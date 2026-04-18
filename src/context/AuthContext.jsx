import { createContext, useState, useContext } from "react";



const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const x = localStorage.getItem("currentUser");
    const [user, setUser] = useState(x ? x : null);


    function signup(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || []);
        
        if (users.find(u => u.email === email)) {
            return {success: false, message: "Email already exists"};
        }
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", email);
        setUser(email);

        return {success: true, message: "User created successfully"};
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || []);

        if (users.find(u => u.email === email && u.password === password)) {
            setUser(email);
            localStorage.setItem("currentUser", email);
            return {success: true, message: "Logged in successfully"};
        }

        return {success: false, message: "Invalid email or password"};
    }

    function logout() {
        localStorage.removeItem("currentUser");
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{signup, login, user, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}