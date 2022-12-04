const log = console.log;

function Node(value) {
    this.value = value;
    this.next = null;
}

function LinkedList() {
    this.head = null;
    this.size = 0;

    this.add = function (element) {
        let new_node = new Node(element);

        if (this.head == null) {
            this.head = new_node;
        } else {
            let current = this.head;

            while (current.next) {
                current = current.next;
            }

            current.next = new_node;
        }
        this.size++;
    }

    this.insertAt = function (element, idx) {
        if (idx < 0 || idx > this.size) {
            throw new Error("Invalid Index Provided");
        }

        let new_node = new Node(element);
        let current = this.head;

        if (idx === 0) {
            new_node.next = current;
            this.head = new_node;
            this.size++;
            return;
        }

        let index = 0;
        while (current && index !== idx - 1) {
            current = current.next;
            index++;
        }
        let next = current.next;
        current.next = new_node;
        new_node.next = next;
        this.size++;
    }

    this.removeIndex = function (idx) {
        if (idx < 0 || idx >= this.size) {
            throw new Error("Invalid Index Provided");
        }
        let current = this.head;
        if (idx === 0) {
            this.head = current.next;
            current = null;
            this.size--;
            return;
        }
        let index = 0;
        while (current && index !== idx - 1) {
            current = current.next;
            index++;
        }
        let del_node = current.next;
        current.next = del_node.next;
        del_node = null;
        this.size--;
    }

    //Iterative
    this.search = function (element) {
        if (this.size === 0) {
            return -1;
        }

        let current = this.head;
        while (current) {
            if (current.value === element) {
                return current.value;
            }

            current = current.next;
        }
        return -1;

    }

    // Recursive
    this.searchRecursive = function (element, current = this.head) {
        if (!current) {
            return -1;
        }

        if (current.value === element) {
            return current.value;
        } else {
            return this.searchRecursive(element, current.next);
        }
    }

    this.reverse = function () {
        if (this.size === 0 || this.size === 1) {
            return;
        }

        let prev = null;
        let current = this.head;
        let next = null;

        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.head = prev;
    }

    this.reverseRecursive = function (current = this.head, prev = null, next = null) {
        if (this.size === 0 || this.size === 1) {
            return;
        }

        if (!current) {
            this.head = prev;
            return;
        }
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
        return this.reverseRecursive(current, prev, next);
    }

    // Floyds Cycle Finding Algorithm
    this.detectLoop = function () {
        if (this.size === 0) {
            return false;
        }

        let slow_ptr = this.head;
        let fast_ptr = this.head;

        while (slow_ptr && fast_ptr && fast_ptr.next) {
            slow_ptr = slow_ptr.next;
            fast_ptr = fast_ptr.next.next;

            if (slow_ptr === fast_ptr) {
                return true;
            }
        }

        return false;
    }

    this.printList = function () {
        let current = this.head;
        let data = '';

        while (current) {
            data += (current.value + ' => ');
            current = current.next;
        }
        data += 'NULL'
        log(data);
    }

    this.deleteList = function () {
        this.head = null;
        this.size = 0;
    }
}

const ll = new LinkedList();
ll.add(1);
ll.add(2);
ll.add(3);
ll.add(4);
ll.printList()
ll.reverseRecursive();
ll.printList();