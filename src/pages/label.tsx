import React from 'react'
import { Label } from '../components/ui/label'
import { Icon } from '../components/ui/icon'
import { Button } from '../components/ui/button'

export default function LabelTestPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Label Component Tests</h1>
        <p className="text-muted-foreground">Comprehensive testing of label configurations and accessibility</p>
      </div>

      {/* Basic Labels */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Labels</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="basic-input">Simple Label</Label>
            <input
              id="basic-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Type something..."
            />
          </div>
          <div>
            <Label>Label without htmlFor</Label>
            <p className="text-sm text-muted-foreground mt-1">
              This label is not associated with a specific form control
            </p>
          </div>
        </div>
      </div>

      {/* Labels with Icons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Labels with Icons</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email-input" icon="user">
              Email Address
            </Label>
            <input
              id="email-input"
              type="email"
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password-input" icon="eye-closed">
              Password
            </Label>
            <input
              id="password-input"
              type="password"
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Enter password"
            />
          </div>
          <div>
            <Label htmlFor="search-input" icon="search">
              Search
            </Label>
            <input
              id="search-input"
              type="search"
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Search items..."
            />
          </div>
          <div>
            <Label htmlFor="file-input" icon="upload">
              Upload File
            </Label>
            <input
              id="file-input"
              type="file"
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Label Styling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Label Styling</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="styled-input" className="text-primary">
              Primary Label
            </Label>
            <input
              id="styled-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Styled label example"
            />
          </div>
          <div>
            <Label htmlFor="large-input" className="text-lg font-semibold">
              Large Label
            </Label>
            <input
              id="large-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Large label example"
            />
          </div>
          <div>
            <Label htmlFor="custom-input" className="text-blue-600 uppercase tracking-wide">
              Custom Styled Label
            </Label>
            <input
              id="custom-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Custom styled label"
            />
          </div>
        </div>
      </div>

      {/* Form Layout Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Layout Examples</h2>

        {/* Vertical Form */}
        <div className="space-y-4 p-6 border rounded-lg">
          <h3 className="text-lg font-medium">Vertical Form Layout</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" icon="user">
                Full Name
              </Label>
              <input
                id="name"
                type="text"
                className="mt-1 w-full p-2 border rounded-md"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email" icon="mail">
                Email Address
              </Label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full p-2 border rounded-md"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="message" icon="edit">
                Message
              </Label>
              <textarea
                id="message"
                className="mt-1 w-full p-2 border rounded-md"
                rows={4}
                placeholder="Your message here..."
              />
            </div>
          </div>
        </div>

        {/* Horizontal Form */}
        <div className="space-y-4 p-6 border rounded-lg">
          <h3 className="text-lg font-medium">Horizontal Form Layout</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="horizontal-name" icon="user" className="min-w-[120px]">
                Name
              </Label>
              <input
                id="horizontal-name"
                type="text"
                className="flex-1 p-2 border rounded-md"
                placeholder="John Doe"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="horizontal-email" icon="mail" className="min-w-[120px]">
                Email
              </Label>
              <input
                id="horizontal-email"
                type="email"
                className="flex-1 p-2 border rounded-md"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="horizontal-phone" icon="phone" className="min-w-[120px]">
                Phone
              </Label>
              <input
                id="horizontal-phone"
                type="tel"
                className="flex-1 p-2 border rounded-md"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Checkbox and Radio Groups */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Checkbox and Radio Groups</h2>

        <div className="space-y-3">
          <Label icon="heart">Preferences</Label>
          <div className="space-y-2 ml-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="newsletter" />
              <Label htmlFor="newsletter" className="font-normal">
                Subscribe to newsletter
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="notifications" />
              <Label htmlFor="notifications" className="font-normal">
                Enable notifications
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="updates" />
              <Label htmlFor="updates" className="font-normal">
                Product updates
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label icon="info">Contact Method</Label>
          <div className="space-y-2 ml-6">
            <div className="flex items-center gap-2">
              <input type="radio" name="contact" id="contact-email" />
              <Label htmlFor="contact-email" className="font-normal">
                Email
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="contact" id="contact-phone" />
              <Label htmlFor="contact-phone" className="font-normal">
                Phone
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="contact" id="contact-mail" />
              <Label htmlFor="contact-mail" className="font-normal">
                Mail
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Testing */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility Testing</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Labels should be properly associated with form controls for screen readers
          </p>

          <div>
            <Label htmlFor="accessible-input" icon="info">
              Accessible Input
            </Label>
            <input
              id="accessible-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md"
              aria-describedby="input-help"
              placeholder="This input has proper accessibility"
            />
            <p id="input-help" className="text-sm text-muted-foreground mt-1">
              This help text is associated with the input above
            </p>
          </div>

          <div>
            <Label htmlFor="required-input" icon="warning">
              Required Field
            </Label>
            <input
              id="required-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md"
              required
              aria-required="true"
              placeholder="This field is required"
            />
            <p className="text-sm text-destructive mt-1">
              * This field is required
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Interactive Examples</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="interactive-input" icon="edit">
              Interactive Label Test
            </Label>
            <input
              id="interactive-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md"
              onChange={(e) => {
                const label = document.querySelector('[for="interactive-input"]')
                if (label) {
                  label.textContent = e.target.value ? `✓ ${e.target.value}` : 'Interactive Label Test'
                }
              }}
              placeholder="Type to change the label text"
            />
          </div>

          <div>
            <Label htmlFor="toggle-input" icon="eye-open">
              Show/Hide Password
            </Label>
            <div className="flex gap-2 mt-1">
              <input
                id="toggle-input"
                type="password"
                className="flex-1 p-2 border rounded-md"
                defaultValue="secret-password"
              />
              <Button
                variant="outline"
                onClick={() => {
                  const input = document.getElementById('toggle-input') as HTMLInputElement
                  const label = document.querySelector('[for="toggle-input"]') as HTMLElement
                  if (input.type === 'password') {
                    input.type = 'text'
                    label.innerHTML = '<Icon metaphor="eye-closed" className="mr-2"></Icon>Hide Password'
                  } else {
                    input.type = 'password'
                    label.innerHTML = '<Icon metaphor="eye-open" className="mr-2"></Icon>Show Password'
                  }
                }}
              >
                Toggle
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Icon Combinations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Icon Combinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="success-input" icon="success" className="text-green-600">
              Successful Input
            </Label>
            <input
              id="success-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md border-green-300"
              defaultValue="Valid data"
            />
          </div>
          <div>
            <Label htmlFor="error-input" icon="error" className="text-red-600">
              Error Input
            </Label>
            <input
              id="error-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md border-red-300"
              defaultValue="Invalid data"
            />
          </div>
          <div>
            <Label htmlFor="warning-input" icon="warning" className="text-yellow-600">
              Warning Input
            </Label>
            <input
              id="warning-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md border-yellow-300"
              defaultValue="Needs attention"
            />
          </div>
          <div>
            <Label htmlFor="info-input" icon="info" className="text-blue-600">
              Info Input
            </Label>
            <input
              id="info-input"
              type="text"
              className="mt-1 w-full p-2 border rounded-md border-blue-300"
              defaultValue="Additional info"
            />
          </div>
        </div>
      </div>
    </div>
  )
}