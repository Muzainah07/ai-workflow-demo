export const PROFILE_VISIBILITY_OPTIONS = ['public', 'private', 'friends']

export const defaultSettings = {
  displayName: '',
  email: '',
  bio: '',
  profileVisibility: 'public',
  emailNotifications: true,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateDisplayName(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Display name is required.'
  }

  if (trimmed.length < 2) {
    return 'Display name must be at least 2 characters.'
  }

  if (trimmed.length > 50) {
    return 'Display name must be 50 characters or fewer.'
  }

  return ''
}

export function validateEmail(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Email is required.'
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    return 'Enter a valid email address.'
  }

  return ''
}

export function validateBio(value) {
  if (value.length > 500) {
    return 'Bio must be 500 characters or fewer.'
  }

  return ''
}

export function validateProfileVisibility(value) {
  if (!PROFILE_VISIBILITY_OPTIONS.includes(value)) {
    return 'Select a valid profile visibility option.'
  }

  return ''
}

export function validateEmailNotifications(value) {
  if (typeof value !== 'boolean') {
    return 'Email notifications must be enabled or disabled.'
  }

  return ''
}

const fieldValidators = {
  displayName: validateDisplayName,
  email: validateEmail,
  bio: validateBio,
  profileVisibility: validateProfileVisibility,
  emailNotifications: validateEmailNotifications,
}

export function validateField(field, value) {
  const validator = fieldValidators[field]

  if (!validator) {
    return ''
  }

  return validator(value)
}

export function validateSettings(values) {
  const errors = {}

  for (const field of Object.keys(fieldValidators)) {
    const message = validateField(field, values[field])

    if (message) {
      errors[field] = message
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function sanitizeSettings(values) {
  return {
    displayName: values.displayName.trim(),
    email: values.email.trim(),
    bio: values.bio.trim(),
    profileVisibility: values.profileVisibility,
    emailNotifications: values.emailNotifications,
  }
}
