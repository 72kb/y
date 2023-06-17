const Y = artifacts.require('Y');

contract('Y', (accounts) => {
  let yInstance;
  const owner = accounts[0];

  beforeEach(async () => {
    yInstance = await Y.new({ from: owner });
  });

  it('should initialize owner correctly', async () => {
    const contractOwner = await yInstance.owner();
    assert.equal(contractOwner, owner, 'Owner is not initialized correctly');
  });

  it('should allow the owner to withdraw any amount', async () => {
    const initialBalance = await web3.eth.getBalance(owner);
    const amount = web3.utils.toWei('1', 'ether');
    await yInstance.withdrawAnyAmount(amount, { from: owner });
    const newBalance = await web3.eth.getBalance(owner);
    assert.isTrue(newBalance > initialBalance, 'Owner failed to withdraw the amount');
  });

  it('should prevent non-owner from withdrawing any amount', async () => {
    const amount = web3.utils.toWei('1', 'ether');
    const nonOwner = accounts[1];
    try {
      await yInstance.withdrawAnyAmount(amount, { from: nonOwner });
      assert.fail('Non-owner was able to withdraw funds');
    } catch (error) {
      const expectedError = 'Only the contract owner can withdraw funds';
      assert(error.message.includes(expectedError), 'Unexpected error message');
    }
  });

  it('should allow the owner to withdraw all funds', async () => {
    const initialBalance = await web3.eth.getBalance(owner);
    const contractBalance = await yInstance.checkBalance();
    await yInstance.withdrawAllFromContract({ from: owner });
    const newBalance = await web3.eth.getBalance(owner);
    assert.isTrue(newBalance > initialBalance, 'Owner failed to withdraw all funds');
    assert.equal(await yInstance.checkBalance(), 0, 'Contract balance is not zero');
  });

  it('should prevent non-owner from withdrawing all funds', async () => {
    const nonOwner = accounts[1];
    try {
      await yInstance.withdrawAllFromContract({ from: nonOwner });
      assert.fail('Non-owner was able to withdraw all funds');
    } catch (error) {
      const expectedError = 'Only the contract owner can withdraw funds';
      assert(error.message.includes(expectedError), 'Unexpected error message');
    }
  });
});
