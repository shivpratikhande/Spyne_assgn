// ToggleButton.tsx

'use client'

import * as React from 'react'
import * as Switch from '@radix-ui/react-switch'

export default function ToggleButton() {
  // State to manage the toggle (on/off)
  const [isOn, setIsOn] = React.useState(false)

  // Handle the toggle change
  const handleToggle = (checked: boolean) => {
    setIsOn(checked)  // Update state when the switch is toggled
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Radix Switch component */}
      <Switch.Root
        checked={isOn}            // The current state (on/off)
        onCheckedChange={handleToggle}  // Event handler for state change
        className={`w-16 h-8 p-1 rounded-full transition-colors ${
          isOn ? 'bg-blue-500' : 'bg-gray-300'  // Background color based on state
        }`}
      >
        {/* Switch thumb (the slider part of the switch) */}
        <Switch.Thumb
          className={`block w-6 h-6 bg-white rounded-full transition-transform ${
            isOn ? 'translate-x-8' : 'translate-x-0'  // Position based on state
          }`}
        />
      </Switch.Root>
      
      {/* Display the current state */}
      <span>{isOn ? 'On' : 'Off'}</span>
    </div>
  )
}
