//private function
exports.expectOwner = (self, message = 'Permission denied') => {
    const errmsg = message + '. You must be the contract owner.';
    const owner = self.deployedBy;
    expect(owner.includes(msg.sender), errmsg);
  };