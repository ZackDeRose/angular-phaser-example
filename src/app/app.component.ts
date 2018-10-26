import { LogoSprite } from './game-objects/sprites/logo.sprite';
import { ExampleScene } from './scenes/example.scene';
import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import * as Phaser from 'phaser';
import { NgbModal } from '../../node_modules/@ng-bootstrap/ng-bootstrap';
import { LogoModalComponent } from './components/logo-modal/logo-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('game') gameCanvasRef: ElementRef;
  @ViewChild('nameBadge') nameBadgeRef: ElementRef;
  nameBadge;

  game: Phaser.Game;
  exampleScene: ExampleScene;
  width: 800;
  height: 600;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.exampleScene = new ExampleScene();
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {gravity: {y: 500}}
      },
      scene: [ this.exampleScene ],
      canvas: this.gameCanvasRef.nativeElement
    };

    this.game = new Phaser.Game(config);

    this.nameBadge = this.nameBadgeRef.nativeElement;

    this.exampleScene.logoClicked.subscribe((logoSprite: LogoSprite) => {
      this.exampleScene.highlightedLogo = null;
      const modalComponent = this.modalService.open(LogoModalComponent);
      modalComponent.componentInstance.logoSprite = logoSprite;
    });
  }

  addLogo(texture: string) {
    this.exampleScene.addLogo(texture, undefined, {width: 150, height: 150});
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    this.nameBadge.style.left = `${event.pageX + 15}px`;
    this.nameBadge.style.top = `${event.pageY - 30}px`;
  }
}
