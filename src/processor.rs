use solana_program::{
    account_info::AccountInfo,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};
use solana_program::account_info::next_account_info;
use solana_program::program::invoke;
use solana_program::program_error::ProgramError;
use solana_program::program_pack::{IsInitialized, Pack};
use solana_program::sysvar::rent::Rent;
use solana_program::sysvar::Sysvar;
use solana_client::rpc_client::RpcClient;

use crate::{error::EscrowError, state::Escrow};
use crate::instruction::{AuctionInstruction, Bid};

pub struct Processor;
impl Processor {
    pub fn process(program_id: &Pubkey, accounts: &[AccountInfo], instruction_data: &[u8]) -> ProgramResult {
        let accounts_iter = &mut accounts.iter();
        let bidder = next_account_info(accounts_iter)?;
        let item = next_account_info(accounts_iter)?;
        let instruction = AuctionInstruction::unpack(instruction_data)?;
        match instruction {
            Bid { amount } => {
                msg!("Instruction: Greet ,Message: {}", amount);
                Self::process_bid(program_id, amount, bidder, item).unwrap();
                // Self::process_init_escrow(accounts, amount, program_id)
                Err(ProgramError::InvalidAccountData)
            }
        }
    }

    fn process_bid(_program_id: &Pubkey, _amount: u64, bidder: &AccountInfo, _item: &AccountInfo) -> ProgramResult {
        if !bidder.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }
        let url = "http://localhost:8899".to_string();
        let client = RpcClient::new(url);
        msg!("{}", bidder.key );
        let account_info_instruction = client.get_account(bidder.key).unwrap();
            msg!("{:?}", account_info_instruction);

        Ok(())
    }

    fn process_init_escrow(
        accounts: &[AccountInfo],
        amount: u64,
        program_id: &Pubkey,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let initializer = next_account_info(account_info_iter)?;

        if !initializer.is_signer  {
            return Err(ProgramError::MissingRequiredSignature);
        }



        let temp_token_account = next_account_info(account_info_iter)?;

        let token_to_receive_account = next_account_info(account_info_iter)?;
        if *token_to_receive_account.owner != spl_token::id() {
            return Err(ProgramError::IncorrectProgramId);
        }

        let escrow_account = next_account_info(account_info_iter)?;
        let rent = &Rent::from_account_info(next_account_info(account_info_iter)?)?;

        if !rent.is_exempt(escrow_account.lamports(), escrow_account.data_len()) {
            return Err(EscrowError::NotRentExempt.into());
        }

        let mut escrow_info = Escrow::unpack_unchecked(&escrow_account.data.borrow())?;
        if escrow_info.is_initialized() {
            return Err(ProgramError::AccountAlreadyInitialized);
        }

        escrow_info.is_initialized = true;
        escrow_info.initializer_pubkey = *initializer.key;
        escrow_info.temp_token_account_pubkey = *temp_token_account.key;
        escrow_info.initializer_token_to_receive_account_pubkey = *token_to_receive_account.key;
        escrow_info.expected_amount = amount;

        Escrow::pack(escrow_info, &mut escrow_account.data.borrow_mut())?;
        let (pda, _bump_seed) = Pubkey::find_program_address(&[b"escrow"], program_id);
        let token_program = next_account_info(account_info_iter)?;
        let owner_change_ix = spl_token::instruction::set_authority(
            token_program.key,
            temp_token_account.key,
            Some(&pda),
            spl_token::instruction::AuthorityType::AccountOwner,
            initializer.key,
            &[&initializer.key],
        )?;

        msg!("Calling the token program to transfer token account ownership...");
        invoke(
            &owner_change_ix,
            &[
                temp_token_account.clone(),
                initializer.clone(),
                token_program.clone(),
            ],
        )?;

        Ok(())
    }
}