//Extend Request type to create an userId value on request.
declare namespace Express {
    export interface Request {
        userId: string
    }
}