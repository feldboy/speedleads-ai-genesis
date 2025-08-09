# Accessibility Widget Integration

## Changes Made

1. **Removed Custom Accessibility Implementation**:
   - Deleted `src/components/AccessibilityMenu.tsx` component that was providing custom accessibility features

2. **External Accessibility Widget**:
   - Verified that the Sienna accessibility widget is correctly integrated via the script in `index.html`:
   ```html
   <!-- Accessibility Widget -->
   <script src="https://website-widgets.pages.dev/dist/sienna.min.js" defer></script>
   ```

3. **Note About Custom Button**:
   - The custom accessibility button with id="accessibility_menu_button" mentioned in the requirements was not found in the codebase. If it exists in a separate branch or unmapped component, it should be removed.
   - The widget should now be fully functional with the external Sienna implementation.

## Additional Notes

- The AccessibilityStatement.tsx page already references the Sienna widget in its content.
- The Sienna widget uses its own interface and doesn't require the custom implementation that was previously used.
- Widget positioning may need adjustment if it interferes with other UI elements like the WhatsApp button or chatbot.

## Widget Z-index Considerations

Other floating UI elements in the system use these z-indexes:
- Header: z-50
- WhatsApp button: z-40
- Chatbot (likely): z-30 or similar

If the Sienna widget has positioning conflicts, consider adjusting its z-index via CSS (example):

```css
/* Add to src/index.css if needed */
.__sienna-widget {
  z-index: 45 !important; /* Adjust as needed */
}
``` 