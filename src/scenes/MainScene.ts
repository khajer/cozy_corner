import 'phaser';

export class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // Load assets here
    }

    create() {
        this.add.text(100, 100, 'Hello Phaser with TypeScript!', { font: '48px Arial', fill: '#ffffff' });
    }

    update(time: number, delta: number) {
        // Update logic here
    }
}