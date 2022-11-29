const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestVegasOne", function () {
  let token;
  let owner;
  let signer1;
  let signer2;
  let signers;

  beforeEach(async function () {
    tokenFactory = await ethers.getContractFactory("VegasONE");

    [owner, signer1, signer2, ...signers] = await ethers.getSigners();

    token = await tokenFactory.deploy(
      "VegasOne",
      "VOC",
      ethers.utils.parseEther("10")
    );
    await token.deployed();
  });

  describe("Mint", function () {
    it("Positive", async function () {
      const amount = ethers.utils.parseEther("1");

      let tx = await token.mint(signer1.address, amount);
      await tx.wait();

      const balance = await token.balanceOf(signer1.address);
      expect(balance).to.equal(amount);
    });

    it("Negative/Forbidden", async function () {
      const amount = ethers.utils.parseEther("1");
      let tx = token.connect(signer1).mint(signer1.address, amount);
      await expect(tx).to.be.revertedWith("ErrForbidden");
    });

    it("Negative/ExceedCap", async function () {
      const cap = await token.cap();
      let tx = token.mint(signer1.address, cap + 1);
      await expect(tx).to.be.revertedWith("ERC20Capped: cap exceeded");
    });
  });

  describe("RecoverERC20", function () {
    it("Positive", async function () {
      const amount = ethers.utils.parseEther("1");

      let tx = await token.mint(token.address, amount);
      await tx.wait();

      tx = await token.recoverERC20(token.address, signer1.address, amount);
      await tx.wait();

      const balance = await token.balanceOf(signer1.address);
      expect(balance).to.equal(amount);
    });

    it("Negative/Forbidden", async function () {
      const amount = ethers.utils.parseEther("1");
      let tx = await token.mint(token.address, amount);
      await tx.wait();

      tx = token
        .connect(signer1)
        .recoverERC20(token.address, signer1.address, amount);

      await expect(tx).to.be.revertedWith("ErrForbidden");
    });
  });
});
