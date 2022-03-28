import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';
import {APIService, Restaurant} from "../API.service";

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit, OnDestroy {

  public createForm: FormGroup; // Formularios reactivos

   /* declare restaurants variable */
   public restaurants: Array<Restaurant> = [];

   private subscription: Subscription | null = null;

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  async ngOnInit() {
    
    /* fetch restaurants when app loads */
    this.api.ListRestaurants().then((event) => {
      this.restaurants = event.items as Restaurant[];
    });

    /* subscribe to new restaurants being created */
    this.subscription = <Subscription>(
      this.api.OnCreateRestaurantListener.subscribe((event: any) => {
        const newRestaurant = event.value.data.onCreateRestaurant;
        this.restaurants = [newRestaurant, ...this.restaurants];
      })
    );

  }

  public onCreate(restaurant: Restaurant) {
    this.api
      .CreateRestaurant(restaurant)
      .then((event) => {
        console.log("item created!");
        this.createForm.reset();
      })
      .catch((e) => {
        console.log("error creating restaurant...", e);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

}
