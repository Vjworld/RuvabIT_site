
export const TEST_CARDS = {
  SUCCESS: {
    number: '4111111111111111',
    name: 'Test User',
    expiry: '12/25',
    cvv: '123',
    description: 'Successful payment test card'
  },
  FAILURE: {
    number: '4000000000000002',
    name: 'Test User',
    expiry: '12/25',
    cvv: '123',
    description: 'Failed payment test card'
  },
  INSUFFICIENT_FUNDS: {
    number: '4000000000009995',
    name: 'Test User',
    expiry: '12/25',
    cvv: '123',
    description: 'Insufficient funds test card'
  }
};

export const TEST_UPI_IDS = [
  'success@razorpay',
  'failure@razorpay',
];

export const TEST_NETBANKING = {
  banks: ['HDFC', 'ICICI', 'SBI', 'AXIS'],
  successBanks: ['HDFC', 'ICICI'],
  failureBanks: ['SBI', 'AXIS']
};

export function getTestPaymentInfo() {
  return {
    cards: TEST_CARDS,
    upi: TEST_UPI_IDS,
    netbanking: TEST_NETBANKING,
    wallets: ['paytm', 'phonepe', 'googlepay'],
    instructions: [
      'Use test card 4111111111111111 for successful payments',
      'Use test card 4000000000000002 for failed payments',
      'Use success@razorpay for successful UPI payments',
      'Use failure@razorpay for failed UPI payments',
    ]
  };
}
