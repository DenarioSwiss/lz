// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { DenarioSilverOFTUpgradeable } from "../DenarioSilverOFTUpgradeable.sol";

// @dev WARNING: This is for testing purposes only
contract DenarioSilverOFTUpgradeableMock is DenarioSilverOFTUpgradeable {
    constructor(address _lzEndpoint) DenarioSilverOFTUpgradeable(_lzEndpoint) {}

    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}
