# Linked List Simulation in C

This project is a **console-based Linked List Simulator**, written entirely in the C programming language. It visually represents linked list nodes using ASCII boxes and arrows, making it easy to understand how linked lists work internally.

The program allows the user to perform core operations such as insertion, deletion, searching, counting, and displaying nodes in a structured linked list format.

---

## 🚀 Features

### ✅ **Insertion Operations**

* Insert at Beginning
* Insert at End
* Insert at a Specific Position

### ❌ **Deletion Operations**

* Delete from Beginning
* Delete from End
* Delete at a Specific Position

### 🔍 **Search Operation**

* Search for a value and display its node position

### 📌 **Display Function**

Shows the linked list visually like:

```
[ 10 ] -> [ 20 ] -> [ 30 ] -> NULL
```

### 🔢 **Count Nodes**

* Displays total number of nodes in the list

---

## 📂 Project Structure

```
linked-list-c/
│
├── linked_list_sim.c      # Main C source file
└── README.md              # Project documentation
```

---

## 🛠 How to Compile & Run

### **Using GCC**

```
gcc -o linkedlist linked_list_sim.c
```

### **Run the program**

* **Windows:**

```
linkedlist.exe
```

* **Linux/Mac:**

```
./linkedlist
```

---

## 🧠 Example Output

```
--- Linked List Simulation (Console) ---
1 Insert at Beginning
2 Insert at End
3 Insert at Position
...
Enter choice: 2
Enter value: 10
Linked List: [ 10 ] -> NULL
```

---

## 🎯 Purpose

This project is designed to help students and beginners:

* Understand how Linked Lists work internally
* Visualize operations using a terminal-based UI
* Learn dynamic memory handling in C (`malloc`, `free`)
* Improve DSA and C programming knowledge

---

## 📘 Concepts Used

* Structures (`struct Node`)
* Dynamic Memory Allocation
* Pointers
* Linked List Traversal
* Console-based UI

---

## 📝 License

This project is open-source and free to use for learning, academic submissions, and practice.
