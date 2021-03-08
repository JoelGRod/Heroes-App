import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  constructor(private activated_route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activated_route.params.subscribe(
      ({id}) => console.log(id)
    );
  }

}
