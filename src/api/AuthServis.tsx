import axios, {AxiosResponse} from "axios";
import { TIngredientResponse } from "../services/types/types";
import { baseURL } from "../utils/burger-api";
import { getCookie } from "../utils/utils";

export default class AuthServis {

  static async postRegisterUser(email:string, password:string, userName:string) : Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.post<TIngredientResponse>(`${baseURL}auth/register`, {
      email: email,
      password: password,
      name: userName
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }));
  }

  static async postLoginUser(email:string, password:string) : Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.post<TIngredientResponse>(`${baseURL}auth/login`, {
      email: email,
      password: password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }));
  }

  static async getUserInfo() : Promise<TIngredientResponse>{
    return (await axios.get<TIngredientResponse>(`${baseURL}auth/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      }
    })).data;
  }

  static async patchChangeUserInfo(email:string, name:string, password:string) : Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.patch<TIngredientResponse>(`${baseURL}auth/user`, {
      email: email,
      password: password,
      name: name
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      }
    }));
  }
  static async postLogoutUser(refreshToken:string | null): Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.post<TIngredientResponse>(`${baseURL}auth/logout`, {
      token: refreshToken
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    }));
  }
  
  static async postUpdateToken(refreshToken:string | null): Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.post<TIngredientResponse>(`${baseURL}auth/token`, {
      token: refreshToken
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      }
    }));
  }
}

