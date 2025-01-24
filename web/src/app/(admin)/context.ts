import { createContext } from "react";
import { Partner } from "./admin/partners/page";
import { Category } from "./admin/categories/page";

export const PartnerContext = createContext<{
    partners: Partner[];
    setPartners: (partners: Partner[]) => void;
    getNextPartnerPage: (page: number, perPage: number) => void;
}>({
    partners: [],
    setPartners: (partners: Partner[]) => {},
    getNextPartnerPage: (page: number, perPage: number) => {},
});

export const CategoriesContext = createContext<{
    categories: Category[];
    setCategories: (categories: Category[]) => void;
    getNextCategoryPage: (page: number, perPage: number) => void;
}>({
    categories: [],
    setCategories: (categories) => {},
    getNextCategoryPage: (page: number, perPage: number) => {},
});

export const UsersContext = createContext({
    users: {},
    setUsers: (users) => {},
    getNextUserPage: (page: number, perPage: number) => {},
});

export const StoresContext = createContext({
    stores: {},
    setStores: (stores) => {},
    getNextStorePage: (page: number, perPage: number) => {},
});
