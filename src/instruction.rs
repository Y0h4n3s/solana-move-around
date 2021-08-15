use std::convert::TryInto;

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::msg;
use solana_program::program_error::ProgramError;

use crate::error::EscrowError::InvalidInstruction;

pub struct  AuctionInstruction {

}

#[derive(Debug, BorshSerialize, BorshDeserialize, PartialEq)]
pub struct Bid {
    pub amount: u64
}
pub struct GreeterInstruction {}

impl AuctionInstruction {
    pub fn unpack(input: &[u8]) -> Result<Bid, ProgramError> {
        msg!("Unpacking Instruction data");

        let data = Bid::try_from_slice(input)?;
        Ok(data)
    }

    fn unpack_amount(input: &[u8]) -> Result<u64, ProgramError> {
        let amount = input
            .get(..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(InvalidInstruction)?;
        Ok(amount)
    }
}
