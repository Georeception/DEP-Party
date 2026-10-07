let paystackScriptPromise;

export const loadPaystack = () => {
  if (window.PaystackPop) {
    return Promise.resolve(window.PaystackPop);
  }

  if (!paystackScriptPromise) {
    paystackScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        if (window.PaystackPop) {
          resolve(window.PaystackPop);
        } else {
          paystackScriptPromise = undefined;
          reject(new Error('Paystack checkout could not be initialized.'));
        }
      };
      script.onerror = () => {
        paystackScriptPromise = undefined;
        reject(new Error('Paystack checkout could not be loaded. Please try again.'));
      };
      document.body.appendChild(script);
    });
  }

  return paystackScriptPromise;
};
