"use client"

import { useState } from "react"
import { Screen, UserRole, Route, AppUser, Review } from "./types"
import { renderStarRating } from "./lib/utils"
import { routes as mockRoutes, users as mockUsers, reviews as mockReviews } from "./data/mockData"

// Importação das Telas
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import RouteDetailsScreen from "./screens/RouteDetailsScreen"
import ReviewsScreen from "./screens/ReviewsScreen"
import AddReviewScreen from "./screens/AddReviewScreen"
import UserManagementScreen from "./screens/UserManagementScreen"
import NotificationsScreen from "./screens/NotificationsScreen"
import CreateRouteScreen from "./screens/CreateRouteScreen"
import ProfileScreen from "./screens/ProfileScreen"

export default function TourismApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [userRole, setUserRole] = useState<UserRole>("admin")
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(mockRoutes[0]) // Usando a primeira rota como mock inicial
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [reviewFilter, setReviewFilter] = useState<string>("all")

  // Estados para Adicionar Avaliação (mantidos aqui por enquanto, mas podem ser movidos)
  const [overallRating, setOverallRating] = useState(0)
  const [guideRating, setGuideRating] = useState(0)
  const [organizationRating, setOrganizationRating] = useState(0)
  const [valueRating, setValueRating] = useState(0)
  const [comment, setComment] = useState("")

  const routes: Route[] = mockRoutes
  const users: AppUser[] = mockUsers
  const reviews: Review[] = mockReviews

  const handleLogin = (role: UserRole) => {
    setUserRole(role)
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const navigateTo = (screen: Screen, route?: Route) => {
    if (route) {
      setSelectedRoute(route)
    }
    setCurrentScreen(screen)
  }

  if (!isLoggedIn) {
    return <LoginScreen handleLogin={handleLogin} />
  }

  // Props comuns para as telas
  const commonProps = {
    userRole,
    navigateTo,
    routes,
    users,
    reviews,
    selectedRoute,
    renderStarRating,
    reviewFilter,
    setReviewFilter,
    // Props para AddReviewScreen
    overallRating, setOverallRating,
    guideRating, setGuideRating,
    organizationRating, setOrganizationRating,
    valueRating, setValueRating,
    comment, setComment,
  }

  switch (currentScreen) {
    case "home":
      return <HomeScreen {...commonProps} />
    case "route-details":
      return <RouteDetailsScreen {...commonProps} />
    case "reviews":
      return <ReviewsScreen {...commonProps} />
    case "add-review":
      return <AddReviewScreen {...commonProps} />
    case "user-management":
      return <UserManagementScreen {...commonProps} />
    case "notifications":
      return <NotificationsScreen {...commonProps} />
    case "create-route":
      return <CreateRouteScreen {...commonProps} />
    case "profile":
      return <ProfileScreen {...commonProps} setIsLoggedIn={setIsLoggedIn} />
    default:
      return <HomeScreen {...commonProps} />
  }
}
