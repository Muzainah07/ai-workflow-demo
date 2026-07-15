import { z } from 'zod'

export const settingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be 50 characters or fewer'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  bio: z
    .string()
    .max(200, 'Bio must be 200 characters or fewer')
    .optional()
    .or(z.literal('')),
  emailNotifications: z.boolean(),
  profileVisibility: z.enum(['public', 'private', 'friends'], {
    errorMap: () => ({ message: 'Select a visibility option' }),
  }),
})

export const defaultSettings = {
  displayName: '',
  email: '',
  bio: '',
  emailNotifications: true,
  profileVisibility: 'public',
}
