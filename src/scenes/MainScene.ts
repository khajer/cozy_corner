import 'phaser';

export class MainScene extends Phaser.Scene {
    txtLoading: any;
    constructor() {
        super('MainScene');
    }

    preload() {
        // Load assets here
        this.txtLoading = this.add.text(0, 0, 'loading', { font: '48px Arial' });
    }

    create() {
        this.txtLoading.destroy();

        // this.add.text(100, 100, 'load completed', { font: '48px Arial' });
    }

    update(time: number, delta: number) {
        // Update logic here
    }
}