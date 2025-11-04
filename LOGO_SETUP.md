# NutriPak Logo Setup

## Important Note

A placeholder logo file has been created at `/public/logo.png`.

**Please replace this with your actual NutriPak brand logo.**

### Logo Requirements

- **Format**: PNG or SVG
- **Location**: `/public/logo.png`
- **Recommended Size**: 200x200px or larger
- **Background**: Transparent (recommended)
- **Colors**: Should align with brand palette (Green #2C5F2D, Gold #A88F40, Cream #FAF8F3, Terracotta #C7573A)

### How to Replace

1. Prepare your logo file
2. Save it as `logo.png` in the `/public` directory
3. The logo will automatically appear across all pages:
   - Home page (Coming Soon)
   - Admin login
   - Admin dashboard
   - Review submission pages
   - Thank you page
   - 404 page

### Logo Usage in Code

The logo is used via the `Logo` component located at `/src/components/brand/Logo.tsx`.

You can customize the size by passing the `className` prop:
```tsx
<Logo className="h-12 w-auto" />  // Small
<Logo className="h-16 w-auto" />  // Medium (default)
<Logo className="h-24 w-auto" />  // Large
```
