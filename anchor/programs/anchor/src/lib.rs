use anchor_lang::prelude::*;

declare_id!("3tUC61ktA8CBNyDuhmmjPPAiU8xw6en8Czz1u7WHndzj");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<InitializeAccount>) -> Result<()> {
        let account = &mut ctx.accounts.my_account;
        account.last_login = 0;

        Ok(())
    }

    pub fn login(ctx: Context<UpdateLastLogin>) -> Result<()> {
        let account = &mut ctx.accounts.my_account;
        account.last_login = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeAccount<'info> {
    #[account(init, payer = user, space = 8 + std::mem::size_of::<MyAccount>())]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateLastLogin<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

#[account]
#[derive(Default)]
pub struct MyAccount {
    name: String,
    level: i32,
    character_type: i32,
    last_login: i64, // clock.unix_timestamp, let clock = Clock::get().unwrap();
}
