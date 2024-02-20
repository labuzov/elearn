import { create } from 'zustand';
import { authLogin, authLogout, authRefresh } from '@Api/authApi';


type AuthStore = {
    isAuth: boolean;
    token: string | null;
    login: (id: string, login: string, password: string) => Promise<void>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
    clear: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    isAuth: false,
    token: null,

    login: async (id: string, login: string, password: string) => {
        const { data } = await authLogin(id, login, password);

        set({ token: data.token, isAuth: true });
    },

    refresh: async () => {
        const { data } = await authRefresh();

        set({ token: data.token, isAuth: true });
    },

    logout: async () => {
        await authLogout();

        get().clear();
    },

    clear: () => {
        set({ token: null, isAuth: false });
    }
}));
