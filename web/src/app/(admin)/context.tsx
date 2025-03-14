import React, { createContext, useEffect } from "react";
import { Partner } from "./admin/partners/page";
import { Category } from "./admin/categories/page";
import { StoreData } from "./admin/store/columns";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { NotificationProps } from "@/components/admin/notifications/NotificationProps";
import { count } from "console";

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
                        name: location.name,
                        country: "country",
                        address: location.address,
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

// Notifications Context
export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "info" | "warning" | "error" | "request";
    date: string;
}

const NotificationsContext = createContext<{
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    getNextNotificationPage: (page: number, perPage: number) => void;
}>({
    notifications: [],
    setNotifications: (notifications: any) => {},
    getNextNotificationPage: (page: number, perPage: number) => {},
});
export const NotificationsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [notifications, setNotifications] = React.useState<Notification[]>(
        []
    );
    const getNextNotificationPage = (page: number, perPage: number) => {
        // Implement this function
    };

    useEffect(() => {
        const url =
            process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_GET_NOTIFICATIONS || "";

        axios
            .get(`${url}?page=${DEFAULT_PAGE}&per-page=${DEFAULT_PER_PAGE}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data.notifications.content;
                } else {
                    throw new Error("Failed to fetch notifications");
                }
            })
            .then((data) => {
                const notifications = data.map(
                    (notification: Notification) => ({
                        id: notification.id,
                        title: notification.title,
                        message: notification.message,
                        type: notification.type,
                        date: notification.date,
                    })
                );

                setNotifications(notifications);
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
        <NotificationsContext.Provider
            value={{ notifications, setNotifications, getNextNotificationPage }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};
export const useNotification = () => {
    return React.useContext(NotificationsContext);
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
