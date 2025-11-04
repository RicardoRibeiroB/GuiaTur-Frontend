export type UserRole = "admin" | "publisher" | "resident"
export type Screen =
  | "login"
  | "home"
  | "route-details"
  | "user-management"
  | "notifications"
  | "create-route"
  | "profile"
  | "reviews"
  | "add-review"

export interface Route {
  id: string
  title: string
  description: string
  category: string
  duration: string
  difficulty: "Easy" | "Medium" | "Hard" | "Fácil" | "Difícil" // Adicionado "Fácil" e "Difícil" do mock
  rating: number
  image: string
  status: "published" | "pending" | "draft"
  author: string
  participants: number
  maxParticipants: number
}

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  status: "active" | "inactive"
}

export interface Review {
  id: string
  routeId: string
  userName: string
  userAvatar: string
  date: string
  overallRating: number
  guideRating: number
  organizationRating: number
  valueRating: number
  comment: string
  helpful: number
  verified: boolean
}
