import { useDispatch } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"
import { allActionsCeaters } from "../actions-creators"

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(allActionsCeaters, dispatch )
}