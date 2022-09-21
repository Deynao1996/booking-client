export const modalOptions = {
  orderModalInfo: {
    title: 'Would you like to pay cash or by credit card?',
    text: 'We are able to provide you online method for payment or cash before settling!',
    icon: 'info',
    buttons: ['Cash', 'Credit card'],
    cashInfo:
      'Your order has been completed! Our manager will contact you as soon as possible!'
  },
  paymentModalInfo: {
    confirmPayment: [
      'Success!',
      'Your payment has been successfully completed and confirmed!',
      'success'
    ],
    rejectPayment: [
      'Warning!',
      'Your payment was not completed!',
      'warning',
      { buttons: ['Ok', 'Return to the payment'] }
    ]
  },
  newSletterModalInfo: [
    'Good job!',
    'You have been subscribed to newsletter!',
    'success'
  ],
  registerModalInfo: [
    'Good job!',
    'You receive an email with a link to verify that you own the email address!',
    'info'
  ],
  passportVerificationModal: [
    'Warning!',
    'You did not allow access to use your email address while login. Please check your profile configurations!',
    'warning'
  ],
  errorModalInfo: ['Oops!', 'Something went wrong. Please try later!', 'error']
}
