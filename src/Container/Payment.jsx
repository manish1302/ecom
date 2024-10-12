import axios from "axios";
import React, { useState } from "react";
const Payment = () => {
    const initiatePayment = async () => {
        try {   
          // Set your payment request payload
          const paymentRequest = {
            amount: 100,  // Amount to be paid
            productInfo: "Sample Product",
            firstName: "John",
            email: "john@example.com",
            phone: "9876543210",
          };
    
          // Call the backend API to initiate the payment
          const response = await axios.post("https://localhost:7272/api/Payment/paymentInitiate", paymentRequest);
          console.log(response, "payment");
          // The backend sends you the necessary form fields for PayU
          const payuData = response.data;  // This will contain key, txnid, amount, hash, etc.
    
          // Now, you need to redirect to PayU with this data
          redirectToPayU(payuData);
    
        } catch (error) {
          console.error("Error initiating payment:", error);
        }
      };
    
      const redirectToPayU = (payuData) => {
        // PayU payment URL (for sandbox mode or production)
        const paymentUrl = "https://test.payu.in/_payment";  // Use the PayU payment URL
    
        // Create a form and submit it to PayU
        const form = document.createElement("form");
        form.action = paymentUrl;  // PayU's payment URL
        form.method = "POST";
    
        // Dynamically create input fields for the PayU form data
        for (const key in payuData) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = payuData[key];
          form.appendChild(input);
        }
    
        // Append the form to the document body and submit it
        document.body.appendChild(form);
        form.submit();
      };
    
  return (
    <div className="Home">
      <button onClick={initiatePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
