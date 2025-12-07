// Node class for linked list
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// LinkedList class
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Insert at the beginning
    insertAtBeginning(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
        return true;
    }

    // Insert at the end
    insertAtEnd(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        return true;
    }

    // Insert at specific position
    insertAtPosition(data, position) {
        if (position < 0 || position > this.size) {
            return false;
        }

        if (position === 0) {
            return this.insertAtBeginning(data);
        }

        const newNode = new Node(data);
        let current = this.head;
        let previous = null;
        let index = 0;

        while (index < position) {
            previous = current;
            current = current.next;
            index++;
        }

        newNode.next = current;
        previous.next = newNode;
        this.size++;
        return true;
    }

    // Delete from beginning
    deleteFromBeginning() {
        if (!this.head) {
            return false;
        }

        this.head = this.head.next;
        this.size--;
        return true;
    }

    // Delete from end
    deleteFromEnd() {
        if (!this.head) {
            return false;
        }

        if (!this.head.next) {
            this.head = null;
            this.size--;
            return true;
        }

        let current = this.head;
        let previous = null;

        while (current.next) {
            previous = current;
            current = current.next;
        }

        previous.next = null;
        this.size--;
        return true;
    }

    // Delete from specific position
    deleteAtPosition(position) {
        if (position < 0 || position >= this.size || !this.head) {
            return false;
        }

        if (position === 0) {
            return this.deleteFromBeginning();
        }

        let current = this.head;
        let previous = null;
        let index = 0;

        while (index < position) {
            previous = current;
            current = current.next;
            index++;
        }

        previous.next = current.next;
        this.size--;
        return true;
    }

    // Search for a value
    search(data) {
        let current = this.head;
        let position = 0;

        while (current) {
            if (current.data === data) {
                return position;
            }
            current = current.next;
            position++;
        }

        return -1;
    }

    // Get all values as array
    toArray() {
        const arr = [];
        let current = this.head;

        while (current) {
            arr.push(current.data);
            current = current.next;
        }

        return arr;
    }
}

// Initialize linked list
const linkedList = new LinkedList();

// Display the linked list
function displayList(highlightIndex = -1) {
    const container = document.getElementById('linkedList');
    const values = linkedList.toArray();

    if (values.length === 0) {
        container.innerHTML = '<span class="empty-list">Empty List</span>';
        return;
    }

    let html = '';
    values.forEach((value, index) => {
        const highlightClass = index === highlightIndex ? 'highlight' : '';
        html += `
            <div class="node">
                <div class="node-box ${highlightClass}">${value}</div>
            </div>
        `;
        if (index < values.length - 1) {
            html += '<span class="arrow">→</span>';
        }
    });

    html += '<span class="arrow">→</span><div class="null-node">NULL</div>';
    container.innerHTML = html;
}

// Show message to user
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3000);
}

// Get input values
function getInputValue() {
    const value = document.getElementById('valueInput').value;
    if (value === '') {
        showMessage('Please enter a value!', 'error');
        return null;
    }
    return parseInt(value);
}

function getPositionValue() {
    const position = document.getElementById('positionInput').value;
    if (position === '') {
        showMessage('Please enter a position!', 'error');
        return null;
    }
    return parseInt(position);
}

function clearInputs() {
    document.getElementById('valueInput').value = '';
    document.getElementById('positionInput').value = '';
}

// Insert at beginning
function insertAtBeginning() {
    const value = getInputValue();
    if (value === null) return;

    linkedList.insertAtBeginning(value);
    displayList(0);
    showMessage(`Inserted ${value} at the beginning!`, 'success');
    clearInputs();
}

// Insert at end
function insertAtEnd() {
    const value = getInputValue();
    if (value === null) return;

    linkedList.insertAtEnd(value);
    displayList(linkedList.size - 1);
    showMessage(`Inserted ${value} at the end!`, 'success');
    clearInputs();
}

// Insert at position
function insertAtPosition() {
    const value = getInputValue();
    if (value === null) return;

    const position = getPositionValue();
    if (position === null) return;

    if (linkedList.insertAtPosition(value, position)) {
        displayList(position);
        showMessage(`Inserted ${value} at position ${position}!`, 'success');
        clearInputs();
    } else {
        showMessage(`Invalid position! Position must be between 0 and ${linkedList.size}`, 'error');
    }
}

// Delete from beginning
function deleteFromBeginning() {
    if (linkedList.deleteFromBeginning()) {
        displayList();
        showMessage('Deleted node from beginning!', 'success');
    } else {
        showMessage('List is empty!', 'error');
    }
}

// Delete from end
function deleteFromEnd() {
    if (linkedList.deleteFromEnd()) {
        displayList();
        showMessage('Deleted node from end!', 'success');
    } else {
        showMessage('List is empty!', 'error');
    }
}

// Delete at position
function deleteAtPosition() {
    const position = getPositionValue();
    if (position === null) return;

    if (linkedList.deleteAtPosition(position)) {
        displayList();
        showMessage(`Deleted node at position ${position}!`, 'success');
        clearInputs();
    } else {
        showMessage(`Invalid position! Position must be between 0 and ${linkedList.size - 1}`, 'error');
    }
}

// Search for value
function searchValue() {
    const value = getInputValue();
    if (value === null) return;

    const position = linkedList.search(value);

    if (position !== -1) {
        displayList(position);
        showMessage(`Found ${value} at position ${position}!`, 'info');
    } else {
        displayList();
        showMessage(`Value ${value} not found in the list!`, 'error');
    }
}

// Initialize display
displayList();
