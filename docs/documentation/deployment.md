# Deployment

This page provides documentation on how to deploy the portfolio website to GitHub Pages and set up automatic updates with each commit.

## GitHub Pages Deployment

The portfolio is configured to deploy to GitHub Pages using the `gh-pages` package. This allows for easy hosting directly from your GitHub repository.

### Manual Deployment

To manually deploy the portfolio to GitHub Pages:

1. Ensure your `package.json` has the correct `homepage` URL:
   ```json
   "homepage": "https://arunbodd.github.io/Portfolio"
   ```

2. Build and deploy the site:
   ```bash
   npm run build
   npm run deploy
   ```

3. The site will be deployed to the `gh-pages` branch of your repository and available at your homepage URL.

### Automatic Deployment with GitHub Actions

To set up automatic deployment with each commit to the main branch, you can use GitHub Actions. Follow these steps:

1. Create a `.github/workflows` directory in your repository:
   ```bash
   mkdir -p .github/workflows
   ```

2. Create a workflow file for GitHub Actions:
   ```bash
   touch .github/workflows/deploy.yml
   ```

3. Add the following content to the `deploy.yml` file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages
          folder: build
```

4. Commit and push these changes to your repository:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions workflow for automatic deployment"
   git push
   ```

5. Now, every time you push changes to the main branch, GitHub Actions will automatically build and deploy your portfolio to GitHub Pages.

## MkDocs Deployment

The documentation site (built with MkDocs) can also be deployed to GitHub Pages. You can set this up to automatically update with each commit.

### Manual MkDocs Deployment

To manually deploy the MkDocs documentation:

1. Build the documentation site:
   ```bash
   cd /path/to/portfolio
   mkdocs build
   ```

2. Deploy to GitHub Pages:
   ```bash
   mkdocs gh-deploy
   ```

### Automatic MkDocs Deployment with GitHub Actions

To set up automatic deployment of the MkDocs documentation with each commit:

1. Create a workflow file for MkDocs deployment:
   ```bash
   touch .github/workflows/docs.yml
   ```

2. Add the following content to the `docs.yml` file:

```yaml
name: Deploy MkDocs

on:
  push:
    branches:
      - main
    paths:
      - 'docs/**'
      - 'mkdocs.yml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.x'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install mkdocs-material
          pip install mkdocs

      - name: Deploy
        run: mkdocs gh-deploy --force
```

3. Commit and push these changes to your repository:
   ```bash
   git add .github/workflows/docs.yml
   git commit -m "Add GitHub Actions workflow for automatic MkDocs deployment"
   git push
   ```

4. Now, every time you push changes to the `docs/` directory or `mkdocs.yml` file in the main branch, GitHub Actions will automatically build and deploy your MkDocs documentation to GitHub Pages.

## Custom Domain (Optional)

If you want to use a custom domain for your portfolio:

1. Purchase a domain from a domain registrar (e.g., Namecheap, GoDaddy)

2. Configure DNS settings with your domain registrar:
   - Add an `A` record pointing to GitHub Pages IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a `CNAME` record pointing to `yourusername.github.io`

3. Add a `CNAME` file to your repository's `public` directory with your domain name:
   ```
   yourdomain.com
   ```

4. Update the `homepage` in `package.json` to your custom domain:
   ```json
   "homepage": "https://yourdomain.com"
   ```

5. Deploy your site again, and it will be available at your custom domain.

## Troubleshooting

### 404 Errors After Deployment

If you encounter 404 errors after deployment:

1. Ensure your `homepage` in `package.json` is correct
2. Check that the `gh-pages` branch exists and contains your built files
3. Verify that GitHub Pages is enabled in your repository settings and pointing to the `gh-pages` branch

### Build Errors

If you encounter build errors:

1. Check the build logs in GitHub Actions
2. Ensure all dependencies are correctly installed
3. Fix any linting or compilation errors in your code

### Custom Domain Issues

If your custom domain is not working:

1. Verify DNS settings with your domain registrar
2. Ensure the `CNAME` file exists in your built site
3. Check GitHub Pages settings in your repository
