# 🔥 Icon Forge - Dynamic File Icon Generator API 

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange.svg)](https://workers.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Hono-4.7+-blue.svg)](https://hono.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3+-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **A modern Cloudflare Workers API for generating beautiful, customizable SVG file icons on-the-fly** ✨

Transform any file extension into a stunning visual icon with our dynamic SVG generation API. Built with Hono framework and deployed on Cloudflare's edge network for ultra-fast global performance. Perfect for file managers, documentation sites, developer tools, and any application that needs beautiful file type representations.

## 🌟 Features

- **Dynamic SVG Generation** - Create file icons for any extension instantly
- **Edge-First Performance** - Deployed on Cloudflare Workers for global speed
- **Modern Tech Stack** - Built with Hono, Vite, and TypeScript
- **Fully Customizable** - Control colors, fonts, sizes, and styling
- **Server-Side Rendering** - Interactive documentation with React/JSX
- **REST API** - Simple HTTP endpoints for easy integration
- **Beautiful UI** - Interactive documentation and testing interface
- **Zero Cold Starts** - Cloudflare Workers ensure instant responses
- **Open Source** - ISC licensed and community-driven

## 🎨 Visual Examples

See Icon Forge in action! Here are some examples of dynamically generated file icons:

### JavaScript Icon
<img src="./examples/js.svg" alt="JavaScript Icon" width="100" height="100">

**Generated with:** `GET /file-icon?ext=js`

### EXE Icon  
<img src="./examples/exe.svg" alt="Extension Icon" width="100" height="100">

**Generated with:** `GET /file-icon?ext=exe`

> 💡 **Try it yourself:** Visit the [live demo](https://icon-forge.el3zahaby.workers.dev) to generate icons in real-time!

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for development)
- npm or yarn
- Cloudflare account (for deployment)

### Installation

```bash
git clone https://github.com/egyjs/icon-forge.git
cd icon-forge
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Cloudflare Workers
npm run deploy
```

### Basic Usage

Generate a file icon by simply making a GET request:

```bash
# Generate a JavaScript file icon
curl "https://icon-forge.el3zahaby.workers.dev/file-icon?ext=js"

# Generate a PDF icon with custom colors
curl "https://icon-forge.el3zahaby.workers.dev/file-icon?ext=pdf&textColor=%23ffffff&bgColor=%23e74c3c"
```

## 📖 API Documentation

### Base URL
```
https://icon-forge.el3zahaby.workers.dev
```

### Local Development
```
http://localhost:5173
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

### Response Format

All successful requests return SVG content with appropriate headers:
- Content-Type: `image/svg+xml`
- Cache-Control: `public, max-age=86400`

## 🎨 Customization Examples

### Basic File Icons
```html
<!-- JavaScript file -->
<img src="https://icon-forge.el3zahaby.workers.dev/file-icon?ext=js" alt="JS file">

<!-- Python file -->
<img src="https://icon-forge.el3zahaby.workers.dev/file-icon?ext=py" alt="Python file">

<!-- PDF document -->
<img src="https://icon-forge.el3zahaby.workers.dev/file-icon?ext=pdf" alt="PDF file">
```

### Custom Styled Icons
```html
<!-- Large TypeScript icon with custom colors -->
<img src="https://icon-forge.el3zahaby.workers.dev/file-icon?ext=ts&textColor=#ffffff&fontSize=25&bgColor=#3178c6" alt="TypeScript file">

<!-- Small JSON icon -->
<img src="https://icon-forge.el3zahaby.workers.dev/file-icon?ext=json&fontSize=20&bgColor=#ff9500" alt="JSON file">
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
- Node.js 18+ (for development tooling)
- npm or yarn
- Cloudflare account (for deployment)

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

4. **Visit the application**
   Open http://localhost:5173 in your browser

### Project Structure

```
icon-forge/
├── src/
│   ├── index.tsx              # Main Hono application
│   ├── renderer.tsx           # JSX renderer setup
│   ├── style.css             # Application styles
│   └── components/
│       ├── iconTemplate.tsx  # SVG icon component
│       └── index.tsx         # Homepage component
├── public/
│   └── favicon.ico           # App favicon
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── wrangler.jsonc          # Cloudflare Workers config
├── vite.config.ts          # Vite build configuration
└── README.md              # This file
```

### Key Components

#### Main Application (src/index.tsx)
- Hono web framework setup
- SVG generation logic
- Request validation and routing
- CORS handling

#### Renderer (src/renderer.tsx)
- JSX server-side rendering
- Vite integration for development
- CSS and asset loading

#### Icon Template Component (src/components/iconTemplate.tsx)
- React component for SVG generation
- Dynamic styling and customization
- Professional design system

#### Interactive Documentation
- Server-side rendered React interface
- Real-time icon preview
- Parameter validation and testing

### Available Scripts

```bash
npm run dev      # Start development server with Vite
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run deploy   # Deploy to Cloudflare Workers
```

### Environment Setup

#### Cloudflare Workers Configuration
The project uses `wrangler.jsonc` for Cloudflare Workers deployment:
- Compatibility date: 2025-06-02 (matches the latest Workers runtime)
- Main entry: `./src/index.tsx`
- Build system: Vite with SSR components

#### Development vs Production
- **Development**: Uses Vite dev server (http://localhost:5173)
- **Production**: Deployed to Cloudflare Workers edge network

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

#### Performance Optimization
- Edge-first deployment on Cloudflare Workers
- Zero cold starts with Workers runtime
- Client-side caching with max-age headers
- Efficient SVG generation with React components

#### Modern Architecture
- TypeScript for type safety
- Hono framework for lightweight performance
- Vite for fast development and optimized builds
- Server-side rendering for interactive documentation

## 🧪 Testing

### Local Testing
Visit the development server at `http://localhost:5173` to test different configurations interactively.

### API Testing
```bash
# Test basic functionality
curl -s "https://icon-forge.el3zahaby.workers.dev/file-icon?ext=test" | head -n 5

# Test error handling
curl -s "https://icon-forge.el3zahaby.workers.dev/file-icon" # Should return 400 error

# Test health endpoint
curl -s "https://icon-forge.el3zahaby.workers.dev/health"
```

### Performance Testing
```bash
# Test response time
time curl -s "https://icon-forge.el3zahaby.workers.dev/file-icon?ext=perf" > /dev/null
```

### Deployment Testing
```bash
# Test deployment locally
npm run preview

# Deploy to Cloudflare Workers
npm run deploy
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
- 🔧 **Features**: Additional customization options, new endpoints, Workers-specific optimizations
- 📚 **Documentation**: Tutorials, examples, API guides, Cloudflare Workers deployment guides
- 🐛 **Bug Fixes**: Performance improvements, edge case handling, TypeScript type fixes
- 🧪 **Testing**: Unit tests, integration tests, Workers environment testing
- 🌐 **Internationalization**: Multi-language support
- ⚡ **Performance**: Edge computing optimizations, caching strategies
- 🔒 **Security**: Input validation, rate limiting, security headers

### Development Guidelines

- Follow existing TypeScript patterns and Hono conventions
- Test changes locally with `npm run dev` and `npm run preview`
- Ensure compatibility with Cloudflare Workers runtime
- Update documentation for API changes
- Use meaningful commit messages following conventional commits
- Keep pull requests focused and atomic
- Test deployment with `npm run deploy` before submitting PRs

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

**Development server issues**
```bash
# Kill any process using port 5173 (Vite default)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**Build failures**
```bash
# Clear build cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

**Deployment issues**
```bash
# Verify Wrangler authentication
npx wrangler whoami

# Check deployment logs
npx wrangler tail

# Test locally before deploying
npm run preview
```

**Invalid SVG output**
- Check browser developer tools for errors
- Verify SVG template component exists in `src/components/iconTemplate.tsx`
- Validate input parameters match API specification
- Test with simple extensions first (e.g., `ext=js`)

**CORS errors**
- CORS is handled automatically by Hono middleware
- Check request headers and methods
- Verify deployment configuration

**TypeScript errors**
```bash
# Check for type errors
npx tsc --noEmit

# Update type definitions
npm run cf-typegen
```

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Fredoka Font](https://fonts.google.com/specimen/Fredoka)** - Beautiful typography by Google Fonts
- **[Hono](https://hono.dev/)** - Ultra-fast web framework for Cloudflare Workers
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Edge computing platform
- **SVG Community** - Inspiration and best practices
- **Open Source Contributors** - Making this project better every day

## 📞 Support

- 📞 **Support**: [el3zahaby@gmail.com](mailto:el3zahaby@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/egyjs/icon-forge/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/egyjs/icon-forge/discussions)
- 📖 **Live Demo**: [https://icon-forge.el3zahaby.workers.dev](https://icon-forge.el3zahaby.workers.dev)
- 🛠️ **Development**: `npm run dev` then visit http://localhost:5173

## 🔮 Roadmap

- [ ] **Custom Font Support** - Upload and use custom fonts
- [ ] **Icon Templates** - Multiple visual styles and layouts  
- [ ] **Batch Generation** - Generate multiple icons at once
- [ ] **Advanced Styling** - Gradients, shadows, animations
- [ ] **Analytics Dashboard** - Usage statistics and insights
- [ ] **Edge Caching** - Enhanced performance with Cloudflare Cache API
- [ ] **Plugin System** - Extensible architecture for custom generators
- [ ] **REST API v2** - Enhanced endpoints with more customization options
- [ ] **WebAssembly Integration** - Ultra-fast SVG processing

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Egyjs

[Live Demo](https://icon-forge.el3zahaby.workers.dev) • [Documentation](https://icon-forge.el3zahaby.workers.dev) • [Contributing](CONTRIBUTING.md) • [License](LICENSE)

</div>
