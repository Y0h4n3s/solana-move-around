let web3;
web3 = require('@solana/web3.js');
let splToken = require("@solana/spl-token");
const FEE_PAYER = [227,139,220,233,57,200,118,150,232,169,207,228,164,29,52,137,239,88,87,85,19,156,194,178,7,54,183,144,172,114,28,158,9,157,203,244,142,196,12,52,30,111,152,101,2,120,156,11,12,54,214,6,131,18,222,139,237,9,52,229,128,208,203,84]
const APP_PROGRAM_ID = new web3.PublicKey("6SLMfYY13tMDiixwHeX3dZE1CyDPcb5SzvsyzsHJY4FJ");
(async ()  =>{
    console.log("connecting to localhost",)
    let connection = await new web3.Connection("http://localhost:8899")
    let transaction = new web3.Transaction()
    console.log("creating empty transaction")
    transaction.add(new web3.TransactionInstruction({
        programId: APP_PROGRAM_ID,
        keys: [

        ],
        data: Buffer.from([0])
    }))
    console.log(transaction)
    let result = await web3.sendAndConfirmTransaction(connection,transaction, [web3.Keypair.fromSecretKey(Uint8Array.from(FEE_PAYER))])
    console.log(result)
})()
