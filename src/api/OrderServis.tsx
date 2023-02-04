import axios, {AxiosResponse} from "axios";
import { TIngredientResponse } from "../services/types/types";
import { baseURL} from "../utils/burger-api";
import { getCookie } from "../utils/utils";

export default class OrderServis {
  static async postOrder(id: string[]): Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.post<TIngredientResponse>(`${baseURL}orders`, {
      ingredients: id
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      }
    }));
  }
}