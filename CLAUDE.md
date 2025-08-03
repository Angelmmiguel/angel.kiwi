# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Angel M's personal website (angel.kiwi) built with Eleventy 2.0.0, a static site generator. The site is multilingual (English/Spanish) and includes a blog, project showcase, and interactive playground demos.

## Development Commands

```bash
# Start development server with hot reload (port 8080)
npm run dev

# Build production site to _site/
npm run build

# Optimize SVG files
npm run optimize-svg
```

## Architecture

The site follows Eleventy's conventions with a clear separation between content, templates, and configuration:

- **Content**: Language-specific directories (`en/`, `es/`) contain Markdown files with YAML front matter
- **Templates**: Nunjucks templates in `_includes/` handle layouts and partials
- **Data**: Global data in `_data/` (site metadata, projects, talks, social links)
- **Static Assets**: CSS, JS, fonts, and images in `static/`
- **Output**: Generated site in `_site/`

### Key Technical Details

1. **Internationalization**: Custom i18n implementation using Eleventy's i18n plugin with locale-specific collections and filters
2. **Date Handling**: Uses dayjs for date formatting with locale support
3. **Syntax Highlighting**: Code blocks use @11ty/eleventy-plugin-syntaxhighlight
4. **Cache Busting**: Static assets use MD5 hashes for cache invalidation
5. **Analytics**: Integrated with self-hosted Plausible Analytics

### Important Files

- `.eleventy.js`: Main configuration (filters, plugins, collections)
- `_includes/layout.njk`: Base template for all pages
- `_data/site.json`: Site-wide configuration and metadata
- `_redirects`: URL redirect rules

### Development Environment

The project uses Nix flakes for a reproducible development environment. If you have Nix installed:
```bash
nix develop
```

Otherwise, ensure you have Node.js 20+ installed.

## Writing Style Guidelines

### Spanish Articles

When writing Spanish content for the blog:

1. **Opening sentences**: Start with temporal context when appropriate (e.g., "Siempre que trabajo en...")
2. **Word preferences**:
   - Use "gestionar" instead of "administrar" for managing systems
   - Use "utilizar" for "to use" in formal contexts
   - Prefer personal phrasing like "Lo mismo me ocurre" over literal translations
3. **Direct communication**:
   - Use direct imperatives (e.g., "Anota" instead of "Necesitas anotar")
   - Address the reader directly with "tú" form
   - Remove unnecessary articles for conciseness
4. **Transitions**: Use transition words like "Finalmente" instead of "Ahora" for better flow
5. **Technical terms**: Keep technical terms in English (Vim, Unraid, etc.) without translation