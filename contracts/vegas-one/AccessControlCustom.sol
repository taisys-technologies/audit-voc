// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AccessControlCustom is AccessControl {
    error ErrGrantRoleToZeroAddress();

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function transferAdmin(address newAdmin)
        external
        virtual
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        if (newAdmin == address(0)) {
            revert ErrGrantRoleToZeroAddress();
        }

        _grantRole(DEFAULT_ADMIN_ROLE, newAdmin);
        _revokeRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function batchGrantRole(bytes32 role, address[] memory addresses)
        external
        virtual
        onlyRole(getRoleAdmin(role))
    {
        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == address(0)) {
                revert ErrGrantRoleToZeroAddress();
            }

            _grantRole(role, addresses[i]);
        }
    }

    function batchRevokeRole(bytes32 role, address[] memory addresses)
        external
        virtual
        onlyRole(getRoleAdmin(role))
    {
        for (uint256 i = 0; i < addresses.length; i++) {
            _revokeRole(role, addresses[i]);
        }
    }
}
