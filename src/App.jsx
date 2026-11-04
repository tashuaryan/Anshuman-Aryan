import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Header from './components/Header'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Category from './pages/Category'
import Article from './pages/Article'
import Portfolio from './pages/Portfolio'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Editor from './pages/admin/Editor'

function Placeholder({ title }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-display text-6xl text-accent">{title}</h1>
    </section>
  )
}

function Admin({ children }) {
  return (
    <ProtectedRoute>
      <PageTransition>{children}</PageTransition>
    </ProtectedRoute>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route
          path="/sports"
          element={
            <PageTransition>
              <Category category="sports" title="Sports" kicker="Stories from the stadium" />
            </PageTransition>
          }
        />
        <Route
          path="/entertainment"
          element={
            <PageTransition>
              <Category category="entertainment" title="Entertainment" kicker="Stories from the screen" />
            </PageTransition>
          }
        />
        <Route path="/article/:slug" element={<PageTransition><Article /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/about" element={<PageTransition><Placeholder title="About" /></PageTransition>} />

        <Route path="/admin/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/admin" element={<Admin><Dashboard /></Admin>} />
        <Route path="/admin/new" element={<Admin><Editor /></Admin>} />
        <Route path="/admin/edit/:id" element={<Admin><Editor /></Admin>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 overflow-x-hidden">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}