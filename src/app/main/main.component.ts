import { Component, OnInit, Input } from '@angular/core';
import { Names } from './names.model';
import { NameService } from './name.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  name: string = '';
  email: string = '';
  names: Names[];
  search: string = "asasd";
  resetField = false;
  private ChangedSub: Subscription;

  constructor(private nameService: NameService) { }

  ngOnInit(): void {
    this.nameService.namesChanged.subscribe(
      (names: Names[]) => {
        this.names = names;
      })
  }

  onClearfield(reset: true) {
    this.resetField = reset
    this.name = ''
    this.email = '';
    console.log("Clear from main side")
  }

  onClearfromMain() {
    this.name = ''
    this.email = '';
  }

  onSubmit() {
    let name = this.name;
    let email = this.email;
    this.names = this.nameService.getNames();
    this.nameService.addNames({ name, email });
  }

}
