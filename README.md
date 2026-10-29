# Library Management System (Frontend)

**Live demo:** https://library-frontend-h1jx.onrender.com
**Backend code:** https://github.com/swapnaja2134/Library-Management-Spring-Boot

> The project runs on free hosting, so if nobody has used it for a while, the first load can take about a minute because the backend is waking up. Please wait and try again.

## What this is

This is the React frontend for my Library Management System. It talks to my Spring Boot backend through REST APIs.

<!--
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/ba2375fa-a70b-4a2e-a6b2-f498ce553ec4" />

<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/9e503ad0-0205-430b-87fe-54e1515b7b8e" />
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/2b304482-27fd-4a4e-9060-275cead66118" />
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/b8a5a588-f0b1-4670-89f1-e622766e2164" />
<img width="960" height="540" alt="Screenshot 2026-10-27 125557" src="https://github.com/user-attachments/assets/194770ea-1fd3-4fa1-8d05-78894d992e1f" />
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/433ec945-4a52-47ac-a82e-560315184aee" />
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/926b8cf8-0527-467d-a3cd-15f9d47d0c7c" />
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/abfae23d-15c8-46b4-9344-63c43e07c135" />


 -->

## Pages and features

- **Login and Register** with JWT. The token is saved in the browser and sent with every request
- **Books page:** all books as cards, search by title, and an "Ask AI" box where I can type what I want in normal words
- **Borrow:** members can borrow a book. The card shows how many copies are available
- **My Borrows:** the books I borrowed, the due date, an Overdue badge with the fine (Rs. 2 per day), and a Return button
- **Add Book:** admin and librarian can add books
- **Remove book:** only the admin sees the Remove button
- **Members page (admin):** list of members and a button to set a temporary password
- A sidebar that greets the logged-in user and shows only the links their role is allowed to use
- Pages are protected, so a user who is not logged in goes back to the login page

## Tech used

- React (Vite)
- React Router
- Tailwind CSS
- Fetch API for calling the backend
- Hosted as a static site on Render

## Run it on my computer

1. Start the backend first (see the backend README).
2. Then run:

```
npm install
npm run dev
```

3. Open http://localhost:5173

The backend address is read from `VITE_API_URL`. If it is not set, the app uses `http://localhost:8081`.

## Build

```
npm run build
```

When I deploy, I set `VITE_API_URL` to my backend address **before** the build, because Vite puts it into the files while building. I also added a rewrite rule from `/*` to `/index.html` so refreshing a page like `/books` works.

## Known limitations

- The first load can be slow after the free backend has been sleeping
- There is no change-password page yet
- The admin dashboard is not built yet

## What I learned

- Components, props, `useState` and `useEffect`
- Calling a backend with fetch and handling loading and error messages
- Protecting pages with React Router
- Styling with Tailwind CSS
- Deploying a static site and connecting it to a backend (and fixing a CORS error)
