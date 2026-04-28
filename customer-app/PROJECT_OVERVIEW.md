# Lotchan Connect - Project Overview

## 1. Introduction
**Lotchan Connect** is a frontend web application built as a customer-facing portal for the "Lotchan Repairs" mobile repair center based in Somanur, Coimbatore. It acts as the direct interface where customers can book repairs, track their orders, purchase accessories, view their referral wallet, and connect with the community. 

## 2. Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router (`react-router-dom`)
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Backend/BaaS**: Supabase (used for Authentication, Database, and User Profiles)
- **State Management**: React Query (`@tanstack/react-query`) and custom React Contexts (`AuthContext`, `ThemeContext`)
- **Icons**: Lucide React

## 3. Project Structure
The source code is primarily housed within the `src` directory with the following structure:

- **`src/App.tsx` & `main.tsx`**: The entry points of the application. `App.tsx` sets up the foundational providers (React Query, Theme, Auth, Tooltips, Toaster) and the routing logic.
- **`src/pages/`**: Contains the main route views.
  - `Index.tsx`: The landing page encouraging users to get started.
  - `Auth.tsx`: Authentication page handling login/signup.
  - `Home.tsx`: The main dashboard post-login, showing wallet balance, quick service actions, special offers, and trending accessories.
  - `Shop.tsx`: An e-commerce section for mobile accessories.
  - `Repair.tsx`: For booking mobile repair services.
  - `Community.tsx`: A social/community engagement section.
  - `Profile.tsx`: User profile management, capturing settings, wallet, and referral codes.
  - `NotFound.tsx`: Standard 404 fallback page.
- **`src/components/`**: Houses independent, reusable UI blocks.
  - `Dashboard.tsx`: A comprehensive inner dashboard showing repair statistics, wallet information, and quick links to booking/tracking.
  - `FloatingChatButton.tsx`: A persistent floating action button for quick customer support access.
  - `OrderTracking.tsx`: Interface for tracking the progress of submitted repairs.
  - `ServiceBooking.tsx`: The workflow for standardizing a repair request.
  - `ReferralProgram.tsx`: Details about the referral wallet system where users earn a 10% commission.
  - `Gallery.tsx`: A section likely to display before/after photos of completed repairs.
  - `BottomNav.tsx`: Mobile-centric bottom navigation bar linking core tabs (Home, Book, Track, Refer, Profile).
  - `ui/`: Automatically generated shadcn/ui generic components (Cards, Buttons, Dialogs, etc.).
- **`src/contexts/`**: Contains React Context providers.
  - `AuthContext.tsx`: Wraps the application to expose the current Supabase session/user and login/logout methods globally.
  - `ThemeContext.tsx`: Handles dynamic theming (Light/Dark mode) logic.
- **`src/integrations/`**: Contains external integration configurations.
  - `supabase/client.ts`: Initializes the Supabase client used throughout the app to fetch data (e.g., banners, profiles).

## 4. Key Features & Workflows
1. **User Authentication:** 
   Fully integrated with Supabase Authentication to manage user sign-ups, sign-ins, and session persistence.
2. **Dashboard & Wallet System:**
   Upon logging in, customers can see their current wallet balance (populated from the `profiles` table in Supabase) and can use this for discounts or claiming referral earnings.
3. **Quick Services & Service Booking:**
   Customers can easily navigate to book specific repairs (Screen, Battery, Charging, Software), standardizing requests sent to the shop owner.
4. **Referral Program:**
   Users have access to an incentive-driven referral system (earning a standard 10% commission), encouraging organic growth.
5. **Modern, Responsive UI:**
   Designed primarily for mobile user-experience using Tailwind CSS. Features dark/light themes, swipeable carousel banners, and a persistent bottom navigation similar to native mobile apps.

## 5. Deployment & Further Setup
The project leverages the **Lovable** platform for rapid scaffolding in combination with standard Vite output. It is configured to run simply via `npm run dev` and outputs standard optimized bundles via `npm run build`.

## Summary
Lotchan Connect bridges the gap between the mobile repair shop and its customers by offering a premium, robust, mobile-first web application. It handles loyalty (referrals/wallets), commerce (accessories), and service operations (booking/tracking repairs) cleanly through a cohesive standard React architecture.
