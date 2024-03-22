use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};
use solana_program::system_instruction

declare_id!("Ach3gA8LyvqD6YBxH5bSWZCxP45PaWtzPX8G2fYeYFbb");

#[program]
pub mod marketprogram {
    use super::*;

    pub fn acceptOffer(
        ctx: Context<Transferlamports>,
        amount: u64
    ) -> Result<()> {

        let from_account = &ctx.accounts.from;
        let to_account = &ctx.accounts.to;

        let transfer_instruction = system_instruction::transfer(from_account.key, to_account.key, amount);

        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                from_account.to_account_info(),
                to_account.clone(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Transferlamports<'info> {
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(mut)]
    pub to: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}