// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';
// Components
import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesHomeComponent } from './pages/heroes-home/heroes-home.component';
import { ListComponent } from './pages/list/list.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ImageHeroPipe } from './pipes/image-hero.pipe';



@NgModule({
  declarations: [
    AddComponent, 
    SearchComponent, 
    HeroeComponent, 
    HeroesHomeComponent, 
    ListComponent, 
    HeroCardComponent, 
    ImageHeroPipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
