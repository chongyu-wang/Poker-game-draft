class Table:
    # def checkWinner(self):
    #     for hand in self.hands:
    #         self.checkPair(hand)
    #         self.check2Pair(hand)
    #         self.checkTrip(hand)
    #         self.checkS(hand)
    #         self.checkF(hand)
    #         self.checkFH(hand)
    #         self.checkQ(hand)
    #         self.checkSF(hand)
    #         self.checkRF(hand)
        
    #     return self.winner
        
    def checkPair(self, hand):
        self.cardPool = self.board.copy()
        self.cardPool.append(hand.card1)
        self.cardPool.append(hand.card2)
        
        s = {}
        r = {}
        
        for card in self.cardPool:
            if card.suit not in s:
                s[card.suit] = 1
            else:
                s[card.suit] += 1
            
            if card.rank not in r:
                r[card.rank] = 1
            else:
                r[card.rank] += 1
        
        if max(r.values()) >= 2:
            return 1
        return 0