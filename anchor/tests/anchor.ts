import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Anchor } from "../target/types/anchor";

describe("anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Anchor as Program<Anchor>;
  const myAccount = anchor.web3.Keypair.generate();
  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().accounts({
      myAccount: myAccount.publicKey,
    }).signers([myAccount]).rpc();
    console.log("Your transaction signature", tx);
  });
  it("should login success when I call method login", async () => {

    const tx = await program.methods.login().accounts({
      myAccount: myAccount.publicKey
    }).rpc();
    console.log("Your transaction signature", tx);

    const myAcc = await program.account.myAccount.fetch(myAccount.publicKey);
    console.log(new Date(myAcc.lastLogin.toNumber() * 1000));


  });
});
