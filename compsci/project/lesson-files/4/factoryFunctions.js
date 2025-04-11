//BankAccount class
class BankAccount {
  constructor(checking = 0, savings = 0) {
    this.savings = savings;
    this.checking = checking;
  }
  deposit(acct, amt) {
    if (amt < 0) {
      return 'invalid amount, please enter a positive value';
    }
    if (acct === 'savings') {
      this.savings += amt;
    } else {
      this.checking += amt;
    }
  }
  displayFunds() {
    console.log(
      `Checking: $${this.checking.toFixed(2)}\nSavings: $${this.savings.toFixed(
        2,
      )}`,
    );
  }
}

const myAcct = new BankAccount(1000, 400);
myAcct.deposit('savings', 50.45);
myAcct.displayFunds();
console.log('==============================');
//since constructor functions return JavaScript objects, the properties can be accessed from anywhere.
myAcct.checking -= 900;
myAcct.displayFunds();
console.log('==============================');

//same functionality, as a factory function.
function BankAccountFactory(checking = 0, savings = 0) {
  const accounts = {
    checking,
    savings,
  };
  return {
    deposit: function (acct, amt) {
      if (amt < 0) {
        return 'invalid amount, please enter a positive value';
      }
      if (acct === 'savings') {
        accounts.savings += amt;
      } else {
        accounts.checking += amt;
      }
    },
    displayFunds: function () {
      console.log(
        `Checking: $${accounts.checking.toFixed(
          2,
        )}\nSavings: $${accounts.savings.toFixed(2)}`,
      );
    },
  };
}

//factory functions do not use the `new` keyword:
const acct = BankAccountFactory(2000, 20);
acct.displayFunds();
console.log('==============================');
acct.deposit('checking', 2500);
acct.displayFunds();
console.log('==============================');

// accounts.checking -= 1000; //throws error, accounts is out of scope
