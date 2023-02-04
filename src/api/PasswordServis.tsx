import axios, {AxiosResponse} from "axios";
import { TIngredientResponse } from "../services/types/types";
import { baseURL} from "../utils/burger-api";

export default class PasswordServis {
  static async postResetPasswordEmail(email: string): Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.post<TIngredientResponse>(`${baseURL}password-reset`, {
      email: email
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }));
  }
  static async postresetPassword(password:string, code:string | any): Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.post<TIngredientResponse>(`${baseURL}password-reset/reset`, {
      password: password,
      token: code
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }));
  }
}