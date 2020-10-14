import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  //Actors:
  getActors() {
    return this.http.get("/actors");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  //Movies:
  getMovies(){
    return this.http.get("/movies");
  }
  // httpOptions  is an object that specifies a set of options 
  //for the request such as the format of the body.
  //data is an object contains the Movie's details that 
  ///are collected from the UI elements.
  createMovie(data){
    return this.http.post("/movies",data, httpOptions)
  }
deleteMovie(id){
    let url = "/movies/"+ id;
    return this.http.delete(url,httpOptions)
}

deleteMovieBeforeYear(year){
  let url ="/deletemovsbyYear/"+ year;
  return this.http.delete(url,httpOptions)
}

// addActortoMovie(movid,actid){
//   let url ="/movies/"+movid+"/"+actid;
//   console.log(actid)
//   return this.http.post(url,httpOptions)
// }

addActortoMovie(movid,actid){
  let url ="/movies/"+movid+"/"+actid;
  console.log(actid)
  return this.http.put(url,httpOptions)
}



}
