export interface ITokenData {
    accessToken: string,
    refreshToken: string,
    user: {
        id: string;
        email: string
    }
}