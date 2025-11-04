# NutriPak - Review Management System

A clean, production-ready Next.js 14 App Router application for managing and collecting product reviews using unique review links.

## Features

- 🔐 **Admin Panel** - Secure password-protected admin interface
- 🔗 **Review Links** - Generate unique review links for customers
- ⭐ **Star Ratings** - Interactive 5-star rating system
- 📊 **Dashboard** - View and filter all reviews
- 🎨 **Brand Design** - Custom NutriPak brand colors and styling
- 📱 **Responsive** - Mobile-friendly design
- 🚀 **Modern Stack** - Next.js 14, MongoDB, TypeScript, Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose
- **UI Components**: shadcn/ui + Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nutripak
   ADMIN_PASSWORD=your-secure-password-here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Add your logo**
   
   Place your logo image at `/public/logo.png`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Admin Access

1. Go to `/admin/login`
2. Enter the admin password from your `.env.local`
3. Access the dashboard at `/admin/reviews`

### Creating Review Links

1. From the admin dashboard, click "New Review Link"
2. Fill in customer details (phone, name, address, item, quantity)
3. Click "Generate Review Link"
4. Copy the generated link and share with the customer

### Customer Review Flow

1. Customer opens the unique review link
2. Selects a star rating (1-5)
3. Optionally adds a title and feedback
4. Submits the review
5. Redirected to a thank you page

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   ├── admin/                  # Admin pages
│   ├── review/[id]/           # Public review submission
│   └── ...
├── components/
│   ├── ui/                    # shadcn/ui components
│   └── ...
├── lib/                       # Utilities and DB connection
└── models/                    # Mongoose schemas
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `ADMIN_PASSWORD` | Admin panel password | `your-secure-password` |
| `NEXT_PUBLIC_BASE_URL` | Base URL for review links | `http://localhost:3000` |

## Brand Colors

- **Green**: `#2C5F2D` - Primary
- **Gold**: `#A88F40` - Secondary
- **Cream**: `#FAF8F3` - Background
- **Terracotta**: `#C7573A` - CTAs

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
