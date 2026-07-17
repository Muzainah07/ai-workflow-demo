import { useId, useState } from 'react'
import {
  defaultSettings,
  PROFILE_VISIBILITY_OPTIONS,
  sanitizeSettings,
  validateField,
  validateSettings,
} from '../../schemas/settingsSchema'
import './SettingsForm.css'

const VISIBILITY_LABELS = {
  public: 'Public',
  private: 'Private',
  friends: 'Friends only',
}

function FieldError({ id, message }) {
  if (!message) {
    return null
  }

  return (
    <p id={id} className="settings-form__error" role="alert">
      {message}
    </p>
  )
}

export default function SettingsForm({ initialValues = defaultSettings, onSave }) {
  const formId = useId()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const showError = (field) => Boolean((touched[field] || submitAttempted) && errors[field])

  const updateFieldError = (field, nextValue) => {
    const message = validateField(field, nextValue)

    setErrors((currentErrors) => {
      if (!message) {
        const nextErrors = { ...currentErrors }
        delete nextErrors[field]
        return nextErrors
      }

      return { ...currentErrors, [field]: message }
    })

    return message
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((currentValues) => ({ ...currentValues, [name]: nextValue }))
    setStatusMessage('')

    if (touched[name] || submitAttempted) {
      updateFieldError(name, nextValue)
    }
  }

  const handleBlur = (event) => {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }))
    updateFieldError(name, nextValue)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitAttempted(true)
    setStatusMessage('')

    const validation = validateSettings(values)

    setErrors(validation.errors)

    if (!validation.isValid) {
      return
    }

    const sanitizedValues = sanitizeSettings(values)
    setValues(sanitizedValues)
    onSave?.(sanitizedValues)
    setStatusMessage('Settings saved successfully.')
  }

  const { isValid } = validateSettings(values)

  return (
    <form
      className="settings-form"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={statusMessage ? `${formId}-status` : undefined}
    >
      <div className="settings-form__field">
        <label htmlFor={`${formId}-displayName`}>Display name</label>
        <input
          id={`${formId}-displayName`}
          name="displayName"
          type="text"
          value={values.displayName}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
          aria-invalid={showError('displayName')}
          aria-describedby={
            showError('displayName') ? `${formId}-displayName-error` : undefined
          }
          required
        />
        <FieldError
          id={`${formId}-displayName-error`}
          message={showError('displayName') ? errors.displayName : ''}
        />
      </div>

      <div className="settings-form__field">
        <label htmlFor={`${formId}-email`}>Email</label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          aria-invalid={showError('email')}
          aria-describedby={showError('email') ? `${formId}-email-error` : undefined}
          required
        />
        <FieldError
          id={`${formId}-email-error`}
          message={showError('email') ? errors.email : ''}
        />
      </div>

      <div className="settings-form__field">
        <label htmlFor={`${formId}-bio`}>Bio</label>
        <textarea
          id={`${formId}-bio`}
          name="bio"
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          maxLength={500}
          aria-invalid={showError('bio')}
          aria-describedby={
            showError('bio')
              ? `${formId}-bio-error ${formId}-bio-hint`
              : `${formId}-bio-hint`
          }
        />
        <p id={`${formId}-bio-hint`} className="settings-form__hint">
          {values.bio.length}/500 characters
        </p>
        <FieldError
          id={`${formId}-bio-error`}
          message={showError('bio') ? errors.bio : ''}
        />
      </div>

      <fieldset
        className="settings-form__fieldset"
        aria-describedby={
          showError('profileVisibility')
            ? `${formId}-profileVisibility-error`
            : undefined
        }
      >
        <legend>Profile visibility</legend>
        <div className="settings-form__radio-group">
          {PROFILE_VISIBILITY_OPTIONS.map((option) => (
            <label key={option} className="settings-form__radio">
              <input
                type="radio"
                name="profileVisibility"
                value={option}
                checked={values.profileVisibility === option}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showError('profileVisibility')}
              />
              <span>{VISIBILITY_LABELS[option]}</span>
            </label>
          ))}
        </div>
        <FieldError
          id={`${formId}-profileVisibility-error`}
          message={
            showError('profileVisibility') ? errors.profileVisibility : ''
          }
        />
      </fieldset>

      <div className="settings-form__field settings-form__field--checkbox">
        <label htmlFor={`${formId}-emailNotifications`}>
          <input
            id={`${formId}-emailNotifications`}
            name="emailNotifications"
            type="checkbox"
            checked={values.emailNotifications}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>Email notifications</span>
        </label>
        <p className="settings-form__hint">
          Receive updates about account activity and product news.
        </p>
        <FieldError
          id={`${formId}-emailNotifications-error`}
          message={
            showError('emailNotifications') ? errors.emailNotifications : ''
          }
        />
      </div>

      {statusMessage ? (
        <p
          id={`${formId}-status`}
          className="settings-form__status"
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="settings-form__submit"
        disabled={submitAttempted && !isValid}
      >
        Save settings
      </button>
    </form>
  )
}
