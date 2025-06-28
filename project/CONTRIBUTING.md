# 🤝 Contributing to MFBK-Reconn Toolkit

Thank you for your interest in contributing to MFBK-Reconn Toolkit! We welcome contributions from the cybersecurity community and appreciate your help in making this tool better.

## 🚀 How to Contribute

### 1. Fork and Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/yourusername/mfbk-reconn-toolkit.git
cd mfbk-reconn-toolkit

# Add upstream remote
git remote add upstream https://github.com/0xmfbk/mfbk-reconn-toolkit.git
```

### 2. Create a Branch
```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b bugfix/issue-description
```

### 3. Make Changes
- Follow the existing code style and conventions
- Add proper documentation for new features
- Include comments for complex logic
- Ensure responsive design for UI changes

### 4. Test Your Changes
```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build to ensure no build errors
npm run build

# Run linting
npm run lint
```

### 5. Commit and Push
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new OSINT tool integration"

# Push to your fork
git push origin feature/your-feature-name
```

### 6. Create Pull Request
- Go to GitHub and create a pull request
- Provide a clear description of your changes
- Reference any related issues

## 📝 Contribution Types

### 🔧 Adding New Tools
When adding new OSINT tools to the toolkit:

1. **Research the tool** thoroughly
2. **Add to appropriate category** in `categoriesData`
3. **Include proper metadata**:
   ```typescript
   {
     name: 'Tool Name',
     type: 'Tool Type',
     description: 'Clear, concise description',
     link: 'https://tool-website.com',
     command: 'example-command --help' // if CLI tool
   }
   ```
4. **Verify the tool is actively maintained**
5. **Ensure it's useful for cybersecurity professionals**

### 🎨 UI/UX Improvements
For interface enhancements:

1. **Maintain cyberpunk aesthetic**
2. **Ensure responsive design**
3. **Test on multiple screen sizes**
4. **Follow existing color schemes**
5. **Preserve accessibility standards**

### 🐛 Bug Fixes
When fixing bugs:

1. **Create an issue first** if one doesn't exist
2. **Include reproduction steps**
3. **Test your fix thoroughly**
4. **Update documentation if needed**

### 📚 Documentation
For documentation improvements:

1. **Use clear, concise language**
2. **Include code examples where helpful**
3. **Follow existing formatting**
4. **Update table of contents if needed**

## 🎯 Code Style Guidelines

### TypeScript/React
```typescript
// Use meaningful component names
const ReconToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  // Use proper typing
  const handleToolClick = (tool: Tool): void => {
    // Implementation
  };

  return (
    <div className="tool-card">
      {/* Clear, semantic JSX */}
    </div>
  );
};
```

### CSS/Tailwind
```jsx
// Use semantic class names
<div className="flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-purple-500">
  {/* Maintain consistent spacing and colors */}
</div>
```

### File Organization
```
src/
├── components/          # React components
├── services/           # API services
├── types/              # TypeScript types
├── utils/              # Utility functions
└── styles/             # CSS files
```

## 🔒 Security Guidelines

### Tool Verification
- **Verify tool legitimacy** before adding
- **Check for malware/suspicious behavior**
- **Ensure tools follow ethical guidelines**
- **Validate all external links**

### Code Security
- **No hardcoded secrets** or API keys
- **Sanitize user inputs**
- **Follow secure coding practices**
- **Avoid dangerous functions**

### Legal Compliance
- **Only include legal tools**
- **Add appropriate disclaimers**
- **Respect tool licensing**
- **Follow responsible disclosure**

## 📋 Pull Request Checklist

Before submitting your PR, ensure:

- [ ] **Code follows project conventions**
- [ ] **All tests pass** (`npm run build`)
- [ ] **No linting errors** (`npm run lint`)
- [ ] **Documentation updated** if needed
- [ ] **Responsive design tested**
- [ ] **Security considerations addressed**
- [ ] **Performance impact minimal**
- [ ] **Accessibility maintained**

## 🚫 What Not to Contribute

Please avoid:

- **Illegal or unethical tools**
- **Malware or suspicious software**
- **Tools requiring payment/registration**
- **Broken or abandoned projects**
- **Duplicate functionality**
- **Copyright violations**

## 🏷️ Commit Message Format

Use conventional commit format:

```
type(scope): description

feat(tools): add new subdomain enumeration tool
fix(ui): resolve mobile responsiveness issue
docs(readme): update installation instructions
style(css): improve button hover effects
refactor(components): optimize tool rendering
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting/styling
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

## 🐛 Reporting Issues

### Bug Reports
Include:
- **Clear description** of the problem
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Browser/environment info**
- **Screenshots** if applicable

### Feature Requests
Include:
- **Use case description**
- **Proposed solution**
- **Alternative approaches**
- **Additional context**

## 💬 Getting Help

- **GitHub Discussions** for general questions
- **Issues** for bug reports and feature requests
- **Pull Requests** for code contributions

## 🎖️ Recognition

Contributors will be:
- **Listed in CONTRIBUTORS.md**
- **Mentioned in release notes**
- **Credited in documentation**

## 📜 Code of Conduct

- **Be respectful** and inclusive
- **Focus on constructive feedback**
- **Help others learn and grow**
- **Follow ethical guidelines**
- **Respect privacy and security**

---

Thank you for contributing to MFBK-Reconn Toolkit! Together, we're building better tools for the cybersecurity community. 🔥 