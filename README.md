# AnswerIt 
A forum that permit you to demand a great answer based on your budget in a decentralized and reliable way!
Utilize ICETEA blockchain to bring the best experience for users.
# Current Status: version 2.0
Using ICETEA's native token icetea for payment with system.faucet is the payer. In the future update, a customized token will be used.
# How to run
## 1. Install

- Rename `.env.example` to `.env`
- `npm i`
- `npm i -g TradaTech/icetea TradaTech/ipfs-proxy`
- `icetea init`

## 2. Start to Icetea and IPFS node
``
Start an Icetea Node:
```sh
icetea start
```

Start a fake IPFS node for testing:
```sh
ipfslocal
```

## 3. Deploy contracts

Deploy Lovelock contract:
```
npm run deploy
```

After deploying the new contract, change `PKEY` value in your `.env` with the `private key` exported from the command.

Generate some seed data (optional):
`npm run seed` then import the outputted private key for testing (use __Forgot Password__ screen to import).

## 4. Start the app

- `npm start`


# Issues
1. after changing state, if I get state immediately, i will get the previous, not the new one @@
2. send @transaction does not require TEA?
3. Add question which deposits more money than sender's balance.
4. Những câu hỏi đã được tích (v) có layout lạ.
5. slow text input speed
# Future Updates
1. Check timestamp directly by contract (ex: generate new block before get timestamp)