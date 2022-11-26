import { useEffect } from "react";
import { useDispatch} from 'react-redux';
import { getUserData } from "../redux/features/auth/authSlice";

export default function useAuth()
{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserData());
      }, [dispatch]);
}
