# RnA11y — VoiceOver Custom Rotors demo

Expo app that demonstrates iOS **`UIAccessibilityCustomRotor`** support through
a local Expo module (`modules/accessibility-custom-rotors/`).

Mirrors the SwiftUI rotor pattern from
[cvs-health/ios-swiftui-accessibility-techniques](https://github.com/cvs-health/ios-swiftui-accessibility-techniques),
implemented for React Native via a wrapper view component.

## What's in the demo

A 5-day weather forecast with two VoiceOver rotors:

- **Days** — jumps directly between weekday headings (Mon → Tue → Wed …).
- **Rainy days** — jumps only to days with rain or storm condition.

Without rotors, VoiceOver users would have to swipe through every line
(temperature, wind, humidity) on every day to get to the next one.

## Local development (Mac required for `expo run`)

```sh
npm install
npx expo run:ios     # Mac only — builds and runs on simulator/device
```

## Building without a Mac via EAS Build

EAS Build runs the iOS build on Expo's cloud Macs. You don't need a local
macOS install — you do need an iOS device to install the build on, and either:

- An **Apple Developer Program** account ($99/yr) for ad-hoc distribution, or
- An **Apple ID** for free TestFlight internal testing (limited).

### One-time setup

```sh
npm install -g eas-cli
npm install
eas login
eas init           # links the project to your Expo account
eas credentials    # set up iOS signing (EAS can manage everything)
```

### Build a development client

A development client is a custom Expo Go that includes our native module. After
building once, JS changes hot-reload — only native changes need a rebuild.

```sh
eas build --profile development --platform ios
```

When the build finishes, EAS gives you a URL. Open it on the iPhone, install
the .ipa, trust the profile (Settings → General → VPN & Device Management),
then launch the app and scan the QR code from `npm start` on your laptop.

### Build a standalone preview

If you just want a self-contained .ipa to install (no Metro bundler running):

```sh
eas build --profile preview --platform ios
```

## Testing with VoiceOver

1. Install the build on a real iPhone (Simulator works but requires a Mac).
2. **Settings → Accessibility → VoiceOver → On** (or set a triple-click shortcut).
3. Open the app.
4. Focus inside the forecast list.
5. **Rotate two fingers** on the screen — the system rotor wheel appears.
6. Pick **Days** or **Rainy days**.
7. Swipe **down / up** with one finger — focus jumps between rotor items.

## How the native side works

`modules/accessibility-custom-rotors/ios/AccessibilityCustomRotorsView.swift`
exposes a Swift `ExpoView` subclass with a `rotors` prop. On each prop update
it rebuilds the `accessibilityCustomRotors` array on `self`. Each
`UIAccessibilityCustomRotor`'s item-search block walks the subview tree
looking up the target view by `accessibilityIdentifier` (= the `nativeID` you
set in JSX).

## Limitations (v1)

- iOS only. Android / Web render without rotor support.
- Static element lists — no live JS predicate yet.
- Items must be descendants of the wrapper component.

## File layout

```
RnA11y/
├── App.tsx                                  # weather forecast demo
├── app.json                                  # newArchEnabled: true, iOS bundle id
├── eas.json                                  # EAS Build profiles
└── modules/
    └── accessibility-custom-rotors/
        ├── expo-module.config.json           # apple-only registration
        ├── index.ts                          # public exports
        ├── ios/
        │   ├── AccessibilityCustomRotors.podspec
        │   ├── AccessibilityCustomRotorsModule.swift
        │   └── AccessibilityCustomRotorsView.swift
        └── src/
            ├── AccessibilityCustomRotors.types.ts
            ├── AccessibilityCustomRotorsView.tsx       # iOS
            └── AccessibilityCustomRotorsView.web.tsx   # web/android fallback
```
