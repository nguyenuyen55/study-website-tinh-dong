import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ["favorite-button.component.scss"]
})

export class FavoriteButtonComponent implements OnInit {  
  @Input() favorite = false; 
  constructor(){}
  ngOnInit(): void {
  } 
  toggleFavorite() { 

  }
} 