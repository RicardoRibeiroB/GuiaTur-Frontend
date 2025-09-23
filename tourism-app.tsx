  "use client"

  import { useState } from "react"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { Switch } from "@/components/ui/switch"
  import { Textarea } from "@/components/ui/textarea"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import {
    ArrowLeft,
    Bell,
    Calendar,
    Clock,
    Edit,
    Heart,
    MapPin,
    Plus,
    Search,
    Settings,
    Star,
    Trash2,
    Users,
    Camera,
    Send,
    Shield,
    CheckCircle,
    XCircle,
    Navigation,
    MessageSquare,
    ThumbsUp,
    Filter,
  } from "lucide-react"

  type UserRole = "admin" | "publisher" | "resident"
  type Screen =
    | "login"
    | "home"
    | "route-details"
    | "user-management"
    | "notifications"
    | "create-route"
    | "profile"
    | "reviews"
    | "add-review"

  interface Route {
    id: string
    title: string
    description: string
    category: string
    duration: string
    difficulty: "Easy" | "Medium" | "Hard"
    rating: number
    image: string
    status: "published" | "pending" | "draft"
    author: string
    participants: number
    maxParticipants: number
  }

  interface AppUser {
    id: string
    name: string
    email: string
    role: UserRole
    avatar: string
    status: "active" | "inactive"
  }

  interface Review {
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

  export default function TourismApp() {
    const [currentScreen, setCurrentScreen] = useState<Screen>("login")
    const [userRole, setUserRole] = useState<UserRole>("admin")
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [reviewFilter, setReviewFilter] = useState<string>("all")

    const [overallRating, setOverallRating] = useState(0)
    const [guideRating, setGuideRating] = useState(0)
    const [organizationRating, setOrganizationRating] = useState(0)
    const [valueRating, setValueRating] = useState(0)
    const [comment, setComment] = useState("")

    const routes: Route[] = [
      {
        id: "1",
        title: "Tour a Pé pelo Centro Histórico",
        description: "Explore a rica história do nosso centro com paradas guiadas em pontos históricos importantes.",
        category: "História",
        duration: "2 horas",
        difficulty: "Fácil",
        rating: 4.8,
        image: "/placeholder.svg?height=200&width=300",
        status: "published",
        author: "Secretaria de Turismo",
        participants: 15,
        maxParticipants: 25,
      },
      {
        id: "2",
        title: "Trilha do Pôr do Sol na Montanha",
        description: "Uma trilha desafiadora até o cume com vistas deslumbrantes do pôr do sol sobre o vale.",
        category: "Aventura",
        duration: "4 horas",
        difficulty: "Difícil",
        rating: 4.9,
        image: "/placeholder.svg?height=200&width=300",
        status: "published",
        author: "Guias da Montanha Ltda.",
        participants: 8,
        maxParticipants: 12,
      },
      {
        id: "3",
        title: "Tour pelo Mercado de Comidas Locais",
        description: "Prove a autêntica culinária local e conheça os vendedores do nosso mercado tradicional.",
        category: "Comida",
        duration: "3 horas",
        difficulty: "Fácil",
        rating: 4.7,
        image: "/placeholder.svg?height=200&width=300",
        status: "pending",
        author: "Aventuras Gastronômicas",
        participants: 0,
        maxParticipants: 20,
      },
    ]

    const handleLogin = (role: UserRole) => {
      setUserRole(role)
      setIsLoggedIn(true)
      setCurrentScreen("home")
    }

    const renderStarRating = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
      const sizeClasses = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      }

      return (
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`${sizeClasses[size]} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
      )
    }


    const renderLoginScreen = () => (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">GuiaTur</h1>
          <p className="text-blue-600">Descubra Aventuras Locais</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-blue-900">Bem-vindo de Volta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="E-mail" type="email" className="border-blue-200 focus:border-blue-500" />
            <Input placeholder="Senha" type="password" className="border-blue-200 focus:border-blue-500" />

            <div className="space-y-2">
              <p className="text-sm text-blue-600 text-center">Login de Demonstração:</p>
              <div className="grid gap-2">
                <Button onClick={() => handleLogin("admin")} className="bg-blue-600 hover:bg-blue-700">
                  Administrador
                </Button>
                <Button
                  onClick={() => handleLogin("publisher")}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Publicador de Rotas
                </Button>
                <Button
                  onClick={() => handleLogin("resident")}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Morador Local
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Button variant="link" className="text-blue-600">
                Não tem uma conta? Cadastre-se
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )

    const renderHomeScreen = () => (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Bem-vindo de volta!</p>
                <p className="text-blue-200 text-sm capitalize">{userRole}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-700"
                onClick={() => setCurrentScreen("notifications")}
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-700"
                onClick={() => setCurrentScreen("profile")}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-blue-300" />
            <Input
              placeholder="Buscar rotas e eventos..."
              className="pl-10 bg-blue-500 border-blue-400 text-white placeholder:text-blue-200 focus:bg-white focus:text-blue-900"
            />
          </div>
        </div>

        {/* Quick Actions for Admin */}
        {userRole === "admin" && (
          <div className="p-4 bg-blue-50">
            <div className="flex space-x-3 overflow-x-auto">
              <Button
                onClick={() => setCurrentScreen("create-route")}
                className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Rota
              </Button>
              <Button
                onClick={() => setCurrentScreen("user-management")}
                variant="outline"
                className="border-blue-600 text-blue-600 whitespace-nowrap"
              >
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Usuários
              </Button>
            </div>
          </div>
        )}

        {/* Content Tabs */}
        <div className="p-4">
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-blue-50">
              <TabsTrigger value="routes" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Rotas
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Eventos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="routes" className="space-y-4 mt-4">
              {routes.map((route) => (
                <Card
                  key={route.id}
                  className="cursor-pointer hover:shadow-md transition-shadow border-blue-100"
                  onClick={() => {
                    setSelectedRoute(route)
                    setCurrentScreen("route-details")
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <img
                        src={route.image || "/placeholder.svg"}
                        alt={route.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-blue-900 mb-1">{route.title}</h3>
                          {userRole === "admin" && (
                            <Badge
                              variant={
                                route.status === "published"
                                  ? "default"
                                  : route.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={route.status === "published" ? "bg-green-100 text-green-800" : ""}
                            >
                              {route.status}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{route.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-blue-600">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {route.duration}
                          </span>
                          <span className="flex items-center">
                            {renderStarRating(route.rating)}
                            <span className="ml-1">{route.rating}</span>
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {route.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="events" className="space-y-4 mt-4">
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Festival de Verão</h3>
                      <p className="text-sm text-gray-600">Celebração de música e comida local</p>
                      <p className="text-xs text-blue-600 mt-1">June 15-17, 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )

    const renderRouteDetails = () => {
      const routeReviews = reviews.filter((review) => review.routeId === selectedRoute?.id)
      const averageRating =
        routeReviews.length > 0
          ? routeReviews.reduce((sum, review) => sum + review.overallRating, 0) / routeReviews.length
          : 0

      return (
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="relative">
            <img
              src={selectedRoute?.image || "/placeholder.svg"}
              alt={selectedRoute?.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 left-4">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 hover:bg-white"
                onClick={() => setCurrentScreen("home")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                <Heart className="w-5 h-5" />
              </Button>
              {userRole === "admin" && (
                <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                  <Edit className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-blue-900 mb-2">{selectedRoute?.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-blue-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedRoute?.duration}
                  </span>
                  <span className="flex items-center space-x-1">
                    {renderStarRating(averageRating, "md")}
                    <span className="ml-1">{averageRating.toFixed(1)}</span>
                    <span className="text-gray-500">({routeReviews.length} avaliações)</span>
                  </span>
                  <Badge variant="outline">{selectedRoute?.difficulty}</Badge>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{selectedRoute?.description}</p>

            {/* Participation Info */}
            <Card className="mb-6 border-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-blue-900">Participantes</span>
                  <span className="text-blue-600">
                    {selectedRoute?.participants}/{selectedRoute?.maxParticipants}
                  </span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${((selectedRoute?.participants || 0) / (selectedRoute?.maxParticipants || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
                {userRole === "resident" && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Participar da Rota</Button>
                )}
                {userRole === "admin" && (
                  <div className="space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Users className="w-4 h-4 mr-2" />
                      Gerenciar Participantes
                    </Button>
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 bg-transparent">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Notificações
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews Summary */}
            <Card className="mb-6 border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center justify-between">
                  <span className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Avaliações
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 bg-transparent"
                    onClick={() => setCurrentScreen("reviews")}
                  >
                    Ver Todas
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900">{averageRating.toFixed(1)}</div>
                    {renderStarRating(averageRating, "lg")}
                    <div className="text-sm text-gray-600 mt-1">{routeReviews.length} avaliações</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = routeReviews.filter((r) => r.overallRating === stars).length
                      const percentage = routeReviews.length > 0 ? (count / routeReviews.length) * 100 : 0
                      return (
                        <div key={stars} className="flex items-center space-x-2 text-sm">
                          <span className="w-3">{stars}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="w-8 text-gray-600">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Recent Reviews Preview */}
                {routeReviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="border-t pt-4 first:border-t-0 first:pt-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm text-blue-900">{review.userName}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Verificado
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          {renderStarRating(review.overallRating)}
                          <span className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex space-x-3 mt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 bg-transparent"
                    onClick={() => setCurrentScreen("reviews")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ver Todas as Avaliações
                  </Button>
                  {userRole === "resident" && (
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setCurrentScreen("add-review")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Avaliar Rota
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card className="mb-6 border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Mapa da Rota
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {/* Simulated Map */}
                <div className="relative bg-blue-50 rounded-lg h-64 mb-4 overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-blue-100"></div>

                  {/* Route Path */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                    <path
                      d="M50 150 Q100 100 150 120 T250 80"
                      stroke="#2563eb"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Route Points */}
                  <div className="absolute top-32 left-12">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                      Início
                    </div>
                  </div>

                  <div className="absolute top-24 left-32">
                    <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                      Ponto 1
                    </div>
                  </div>

                  <div className="absolute top-28 left-52">
                    <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                      Ponto 2
                    </div>
                  </div>

                  <div className="absolute top-16 right-12">
                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                      Final
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white">
                      +
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white">
                      -
                    </Button>
                  </div>

                  {/* Location Indicator */}
                  <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-medium text-blue-900">Centro Histórico</span>
                  </div>
                </div>

                {/* Route Points List */}
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-900 mb-3">Pontos de Parada</h4>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-blue-900">Praça Central</p>
                      <p className="text-xs text-gray-600">Ponto de encontro - 09:00</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Início
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-blue-900">Igreja Matriz</p>
                      <p className="text-xs text-gray-600">Visita guiada - 09:30</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      30 min
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-blue-900">Museu da Cidade</p>
                      <p className="text-xs text-gray-600">Exposição histórica - 10:15</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      45 min
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-blue-900">Mirante do Centro</p>
                      <p className="text-xs text-gray-600">Vista panorâmica - 11:00</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Final
                    </Badge>
                  </div>
                </div>

                {/* Map Actions */}
                <div className="flex space-x-3 mt-4">
                  <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 bg-transparent">
                    <MapPin className="w-4 h-4 mr-2" />
                    Ver no Mapa Completo
                  </Button>
                  <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 bg-transparent">
                    <Navigation className="w-4 h-4 mr-2" />
                    Obter Direções
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Route Details */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Informações da Rota</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoria</span>
                  <Badge variant="secondary">{selectedRoute?.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Criado por</span>
                  <span className="font-medium">{selectedRoute?.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge
                    variant={selectedRoute?.status === "published" ? "default" : "secondary"}
                    className={selectedRoute?.status === "published" ? "bg-green-100 text-green-800" : ""}
                  >
                    {selectedRoute?.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

  
    if (!isLoggedIn) {
      return renderLoginScreen()
    }

    switch (currentScreen) {
      case "home":
        return renderHomeScreen()
      case "route-details":
        return renderRouteDetails()
      case "reviews":
        return renderReviewsScreen()
      case "add-review":
        return renderAddReviewScreen()
      case "user-management":
        return renderUserManagement()
      case "notifications":
        return renderNotifications()
      case "create-route":
        return renderCreateRoute()
      case "profile":
        return renderProfileScreen()
      default:
        return renderHomeScreen()
    }
  }
