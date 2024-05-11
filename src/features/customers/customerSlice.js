import { createSlice } from "@reduxjs/toolkit";

const initialState = { fullName: "", nationalID: "" };

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return { payload: { fullName, nationalID } };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/create":
//       const fullName = action.payload.fullName;
//       const nationalID = action.payload.nationalID;
//       return { ...state, fullName, nationalID };
//     default:
//       return state;
//   }
// }

// // Action Creators
// function createCustomer(fullName, nationalID) {
//   return { type: "customer/create", payload: { fullName, nationalID } };
// }

// export { createCustomer };

// export default customerReducer;
