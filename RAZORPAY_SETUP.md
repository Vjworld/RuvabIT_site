
# Razorpay Payment Integration Setup

## 1. Environment Variables Setup

Add these variables to Replit Secrets:

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxx
SESSION_SECRET=your-secure-session-secret
DATABASE_URL=your-postgresql-connection-string
```

## 2. Test Mode Configuration

For testing, use Razorpay test credentials:
- Test Key ID starts with `rzp_test_`
- Test Key Secret is provided in Razorpay dashboard

## 3. Webhook Configuration

Set up webhooks in Razorpay Dashboard:

**Webhook URL:** `https://your-repl-domain.replit.app/api/payment/webhook`

**Events to Subscribe:**
- `payment.captured`
- `payment.failed`
- `order.paid`

## 4. Test Payment Cards

### Successful Payment
- Card Number: `4111111111111111`
- CVV: Any 3 digits
- Expiry: Any future date

### Failed Payment
- Card Number: `4000000000000002`
- CVV: Any 3 digits
- Expiry: Any future date

### UPI Test IDs
- Success: `success@razorpay`
- Failure: `failure@razorpay`

## 5. Production Setup

1. Replace test credentials with live credentials
2. Update webhook URL to production domain
3. Test with small amounts first
4. Monitor payment logs and webhook delivery

## 6. Security Checklist

- ✅ API keys stored in environment variables
- ✅ Webhook signature verification enabled
- ✅ HTTPS enabled for webhook endpoint
- ✅ Input validation on all payment endpoints
- ✅ Order amount verification before payment
- ✅ Payment status verification after payment

## 7. Troubleshooting

### Common Issues:
1. **Invalid API Key**: Check if RAZORPAY_KEY_ID is correct
2. **Signature Verification Failed**: Verify RAZORPAY_WEBHOOK_SECRET
3. **Order Creation Failed**: Check amount format (should be in paise)
4. **Payment Verification Failed**: Ensure all required fields are sent

### Logs to Check:
- Server console for API errors
- Razorpay dashboard for payment status
- Webhook delivery logs in Razorpay dashboard
