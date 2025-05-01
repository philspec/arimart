# Arimart

A modern, responsive e-commerce frontend built with React.js (Next.js), Zustand, and Tailwind CSS. This project demonstrates core e-commerce features, state management, API integration, and professional UI/UX.

---

## Deployed Link

- [Live Demo](https://arimart.vercel.app/)

---

## Setup Instructions

1. **Clone the Repository**
   ```
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Run the Development Server**
   ```
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

4. **Build for Production**
   ```
   npm run build
   npm start
   ```

5. **Tailwind CSS**
   - Tailwind is pre-configured. No extra setup is needed.
   - To customize, edit `tailwind.config.js` and use Tailwind classes in your components.

6. **Environment Variables**
   - No environment variables are required for local development.
   - The app fetches product data from [Fake Store API](https://fakestoreapi.com/).

---

## Approach Explanation

- **Project Structure:**  
  Built with Next.js for file-based routing and SSR. All main pages (`Home`, `Products`, `Cart`) are in the `app/` directory. Components are modular and located in `components/`.

- **Styling:**  
  Tailwind CSS is used for all styling, ensuring a clean, modern, and fully responsive design.

- **State Management:**  
  Zustand is used for global cart state, providing fast and simple state updates for cart actions (add, remove, update quantity, clear cart).

- **API Integration:**  
  Product data is fetched from the public Fake Store API. All product and category fetching logic is in `utils/api.js`.

- **Core Features:**
  - **Home Page:** Hero section, featured products, newsletter, and footer.
  - **Product Listing:** Search, filter, sort, and responsive grid of products.
  - **Product Card:** Shows image, title, price, and "Add to Cart" button.
  - **Mini Cart:** Dropdown from header, shows cart summary and quick actions.
  - **Full Cart Page:** Edit quantities, remove items, clear cart, and view order summary.
  - **Responsive Design:** All pages and components are mobile-friendly.

- **Deployment:**  
  Ready for deployment on Vercel, Netlify, or any platform supporting Next.js.

---

## Assumptions

- **API:**  
  All product and category data comes from [Fake Store API](https://fakestoreapi.com/). No authentication or custom backend is used.

- **Cart Persistence:**  
  Cart state is persisted in localStorage using Zustand's middleware.

- **Checkout:**  
  The "Checkout" button is a placeholder and does not process real payments.

- **Shipping:**  
  Shipping cost is hardcoded for demonstration.

- **Accessibility:**  
  Basic accessibility is considered, but not fully audited.

- **No Environment Variables:**  
  The app does not require any environment variables for local development or deployment.

---

**Feel free to fork, modify, and deploy!** 