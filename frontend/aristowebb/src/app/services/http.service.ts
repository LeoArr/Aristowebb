import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class HttpService implements CanActivate {
    path: import("@angular/router").ActivatedRouteSnapshot[];
    route: import("@angular/router").ActivatedRouteSnapshot;
    apiUrl = environment.apiUrl;
    headers: HttpHeaders;

    constructor(private http: HttpClient,
                private router: Router) { }

    // post(post: Post): Observable<boolean> {
    //     let token = localStorage.getItem(environment.localStorageKey);
    //     return this.http.post<ApiResponse>(this.apiUrl + '/post', post,
    //     { headers: { 
    //         Authorization: token,
    //         'Content-Type': 'application/json'
    //     }}).pipe(
    //         map((result: ApiResponse) => {
    //             return result.success;
    //         })
    //     );
    // }

    // put(post: Post): Observable<boolean> {
    //     let token = localStorage.getItem(environment.localStorageKey);
    //     return this.http.put<ApiResponse>(this.apiUrl + '/post', post,
    //     { headers: { 
    //         Authorization: token,
    //         'Content-Type': 'application/json'
    //     }}).pipe(
    //         map((result: ApiResponse) => {
    //             return result.success;
    //         })
    //     );
    // }
    
    // delete(postId: number): Observable<boolean> {
    //     let token = localStorage.getItem(environment.localStorageKey);
    //     return this.http.delete<ApiResponse>(this.apiUrl + '/post/' + postId,
    //     { headers: { 
    //         Authorization: token,
    //         'Content-Type': 'application/json'
    //     }}).pipe(
    //         map((result: ApiResponse) => {
    //             return result.success;
    //         })
    //     );
    // }

    // getPost(id: number): Observable<Post> {
    //     return this.http.get<ApiResponse>(this.apiUrl + '/post/' + id,
    //         { headers: { 
    //             'Content-Type': 'application/json'
    //         }}).pipe(
    //             map(response => {
    //                 if (response.success) {
    //                     return <Post> response.data
    //                 } else {
    //                     return undefined;
    //                 }
    //             })
    //         );
    // }

    // getPosts(): Observable<Post[]> {
    //     return this.http.get<ApiResponse>(this.apiUrl + '/post', 
    //         { headers: { 
    //             'Content-Type': 'application/json'
    //         }
    //     }).pipe(
    //         map((response: ApiResponse) => {
    //             if (response.success) {
    //                 return <Post[]> response.data
    //             } else {
    //                 return [];
    //             }
    //         })
    //     );
    // }

    authenticate(password: string): Observable<string> {
        return this.http.get<ApiResponse>(this.apiUrl + '/authenticate',
            { headers: { 
                Authorization: password,
                'Content-Type': 'application/json'
            }}).pipe(
                map((result: ApiResponse) => {
                    if (result.success) 
                        return result.data;
                    return '';
            }));
    }

    isAuthenticated(): Observable<boolean> {
        let token = localStorage.getItem(environment.localStorageKey);
        if (!token) return of(false);
        return this.http.get<ApiResponse>(this.apiUrl + '/is-authenticated',
            { headers: { 
                Authorization: token,
                'Content-Type': 'application/json'
            }}).pipe(
                map(((result: ApiResponse) => result.success))
            );
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.isAuthenticated().pipe(
            map(result => {
                if (result) {
                    return true;
                } else {
                    this.router.navigate(['']);
                    return false
                }
            }),
            catchError((err) => {
                this.router.navigate(['']);
                return of(false);
            })
          );
    }  
}