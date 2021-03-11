import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
// RXJS
import { switchMap } from 'rxjs/operators';
// Interfaces
import { Hero, Publisher } from '../../interfaces/heroes.interface';
// Services
import { HeroesService } from '../../services/heroes.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
    .hero-img {
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
    id: ''
  }

  constructor(private activated_route: ActivatedRoute,
              private heroes_service: HeroesService,
              private router: Router,
              private _snackbar: MatSnackBar,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activated_route.params
    .pipe(switchMap(({id}) => this.heroes_service.get_heroe(id)))
    .subscribe( (hero: Hero) => this.hero = hero );
  }

  save_hero() {
    if(this.hero.superhero.trim().length === 0) return;

    if(this.hero.id === '') {
      this.heroes_service.add_hero(this.hero).subscribe(
        (hero: Hero) => {
          // Snackbar
          this.open_snackbar(`${hero.superhero} Added`);
          this.router.navigate(['/heroes/edit', hero.id]);
        }
      );
    } else {
      this.heroes_service.modify_hero(this.hero).subscribe(
        (hero: Hero) => {
          // Snackbar
          this.open_snackbar(`${hero.superhero} Modified`);
        }
      );
    }
  }

  delete_hero() {
    // Dialog
    const dialog = this._dialog.open(DialogComponent, {
      width: '50vw',
      data: {...this.hero}
    });

    // Option I: Classic
    // dialog.afterClosed().subscribe(resp => {
    //   if( resp ) {
    //     this.heroes_service.delete_hero(this.hero.id!).subscribe(
    //       resp => this.router.navigate(['heroes/list'])
    //     );
    //   }
    // });

    // Option II: Switch map example
    dialog.afterClosed()
    .pipe(
      switchMap( resp => resp ? this.heroes_service.delete_hero(this.hero.id!) : empty()))
    .subscribe(
      resp => this.router.navigate(['heroes/list'])
    );
  }

  open_snackbar(msg: string): void {
    this._snackbar.open(msg, 'Agree', {
      duration: 2500
    });
  }

}
