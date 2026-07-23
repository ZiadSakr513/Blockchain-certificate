// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateRegistry is Ownable {
    struct Certificate {
        string certificateId;
        string studentName;
        string courseName;
        string organization;
        uint256 dateIssued;
        string grade;
        string ipfsHash;
        bool exists;
    }

    mapping(string => Certificate) public certificates;
    uint256 public totalCertificates;
    string[] public certificateIds;

    event CertificateIssued(
        string certificateId,
        string studentName,
        uint256 timestamp
    );

    error CertificateAlreadyExists(string certificateId);
    error InvalidInput(string reason);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function issueCertificate(
        string calldata certificateId,
        string calldata studentName,
        string calldata courseName,
        string calldata organization,
        uint256 dateIssued,
        string calldata grade,
        string calldata ipfsHash
    ) external onlyOwner {
        if (certificates[certificateId].exists) {
            revert CertificateAlreadyExists(certificateId);
        }
        if (
            bytes(certificateId).length == 0 ||
            bytes(studentName).length == 0 ||
            bytes(courseName).length == 0 ||
            bytes(organization).length == 0
        ) {
            revert InvalidInput("Required fields cannot be empty");
        }

        certificates[certificateId] = Certificate({
            certificateId: certificateId,
            studentName: studentName,
            courseName: courseName,
            organization: organization,
            dateIssued: dateIssued,
            grade: grade,
            ipfsHash: ipfsHash,
            exists: true
        });

        certificateIds.push(certificateId);
        totalCertificates++;

        emit CertificateIssued(certificateId, studentName, block.timestamp);
    }

    function verifyCertificate(string calldata certificateId)
        external
        view
        returns (
            string memory studentName,
            string memory courseName,
            string memory organization,
            uint256 dateIssued,
            string memory grade,
            string memory ipfsHash,
            bool exists
        )
    {
        Certificate memory cert = certificates[certificateId];
        return (
            cert.studentName,
            cert.courseName,
            cert.organization,
            cert.dateIssued,
            cert.grade,
            cert.ipfsHash,
            cert.exists
        );
    }

    function certificateExists(string calldata certificateId) external view returns (bool) {
        return certificates[certificateId].exists;
    }

    function getAllCertificateIds() external view returns (string[] memory) {
        return certificateIds;
    }
}
