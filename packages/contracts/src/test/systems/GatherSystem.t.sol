// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "../MudTest.t.sol";
import { QueryFragment, LibQuery, QueryType } from "solecs/LibQuery.sol";
import { SpawnSystem, ID as SpawnSystemID } from "../../systems/SpawnSystem.sol";
import { GatherSystem, ID as GatherSystemID } from "../../systems/GatherSystem.sol";
import { PositionComponent, ID as PositionComponentID, Coord } from "../../components/PositionComponent.sol";
import { ResourceComponent, ID as ResourceComponentID } from "../../components/ResourceComponent.sol";
import { EnergyComponent, ID as EnergyComponentID } from "../../components/EnergyComponent.sol";
import { TerrainComponent, ID as TerrainComponentID } from "../../components/TerrainComponent.sol";

contract GatherSystemTest is MudTest {
  function testExecute() public {
    uint256 entity = 1;

    // Initialize components
    EnergyComponent energyComponent = EnergyComponent(getAddressById(components, EnergyComponentID));
    ResourceComponent resourceComponent = ResourceComponent(getAddressById(components, ResourceComponentID));
    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    TerrainComponent terrainComponent = TerrainComponent(getAddressById(components, TerrainComponentID));

    SpawnSystem(system(SpawnSystemID)).executeTyped(entity, "tester");

    GatherSystem(system(GatherSystemID)).executeTyped(entity, 5);

    assertEq(resourceComponent.getValue(entity), 5);
    assertEq(energyComponent.getValue(entity), 95);

    Coord memory currentPosition = positionComponent.getValue(entity);

    // Check for terrain component in current location
    QueryFragment[] memory fragments = new QueryFragment[](2);
    fragments[0] = QueryFragment(QueryType.HasValue, positionComponent, abi.encode(currentPosition));
    fragments[1] = QueryFragment(QueryType.Has, terrainComponent, new bytes(0));
    uint256[] memory entitiesAtPosition = LibQuery.query(fragments);

    assertEq(entitiesAtPosition.length, 1);
    assertEq(resourceComponent.getValue(entitiesAtPosition[0]), 15);
  }
}
