# 🔥 Icon Forge - Dynamic File Icon Generator API

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **A powerful Node.js API for generating beautiful, customizable SVG file icons on-the-fly** ✨

Transform any file extension into a stunning visual icon with our dynamic SVG generation API. Perfect for file managers, documentation sites, developer tools, and any application that needs beautiful file type representations.

## 🌟 Features

- **Dynamic SVG Generation** - Create file icons for any extension instantly
- **Fully Customizable** - Control colors, fonts, sizes, and styling
- **High Performance** - Fast generation with intelligent caching
- **REST API** - Simple HTTP endpoints for easy integration
- **Beautiful UI** - Interactive documentation and testing interface
- **Cross-Platform** - Works everywhere
- **Open Source** - MIT licensed and community-driven

## 🎨 Visual Examples

See Icon Forge in action! Here are some examples of dynamically generated file icons:

### JavaScript Icon
<img src="./examples/js.svg" alt="JavaScript Icon" width="100" height="100">

**Generated with:** `GET /file-icon?ext=js`

### EXE Icon  
<img src="./examples/exe.svg" alt="Extension Icon" width="100" height="100">

**Generated with:** `GET /file-icon?ext=exe`



> 💡 **Try it yourself:** Visit our [interactive documentation](http://localhost:3000) to generate icons in real-time!

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/egyjs/icon-forge.git
cd icon-forge
npm install
npm start
```

### Basic Usage

Generate a file icon by simply making a GET request:

```bash
# Generate a JavaScript file icon
curl "http://localhost:3000/file-icon?ext=js"

# Generate a PDF icon with custom colors
curl "http://localhost:3000/file-icon?ext=pdf&textColor=%23ffffff&bgColor=%23e74c3c"
```

## 📖 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### `GET /file-icon`
Generate a custom file icon SVG

**Parameters:**
- `ext` or `extension` (required) - File extension (1-10 alphanumeric characters)
- `textColor` (optional) - Hex color for text (e.g., `#ffffff`)
- `fontSize` (optional) - Font size in pixels (10-40)
- `bgColor` (optional) - Background color in hex (e.g., `#3498db`)

**Example:**
```
GET /file-icon?ext=png&textColor=#0078d4&fontSize=25&bgColor=#f44336
```

#### `GET /health`
Health check endpoint

#### `GET /api/docs`
Complete API documentation in JSON format

### Response Format

All successful requests return SVG content with appropriate headers:
- Content-Type: `image/svg+xml`
- Cache-Control: `public, max-age=86400`

## 🎨 Customization Examples

### Basic File Icons
```html
<!-- JavaScript file -->
<img src="http://localhost:3000/file-icon?ext=js" alt="JS file">

<!-- Python file -->
<img src="http://localhost:3000/file-icon?ext=py" alt="Python file">

<!-- PDF document -->
<img src="http://localhost:3000/file-icon?ext=pdf" alt="PDF file">
```

### Custom Styled Icons
```html
<!-- Large TypeScript icon with custom colors -->
<img src="http://localhost:3000/file-icon?ext=ts&textColor=#ffffff&fontSize=25&bgColor=#3178c6" alt="TypeScript file">

<!-- Small JSON icon -->
<img src="http://localhost:3000/file-icon?ext=json&fontSize=20&bgColor=#ff9500" alt="JSON file">
```

### Integration Examples

#### HTML/CSS
```html
<div class="file-list">
  <div class="file-item">
    <img src="/file-icon?ext=docx&bgColor=#2b579a" class="file-icon">
    <span>document.docx</span>
  </div>
</div>
```

#### React Component
```jsx
const FileIcon = ({ extension, size = 32 }) => (
  <img 
    src={`/file-icon?ext=${extension}&fontSize=${Math.min(size, 40)}`}
    width={size}
    height={size}
    alt={`${extension} file`}
  />
);
```

#### Vue.js Component
```vue
<template>
  <img 
    :src="`/file-icon?ext=${extension}&bgColor=${color}`"
    class="file-icon"
    :alt="`${extension} file`"
  />
</template>
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/egyjs/icon-forge.git
   cd icon-forge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Visit the documentation**
   Open http://localhost:3000 in your browser

### Project Structure

```
icon-forge/
├── server.js              # Main server application
├── package.json           # Project dependencies
├── file-icon-template.svg # SVG template for icons
├── public/
│   └── index.html         # Interactive documentation
└── README.md             # This file
```

### Key Components

#### Server (server.js)
- Express.js web server
- SVG template processing
- Request validation
- CORS handling
- Static file serving

#### SVG Template (file-icon-template.svg)
- Fredoka font integration
- Customizable placeholders
- Responsive design
- Professional styling

#### Documentation Interface (public/index.html)
- Interactive API testing
- Real-time preview
- Parameter validation
- Copy-paste ready examples

### Available Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with hot reload
npm test       # Run test suite (placeholder)
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port number |
| `NODE_ENV` | `development` | Environment mode |

### API Implementation Details

#### Color Management
- 8 predefined background colors for consistent theming
- Stable color assignment using string hashing
- Full hex color validation
- Fallback to defaults for invalid inputs

#### Font Handling
- Self-hosted Fredoka font (embedded in SVG)
- Automatic size adjustment for long extensions
- Consistent typography across all icons

#### Caching Strategy
- Client-side caching with max-age headers
- Stateless design for optimal performance
- No server-side storage required

## 🧪 Testing

### Manual Testing
Visit the interactive documentation at `http://localhost:3000` to test different configurations.

### API Testing
```bash
# Test basic functionality
curl -s "http://localhost:3000/file-icon?ext=test" | head -n 5

# Test error handling
curl -s "http://localhost:3000/file-icon" # Should return 400 error

# Test health endpoint
curl -s "http://localhost:3000/health"
```

### Performance Testing
```bash
# Test response time
time curl -s "http://localhost:3000/file-icon?ext=perf" > /dev/null
```



## 🤝 Contributing

We love contributions! Whether it's bug fixes, feature additions, documentation improvements, or design enhancements, your help makes this project better for everyone.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test your changes** thoroughly
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Contribution Ideas

- 🎨 **Design**: New SVG templates, icon styles, color schemes
- 🔧 **Features**: Additional customization options, new endpoints
- 📚 **Documentation**: Tutorials, examples, API guides
- 🐛 **Bug Fixes**: Performance improvements, edge case handling
- 🧪 **Testing**: Unit tests, integration tests, performance tests
- 🌐 **Internationalization**: Multi-language support

### Development Guidelines

- Follow existing code style and patterns
- Add tests for new features
- Update documentation for API changes
- Use meaningful commit messages
- Keep pull requests focused and atomic

## 📋 Use Cases

### File Management Applications
- Desktop file managers
- Cloud storage interfaces
- File sharing platforms

### Developer Tools
- Code editors and IDEs
- Documentation generators
- Build system outputs

### Content Management
- CMS file browsers
- Media libraries
- Document management systems

### Educational Platforms
- Coding tutorials
- File type education
- Programming courses

## 🔧 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

**Invalid SVG output**
- Check it in browser
- Verify template file exists
- Validate input parameters

**CORS errors**
- Ensure CORS is properly configured
- Check request headers
- Verify origin whitelist

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Fredoka Font](https://fonts.google.com/specimen/Fredoka)** - Beautiful typography by Google Fonts
- **Express.js** - Fast, minimalist web framework
- **SVG Community** - Inspiration and best practices
- **Open Source Contributors** - Making this project better every day

## 📞 Support

- 📧 **Email**: [el3zahaby@gmail.com](mailto:el3zahaby@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/egyjs/icon-forge/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/egyjs/icon-forge/discussions)
- 📖 **Documentation**: [Live API Docs](http://localhost:3000)

## 🔮 Roadmap

- [ ] **Custom Font Support** - Upload and use custom fonts
- [ ] **Icon Templates** - Multiple visual styles and layouts  
- [ ] **Batch Generation** - Generate multiple icons at once
- [ ] **Advanced Styling** - Gradients, shadows, animations
- [ ] **Analytics Dashboard** - Usage statistics and insights
- [ ] **CDN Integration** - Global distribution network
- [ ] **Plugin System** - Extensible architecture

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by the Icon Forge community

[Website](https://egyjs.github.io/icon-forge) • [Documentation](http://localhost:3000) • [Contributing](CONTRIBUTING.md) • [License](LICENSE)

</div>