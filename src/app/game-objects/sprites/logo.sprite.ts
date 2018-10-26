import * as Phaser from 'phaser';
import { EventEmitter } from '@angular/core';

export class LogoSprite extends Phaser.GameObjects.Sprite {
  private static counts: {[textureName: string]: number} = {};
  public id: string;
  public highlighted = new EventEmitter<boolean>();
  public highlight: Phaser.GameObjects.Graphics;
  public imgSrc: string;

  constructor(scene: Phaser.Scene, x: number, y: number, public textureName: string, frame?: string | number) {
    super(scene, x, y, textureName, frame);
    if (LogoSprite.counts[textureName]) {
      this.id = `${textureName}${LogoSprite.counts[textureName]++}`;
    } else {
      this.id = textureName;
      LogoSprite.counts[textureName] = 1;
    }
    this.name = this.id;
    this.setInteractive();
    this.on('pointerover', () => {
      const graphics = this.scene.add.graphics({
        lineStyle: {width: 1, color: 0xaa00aa},
        fillStyle: {color: 0xff0000, alpha: 1}
      });
      const hightlightHeight = this.displayHeight + 10;
      const hightlightWidth = this.displayWidth + 10;
      this.highlight = graphics.fillRect(
        this.x - hightlightWidth / 2,
        this.y - hightlightHeight / 2,
        hightlightWidth,
        hightlightHeight
      );
      this.highlight.alpha = .5;
      this.highlighted.emit(true);
    });

    this.on('pointerout', () => {
      this.highlight.destroy();
      this.highlighted.emit(false);
    });
  }

  blowUp = () => {
    if (this.highlight) {
      this.highlight.destroy();
    }
    if (this.scene) {
      const physicsImage = this.scene.physics.add.image(
        this.x,
        this.y,
        this.textureName
      );
      physicsImage.displayHeight = this.displayHeight;
      physicsImage.displayWidth = this.displayWidth;

      physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-500, 500), -500);
      physicsImage.setAngularVelocity(500);

      const particles = this.scene.add.particles('red-sparkly');
      const emitter = particles.createEmitter({
        speed: 800,
        scale: { start: 1.5, end: 0 },
        blendMode: 1,
        gravityY: 2000,
        lifespan: 400
      });

      emitter.startFollow(physicsImage);

      this.destroy();
    }
  }
}
