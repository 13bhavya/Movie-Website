import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SeriesComponent } from './series/series.component';
import { MoviesComponent } from './movies/movies.component';
import { ThemeComponent } from './theme/theme.component';
import { NameService } from './main/name.services';
import { MainSideComponent } from './main-side/main-side.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { MapAgmComponent } from './map-agm/map-agm.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SeriesComponent,
    MoviesComponent,
    ThemeComponent,
    MainSideComponent,
    MoviesListComponent,
    MovieItemComponent,
    MapComponent,
    MapAgmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD-kdsmbhQxg01HXl2Wux3t3R6k9iU9zCI',
      libraries: ['places']
    }),
    NgbModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule,
    ScrollDispatchModule
  ],
  providers: [NameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
