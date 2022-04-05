import Perso from "./Perso.class.js";
import getRandomInteger from "../utilities.js";
class Program {
	constructor() {
		// dans le constructor:
		// créer les propriétés des personnages avec des valeurs par defauts (instanciation)
		this.opponent = new Perso("Nergigante", "Dragon ancien");
		this.player = new Perso("Geralt de Riv", "Sorceleur");
		// appel d'une méthode affichage
		this.injection(
			`le joueur est ${this.player.name} c est un ${this.player.classe} il combat le ${this.opponent.name} c est un ${this.opponent.classe}`
		);
		this.affichage();
		//gestionnaire d'événements (...)
		document
			.getElementById("att")
			.addEventListener("click", this.onClickAttack.bind(this));
		document
			.getElementById("def")
			.addEventListener("click", this.onClickDefense.bind(this));
		document
			.getElementById("spell")
			.addEventListener("click", this.onClickSpell.bind(this));
	}

	// méthode :
	// affichage
	injection(msg) {
		this.inject = document.getElementById("inject");
		this.inject.innerHTML = msg;
	}
	// onClickAttack
	onClickAttack(e) {
		e.preventDefault();
		this.player.attack();
		const dmg =
			this.player.attackDamage - this.opponent.armor > 0
				? this.player.attackDamage - this.opponent.armor
				: 0;
		console.log("player dmg", dmg);
		// Pour la méthode attack:
		// c'est un button attention au comportement par défaut
		// faire attaquer le perso
		this.opponent.pv -= dmg;
		this.actionPlayer = `${this.player.name} attaque et inflige  ${dmg} de dégats`;
		// le dragon counter
		this.counter();
		// mise à jour de l'affichage
		this.affichage();
	}
	// onClickDefense
	onClickDefense(e) {
		console.log("player def");
		e.preventDefault();
		let armor = this.player.defense();
		this.actionPlayer = `${this.player.name} defend et augmente son armure de ${armor}`;
		this.counter();
	}
	// onClickSpell
	onClickSpell(e) {
		e.preventDefault();
		const Magicdmg = this.player.power;
		this.opponent.pv -= Magicdmg;
		console.log("player dmgM", Magicdmg);
		this.actionPlayer = `${this.player.name} envoie un sort qui traverse l'armure et inflige  ${Magicdmg} de dégats magiques`;
		this.counter();
		this.affichage();
	}
	// counter --> lié au dragon
	counter() {
		const random = getRandomInteger(1, 3);
		switch (random) {
			case 1:
				console.log("dragon att");
				this.opponent.attack();
				const dmg =
					this.opponent.attackDamage - this.player.armor > 0
						? this.opponent.attackDamage - this.player.armor
						: 0;
				this.player.pv -= dmg;
				console.log("dragon dmg", dmg);
				this.actionOponnent = `le ${this.opponent.name} attaque et inflige ${dmg} de dégats`;
				break;
			case 2:
				console.log("dragon def");
				const armor = this.opponent.defense();
				this.actionOponnent = `le ${this.opponent.name} defend et augmente son armure de ${armor}`;
				break;
			case 3:
				console.log("dragon spell");
				this.opponent.spell();
				const Magicdmg = this.opponent.power;
				this.player.pv -= Magicdmg;
				console.log("dragon dmg", Magicdmg);
				this.actionOponnent = `le ${this.opponent.name} envoie un sort qui traverse l'armure et inflige ${Magicdmg} de dégats magiques`;
				break;
		}
		this.affichage();
	}
	showinfosPlayers() {
		this.infosStats = document.getElementById("infosStats");
		this.infosStats.innerHTML = `
            <p>${this.player.name} : ${
			this.player.pv > 0 ? this.player.pv + "HP" : "game over"
		} , ${this.player.armor} ARMOR, ${this.player.power} AP </p>
            <p>${this.opponent.name} : ${
			this.opponent.pv > 0 ? this.opponent.pv + "HP" : "game over"
		} , ${this.opponent.armor} ARMOR, ${this.opponent.power} AP </p>
        `;
	}
	showRoundState() {
		let msg;
		if (this.actionOponnent) {
			msg = `<p>${this.actionPlayer}</p><p>${this.actionOponnent}</p>`;
		} else {
			msg = `infos`;
		}
		this.injection(msg);
	}
	affichage() {
		this.showRoundState();
		// Pour la méthode affichage:
		// verifier les point de vie, injecter en fonction soit le message de combat soit la victoire ou la défaite
		if (this.player.pv <= 0 || this.opponent.pv <= 0) {
			if (this.player.pv <= 0) {
				this.showinfosPlayers();
				this.injection("perdu");
			} else {
				this.showinfosPlayers();
				this.injection("gg");
			}
		} else {
			this.showinfosPlayers();
		}
	}
}
export default Program;
