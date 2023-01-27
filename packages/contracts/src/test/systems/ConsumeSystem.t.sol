// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.17;

import "../MudTest.t.sol";
import { console } from "forge-std/console.sol";
import { addressToEntity } from "solecs/utils.sol";

import { ComponentDevSystem, ID as ComponentDevSystemID } from "../../systems/ComponentDevSystem.sol";
import { ConsumeSystem, ID as ConsumeSystemID } from "../../systems/ConsumeSystem.sol";
import { SpawnSystem, ID as SpawnSystemID } from "../../systems/SpawnSystem.sol";

import { Coord } from "../../components/PositionComponent.sol";
import { Direction } from "../../utils/constants.sol";

import { LibResource } from "../../libraries/LibResource.sol";
import { LibSubstanceBlock } from "../../libraries/LibSubstanceBlock.sol";

contract ConsumeSystemTest is MudTest {
  function testConsume() public {
    setUp();
    SpawnSystem spawnSystem = SpawnSystem(system(SpawnSystemID));
    ConsumeSystem consumeSystem = ConsumeSystem(system(ConsumeSystemID));

    vm.startPrank(alice);
    spawnSystem.executeTyped();
    vm.stopPrank();

    // Get base entity
    assertTrue(carriedByComponent.has(addressToEntity(alice)));
    uint256 baseEntity = carriedByComponent.getValue(addressToEntity(alice));
    Coord memory initialPosition = positionComponent.getValue(baseEntity);

    vm.roll(2);

    // Create a portable entity
    uint256 portableEntity = world.getUniqueEntityId();
    ComponentDevSystem(system(ComponentDevSystemID)).executeTyped(PortableComponentID, portableEntity, abi.encode(1));

    // Give matter
    ComponentDevSystem(system(ComponentDevSystemID)).executeTyped(MatterComponentID, portableEntity, abi.encode(10));

    // Place in inventory
    ComponentDevSystem(system(ComponentDevSystemID)).executeTyped(
      CarriedByComponentID,
      portableEntity,
      abi.encode(baseEntity)
    );

    // Consume it
    vm.startPrank(alice);
    consumeSystem.executeTyped(portableEntity);
    vm.stopPrank();

    // Core energy should be INITIAL_ENERGY + 10
    assertEq(energyComponent.getValue(addressToEntity(alice)), gameConfig.initialEnergy + 10);

    // portableEntity should be removed
    assertTrue(!portableComponent.has(portableEntity));
    assertTrue(!matterComponent.has(portableEntity));
    assertTrue(!carriedByComponent.has(portableEntity));
  }
}
