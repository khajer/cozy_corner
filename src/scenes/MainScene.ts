import { PublicKey } from '@solana/web3.js';
import 'phaser';

export class MainScene extends Phaser.Scene {
    txtLoading: any;
    constructor() {
        super('MainScene');
    }

    preload() {
        // Load assets here        
        this.txtLoading = this.add.text(0, 0, 'loading', { font: '48px Arial' });

        this.load.image('background', './assets/background.png');

        connectPhantomWallet();
    }

    create() {
        this.txtLoading.destroy();
        // const connectWalletButton = this.add.text(100, 100, 'Connect Phantom Wallet', { font: '24px Arial', color: '#ffffff' })
        //     .setInteractive()
        //     .on('pointerdown', () => {
        //         connectPhantomWallet();
        //     });
        this.add.image(400, 300, 'background').setScale(1);
        const disconnectWalletButton = this.add.text(100, 150, 'Disconnect Phantom Wallet', { font: '24px Arial', color: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => {
                disconnectPhantomWallet();
            });

    }

    update(time: number, delta: number) {
        // Update logic here
    }
}
let connectedWallet: { publicKey: PublicKey } | null = null;

async function connectPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            // Request account access
            const resp = await window.solana.connect();
            connectedWallet = { publicKey: new PublicKey(resp.publicKey) };
            console.log('Wallet connected:', connectedWallet.publicKey.toString());
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('Phantom is not installed');
    }
}

async function disconnectPhantomWallet() {
    if (window.solana && window.solana.isPhantom && connectedWallet) {
        try {
            await window.solana.disconnect();
            connectedWallet = null;
            console.log('Wallet disconnected');
        } catch (error) {
            console.error('Failed to disconnect wallet');
        }
    } else {
        console.error('Phantom is not installed or no wallet connected');
    }
}