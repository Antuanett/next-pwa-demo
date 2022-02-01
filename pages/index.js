import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";

export default function Home() {
  const [installPromptEvent, setInstallPromptEvent] = useState()

  useEffect(() => {
    if (typeof window === 'object') {
      window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent Chrome <= 67 from automatically showing the prompt
        event.preventDefault();
        // Stash the event so it can be triggered later.
        setInstallPromptEvent(event)
        // Update the install UI to notify the user app can be installed
        document.querySelector('#install-button').disabled = false;
      });
    }
  }, [])

  const installUp = () => {
    // Update the install UI to remove the install button
    document.querySelector('#install-button').disabled = true;
    // Show the modal add to home screen dialog
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      setInstallPromptEvent(null)
    });
  }

  return (
    <div className={styles.container}>
      <button id="install-button">Install</button>
    </div>
  )
}
