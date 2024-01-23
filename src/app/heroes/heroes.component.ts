import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';
import { InMemoryDataService } from '../in-memory-data.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroDetailComponent, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  selectedHero?: Hero;
  heroes!: Hero[];

  constructor(
    private heroService: HeroService,
    private inMemoryService: InMemoryDataService,
  ) {}

  getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  addHero(heroNameInput: HTMLInputElement) {
    const heroName = heroNameInput.value.trim();
    if (!heroName) {
      return;
    }

    heroNameInput.value = '';
    const heroId = this.inMemoryService.genId(this.heroes);
    const hero: Hero = { id: heroId, name: heroName };
    this.heroService.addHero(hero).subscribe((hero) => this.heroes.push(hero));
  }

  deleteHero(hero: Hero) {
    const heroId = hero.id;
    this.heroService.deleteHero(heroId).subscribe(() => {
      this.heroes = this.heroes.filter((hero) => hero.id !== heroId);
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
