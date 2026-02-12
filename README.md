# Ray Panganiban Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS, featuring smooth animations and an elegant dark theme design.

## 🚀 Features

- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Smooth Animations**: Framer Motion for stunning micro-interactions and page transitions
- **Dark Theme**: Professional dark theme with gradient accents
- **Interactive Components**: Contact form, project gallery, skills progress bars
- **SEO Optimized**: Meta tags, semantic HTML, and structured data
- **Performance**: Optimized build with image optimization and code splitting

## 📂 Project Structure

```
portfolio-ray/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── globals.css        # Global styles and Tailwind imports
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx          # Home page
│   ├── components/             # React components
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   └── common/           # Common components
│   │       └── ScrollIndicator.tsx
│   ├── data/                 # Data files
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── social.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── utils/              # Utility functions
│       ├── animations.ts
│       └── validation.ts
├── public/                 # Static assets
├── package.json
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **Next.js 16**: React framework with app router
- **React 19**: UI library with latest features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Development
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Hot Reload**: Fast development experience

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-ray
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm start
   ```

## 🎨 Customization

### Personal Information
Update the following files with your personal information:

1. **src/data/experience.ts** - Work experience
2. **src/data/projects.ts** - Project portfolio
3. **src/data/skills.ts** - Technical skills
4. **src/data/social.ts** - Social media links
5. **src/app/layout.tsx** - Metadata and SEO

### Styling
- **Tailwind Config**: `tailwind.config.js` - Custom colors, fonts, animations
- **Global CSS**: `src/app/globals.css` - Base styles and custom animations

### Sections
- **Hero**: `src/components/sections/Hero.tsx` - Main landing section
- **About**: `src/components/sections/About.tsx` - Personal introduction
- **Experience**: `src/components/sections/Experience.tsx` - Work timeline
- **Skills**: `src/components/sections/Skills.tsx` - Technical expertise
- **Projects**: `src/components/sections/Projects.tsx` - Portfolio showcase
- **Contact**: `src/components/sections/Contact.tsx` - Contact form and info

## 🚀 Deployment

This portfolio is optimized for deployment on various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure the build
3. Deploy with one click

### Netlify
1. Run `npm run build` to generate the production build
2. Deploy the `.next` folder to Netlify
3. Configure build command as `npm run build`

### Other Platforms
The app can be deployed to any platform supporting Node.js applications.

## 📱 Responsive Design

The portfolio is fully responsive with:
- **Mobile**: 320px+ - Optimized for mobile devices
- **Tablet**: 768px+ - Tablet-friendly layouts
- **Desktop**: 1024px+ - Full desktop experience
- **Large Desktop**: 1280px+ - Enhanced layouts for large screens

## 🎯 Performance Features

- **Code Splitting**: Automatic code splitting for faster initial loads
- **Image Optimization**: Next.js Image component for optimized images
- **Font Optimization**: Google Fonts with preload and display strategies
- **CSS Optimization**: Tailwind CSS with purge for minimal production CSS
- **Animation Performance**: GPU-accelerated animations using Framer Motion

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific variables:

```env
# Contact form configuration
CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_UMAMI_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Build Configuration
- **Next.js Config**: `next.config.ts` - Next.js specific configurations
- **TypeScript**: `tsconfig.json` - TypeScript compiler options
- **ESLint**: `eslint.config.mjs` - Code quality rules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library

---

**Built with ❤️ by Ray Panganiban**
