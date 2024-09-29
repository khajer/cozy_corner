// src/global.d.ts

interface Window {
    solana?: {
        isPhantom: boolean;
        connect: () => Promise<{ publicKey: string }>;
        disconnect: () => Promise<void>;
        // Add other properties and methods as needed
    };
}