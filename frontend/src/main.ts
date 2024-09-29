import 'phaser';
import { MainScene } from './scenes/MainScene';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

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
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
async function connectPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            // Request account access
            const resp = await window.solana.connect();
            const publicKey = new PublicKey(resp.publicKey).toString();
            console.log('Wallet connected:', publicKey);
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.error('Phantom is not installed');
    }
}

// Example usage: Connect wallet when the game starts
window.onload = () => {
    connectPhantomWallet();
};