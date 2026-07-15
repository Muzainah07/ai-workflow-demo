import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  defaultSettings,
  settingsSchema,
} from '../../schemas/settingsSchema'
import './SettingsForm.css'

function FieldError({ id, message }) {
  if (!message) return null

  return (
    <span id={id} className="field-error" role="alert">
      {message}
    </span>
  )
}

export default function SettingsForm({ onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettings,
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    await onSave?.(data)
  }

  return (
    <form
      className="settings-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <fieldset className="settings-fieldset">
        <legend>Profile</legend>

        <div className="form-field">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            aria-invalid={errors.displayName ? 'true' : 'false'}
            aria-describedby={
              errors.displayName ? 'displayName-error' : undefined
            }
            {...register('displayName')}
          />
          <FieldError id="displayName-error" message={errors.displayName?.message} />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div className="form-field">
          <label htmlFor="bio">
            Bio <span className="optional">(optional)</span>
          </label>
          <textarea
            id="bio"
            rows={3}
            aria-invalid={errors.bio ? 'true' : 'false'}
            aria-describedby={errors.bio ? 'bio-error' : undefined}
            {...register('bio')}
          />
          <FieldError id="bio-error" message={errors.bio?.message} />
        </div>
      </fieldset>

      <fieldset className="settings-fieldset">
        <legend>Preferences</legend>

        <div className="form-field">
          <label htmlFor="profileVisibility">Profile visibility</label>
          <select
            id="profileVisibility"
            aria-invalid={errors.profileVisibility ? 'true' : 'false'}
            aria-describedby={
              errors.profileVisibility ? 'profileVisibility-error' : undefined
            }
            {...register('profileVisibility')}
          >
            <option value="public">Public</option>
            <option value="friends">Friends only</option>
            <option value="private">Private</option>
          </select>
          <FieldError
            id="profileVisibility-error"
            message={errors.profileVisibility?.message}
          />
        </div>

        <div className="form-field form-field--checkbox">
          <label className="checkbox-label" htmlFor="emailNotifications">
            <input
              id="emailNotifications"
              type="checkbox"
              {...register('emailNotifications')}
            />
            <span>Send email notifications</span>
          </label>
        </div>
      </fieldset>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => reset(defaultSettings)}
          disabled={!isDirty || isSubmitting}
        >
          Reset
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save settings'}
        </button>
      </div>

      {isSubmitSuccessful && (
        <p className="form-success" role="status">
          Settings saved successfully.
        </p>
      )}
    </form>
  )
}
