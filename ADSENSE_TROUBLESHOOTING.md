# AdSense Troubleshooting Guide

## Common Issues and Solutions

### 400 Errors from googleads.g.doubleclick.net

**Problem**: You're seeing multiple 400 errors in the browser console from Google's ad servers.

**Cause**: This typically happens when:
1. Using placeholder/dummy ad slot IDs (like `1234567890`)
2. Ad slots that don't exist in your AdSense account
3. Incorrect AdSense client ID format

**Solution**:

#### 1. Get Real Ad Slot IDs

1. Log into your [Google AdSense account](https://www.google.com/adsense/)
2. Go to **Ads** → **By ad unit**
3. Create new ad units or copy existing ad unit IDs
4. Ad slot IDs are typically 10-digit numbers

#### 2. Update Environment Variables

Replace the placeholder values in your `.env` file:

```env
# Replace these with your actual ad slot IDs from AdSense
VITE_ADSENSE_SLOT_RECTANGLE=your_actual_rectangle_slot_id
VITE_ADSENSE_SLOT_HORIZONTAL=your_actual_horizontal_slot_id
VITE_ADSENSE_SLOT_VERTICAL=your_actual_vertical_slot_id
VITE_ADSENSE_SLOT_SIDEBAR=your_actual_sidebar_slot_id
```

#### 3. Verify Client ID Format

Ensure your AdSense client ID includes the `ca-pub-` prefix:

```env
VITE_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-4811298709706693
```

### Development vs Production

**During Development**:
- The application will show placeholder ad spaces with dashed borders
- No actual ads will load (preventing 400 errors)
- This is normal and expected behavior

**In Production**:
- Replace all placeholder ad slot IDs with real ones from your AdSense account
- Ads will load properly once configured correctly

### Ad Slot Types and Recommended Sizes

| Slot Type | Recommended Size | Best Placement |
|-----------|------------------|----------------|
| Rectangle | 300x250 | Within content, sidebar |
| Horizontal | 728x90 or 320x50 | Header, footer, between content |
| Vertical | 160x600 or 120x600 | Sidebar |
| Responsive | Auto-sizing | Any location |

### Testing Your Setup

1. **Check Console**: No 400 errors should appear
2. **Verify Placeholders**: In development, you should see "Ad Space - Configure AdSense" placeholders
3. **Production Test**: Deploy with real ad slots to see actual ads

### AdSense Policy Compliance

- **Maximum 3 ad units** per page for content ads
- Maintain good **content-to-ad ratio**
- Ensure ads don't interfere with **site navigation**
- Follow **AdSense content policies**

### Getting Help

If you continue experiencing issues:

1. Check the [AdSense Help Center](https://support.google.com/adsense/)
2. Verify your site is approved for AdSense
3. Ensure your AdSense account is in good standing
4. Test with a single ad unit first before adding multiple

### Environment Variables Reference

```env
# Required for AdSense integration
VITE_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-your-publisher-id

# Ad slot IDs (get these from your AdSense dashboard)
VITE_ADSENSE_SLOT_RECTANGLE=your_rectangle_ad_slot_id
VITE_ADSENSE_SLOT_HORIZONTAL=your_horizontal_ad_slot_id
VITE_ADSENSE_SLOT_VERTICAL=your_vertical_ad_slot_id
VITE_ADSENSE_SLOT_SIDEBAR=your_sidebar_ad_slot_id
```

**Note**: Never commit real ad slot IDs to public repositories. Use environment variables and keep your `.env` file private.