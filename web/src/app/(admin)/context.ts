import React, { createContext } from "react";
import { Partner } from "./admin/partners/page";
import { Category } from "./admin/categories/page";

export const PartnerContext = createContext<{
    partners: Partner[];
    setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
    getNextPartnerPage: (page: number, perPage: number) => void;
}>({
    partners: [],
    setPartners: (partners) => {},
    getNextPartnerPage: (page: number, perPage: number) => {},
});

export const CategoriesContext = createContext<{
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
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
