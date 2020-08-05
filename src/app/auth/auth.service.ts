import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{

    constructor(private http: HttpClient){}

    signup(email: string, password: string){
       return  this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYhguNOr1KmR43Zl_ixAb-2uMwuM8zdkU',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handlerError));

    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYhguNOr1KmR43Zl_ixAb-2uMwuM8zdkU',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handlerError));
    }

    private handlerError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'this email does no exists!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'this password is not correct!';
                break;
            case 'USER_DISABLED':
                errorMessage = 'this user disable!';
                break;
           
        }

        return throwError(errorMessage);
    }

}