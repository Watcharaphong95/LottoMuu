// To parse this data:
//
//   import { Convert, UserLoginPost } from "./file";
//
//   const userLoginPost = Convert.toUserLoginPost(json);

export interface UserGoogleLoginPost {
    email:    string;
    money:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUserGoogleLoginPost(json: string): UserGoogleLoginPost {
        return JSON.parse(json);
    }

    public static userGoogleLoginPostToJson(value: UserGoogleLoginPost): string {
        return JSON.stringify(value);
    }
}
