class Hand:
    def __init__(self, card1, card2):
        self.card1 = card1
        self.card2 = card2

    def __str__(self):
        return f"{self.card1} and {self.card2}"
        
    def showCards(self):
        self.card1.showCard()
        self.card2.showCard()
        print("==========")


