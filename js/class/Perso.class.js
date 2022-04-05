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

	attack() {
		this.attackDamage += getRandomInteger(1, this.pvMax / 10);
	}
	defense() {
        const random = getRandomInteger(1, this.pvMax / 10)
		this.armor += random;
        return random;
	}
	spell() {
		this.power += getRandomInteger(1, this.pvMax / 10);
	}
}
export default Perso;
