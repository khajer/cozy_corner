import 'phaser';
import { MainScene } from './scenes/MainScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 782,
    scene: [MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);