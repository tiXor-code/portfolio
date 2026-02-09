import fs from 'fs';
import path from 'path';

const componentsDir = '/home/ubuntu/clawd/portfolio/src/components';
const components = ['About.tsx', 'Experience.tsx', 'Projects.tsx', 'TechStack.tsx', 'Contact.tsx'];

// Simple fix: replace intersection observer with immediate visible state
const fixComponent = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the useInView hook usage
  const oldPattern = /animate={inView \? "visible" : "hidden"}/g;
  const newPattern = 'animate="visible"';
  
  // Also replace any inView condition in animations  
  const oldPattern2 = /animate={inView \? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}/g;
  const newPattern2 = 'animate={{ opacity: 1, scale: 1 }}';
  
  content = content.replace(oldPattern, newPattern);
  content = content.replace(oldPattern2, newPattern2);
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed animations in ${path.basename(filePath)}`);
};

// Apply fix to all components
components.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    fixComponent(filePath);
  }
});

console.log('Animation fix complete!');