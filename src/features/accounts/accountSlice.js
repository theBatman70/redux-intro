import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    const host = "api.frankfurter.app";
    const data = await fetch(
      `https://${host}/latest?amount=10&from=${currency}&to=USD`
    ).then((resp) => resp.json());
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

// function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/covertingCurrency":
//       return { ...state, isLoading: true };
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan) return;
//       const loan = action.payload.loan;
//       if (loan <= 0) return;
//       const loanPurpose = action.payload.loanPurpose;
//       return { ...state, loan, loanPurpose, balance: state.balance + loan };
//     case "account/payLoan":
//       if (!state.loan) return;
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };
//     default:
//       return state;
//   }
// }

// // Action Creators
// function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });

//     const host = "api.frankfurter.app";
//     const data = await fetch(
//       `https://${host}/latest?amount=10&from=${currency}&to=USD`
//     ).then((resp) => resp.json());
//     const converted = data.rates.USD;
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }

// function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// function requestLoan(loan, loanPurpose) {
//   return { type: "account/requestLoan", payload: { loan, loanPurpose } };
// }

// function payLoan() {
//   return { type: "account/payLoan" };
// }

// export { deposit, withdraw, requestLoan, payLoan };

// export default accountReducer;
