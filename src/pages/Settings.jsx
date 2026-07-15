import { useState } from 'react'
import SettingsForm from '../components/settings/SettingsForm'
import './Settings.css'

export default function Settings() {
  const [savedSettings, setSavedSettings] = useState(null)

  const handleSave = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSavedSettings(data)
    console.log('Settings saved:', data)
  }

  return (
    <section className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Update your profile and notification preferences.</p>
      </header>

      <SettingsForm onSave={handleSave} />

      {savedSettings && (
        <aside className="settings-preview" aria-label="Last saved values">
          <h2>Last saved</h2>
          <dl>
            <div>
              <dt>Display name</dt>
              <dd>{savedSettings.displayName}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{savedSettings.email}</dd>
            </div>
            {savedSettings.bio && (
              <div>
                <dt>Bio</dt>
                <dd>{savedSettings.bio}</dd>
              </div>
            )}
            <div>
              <dt>Visibility</dt>
              <dd>{savedSettings.profileVisibility}</dd>
            </div>
            <div>
              <dt>Email notifications</dt>
              <dd>{savedSettings.emailNotifications ? 'On' : 'Off'}</dd>
            </div>
          </dl>
        </aside>
      )}
    </section>
  )
}
