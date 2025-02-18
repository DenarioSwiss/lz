// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { DenarioSilverOFTAdapter } from "../DenarioSilverOFTAdapter.sol";

// @dev WARNING: This is for testing purposes only
contract DenarioSilverOFTAdapterMock is DenarioSilverOFTAdapter {
    constructor(
        address _token,
        address _lzEndpoint,
        address _delegate
    ) DenarioSilverOFTAdapter(_token, _lzEndpoint, _delegate) {}
}
