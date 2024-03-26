# Colors
red = "\033[0;31m"
green = "\033[0;32m"
yellow = "\033[0;33m"
blue = "\033[0;34m"
purple = "\033[0;35m"
cyan = "\033[0;36m"
white = "\033[0;37m"
reset = "\033[0m"

class Card:
    def __init__(self, s, r):
        self.suit = s
        self.rank = r

        self.suits = {1: blue + "Spades" + reset, 2: red + "Diamonds" + reset, 3: blue + "Clubs" + reset, 4: red + "Hearts" + reset}
        self.ranks = {2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten", 11: green + "Jack" + reset, 12: purple + "Queen" + reset, 13: cyan + "King" + reset, 14: yellow + "Ace" + reset}

    def __str__(self):
        return f"{self.ranks[self.rank]} of {self.suits[self.suit]}"

    def showCard(self):
        print(str(self.ranks[self.rank]) + " of " + str(self.suits[self.suit]))


