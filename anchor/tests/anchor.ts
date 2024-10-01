import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Anchor } from "../target/types/anchor";
import { expect } from "chai";
const provider = anchor.AnchorProvider.local();

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
    let lastLogin = new Date(myAcc.lastLogin.toNumber() * 1000);
    console.log(lastLogin);
    let d = new Date();
    expect(d.getDay()).eq(lastLogin.getDay());
  });
  it("check all user login when 1 person login should found 1 record", async () => {
    let allAcount = await provider.connection.getProgramAccounts(program.programId);
    expect(allAcount.length).equal(1);
  });

});
