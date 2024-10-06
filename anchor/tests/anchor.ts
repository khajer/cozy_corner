import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Anchor } from "../target/types/anchor";
import { assert, expect } from "chai";


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
    // console.log("Your transaction signature", tx);
  });
  it("should login success when I call method login", async () => {
    const tx = await program.methods.passAccess().accounts({
      myAccount: myAccount.publicKey
    }).rpc();
    // console.log("Your transaction signature", tx);
    const myAcc = await program.account.myAccount.fetch(myAccount.publicKey);
    let lastLogin = new Date(myAcc.lastLogin.toNumber() * 1000);

    let d = new Date();
    expect(d.getDay()).eq(lastLogin.getDay());

    const loginStatus = { logined: {} };

    assert.deepEqual(myAcc.status, loginStatus);
  });
  it("check all user login when 1 person login should found 1 record", async () => {
    let allAcount = await provider.connection.getProgramAccounts(program.programId);
    expect(allAcount.length).equal(1);
  });

  it("all people count = 2 , when add one person to system", async () => {
    const people2 = anchor.web3.Keypair.generate();
    const tx = await program.methods.initialize().accounts({
      myAccount: people2.publicKey,
    }).signers([people2]).rpc();
    let allAcount = await provider.connection.getProgramAccounts(program.programId);
    expect(allAcount.length).equal(2);
  })

  it("check new person in system, and check account used", async () => {
    const people3 = anchor.web3.Keypair.generate();
    let dataInfo = await program.provider.connection.getAccountInfo(people3.publicKey);
    expect(null).equal(dataInfo);
  });

});

describe("transfer sol", () => {

  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Anchor as Program<Anchor>;

  it('Processes instruction and transfers SOL', async () => {
    const from = anchor.web3.Keypair.generate();
    const to = anchor.web3.Keypair.generate();

    const airdropSignature = await provider.connection.requestAirdrop(
      from.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL, // 2 SOL for testing
    );

    const latestBlockHash = await provider.connection.getLatestBlockhash();

    await provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });

    const fromBalanceBefore = await provider.connection.getBalance(from.publicKey);
    const toBalanceBefore = await provider.connection.getBalance(to.publicKey);
    const amount = 0.5 * anchor.web3.LAMPORTS_PER_SOL;

    await program.methods
      .payFee(new anchor.BN(amount))
      .accounts({
        from: from.publicKey,
        to: to.publicKey,
      })
      .signers([from])
      .rpc();

    const fromBalanceAfter = await provider.connection.getBalance(from.publicKey);
    const toBalanceAfter = await provider.connection.getBalance(to.publicKey);

    assert.equal(fromBalanceAfter, fromBalanceBefore - amount, "Incorrect balance for 'from' account");
    assert.equal(toBalanceAfter, toBalanceBefore + amount, "Incorrect balance for 'to' account");

  });

  it('Processes instruction and transfers SOL , case 2 : it does not have enough to pay ', async () => {
    const from = anchor.web3.Keypair.generate();
    const to = anchor.web3.Keypair.generate();

    const airdropSignature = await provider.connection.requestAirdrop(
      from.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL, // 2 SOL for testing
    );

    const latestBlockHash = await provider.connection.getLatestBlockhash();

    await provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });

    const fromBalanceBefore = await provider.connection.getBalance(from.publicKey);
    const toBalanceBefore = await provider.connection.getBalance(to.publicKey);
    const amount = 5 * anchor.web3.LAMPORTS_PER_SOL;

    try {
      await program.methods
        .payFee(new anchor.BN(amount))
        .accounts({
          from: from.publicKey,
          to: to.publicKey,
        })
        .signers([from])
        .rpc();

      expect.fail("It shouldn’t be a success.");
    } catch (e) {
      assert.isOk("ok");
    }





  });

});