import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import { Game } from "./game.model";

@Injectable({
  providedIn: 'root'
})
export class GameService{
  constructor(private http: HttpClient) {
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:5000/boards')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
