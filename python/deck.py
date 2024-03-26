import random
from card import Card


SUITS = [1,2,3,4]

RANKS = [2,3,4,5,6,7,8,9,10,11,12,13,14]


class Deck:
    def __init__(self):
        self.stk = []
        for i in range(4):
            for j in range(13):
                card = Card(SUITS[i],RANKS[j])
                self.stk.append(card)
                
        random.shuffle(self.stk)
        
    def pop_card(self):
        card = self.stk.pop()
        return card