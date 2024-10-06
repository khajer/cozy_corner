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

    pub fn pass_access(ctx: Context<UpdateLastLogin>) -> Result<()> {
        let account = &mut ctx.accounts.my_account;
        account.last_login = Clock::get()?.unix_timestamp;
        if account.status == StatusAccount::Idle {
            account.status = StatusAccount::Logined;
        } else {
            account.status = StatusAccount::Idle;
        }
        Ok(())
    }

    pub fn pay_fee(ctx: Context<Fee>, amount: u64) -> Result<()> {
        let transfer_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.from.key(),
            &ctx.accounts.to.key(),
            amount,
        );

        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            &[
                ctx.accounts.from.to_account_info(),
                ctx.accounts.to.to_account_info(),
            ],
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Fee<'info> {
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(mut)]
    pub to: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
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
    status: StatusAccount,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum StatusAccount {
    Idle,
    Logined,
}

impl Default for StatusAccount {
    fn default() -> Self {
        StatusAccount::Idle
    }
}
