import axios, {AxiosResponse} from "axios";
import { TIngredientResponse } from "../services/types/types";
import { baseURL} from "../utils/burger-api";

export default class IngredientServis {
  static async getIngredient() : Promise<AxiosResponse<TIngredientResponse>>{
    return (await axios.get<TIngredientResponse>(`${baseURL}ingredients`));  
  }
}

