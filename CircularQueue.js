class CircularQueue {
    constructor(capacity) {
      this.capacity = capacity;
      this.items = new Array(capacity);
      this.head = 0;
      this.tail = 0;
      this.size = 0;
    }
  
    enqueue(item) {
      if (this.isFull()) {
        throw new Error("Queue is full");
      }
      this.items[this.tail] = item;
      this.tail = (this.tail + 1) % this.capacity;
      this.size++;
    }
  
    dequeue() {
      if (this.isEmpty()) {
        throw new Error("Queue is empty");
      }
      const item = this.items[this.head];
      this.items[this.head] = null;
      this.head = (this.head + 1) % this.capacity;
      this.size--;
      return item;
    }
  
    isFull() {
      return this.size === this.capacity;
    }
  
    isEmpty() {
      return this.size === 0;
    }
  
    getBB() {
      return this.items[(this.head + 4) % this.size];
    }
  
    getSB() {
      return this.items[(this.head + 3) % this.size];
    }
  
    getDealer() {
      return this.items[this.head];
    }
  
    reset() {
      for (let i = 0; i < this.size; i++) {
        this.items[i] = null;
      }
      this.head = 0;
      this.tail = 0;
    }
}

  
module.exports = CircularQueue;