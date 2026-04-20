# 📌 STL — Save The Link

> A powerful bookmark manager to save, organize, and access your favorite links from anywhere.

🌐 **Live Demo:** [https://save-the-link.vercel.app](https://save-the-link.vercel.app)

---

## 📖 Table of Contents

- [Features](#-features)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

---

## ✨ Features

### 🔖 Bookmark Management

- Save any URL as a bookmark with auto-fetched preview (title, image, favicon, description)
- Edit, delete, and organize bookmarks
- Add personal notes to any bookmark
- Copy bookmark URL with one click
  <!-- - Track visit count and last visited time -->

### 📁 Folder Organization

- Create folders to organize bookmarks
- Move bookmarks into folders
- View all bookmarks inside a specific folder
- Share folders with others via a generated link

### 📌 Pin Bookmarks

- Pin important bookmarks to always show at the top
- Toggle pin/unpin with one click
- Pinned bookmarks appear separately for quick access

<!-- ### ❤️ Favorites

- Mark bookmarks as favorites
- Filter to view only favorite bookmarks -->

### 🏷️ Tag System

- Create custom tags with colors
- Assign up to 3 tags per bookmark
- Filter bookmarks by multiple tags simultaneously

### 🔍 Search & Filter

- Filter by tag with multiple at a time
- Search bookmarks by title, URL, description, site name, or tag name
- Sort by Newest First, Oldest First, Recently Updated, Title A–Z, Title Z–A

### 🔗 Link Preview

- Automatically fetches metadata when you paste a URL
- Shows title, cover image, favicon, site name, and description
- Manual override available if auto-fetch fails

### 🔐 Authentication

- Register and login with email and password
- JWT-based authentication with access and refresh tokens
- Forgot password with OTP verification via email
  <!-- - Secure httpOnly cookie-based session management -->

### 📤 Share

- Share any bookmark or folder via:
    - Facebook
    - Twitter / X
    - WhatsApp
    - Telegram
    - LinkedIn
    - Gmail
    - Copy link

### 🎨 UI & UX

- Responsive design for all screen sizes
- Grid and list view toggle
- Adjustable column layout (2, 3, or 4 columns)
- Toggle theme mode by light and dark interface
- Smooth animations and transitions

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Gmail account (for sending OTP emails)

### Installation

**Clone the repositories:**

```bash
# Frontend
git clone https://github.com/jmjubaer/stl.git
cd stl
npm install

# Backend
git clone https://github.com/jmjubaer/stl-server.git
cd stl-server
npm install
```

**Set up environment variables** (see [Environment Variables](#environment-variables))

**Run development servers:**

```bash
# Backend
npm run dev

# Frontend
npm run dev
```

---

## 📘 How to Use

### 1. Create an Account

- Click **Login / Register** in the navbar
- Fill in your name, email, and password
- Click **Register** to create your account

### 2. Add a Bookmark

- Click the **+ Add Bookmark** button
- Paste any URL — preview loads automatically
- Edit title, image, notes if needed
- Select a folder and tags (optional)
- Toggle **Pin** to pin it to the top
- Click **Add Bookmark**

### 3. Organize with Folders

- Click ** + Create Folder ** in the **+** Button
- Give your folder a name
- Move bookmarks into folders by select bookmark
- Click a folder to view only its bookmarks
- Click **Home** to go back to all bookmarks

### 4. Use Tags

- Click the **Tags** button to open the tag filter
- Select up to multiple tags to filter bookmarks
- Click **+ Add Tag** inside the tag panel to create a new tag with a custom color
- Selected tags appear as badges above the bookmark list

### 5. Search & Sort

- Type in the **Search** bar to search by title, URL, description, or tag name
- Click **Sort** to change the sort order
- Results update in real time

### 6. Pin Bookmarks

- Pin a bookmark by update or when create
- Pinned bookmarks appear at the top of your dashboard
- Click again to unpin

### 7. Share a Bookmark or Folder

- Click the share icon on any bookmark or folder
- Choose a platform: Facebook, WhatsApp, Telegram, Gmail, etc.
- Or copy the link directly

### 8. Reset Password

- Click **Forgot Password** on the login form
- Enter your registered email
- Check your email for the 6-digit OTP
- Enter the OTP and set a new password

---

## 🛠️ Technology Stack

### Frontend

| Technology      | Purpose                         |
| --------------- | ------------------------------- |
| Next.js 15      | React framework with App Router |
| TypeScript      | Type safety                     |
| Tailwind CSS    | Styling                         |
| Redux Toolkit   | Global state management         |
| React Hook Form | Form handling                   |
| Ant Design      | UI components                   |
| SweetAlert2     | Alert dialogs                   |
| React Icons     | Icon library                    |
| JWT Decode      | Token decoding                  |

### Backend

| Technology      | Purpose               |
| --------------- | --------------------- |
| Node.js         | Runtime               |
| Express.js      | Web framework         |
| TypeScript      | Type safety           |
| MongoDB         | Database              |
| Mongoose        | ODM                   |
| JWT             | Authentication        |
| Bcrypt          | Password hashing      |
| Nodemailer      | Email sending         |
| Zod             | Request validation    |
| link-preview-js | URL metadata fetching |

### DevOps & Deployment

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| Vercel        | Frontend & backend hosting |
| MongoDB Atlas | Cloud database             |

---

## 📁 Project Structure

### Frontend

```
app/                      # Next.js App Router pages
├── page

src/
├── components/
│   ├── pages/            # Home, Bookmark, Folder
│   │   ├── Home/         # Root pages
│   │   ├── Bookmark/     # Bookmark pages
│   │   ├── Folder/       # Folder pages
│   │   └── Authentication# Auth related pages
│   ├── shared/           # Navbar, Footer
│   └── ui/
│       ├── Bookmark/     # Bookmark components
│       ├── Folder/       # Folder components
│       └── Common File   # AddButton, NonUserCard, ThemeToggle
├── redux/
│   ├── features/
│   │   ├── auth/         # Auth slice
│   │   └── modal/        # Modal slice
│   └── store.ts
├── services/             # API service functions
├── provider/             # Provider components
├── types/                # TypeScript interfaces
└── utils/                # Helper functions
```

### Backend

```
src/
├── module/
│   ├── auth/             # Auth routes, controller, service
│   ├── bookmark/         # Bookmark routes, controller, service
│   ├── folder/           # Folder routes, controller, service
│   ├── tag/              # Tag routes, controller, service
│   └── user/             # User routes, controller, service
├── middleware/           # Auth, error handler, not found
├── errors/               # Custom error classes
├── utils/                # Helpers (sendEmail, catchAsync, etc.)
├── config/               # Environment config
├── app.ts
└── server.ts
```

---

## 🔑 Environment Variables

### Frontend `.env.local`

```env
NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

### Backend `.env`

```env
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/stl
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
BCRYPT_SALT_ROUND=12
NODEMAILER_USER_EMAIL=your_gmail@gmail.com
NODEMAILER_USER_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

---

## 📡 API Documentation

**Backend Link:** [https://github.com/jmjubaer/stl-server.git](https://github.com/jmjubaer/stl-server.git)

### Auth

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| POST   | `/api/v1/user/create`         | Register new user       |
| POST   | `/api/v1/auth/login`          | Login user              |
| POST   | `/api/v1/auth/access-token`   | Refresh access token    |
| POST   | `/api/v1/auth/send-otp`       | Send reset OTP to email |
| POST   | `/api/v1/auth/verify-otp`     | Verify OTP              |
| PATCH  | `/api/v1/auth/reset-password` | Reset password          |

### Bookmarks

| Method | Endpoint                         | Description          |
| ------ | -------------------------------- | -------------------- |
| GET    | `/api/v1/bookmark`               | Get all bookmarks    |
| POST   | `/api/v1/bookmark/create`        | Create bookmark      |
| PUT    | `/api/v1/bookmark/:id`           | Update bookmark      |
| DELETE | `/api/v1/bookmark/:id`           | Delete bookmark      |
| PATCH  | `/api/v1/bookmark/pin`           | Toggle pin bookmarks |
| PATCH  | `/api/v1/bookmark/add-to-folder` | Move to folder       |
| GET    | `/api/v1/bookmark/link-preview`  | Get URL metadata     |

### Folders

| Method | Endpoint                | Description     |
| ------ | ----------------------- | --------------- |
| GET    | `/api/v1/folder`        | Get all folders |
| POST   | `/api/v1/folder/create` | Create folder   |
| PATCH  | `/api/v1/folder/:id`    | Update folder   |
| DELETE | `/api/v1/folder/:id`    | Delete folder   |

### Tags

| Method | Endpoint             | Description  |
| ------ | -------------------- | ------------ |
| GET    | `/api/v1/tag`        | Get all tags |
| POST   | `/api/v1/tag/create` | Create tag   |
| DELETE | `/api/v1/tag/:id`    | Delete tag   |

### Query Parameters (Bookmarks)

| Param        | Type         | Description                                                |
| ------------ | ------------ | ---------------------------------------------------------- | ---------------- | --- |
| `searchTerm` | string       | Search by title, URL, description, tag name                |
| `sort`       | string       | `-createdAt`, `createdAt`, `title`, `-title`, `-updatedAt` |
| `tags`       | string       | Comma-separated tag IDs                                    |
| `folder`     | string       | Folder ID                                                  |
| `isPinned`   | boolean      | Filter pinned                                              |
 <!--         | `isFavorite` | boolean                                                    | Filter favorites | --> 
 <!--         | `page`       | number                                                     | Page number      | --> 
 <!--         | `limit`      | number                                                     | Items per page   | --> 

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

<!-- ---

## 📄 License

This project is licensed under the MIT License. -->

---

## 👨‍💻 Author

Built with ❤️ by the Md Jubaer Jm

🌐 [MD JUBAER](https://www.linkedin.com/in/jmjubaer/)
