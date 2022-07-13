export interface IToken {
    accessToken: string,
    refreshToken: string,
    user: {
        id: string;
        email: string
    }
}