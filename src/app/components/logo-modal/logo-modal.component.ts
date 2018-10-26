import { LogoSprite } from './../../game-objects/sprites/logo.sprite';
import { Component, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logo-modal',
  templateUrl: './logo-modal.component.html',
  styleUrls: ['./logo-modal.component.css']
})
export class LogoModalComponent implements OnChanges {
  @Input() logoSprite: LogoSprite;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.logoSprite) {
      document.body.appendChild(this.logoSprite.texture.source[0].image);
    }
  }
}
