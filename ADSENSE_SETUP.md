# Google AdSense Integration Guide

## Overview

This guide provides instructions for setting up and optimizing Google AdSense on your news website to maximize revenue while maintaining a good user experience.

## Setup Instructions

### 1. Create a Google AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up with your Google account
3. Complete the application process
4. Wait for approval (typically 1-3 weeks)

### 2. Configure Your Website

#### Update Environment Variables

In your `.env` file, add your AdSense client ID:

```
VITE_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

Replace `XXXXXXXXXXXXXXXX` with your actual AdSense publisher ID.

#### Update AdSense Script in index.html

The AdSense script has been added to your `index.html` file. Update it with your actual publisher ID:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

### 3. Ad Placements

We've integrated AdSense ads in strategic locations:

1. **Homepage**:
   - Top banner ad
   - Ads between news items (every 3 items)
   - Bottom banner ad

2. **Article Pages**:
   - Top banner ad
   - In-content ad (middle of article)
   - Bottom banner ad

3. **Sidebar**:
   - Vertical ad unit

## Optimization Tips

### Ad Formats and Sizes

- **Rectangle (336x280)**: High-performing ad size for in-content ads
- **Leaderboard (728x90)**: Effective for header/footer areas
- **Large Mobile Banner (320x100)**: Good for mobile views
- **Responsive Ads**: Automatically adjust to available space

### Placement Best Practices

1. **Above the Fold**: Place at least one ad unit where it's visible without scrolling
2. **Content Integration**: Ads within content typically perform better than sidebar ads
3. **Natural Breaks**: Place ads at natural breaks in content for better user experience
4. **Avoid Clustering**: Don't place too many ads close together

### Compliance Guidelines

1. **Ad Limits**: Maximum of 3 AdSense for Content units per page
2. **Content Policies**: Ensure your content complies with AdSense policies
3. **User Experience**: Maintain a good balance between content and ads
4. **Labeling**: Clearly label ads as "Advertisement" or "Sponsored" when necessary

## Performance Monitoring

1. **AdSense Dashboard**: Regularly check your AdSense dashboard for performance metrics
2. **A/B Testing**: Test different ad placements and formats to optimize revenue
3. **Page RPM**: Monitor your Page RPM (Revenue per Thousand Impressions) to gauge performance
4. **CTR (Click-Through Rate)**: Higher CTR generally means more effective ad placement

## Troubleshooting

### Common Issues

1. **Ads Not Showing**:
   - Verify your AdSense account is approved
   - Check that your client ID is correctly set in both `.env` and `index.html`
   - Ensure ad blockers are disabled when testing

2. **Low Revenue**:
   - Review ad placements for better positions
   - Check if your content is attracting the right audience
   - Consider the seasonality of ad spending

3. **Policy Violations**:
   - Regularly review AdSense policies
   - Address any policy violations promptly

## Advanced Strategies

1. **Auto Ads**: Consider enabling AdSense Auto Ads for automatic placement optimization
2. **Custom Channels**: Create custom channels to track performance of specific ad units
3. **Audience Targeting**: Use Google Analytics integration to improve ad targeting
4. **Ad Balance**: Experiment with the number of ads to find the optimal balance

## Resources

- [Google AdSense Help Center](https://support.google.com/adsense/)
- [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- [AdSense Best Practices](https://support.google.com/adsense/answer/1348695)

---

Remember that ad revenue depends on various factors including traffic volume, audience demographics, content niche, and seasonal trends. Continuous optimization and testing are key to maximizing your AdSense revenue.