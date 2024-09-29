use anchor_lang::prelude::*;

declare_id!("3tUC61ktA8CBNyDuhmmjPPAiU8xw6en8Czz1u7WHndzj");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
