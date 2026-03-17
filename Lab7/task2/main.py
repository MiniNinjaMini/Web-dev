from models import Character, Warrior, Mage

# создаем объекты
w = Warrior("Thor", 100, 5, 20)
m = Mage("Merlin", 80, 7, 50)

# список объектов
characters = [w, m]

# перебор
for char in characters:
    print(char)               # __str__
    print(char.attack())      # полиморфизм
    print(char.take_damage(10))
    print("-" * 30)