import {Component, OnInit} from '@angular/core';
import {PoemService} from '../../core/services/poem.service';
import {PoemModel} from '../../core/models/poem.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  randomPoems: PoemModel[];

  constructor(private poemService: PoemService) {
  }

  ngOnInit() {
    this.poemService.getTwoRandomPoems().subscribe((resp: PoemModel[]) => this.randomPoems = resp);
  }

  public michaelsBlog(): void {
    window.open('http://ullyot.ucalgaryblogs.ca/', '_blank');
  }

  public joshBlog(): void {
    window.open('http://joshharkema.com', '_blank');
  }

  public tei(): void {
    window.open('http://www.tei-c.org/index.xml', '_blank');
  }

  public pythonConnector(): void {
    window.open('https://git.joshharkema.com/poem-dev/poem-connector', '_blank');
  }

}
