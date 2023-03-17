import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import { Game } from "./game.model";

@Injectable({
  providedIn: 'root'
})
export class GameService{
  private newBoard: string ="";
  constructor(private http: HttpClient) {
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:5000/boards')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  deleteGame(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete<Game>('http://localhost:5000/boards/'+id, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }
  saveGame(game: Game): Observable<Game>{
    this.newBoard=""
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const newGame = { name: game.name, board: game.board};
    for(let i = 0; i<game.board.length; i++){
      if(game.board[i]!==','){
       this.newBoard = this.newBoard+game.board[i]
      }
    }
    console.log('save')
    console.log({'name': game.name, 'board': this.newBoard})
    return this.http.post<Game>('http://localhost:5000/boards', {'name': game.name, 'board': this.newBoard}, { headers })
      .pipe(
        tap(data => console.log('createGame: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
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
