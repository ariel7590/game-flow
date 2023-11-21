import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignUpPayload } from "./users.types";
import { localAPI, usersRoute } from "../routeUrls";

export const signUpThunk=createAsyncThunk<unknown,SignUpPayload, {rejectValue: SerializedError }>(
    'users/signup',
    async (user: SignUpPayload,thunkAPI)=>{
        try{
            console.log(user);
            const response= await axios({
                method: 'post',
                url: localAPI+usersRoute+'signup',
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials: true,
                data: JSON.stringify(user),
            })

            return thunkAPI.fulfillWithValue(response.data);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(err: any){
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    }
)