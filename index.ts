#! /usr/bin/env node
import inquirer from "inquirer"

// Bank Account interface
interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

//Bank Account class
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance

    }

    // Deposit money
    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);

        } else {
            console.log("Insufficient balance.");

        }
    }
    // Credit money
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;
        } this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);

    }

    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);

    }
}

// Customer class
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

const account: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];

const customers: Customer[] = [
    new Customer("Hamza", "Khan", "Male", 35, 3567923894, account[0]),
    new Customer("Zainub", "Nazish", "Female", 21, 33567923894, account[1]),
    new Customer("Amna", "Huma", "Female", 22, 3467923892, account[2])
]

//Function to interact with bank account

async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount)
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.withdraw(WithdrawAmount.amount)
                    break;
                case "Check Balance":
                    customer.account.checkBalance()
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;


            }
        } else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true)
}

service()



