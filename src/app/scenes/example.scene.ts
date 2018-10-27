import { LogoSprite } from './../game-objects/sprites/logo.sprite';
import * as Phaser from 'phaser';
import { EventEmitter } from '@angular/core';

export class ExampleScene extends Phaser.Scene {
  sprites: {[name: string]: LogoSprite} = {};
  highlightedLogo: LogoSprite;
  logoClicked = new EventEmitter<LogoSprite>();
  height: number;
  width: number;
  textureNamesToImgSrc: {[textureName: string]: string} = {};

  constructor() {
    super({key: 'example-scene'});
  }

  preload = () => {
    this.loadTexture('aoa-logo', '../../assets/aoa-logo.png');
    this.loadTexture('local-toast-logo', '../../assets/local-toast-logo.png');
    this.loadTexture('red-sparkly', '../../assets/red-sparkly.png');
    this.loadTexture('laser-background', '../../assets/laser-bkg-800-600.png');
  }

  private loadTexture = (name, imgSrc) => {
    this.load.image(name, imgSrc);
    this.textureNamesToImgSrc[name] = imgSrc;
  }

  create = () => {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    const aoa = this.addLogo('aoa-logo', {x: 200, y: 300}, {width: 150, height: 150});
    const lt = this.addLogo('local-toast-logo', {x: 400, y: 300});

    this.sprites[aoa.id] = aoa;
    this.sprites[lt.id] = lt;

    this.input.keyboard.on('keydown_A', () => {
      this.addLogo('aoa-logo', this.input.mouse.manager.activePointer.position, {width: 150, height: 150});
    });

    this.input.keyboard.on('keydown_L', () => {
      this.addLogo('local-toast-logo', this.input.mouse.manager.activePointer.position);
    });

    this.input.keyboard.on('keydown_D', () => {
      if (this.highlightedLogo) {
        this.highlightedLogo.blowUp();
        delete this.sprites[this.highlightedLogo.name];
        this.highlightedLogo = null;
      }
    });

    this.input.keyboard.on('keydown_Q', () => {
      Object.values(this.sprites).forEach(logo => {
        logo.blowUp();
        delete this.sprites[logo.name];
      });
      this.highlightedLogo = null;
    });
  }

  addLogo(
    texture: string,
    location?: {x: number, y: number},
    displaySize = {width: 150, height: 150}
  ): LogoSprite {
    const locationx = location ? location.x : Phaser.Math.RND.integerInRange(0, this.width);
    const locationy = location ? location.y : Phaser.Math.RND.integerInRange(0, this.height);
    const newLogoSprite = this.add.existing(new LogoSprite(this, locationx, locationy, texture)) as LogoSprite;
    if (displaySize) {
      newLogoSprite.setDisplaySize(displaySize.width, displaySize.height);
    }
    this.sprites[newLogoSprite.id] = newLogoSprite;
    newLogoSprite.highlighted.subscribe(x => {
      if (x) {
        this.highlightedLogo = newLogoSprite;
      } else if (this.highlightedLogo === newLogoSprite) {
        this.highlightedLogo = null;
      }
    });
    newLogoSprite.on('pointerdown', () => {
      this.logoClicked.emit(newLogoSprite);
    });
    newLogoSprite.imgSrc = this.textureNamesToImgSrc[texture];
    return newLogoSprite;
  }
}
