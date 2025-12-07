#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *head = NULL;

/* Utility: create node */
Node* create_node(int value) {
    Node *n = (Node*)malloc(sizeof(Node));
    if (!n) {
        printf("Memory allocation failed!\n");
        exit(EXIT_FAILURE);
    }
    n->data = value;
    n->next = NULL;
    return n;
}

/* Insert functions */
void insert_beginning(int value) {
    Node *n = create_node(value);
    n->next = head;
    head = n;
}

void insert_end(int value) {
    Node *n = create_node(value);
    if (!head) {
        head = n;
        return;
    }
    Node *t = head;
    while (t->next) t = t->next;
    t->next = n;
}

void insert_at_position(int value, int pos) {
    if (pos <= 1) {
        insert_beginning(value);
        return;
    }
    Node *t = head;
    int i;
    for (i = 1; i < pos - 1 && t != NULL; ++i) t = t->next;
    if (t == NULL) {
        printf("Position out of range. Inserting at end instead.\n");
        insert_end(value);
        return;
    }
    Node *n = create_node(value);
    n->next = t->next;
    t->next = n;
}

/* Delete functions */
void delete_beginning() {
    if (!head) {
        printf("List is empty.\n");
        return;
    }
    Node *t = head;
    head = head->next;
    free(t);
}

void delete_end() {
    if (!head) {
        printf("List is empty.\n");
        return;
    }
    if (!head->next) {
        free(head);
        head = NULL;
        return;
    }
    Node *t = head;
    while (t->next->next) t = t->next;
    free(t->next);
    t->next = NULL;
}

void delete_at_position(int pos) {
    if (!head) {
        printf("List is empty.\n");
        return;
    }
    if (pos <= 1) {
        delete_beginning();
        return;
    }
    Node *t = head;
    int i;
    for (i = 1; i < pos - 1 && t->next != NULL; ++i) t = t->next;
    if (t->next == NULL) {
        printf("Position out of range.\n");
        return;
    }
    Node *del = t->next;
    t->next = del->next;
    free(del);
}

/* Search */
void search_value(int value) {
    Node *t = head;
    int pos = 1;
    while (t) {
        if (t->data == value) {
            printf("Value %d found at position %d.\n", value, pos);
            return;
        }
        t = t->next;
        pos++;
    }
    printf("Value %d not found in list.\n", value);
}

/* Count */
int count_nodes() {
    int c = 0;
    Node *t = head;
    while (t) { c++; t = t->next; }
    return c;
}

/* Display visually as [ 10 ] -> [ 20 ] -> NULL */
void display_list() {
    if (!head) {
        printf("Linked List: NULL\n");
        return;
    }
    Node *t = head;
    printf("Linked List: ");
    while (t) {
        printf("[ %d ]", t->data);
        if (t->next) printf(" -> ");
        t = t->next;
    }
    printf(" -> NULL\n");
}

/* Small helper to flush line if non-numeric input is given */
void clear_stdin() {
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF) {}
}

/* Menu */
void show_menu() {
    printf("\n--- Linked List Simulation (Console) ---\n");
    printf("1  Insert at Beginning\n");
    printf("2  Insert at End\n");
    printf("3  Insert at Position\n");
    printf("4  Delete from Beginning\n");
    printf("5  Delete from End\n");
    printf("6  Delete at Position\n");
    printf("7  Search for Value\n");
    printf("8  Display List\n");
    printf("9  Count Nodes\n");
    printf("10 Exit\n");
    printf("---------------------------------------\n");
    printf("Enter choice: ");
}

int main() {
    int choice = 0;
    while (1) {
        show_menu();
        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter a number.\n");
            clear_stdin();
            continue;
        }

        int value, pos;
        switch (choice) {
            case 1:
                printf("Enter value: ");
                if (scanf("%d", &value) != 1) { printf("Invalid value.\n"); clear_stdin(); break; }
                insert_beginning(value);
                display_list();
                break;
            case 2:
                printf("Enter value: ");
                if (scanf("%d", &value) != 1) { printf("Invalid value.\n"); clear_stdin(); break; }
                insert_end(value);
                display_list();
                break;
            case 3:
                printf("Enter value: ");
                if (scanf("%d", &value) != 1) { printf("Invalid value.\n"); clear_stdin(); break; }
                printf("Enter position (1-based): ");
                if (scanf("%d", &pos) != 1) { printf("Invalid position.\n"); clear_stdin(); break; }
                insert_at_position(value, pos);
                display_list();
                break;
            case 4:
                delete_beginning();
                display_list();
                break;
            case 5:
                delete_end();
                display_list();
                break;
            case 6:
                printf("Enter position (1-based): ");
                if (scanf("%d", &pos) != 1) { printf("Invalid position.\n"); clear_stdin(); break; }
                delete_at_position(pos);
                display_list();
                break;
            case 7:
                printf("Enter value to search: ");
                if (scanf("%d", &value) != 1) { printf("Invalid value.\n"); clear_stdin(); break; }
                search_value(value);
                break;
            case 8:
                display_list();
                break;
            case 9:
                printf("Total nodes: %d\n", count_nodes());
                break;
            case 10:
                /* Free memory before exit */
                while (head) delete_beginning();
                printf("Exiting. Goodbye!\n");
                return 0;
            default:
                printf("Invalid choice. Try again.\n");
        }
    }
    return 0;
}
