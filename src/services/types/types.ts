import { ReactNode } from "react";
import { TUser } from "../auth/auth-type";
import { TIngredient } from "../ingredients/ingredients-types";

export type TOrder = {
    createdAt: string;
    ingredients: (TIngredient | undefined)[];
    name: string;
    number: number;
    owner: TUser;
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
}
export type TOrderImage = {
    ingredients: (TIngredient | undefined)[] | undefined; 
    createdAt: string; 
    name: string; 
    number: number; 
    status: string; 
    updatedAt: number; 
    _id: string
}


export type TFeed = {
    createdAt: string;
    ingredients: TIngredient[] | undefined;
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}



export type TWsSocketMiddlewareActions = {
    wsInit: string;
    wsSendOrder: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
}


export type TOrderDetailsResponse = {
    name: string
    order: TOrder;
    success: boolean;
}
export type TOrderResponse = {
    number: number;
}
export type TIngredientResponse = {
    data: Array<TIngredient>;
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: TUser;
    message?: string;
    order: TOrderResponse;
}

export type TUserResponce = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
    message: string;
}

export type TUserLogoutResponse = {
    message: string;
    success: boolean;
    refreshToken: string;
}

export type TModal = {
    active: boolean;
    onClose: () => void;
    children: ReactNode;
    
}
export type TLoader = {
    children: React.ReactNode;
    loader: boolean;
}

export type TModalOverlay = {
    active: boolean;
    closePopup: () => void;
}