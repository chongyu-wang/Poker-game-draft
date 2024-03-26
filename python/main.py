import random
from card import Card
from hand import Hand
from deck import Deck
from player import Player



class Game:
    def __init__(self):
        self.NUM_PLAYERS = 0
        
        self.players = []
        self.activePlayers = []
        self.board = []
        self.winner = 5
        
        self.deck = Deck()

        self.pot = 0
        
        
    def populate(self):
        for i in range(self.NUM_PLAYERS):
            card1 = self.deck.pop_card()
            card2 = self.deck.pop_card()
            hand = Hand(card1, card2)
            
            self.hands.append(hand)
            
        self.deck.pop_card()
            
        for i in range(3):
            card = self.deck.pop_card()
            self.board.append(card)
         
        self.deck.pop_card()   
        card = self.deck.pop_card()
        self.board.append(card)
        
        self.deck.pop_card()   
        card = self.deck.pop_card()
        self.board.append(card)


    def createPlayers(self, amount):
        self.NUM_PLAYERS = amount
        for i in range(amount):
            name = input("Type the name of player ")
            player = Player(name)
            self.players.append(player)
            self.activePlayers.append(player)

        print("\n")



    def dealCards(self):
        for p in self.players:
            card1 = self.deck.pop_card()
            card2 = self.deck.pop_card()
            hand = Hand(card1, card2)
            
            p.updateHand(hand)

    def cashAll(self):
        for p in self.players:
            p.addCash(1200)
            


    def printGame(self):
        for p in self.players:
            print(p)
            
        print("**********")
        if self.board:
            print("Board: ")
            for card in self.board:
                card.showCard()
                print("-")

    def showGameStatus(self):
        for p in self.players:
            p.showPlayerStatus()
            print("\n")

        print("************")
        print(f"*  Pot: {self.pot}  *")
        print("************")
            

    def thePlay(self):
        for p in self.activePlayers:
            self.showGameStatus()
            move = input(f"{p.name}'s move: ")
            p.playerDecision(move)
        self.showGameStatus()

game = Game()

game.createPlayers(5)

game.dealCards()
game.cashAll()

game.thePlay()

