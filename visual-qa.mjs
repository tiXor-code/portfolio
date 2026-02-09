import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'http://localhost:3457/';
const SCREENSHOTS_DIR = './qa-screenshots/';

// Viewport configurations
const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 }
];

// Test results storage
const testResults = {
  screenshots: [],
  consoleErrors: [],
  layoutIssues: [],
  performanceMetrics: {},
  navigationTests: [],
  modalTests: [],
  accessibilityIssues: []
};

async function runVisualQA() {
  console.log('🚀 Starting Visual QA Tests...');
  
  const browser = await chromium.launch({ headless: true });
  
  for (const viewport of viewports) {
    console.log(`\n📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    // Listen for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`${viewport.name}: ${msg.text()}`);
      }
    });
    
    try {
      // Measure page load time and LCP
      const navigationStart = Date.now();
      await page.goto(SITE_URL, { waitUntil: 'networkidle' });
      
      // Wait for React app to render (look for content)
      await page.waitForSelector('#root > *', { timeout: 10000 });
      await page.waitForTimeout(2000); // Additional wait for dynamic content
      
      const navigationEnd = Date.now();
      const loadTime = navigationEnd - navigationStart;
      
      // Measure Largest Contentful Paint
      const lcp = await page.evaluate(() => {
        return new Promise(resolve => {
          new PerformanceObserver(list => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry ? lastEntry.startTime : 0);
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          // Fallback timeout
          setTimeout(() => resolve(0), 5000);
        });
      });
      
      testResults.performanceMetrics[viewport.name] = {
        loadTime: loadTime,
        lcp: lcp
      };
      
      console.log(`⚡ Load time: ${loadTime}ms, LCP: ${lcp.toFixed(2)}ms`);
      
      // Take full-page screenshot
      const fullPagePath = path.join(SCREENSHOTS_DIR, `full-page-${viewport.name}.png`);
      await page.screenshot({ 
        path: fullPagePath, 
        fullPage: true 
      });
      testResults.screenshots.push(fullPagePath);
      console.log(`📸 Full page screenshot: ${fullPagePath}`);
      
      // Check for horizontal scroll (layout overflow)
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      if (hasHorizontalScroll) {
        testResults.layoutIssues.push(`${viewport.name}: Horizontal scroll detected`);
        console.log(`⚠️ Layout issue: Horizontal scroll on ${viewport.name}`);
      }
      
      // Screenshot sections - Try multiple selector patterns for React apps
      const sections = [
        { name: 'hero', selectors: ['[id*="hero" i]', '[class*="hero" i]', 'section:first-of-type', 'header + section', '.hero', '#hero'] },
        { name: 'about', selectors: ['[id*="about" i]', '[class*="about" i]', 'section:has(h2:contains("About"))', '.about', '#about'] },
        { name: 'projects', selectors: ['[id*="project" i]', '[class*="project" i]', 'section:has(h2:contains("Project"))', '.projects', '#projects'] },
        { name: 'contact', selectors: ['[id*="contact" i]', '[class*="contact" i]', 'section:has(h2:contains("Contact"))', '.contact', '#contact'] }
      ];
      
      for (const section of sections) {
        let element = null;
        let usedSelector = '';
        
        // Try each selector until we find the section
        for (const selector of section.selectors) {
          try {
            const candidate = await page.locator(selector).first();
            if (await candidate.count() > 0) {
              element = candidate;
              usedSelector = selector;
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }
        
        try {
          
          if (element && await element.count() > 0) {
            const sectionPath = path.join(SCREENSHOTS_DIR, `${section.name}-${viewport.name}.png`);
            await element.screenshot({ path: sectionPath });
            testResults.screenshots.push(sectionPath);
            console.log(`📷 Section screenshot: ${sectionPath} (using ${usedSelector})`);
          } else {
            console.log(`⚠️ Section not found: ${section.name}`);
          }
        } catch (error) {
          console.log(`❌ Error screenshotting ${section}: ${error.message}`);
        }
      }
      
      // Test navigation links (only on desktop to avoid redundancy)
      if (viewport.name === 'desktop') {
        console.log('\n🔗 Testing navigation links...');
        
        // More comprehensive navigation selectors for React apps
        const navLinks = await page.locator('nav a, .nav-link, [role="navigation"] a, header a, .navbar a, .navigation a, a[href^="#"]').all();
        
        for (let i = 0; i < navLinks.length; i++) {
          try {
            const link = navLinks[i];
            const href = await link.getAttribute('href');
            const text = await link.textContent();
            
            if (href && href.startsWith('#')) {
              // Test anchor links
              await link.click();
              await page.waitForTimeout(500);
              
              const targetElement = page.locator(href);
              if (await targetElement.count() > 0) {
                testResults.navigationTests.push(`✅ Anchor link "${text}" (${href}) works`);
                console.log(`✅ Navigation link "${text}" works`);
              } else {
                testResults.navigationTests.push(`❌ Anchor link "${text}" (${href}) target not found`);
                console.log(`❌ Navigation link "${text}" target not found`);
              }
            } else if (href && (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel'))) {
              testResults.navigationTests.push(`ℹ️ External link "${text}" (${href}) - not tested`);
              console.log(`ℹ️ External link "${text}" detected`);
            }
          } catch (error) {
            testResults.navigationTests.push(`❌ Error testing navigation link: ${error.message}`);
          }
        }
        
        // Test project modals
        console.log('\n📦 Testing project modals...');
        
        // More comprehensive project/modal selectors
        const projectButtons = await page.locator('[data-modal], .project-item, .project-card, .project, button:has-text("View"), a:has-text("View"), button:has-text("Demo"), a:has-text("Demo"), [class*="project"] button, [class*="project"] a').all();
        
        for (let i = 0; i < Math.min(projectButtons.length, 3); i++) {
          try {
            const button = projectButtons[i];
            const buttonText = await button.textContent();
            
            // Click to open modal
            await button.click();
            await page.waitForTimeout(1000);
            
            // Check if modal opened
            const modal = page.locator('.modal, [role="dialog"], .project-modal, .overlay').first();
            if (await modal.count() > 0) {
              testResults.modalTests.push(`✅ Modal opens for: ${buttonText?.trim()}`);
              console.log(`✅ Modal opens for: ${buttonText?.trim()}`);
              
              // Screenshot the modal
              const modalPath = path.join(SCREENSHOTS_DIR, `modal-${i + 1}-${viewport.name}.png`);
              await page.screenshot({ path: modalPath });
              testResults.screenshots.push(modalPath);
              
              // Try to close modal
              const closeButton = page.locator('.close, .modal-close, [aria-label="Close"], button:has-text("×")').first();
              if (await closeButton.count() > 0) {
                await closeButton.click();
                await page.waitForTimeout(500);
                
                if (await modal.count() === 0 || !await modal.isVisible()) {
                  testResults.modalTests.push(`✅ Modal closes properly`);
                  console.log(`✅ Modal closes properly`);
                } else {
                  testResults.modalTests.push(`❌ Modal doesn't close properly`);
                }
              } else {
                // Try ESC key
                await page.keyboard.press('Escape');
                await page.waitForTimeout(500);
                testResults.modalTests.push(`ℹ️ Modal close tested with ESC key`);
              }
            } else {
              testResults.modalTests.push(`❌ No modal detected for: ${buttonText?.trim()}`);
              console.log(`❌ No modal detected for: ${buttonText?.trim()}`);
            }
          } catch (error) {
            testResults.modalTests.push(`❌ Error testing modal ${i + 1}: ${error.message}`);
          }
        }
        
        // Basic accessibility checks
        console.log('\n♿ Running accessibility checks...');
        
        // Check tab order
        const focusableElements = await page.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])').all();
        testResults.accessibilityIssues.push(`ℹ️ Found ${focusableElements.length} focusable elements`);
        
        // Test focus visibility
        for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
          try {
            await focusableElements[i].focus();
            const focusStyles = await page.evaluate(() => {
              const focused = document.activeElement;
              const styles = window.getComputedStyle(focused);
              return {
                outline: styles.outline,
                outlineWidth: styles.outlineWidth,
                boxShadow: styles.boxShadow
              };
            });
            
            const hasFocusIndicator = 
              focusStyles.outline !== 'none' || 
              focusStyles.outlineWidth !== '0px' ||
              focusStyles.boxShadow !== 'none';
              
            if (!hasFocusIndicator) {
              testResults.accessibilityIssues.push(`⚠️ Element ${i + 1} may lack focus indicator`);
            }
          } catch (error) {
            // Skip if element can't be focused
          }
        }
      }
      
      // Add console errors for this viewport
      if (consoleErrors.length > 0) {
        testResults.consoleErrors.push(...consoleErrors);
        console.log(`🔴 ${consoleErrors.length} console errors found`);
      } else {
        console.log(`✅ No console errors`);
      }
      
    } catch (error) {
      console.error(`❌ Error testing ${viewport.name}:`, error.message);
      testResults.layoutIssues.push(`${viewport.name}: Test error - ${error.message}`);
    }
    
    await context.close();
  }
  
  await browser.close();
  console.log('\n✅ Visual QA Tests Complete!');
  
  return testResults;
}

// Run the tests
runVisualQA().then(results => {
  console.log('\n📊 Generating report...');
  generateReport(results);
}).catch(error => {
  console.error('❌ QA Tests failed:', error);
});

function generateReport(results) {
  const report = `# Visual QA Report
Generated: ${new Date().toISOString()}

## 📸 Screenshots

### Full Page Screenshots
${results.screenshots.filter(s => s.includes('full-page')).map(s => `- ![${path.basename(s)}](${s})`).join('\n')}

### Section Screenshots
${results.screenshots.filter(s => !s.includes('full-page') && !s.includes('modal')).map(s => `- ![${path.basename(s)}](${s})`).join('\n')}

### Modal Screenshots
${results.screenshots.filter(s => s.includes('modal')).map(s => `- ![${path.basename(s)}](${s})`).join('\n')}

## 🔴 Console Errors
${results.consoleErrors.length > 0 ? results.consoleErrors.map(error => `- ${error}`).join('\n') : '✅ No console errors detected'}

## 📐 Layout Issues
${results.layoutIssues.length > 0 ? results.layoutIssues.map(issue => `- ${issue}`).join('\n') : '✅ No layout issues detected'}

## ⚡ Performance Metrics
${Object.entries(results.performanceMetrics).map(([viewport, metrics]) => 
  `- **${viewport}**: Load time ${metrics.loadTime}ms, LCP ${metrics.lcp.toFixed(2)}ms`
).join('\n')}

## 🔗 Navigation Tests
${results.navigationTests.length > 0 ? results.navigationTests.map(test => `- ${test}`).join('\n') : '❌ No navigation tests performed'}

## 📦 Modal Tests
${results.modalTests.length > 0 ? results.modalTests.map(test => `- ${test}`).join('\n') : '❌ No modal tests performed'}

## ♿ Accessibility Quick Checks
${results.accessibilityIssues.length > 0 ? results.accessibilityIssues.map(issue => `- ${issue}`).join('\n') : '❌ No accessibility checks performed'}

## 📋 Summary
- **Total Screenshots**: ${results.screenshots.length}
- **Console Errors**: ${results.consoleErrors.length}
- **Layout Issues**: ${results.layoutIssues.length}
- **Navigation Tests**: ${results.navigationTests.length}
- **Modal Tests**: ${results.modalTests.length}
- **Accessibility Issues**: ${results.accessibilityIssues.length}

## 🔧 Test Configuration
- **Site URL**: ${SITE_URL}
- **Viewports**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x812)
- **Browser**: Chromium
- **Screenshots Directory**: ${SCREENSHOTS_DIR}
`;

  fs.writeFileSync('/home/ubuntu/clawd/portfolio/VISUAL-QA.md', report);
  console.log('📄 Report saved to VISUAL-QA.md');
}