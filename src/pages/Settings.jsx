import SettingsForm from '../components/settings/SettingsForm'
import './Settings.css'

export default function Settings() {
  const handleSave = (savedValues) => {
    console.info('Settings saved:', savedValues)
  }

  return (
    <main className="settings-page">
      <header className="settings-page__header">
        <h1>Settings</h1>
        <p>Manage your profile details and notification preferences.</p>
      </header>

      <SettingsForm onSave={handleSave} />
    </main>
  )
}
