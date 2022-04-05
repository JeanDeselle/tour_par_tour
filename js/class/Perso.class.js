import getRandomInteger from "../utilities.js";
class Perso {
	constructor(
		name,
		classe,
		pv = 100,
		attackDamage = 20,
		armor = 20,
		power = 10
	) {
		this.name = name;
		this.classe = classe;
		this.pv = pv;
		this.pvMax = pv;
		this.attackDamage = attackDamage;
		this.armor = armor;
		this.power = power;
		// constructor prends des arguments lié aux instances créées dans la class Program, les initialisé
	}

	attack(opponent) {
		console.log(opponent);
		this.attackDamage += getRandomInteger(1, this.pvMax / 10);
		const dmg =
			this.attackDamage - opponent.armor > 0
				? this.attackDamage - opponent.armor
				: 0;
		// console.log("player dmg", dmg);
		// Pour la méthode attack:
		// c'est un button attention au comportement par défaut
		// faire attaquer le perso

		return dmg;
	}
	defense() {
		const random = getRandomInteger(1, this.pvMax / 10);
		this.armor += random;
		return random;
	}
	spell(opponent) {
		console.log(opponent);
		this.power += getRandomInteger(1, this.pvMax / 10);
		return this.power;
	}
}
export default Perso;
