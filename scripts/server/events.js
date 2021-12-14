const system = server.registerSystem(0, 0)

system.listenForEvent("minecraft:block_destruction_started", (event) => {
  const pos = event.data.block_position
  const tickingArea = system.getComponent(event.data.player, "minecraft:tick_world").data.ticking_area
  const block = system.getBlock(tickingArea, pos.x, pos.y, pos.z)
  const player = system.getComponent(event.data.player, "minecraft:nameable").data.name
  sendData({
    beapi: {
      event: "BlockDestructionStarted",
      player: player,
      block: {
        id: block.__identifier__,
        pos,
      },
      old: true,
    }
  })
})

system.listenForEvent("minecraft:block_destruction_stopped", (event) => {
  const progress = event.data.destruction_progress
  const pos = event.data.block_position
  const tickingArea = system.getComponent(event.data.player, "minecraft:tick_world").data.ticking_area
  const block = system.getBlock(tickingArea, pos.x, pos.y, pos.z)
  const player = system.getComponent(event.data.player, "minecraft:nameable").data.name
  sendData({
    beapi: {
      event: "BlockDestructionStopped",
      player: player,
      block: {
        id: block.__identifier__,
        pos,
        progress,
      },
      old: true,
    }
  })
})

system.listenForEvent("minecraft:player_destroyed_block", (event) => {
  const pos = event.data.block_position
  const id = event.data.block_identifier
  const player = system.getComponent(event.data.player, "minecraft:nameable").data.name
  sendData({
    beapi: {
      event: "BlockDestroyed",
      player: player,
      block: {
        id,
        pos,
      },
      old: true,
    }
  })
})

system.listenForEvent("minecraft:player_placed_block", (event) => {
  const pos = event.data.block_position
  const tickingArea = system.getComponent(event.data.player, "minecraft:tick_world").data.ticking_area
  const block = system.getBlock(tickingArea, pos.x, pos.y, pos.z)
  const player = system.getComponent(event.data.player, "minecraft:nameable").data.name
  sendData({
    beapi: {
      event: "BlockPlaced",
      player: player,
      block: {
        id: block.__identifier__,
        pos,
      },
      old: true,
    }
  })
})

system.listenForEvent("minecraft:player_attacked_entity", (event) => {
  const entity = event.data.attacked_entity
  const pos = system.getComponent(entity, "minecraft:position").data
  const player = system.getComponent(event.data.player, "minecraft:nameable").data.name
  sendData({
    beapi: {
      event: "EntityAttacked",
      player: player,
      entity: {
        id: entity.__identifier__,
        type: entity.__type__,
        pos,
      },
      old: true,
    }
  })
})

function sendData(data) {
  const stringified = JSON.stringify(data).replace(/"/g, '\\"')
    .replace(/\\n/g, '\\n')

  return system.executeCommand(`execute @r ~ ~ ~ summon armor_stand "${stringified}" ~ 1000 ~`, () => {})
}