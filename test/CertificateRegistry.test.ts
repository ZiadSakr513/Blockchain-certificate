import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { CertificateRegistry } from "../typechain-types";
import { Signers } from "./types";

describe("CertificateRegistry", function () {
  async function deployContractFixture() {
    const [admin, issuer, verifier] = await ethers.getSigners();

    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    const registry = await CertificateRegistry.deploy(admin.address);

    return { registry, admin, issuer, verifier };
  }

  describe("Deployment", function () {
    it("should set the correct owner", async function () {
      const { registry, admin } = await loadFixture(deployContractFixture);
      expect(await registry.owner()).to.equal(admin.address);
    });

    it("should start with zero certificates", async function () {
      const { registry } = await loadFixture(deployContractFixture);
      expect(await registry.totalCertificates()).to.equal(0n);
    });
  });

  describe("Issue Certificate", function () {
    it("should allow admin to issue a certificate", async function () {
      const { registry, admin } = await loadFixture(deployContractFixture);

      const tx = await registry.connect(admin).issueCertificate(
        "CERT-001",
        "Alice Smith",
        "Blockchain Fundamentals",
        "Tech Academy",
        1700000000,
        "A",
        "ipfs://QmHash"
      );

      const receipt = await tx.wait();
      const event = receipt?.logs
        .map((log) => registry.interface.parseLog(log))
        .find((log) => log?.name === "CertificateIssued");

      expect(event).to.not.be.undefined;
      expect(event?.args.certificateId).to.equal("CERT-001");
      expect(event?.args.studentName).to.equal("Alice Smith");

      expect(await registry.totalCertificates()).to.equal(1);
    });

    it("should prevent duplicate certificate IDs", async function () {
      const { registry, admin } = await loadFixture(deployContractFixture);

      await registry.connect(admin).issueCertificate(
        "CERT-001",
        "Alice Smith",
        "Blockchain Fundamentals",
        "Tech Academy",
        1700000000,
        "A",
        "ipfs://QmHash"
      );

      await expect(
        registry.connect(admin).issueCertificate(
          "CERT-001",
          "Bob Jones",
          "Smart Contracts",
          "Tech Academy",
          1700000000,
          "B",
          "ipfs://QmHash2"
        )
      ).to.be.revertedWithCustomError(registry, "CertificateAlreadyExists");
    });

    it("should prevent non-admin from issuing certificates", async function () {
      const { registry, issuer } = await loadFixture(deployContractFixture);

      await expect(
        registry.connect(issuer).issueCertificate(
          "CERT-002",
          "Charlie Day",
          "Solidity 101",
          "Tech Academy",
          1700000000,
          "A+",
          "ipfs://QmHash3"
        )
      ).to.be.reverted;
    });
  });

  describe("Verify Certificate", function () {
    it("should return correct certificate data", async function () {
      const { registry, admin } = await loadFixture(deployContractFixture);

      await registry.connect(admin).issueCertificate(
        "CERT-001",
        "Alice Smith",
        "Blockchain Fundamentals",
        "Tech Academy",
        1700000000,
        "A",
        "ipfs://QmHash"
      );

      const cert = await registry.verifyCertificate("CERT-001");
      expect(cert.studentName).to.equal("Alice Smith");
      expect(cert.courseName).to.equal("Blockchain Fundamentals");
      expect(cert.organization).to.equal("Tech Academy");
      expect(cert.dateIssued).to.equal(1700000000);
      expect(cert.grade).to.equal("A");
      expect(cert.ipfsHash).to.equal("ipfs://QmHash");
      expect(cert.exists).to.equal(true);
    });

    it("should return exists=false for non-existent certificate", async function () {
      const { registry } = await loadFixture(deployContractFixture);
      const cert = await registry.verifyCertificate("CERT-UNKNOWN");
      expect(cert.exists).to.equal(false);
    });
  });

  describe("Certificate Exists", function () {
    it("should return true for existing certificate", async function () {
      const { registry, admin } = await loadFixture(deployContractFixture);

      await registry.connect(admin).issueCertificate(
        "CERT-001",
        "Alice Smith",
        "Blockchain Fundamentals",
        "Tech Academy",
        1700000000,
        "A",
        "ipfs://QmHash"
      );

      expect(await registry.certificateExists("CERT-001")).to.equal(true);
    });

    it("should return false for non-existent certificate", async function () {
      const { registry } = await loadFixture(deployContractFixture);
      expect(await registry.certificateExists("CERT-UNKNOWN")).to.equal(false);
    });
  });

  describe("Total Certificates", function () {
    it("should return the correct count", async function () {
      const { registry, admin } = await loadFixture(deployContractFixture);

      expect(await registry.totalCertificates()).to.equal(0);

      await registry.connect(admin).issueCertificate(
        "CERT-001",
        "Alice Smith",
        "Blockchain Fundamentals",
        "Tech Academy",
        1700000000,
        "A",
        "ipfs://QmHash"
      );
      expect(await registry.totalCertificates()).to.equal(1);

      await registry.connect(admin).issueCertificate(
        "CERT-002",
        "Bob Jones",
        "Smart Contracts",
        "Tech Academy",
        1700000000,
        "B",
        "ipfs://QmHash2"
      );
      expect(await registry.totalCertificates()).to.equal(2);
    });
  });

  describe("Get All Certificate IDs", function () {
    it("should return all issued certificate IDs", async function () {
      const { registry, admin } = await loadFixture(deployContractFixture);

      await registry.connect(admin).issueCertificate(
        "CERT-001",
        "Alice Smith",
        "Blockchain Fundamentals",
        "Tech Academy",
        1700000000,
        "A",
        "ipfs://QmHash"
      );

      const ids = await registry.getAllCertificateIds();
      expect(ids.length).to.equal(1);
      expect(ids[0]).to.equal("CERT-001");
    });
  });

  describe("Input Validation", function () {
    it("should reject empty required fields", async function () {
      const { registry, admin } = await loadFixture(deployContractFixture);

      await expect(
        registry.connect(admin).issueCertificate(
          "",
          "Alice Smith",
          "Blockchain Fundamentals",
          "Tech Academy",
          1700000000,
          "A",
          "ipfs://QmHash"
        )
      ).to.be.revertedWithCustomError(registry, "InvalidInput");
    });
  });
});
