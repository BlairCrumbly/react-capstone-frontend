import { useState } from 'react'
import '../style/CreditCardForm.css'

export type CreditCardData = {
  pan: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

type CreditCardFormProps = {
  onSubmit: (data: CreditCardData) => Promise<void>
  disabled?: boolean
}

export function CreditCardForm({ onSubmit, disabled }: CreditCardFormProps) {
  const [form, setForm] = useState<CreditCardData>({
    pan: '', expiryMonth: '', expiryYear: '', cvv: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const formatPAN = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const handleChange = (field: keyof CreditCardData, raw: string) => {
    let value = raw
    if (field === 'pan')         value = formatPAN(raw)
    if (field === 'expiryMonth') value = raw.replace(/\D/g, '').slice(0, 2)
    if (field === 'expiryYear')  value = raw.replace(/\D/g, '').slice(0, 2)
    if (field === 'cvv')         value = raw.replace(/\D/g, '').slice(0, 4)
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await onSubmit(form)
    setSubmitting(false)
  }

  const isValid =
    form.pan.replace(/\s/g, '').length === 16 &&
    form.expiryMonth.length === 2 &&
    form.expiryYear.length === 2 &&
    form.cvv.length >= 3

  return (
    <div className="cc-form">
      <h2 className="cc-form__title">Payment Details</h2>

      <div className="cc-field cc-field--full">
        <label className="cc-label">Card Number</label>
        <input
          className="cc-input"
          type="text"
          inputMode="numeric"
          placeholder="0000 0000 0000 0000"
          value={form.pan}
          onChange={(e) => handleChange('pan', e.target.value)}
        />
      </div>

      <div className="cc-row">
        <div className="cc-field">
          <label className="cc-label">Expiry Month</label>
          <input className="cc-input" type="text" inputMode="numeric"
            placeholder="MM" value={form.expiryMonth}
            onChange={(e) => handleChange('expiryMonth', e.target.value)} />
        </div>
        <div className="cc-field">
          <label className="cc-label">Expiry Year</label>
          <input className="cc-input" type="text" inputMode="numeric"
            placeholder="YY" value={form.expiryYear}
            onChange={(e) => handleChange('expiryYear', e.target.value)} />
        </div>
        <div className="cc-field">
          <label className="cc-label">CVV</label>
          <input className="cc-input" type="password" inputMode="numeric"
            placeholder="•••" value={form.cvv}
            onChange={(e) => handleChange('cvv', e.target.value)} />
        </div>
      </div>

      <button
        className="cc-submit"
        onClick={handleSubmit}
        disabled={!isValid || submitting || disabled}
      >
        <span>{submitting ? 'Processing…' : 'Confirm Payment'}</span>
        <span className="cc-submit__icon" aria-hidden="true">
          {submitting ? '…' : '→'}
        </span>
      </button>
    </div>
  )
}