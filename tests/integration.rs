use borsh::{BorshSerialize};
use solana_program::pubkey::Pubkey;

use {
    assert_matches::*,
    solana_program::instruction::{AccountMeta, Instruction},
    solana_program::msg,
    solana_program_test::*,
    solana_sdk::{signature::Signer, transaction::Transaction},
};
use solana_simple_auction::entrypoint::process_instruction;
use solana_simple_auction::instruction::Bid;
use solana_sdk::signature::Keypair;

#[tokio::test]
async fn test_transaction() {
    let program_id = Pubkey::new_unique();
    msg!("Using Program Id: {}", program_id);
    let (mut banks_client, payer, recent_blockhash) = ProgramTest::new(
        "solana-move-around",
        program_id,
        processor!(process_instruction),
    )
        .start()
        .await;

    let test_data = Bid {
        amount: 100
    };


    let serialized = test_data.try_to_vec().unwrap();
    let address = Keypair::new();


    let mut transaction = Transaction::new_with_payer(
        &[Instruction {
            program_id,
            accounts: vec![
                AccountMeta::new( address.pubkey(), false),
                AccountMeta::new(Pubkey::new_unique(), false)
            ],
            data: serialized,
        }],
        Some(&payer.pubkey()),
    );
    transaction.sign(&[&payer], recent_blockhash);

    assert_matches!(banks_client.process_transaction(transaction).await, Ok(()));
}