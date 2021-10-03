import {
  commands,
} from '../beapi/BeAPI.js'

commands.registerCommand({
  command: "comp",
  description: "Shows all components on the player.",
}, (data) => {
  const components = data.sender.getVanilla().getComponents()
  for (const component of components) {
    data.sender.sendMessage(component.id)
  }
})
