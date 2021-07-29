export class eventManager {
    constructor(main, minecraft) {
        this.main = main
        this.listeners = []
        this.world = minecraft.World
        this.oldPlayers = []
        this.oldScores = {}
        this.currentPlayers = []
        this.currentScores = {}
    }

    onEnabled() {
        this.world.events.beforeChat.subscribe((data) => this.emit('PlayerMessage', data))
        this.world.events.tick.subscribe(() => this.emit('Tick', null))

        this.on('Tick', () => {
           this.onJoinAndLeave()
           this.scoreUpdated() 
        })
    }

    onJoinAndLeave() {
        this.currentPlayers = this.main.getPlayerManager().getPlayers()
        let playerJoined = this.currentPlayers.filter(current => !this.oldPlayers.some(old => current.name === old.name))
        let playerLeft = this.oldPlayers.filter(old => !this.currentPlayers.some(current => old.name === current.name))
        for (const player of playerJoined) { this.emit('PlayerJoined', player) }
        for (const player of playerLeft) { this.emit('PlayerLeft', player) }
        this.oldPlayers = currentPlayers
    }

    scoreUpdated() {
        const players = this.main.getPlayerManager().getPlayers()
        for (const player of players) {
            this.currentScores[player.name] = player.scores
            let scoreChanged = this.currentScores[player.name].filter(current => !this.oldScores[player.name].some(old => current.value === old.value))
            for (const newScore of scoreChanged) {
                let oldScore
                for (const key of this.oldScores[player.name]) { if (key.objective === newScore.objective) oldScore = key }
                const data = {
                    player: player,
                    objective: newScore.objective,
                    displayName: newScore.displayName,
                    newValue = newScore.value,
                    oldValue = oldScore.value
                }

                this.emit('ScoreChanged', data)
            }
            this.oldScores[player.name] = this.currentScores[player.name]
        }
    }

    addListener(event, callback, once) {
        this.listeners.push({ eventName: event, callback, once });
    };

    removeListener(event) {
        const index = this.listeners.findIndex(element => element.eventName === event);
        this.listeners.splice(index, 1);
    };

    removeAllListener() {
        this.listeners = [];
    };

    totalListener(event) {
        return event ? this.listeners.filter(element => element.eventName === event) : this.listeners;
    };

    on(event, callback) {
        this.addListener(event, callback, false);
    };

    once(event, callback) {
        this.addListener(event, callback, true);
    };

    emit(event, ...args) {
        this.listeners.forEach(element => {
            if (element.eventName !== event) return;
            element.callback(...args);
            if (element.once) return this.removeListener(element.eventName);
        });
    };
}