// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { DenarioSilverOFTAdapterUpgradeable } from "../DenarioSilverOFTAdapterUpgradeable.sol";

// @dev WARNING: This is for testing purposes only
contract DenarioSilverOFTAdapterUpgradeableMock is DenarioSilverOFTAdapterUpgradeable {
    constructor(address _token, address _lzEndpoint) DenarioSilverOFTAdapterUpgradeable(_token, _lzEndpoint) {}
}
