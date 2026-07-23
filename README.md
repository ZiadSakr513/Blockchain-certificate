# Certificate Verification System

A modern full-stack Certificate Verification System built with **React**, **TypeScript**, **Solidity**, **Hardhat**, **ethers.js**, and **Tailwind CSS**. This project demonstrates how blockchain technology can be used to issue and verify academic or professional certificates in a transparent, immutable, and secure way — without involving cryptocurrency, NFTs, or tokens.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Running the Blockchain (Hardhat)](#running-the-blockchain-hardhat)
6. [Running the Frontend](#running-the-frontend)
7. [Compiling Contracts](#compiling-contracts)
8. [Running Tests](#running-tests)
9. [Deploying Locally](#deploying-locally)
10. [Usage](#usage)
11. [Roadmap](#roadmap)

---

## Architecture

```
┌─────────────────┐         Web3 Provider          ┌──────────────────────┐
│                 │ ◄────────────────────────────► │                      │
│   React App     │         ethers.js              │   Hardhat Network    │
│   (Frontend)    │                                │   (Local Blockchain) │
│                 │                                │                      │
└─────────────────┘                                └──────────────────────┘
        │                                                   │
        │       Interacts with                            │
        │                                                   │
        ▼                                                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                  CertificateRegistry (Smart Contract)            │
│                  - Only admin can issue certificates             │
│                  - Certificates are immutable                    │
│                  - Anyone can verify via ID                      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer           | Technology                                      |
|-----------------|------------------------------------------------|-----|
| Frontend        | React, TypeScript, Vite, Tailwind CSS          |
| Blockchain      | Solidity, Hardhat, OpenZeppelin Ownable         |
| Wallet          | ethers.js v6                                   |
| Testing         | Hardhat, Chai                                  |
| Icons           | lucide-react                                   |

---

## Project Structure

```
blockchain-app/
├── contracts/
│   └── CertificateRegistry.sol
├── scripts/
│   └── deploy.ts
├── test/
│   └── CertificateRegistry.test.ts
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── Footer.tsx
│       │   ├── Layout.tsx
│       │   ├── LoadingSkeleton.tsx
│       │   ├── CertificateTable.tsx
│       │   ├── VerifyCard.tsx
│       │   └── EmptyState.tsx
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Verify.tsx
│       │   ├── AdminDashboard.tsx
│       │   └── IssueCertificate.tsx
│       ├── hooks/
│       │   └── useContract.ts
│       ├── services/
│       │   └── contract.ts
│       ├── types/
│       │   └── certificate.ts
│       ├── utils/
│       │   └── helpers.ts
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── hardhat.config.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask browser extension (for interacting with the dApp)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd blockchain-app
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Setup environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure the following variables:

- `PRIVATE_KEY`: Your wallet private key (for deployment to testnet/mainnet)
- `INFURA_API_KEY`: Your Infura API key
- `ETHERSCAN_API_KEY`: Your Etherscan API key
- `VITE_CONTRACT_ADDRESS`: Deployed contract address (set after deployment)
- `VITE_ADMIN_ADDRESS`: Admin wallet address

Create a `.env` file in the frontend directory as well:

```bash
cp frontend/.env.example frontend/.env
```

---

## Running the Blockchain (Hardhat)

### Start a local Hardhat node

```bash
npm run node
```

This starts a local blockchain at `http://127.0.0.1:8545` with pre-funded accounts.

---

## Running the Frontend

In a new terminal:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

## Compiling Contracts

```bash
npm run compile
```

Compiled artifacts are generated in the `artifacts/` directory.

---

## Running Tests

```bash
npm test
```

The test suite covers:
- Issuing certificates
- Duplicate certificate rejection
- Verifying certificates
- Non-existent certificate handling
- Unauthorized issuance
- Total certificate count

---

## Deploying Locally

1. Start the Hardhat node in one terminal:
   ```bash
   npx hardhat node
   ```

2. In another terminal, deploy the contract:
   ```bash
   npx hardhat run scripts/deploy.ts --network localhost
   ```

3. Copy the deployed contract address and update `VITE_CONTRACT_ADDRESS` in `frontend/.env`.

4. Import one of the Hardhat accounts into MetaMask using the private key shown in the Hardhat node terminal.

5. Connect MetaMask to Localhost 8545 (Chain ID: 31337).

---

## Usage

### Home Page
- View project description and benefits
- Access Verify and Admin sections

### Verify Certificate
- Enter a Certificate ID
- View verified certificate details or "Not Found" message
- No wallet connection required

### Admin Dashboard
- Connect your wallet
- View total certificates issued
- Browse all issued certificates in a table
- Issue new certificates

### Issue Certificate
- Fill in certificate details (certificate ID, student name, course, organization, date, grade)
- Submit transaction
- Certificate becomes immutable once issued

---

## Smart Contract Functions

| Function               | Visibility | Description                              |
|------------------------|------------|------------------------------------------|
| `issueCertificate(...)`    | `external` | Admin-only. Issues a new certificate.    |
| `verifyCertificate(id)`   | `external` | Public. Returns certificate details.     |
| `certificateExists(id)`   | `external` | Public. Returns true if certificate exists. |
| `getTotalCertificates()` | `external` | Public. Returns total certificates count. |
| `getAllCertificateIds()` | `external` | Public. Returns all issued certificate IDs. |

### Events

- `CertificateIssued(certificateId, studentName, timestamp)`: Emitted when a new certificate is issued.

---

## Security

- **Ownable**: Only the contract owner (admin) can issue certificates.
- **Custom Errors**: Gas-efficient error handling with `CertificateAlreadyExists` and `InvalidInput`.
- **Input Validation**: Required fields are validated before storage.
- **Immutability**: Certificates cannot be modified after issuance.
- **No Tokens**: No cryptocurrency or NFT functionality.

---

## Environment Variables

### Root `.env`
| Variable           | Description                                      |
|--------------------|--------------------------------------------------|
| `PRIVATE_KEY`      | Wallet private key for deployment                 |
| `INFURA_API_KEY`   | Infura project ID                                |
| `ETHERSCAN_API_KEY`| Etherscan API key for contract verification       |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address                   |
| `VITE_ADMIN_ADDRESS`    | Admin wallet address                       |

### Frontend `frontend/.env`
| Variable                | Description                               |
|-------------------------|-------------------------------------------|
| `VITE_CONTRACT_ADDRESS` | Contract address on the connected network |
| `VITE_ADMIN_ADDRESS`    | Admin wallet address                      |

---

## License

MIT

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
