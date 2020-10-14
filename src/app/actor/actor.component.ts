import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";


@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  //Actor:
  fullName: string = "";
  bYear: number = 0;
  //Movie:
  title: string = "";
  year: number=0;
  aYear: number=0
  section = 1;
  //‘actorsDB’ is an array that is declared in the actor.component.ts and contains all the actors retrieved by the GET request.
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  actorId = "";
  movieId = "";

  constructor(private dbService: DatabaseService) { }
  //This function is invoked by four buttons represent the navigation bar of the application. 
  //Each button will send to the ‘changeSection()‘ function a unique number between 1..4 represents the section we intend to make visible.
  changeSection(sectionId) {
    this.section = sectionId;
  }

  //ACTOR:
  //to get all the actors and save them into actorsDB, 
  //this function will invoke getActors function which is developed earlier in the database service:
  //Get All Actors:
  onGetActors() {
    //the output of getActors is observable and we have to subscribe to get the method executed.
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
//It also has a button that invokes a method named ‘onSaveActor()’, 
//which will be responsible for calling the database service function ‘createActor()’
//Create a new Actor, POST request:
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //UPDATE an Actor:
  //The ‘update‘ button invokes a method named ‘onSelectUpdate‘ 
  //that takes as input the selected actor object and extracts
  //its details into global variables to be used later by the onUpdateActor method.
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

//MOVIES:
onGetMovies() {
  //the output of getMovies is observable and we have to subscribe to get the method executed.
  this.dbService.getMovies().subscribe((data: any[]) => {
    this.moviesDB = data;
  });
}

//Create a new Actor, POST request:
onSaveMovie() {
  let obj = { title: this.title, year: this.year };
  this.dbService.createMovie(obj).subscribe(result => {
    this.onGetMovies();
  });
}

onDeleteMovie(item) {
  this.dbService.deleteMovie(item._id).subscribe(result => {
    this.onGetMovies();
  });
}

onDeleteMoviesBeforeYear(){
  this.dbService.deleteMovieBeforeYear(this.aYear).subscribe(result => {
    this.onGetMovies();
  });
}

onAddActorToMovie(){
  this.dbService.addActortoMovie(this.movieId,this.actorId).subscribe(result => {
    this.onGetMovies();
    console.log(this.actorId)
});
}
 




  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }





  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();

  }

}
