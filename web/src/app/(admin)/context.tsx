import React, { createContext, useEffect } from "react";
import { Partner } from "./admin/partners/page";
import { Category } from "./admin/categories/page";
import { StoreData } from "./admin/store/columns";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

// Partners Context
const PartnerContext = createContext<{
    partners: Partner[];
    setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
    getNextPartnerPage: (page: number, perPage: number) => void;
}>({
    partners: [],
    setPartners: (partners) => {},
    getNextPartnerPage: (page: number, perPage: number) => {},
});
export const PartnersProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [partners, setPartners] = React.useState<Partner[]>([]);
    const getNextPartnerPage = (page: number, perPage: number) => {
        // Implement this function
    };

    // Get partners
    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_GET_BUSINESSES;
        axios
            .get(`${url}?page=${DEFAULT_PAGE}&per-page=${DEFAULT_PER_PAGE}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data.partners.content;
                } else {
                    throw new Error("Error fetching partners");
                }
            })
            .then((data) => {
                console.log(data);

                const partners = data.map((partner: any) => ({
                    id: partner.id,
                    name: partner.name,
                    category: partner.businessCategory,
                    status: partner.status ? "active" : "inactive",
                    joinedDate: new Date(
                        partner.createdAt
                    ).toLocaleDateString(),
                    locations: partner.locations.map((location: any) => ({
                        id: location.id,
                        city: "city",
                        stateOrProvince: "state",
                        country: "country",
                        googleMapsUrl: "url",
                    })),
                }));

                setPartners(partners);
            })
            .catch((error) => {
                console.error("Error fetching partners:", error);
                toast.error("Error fetching partners", {
                    duration: 5000,
                    style: {
                        background: "#17222D",
                        color: "#FFF",
                    },
                });
            });
    }, []);

    return (
        <PartnerContext.Provider
            value={{ partners, setPartners, getNextPartnerPage }}
        >
            {children}
        </PartnerContext.Provider>
    );
};
export const usePartner = () => {
    return React.useContext(PartnerContext);
};

// Categories Context
const CategoriesContext = createContext<{
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    getNextCategoryPage: (page: number, perPage: number) => void;
}>({
    categories: [],
    setCategories: (categories) => {},
    getNextCategoryPage: (page: number, perPage: number) => {},
});

export const CategoriesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const getNextCategoryPage = (page: number, perPage: number) => {
        // Implement this function
    };

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_CATEGORIES || "";

        axios
            .get(`${url}?page=${DEFAULT_PAGE}&per-page=${DEFAULT_PER_PAGE}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data.categories.content;
                } else {
                    throw new Error("Failed to fetch categories");
                }
            })
            .then((data) => {
                const categories = data.map((category: any) => ({
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    icon: FaSearch,
                    partnersCount: category.partnersCount,
                    status: category.status,
                }));

                setCategories(categories);
            })
            .catch((error) => {
                toast.error(error.message, {
                    duration: 5000,
                    style: {
                        background: "#17222D",
                        color: "#FFF",
                    },
                });
            });
    }, []);

    return (
        <CategoriesContext.Provider
            value={{ categories, setCategories, getNextCategoryPage }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};
export const useCategory = () => {
    return React.useContext(CategoriesContext);
};

// Users Context
export const UsersContext = createContext({
    users: {},
    setUsers: (users: any) => {},
    getNextUserPage: (page: number, perPage: number) => {},
});

// Stores Context
export const StoresContext = createContext<{
    stores: StoreData[];
    setStores: React.Dispatch<React.SetStateAction<StoreData[]>>;
    getNextStorePage: (page: number, perPage: number) => void;
}>({
    stores: [],
    setStores: (stores) => {},
    getNextStorePage: (page: number, perPage: number) => {},
});
