
import { INLOADER } from "./authAction"
import { LOADER } from "./orderDetailsAction"
export const loader = () => {
  return{
    type: LOADER
  }
}
export const inLoader = () => {
  return{
    type: INLOADER
  }
}
