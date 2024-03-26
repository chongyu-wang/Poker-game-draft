class Player:
    def __init__(self, name):
        self.hand = None
        self.cash = 0
        self.name = name

        self.decision = None

    def __str__(self):
        return f"Name: {self.name}, Cash Amount: {self.cash}, Hand: {self.hand}"

    def pCheck(self):
        self.decision = "check"
    def pCall(self):
        self.decision = "call"
    def pRaise(self, amount):
         self.decision = "raise"
    def pFold(self):
        self.decision = "fold"

    def addCash(self, amount):
        self.cash += amount

    def playerDecision(self, move):
        if move == "call":
            self.pCall()
        elif move == "check":
            self.pCheck()
        elif move == "raise":
            self.pRaise(5)
        elif move == "fold":
            self.pFold()

    def test(self, move):
        print(move)

    def updateHand(self, hand):
        self.hand = hand

    def showPlayerStatus(self):
        print("****************")
        print(self.name)
        print("Chips: ", self.cash)
        print("Hand: ", self.hand)
        if self.decision:
            print("Decision: ", self.decision)
        print("****************")



    

