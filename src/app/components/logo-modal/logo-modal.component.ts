import { LogoSprite } from './../../game-objects/sprites/logo.sprite';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logo-modal',
  templateUrl: './logo-modal.component.html',
  styleUrls: ['./logo-modal.component.css']
})
export class LogoModalComponent {
  @Input() logoSprite: LogoSprite;

  constructor(private activeModal: NgbActiveModal) {}
}
