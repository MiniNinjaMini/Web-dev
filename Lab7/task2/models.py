class Character:
    def __init__(self, name, health, level):
        self.name = name
        self.health = health
        self.level = level

    def attack(self):
        return f"{self.name} attacks!"

    def take_damage(self, damage):
        self.health -= damage
        return f"{self.name} takes {damage} damage. HP: {self.health}"

    def __str__(self):
        return f"{self.name} (Level {self.level}, HP: {self.health})"


# 👊 Warrior
class Warrior(Character):
    def __init__(self, name, health, level, strength):
        super().__init__(name, health, level)
        self.strength = strength

    def attack(self):
        return f"{self.name} strikes with sword! Damage: {self.strength}"

    def defend(self):
        return f"{self.name} raises shield!"


# 🧙 Mage
class Mage(Character):
    def __init__(self, name, health, level, mana):
        super().__init__(name, health, level)
        self.mana = mana

    def attack(self):
        return f"{self.name} casts a spell! Mana left: {self.mana}"

    def cast_spell(self):
        return f"{self.name} uses FIREBALL 🔥"