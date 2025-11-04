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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Route, Screen, Review, UserRole } from "../types"

interface RouteDetailsScreenProps {
  navigateTo: (screen: Screen, route?: Route) => void
  selectedRoute: Route | null
  reviews: Review[]
  renderStarRating: (rating: number, size?: "sm" | "md" | "lg") => JSX.Element
  userRole: UserRole
}

export default function RouteDetailsScreen({
  navigateTo,
  selectedRoute,
  reviews,
  renderStarRating,
  userRole,
}: RouteDetailsScreenProps) {
  if (!selectedRoute) {
    return (
      <div className="p-4 text-center">
        <p>Rota não encontrada.</p>
        <Button onClick={() => navigateTo("home")}>Voltar para Home</Button>
      </div>
    )
  }

  const routeReviews = reviews.filter((r) => r.routeId === selectedRoute.id)
  const averageRating =
    routeReviews.length > 0
      ? (routeReviews.reduce((sum, r) => sum + r.overallRating, 0) / routeReviews.length).toFixed(1)
      : "0.0"

  const getStatusBadge = (status: Route["status"]) => {
    switch (status) {
      case "published":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Publicada
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
            Pendente
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="default" className="bg-gray-500 hover:bg-gray-600">
            Rascunho
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-64">
        <img
          src={selectedRoute.image}
          alt={selectedRoute.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
          onClick={() => navigateTo("home")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h1 className="text-2xl font-bold mb-1">{selectedRoute.title}</h1>
          <div className="flex items-center space-x-2">
            {renderStarRating(parseFloat(averageRating), "md")}
            <span className="font-medium">{averageRating}</span>
            <span className="text-sm">({routeReviews.length} avaliações)</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Info */}
        <Card className="border-blue-100">
          <CardContent className="flex justify-around p-4">
            <div className="text-center">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Duração</p>
              <p className="font-bold text-blue-900">{selectedRoute.duration}</p>
            </div>
            <div className="text-center">
              <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Dificuldade</p>
              <p className="font-bold text-blue-900">{selectedRoute.difficulty}</p>
            </div>
            <div className="text-center">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Participantes</p>
              <p className="font-bold text-blue-900">
                {selectedRoute.participants}/{selectedRoute.maxParticipants}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Sobre a Rota</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{selectedRoute.description}</p>
          </CardContent>
        </Card>

        {/* Reviews Summary */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <Star className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" />
              Avaliações ({routeReviews.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-center">
                <p className="text-5xl font-bold text-blue-900">{averageRating}</p>
                <div className="flex justify-center">{renderStarRating(parseFloat(averageRating), "lg")}</div>
                <p className="text-sm text-gray-500">{routeReviews.length} avaliações</p>
              </div>
              <div className="flex-1 space-y-1">
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
                onClick={() => navigateTo("reviews", selectedRoute)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Ver Todas as Avaliações
              </Button>
              {userRole === "resident" && (
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigateTo("add-review", selectedRoute)}
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
          <div className="mt-6">
            <h4 className="font-semibold text-blue-900 mb-3">Pontos de Parada</h4>

            <div className="space-y-3">
              {/* Ponto 1 */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm text-blue-900">Praça Central</p>
                    <p className="text-xs text-gray-600">Ponto de encontro - 09:00</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-semibold bg-white border-green-300 text-green-700">
                  Início
                </Badge>
              </div>

              {/* Ponto 2 */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm text-blue-900">Igreja Matriz</p>
                    <p className="text-xs text-gray-600">Visita guiada - 09:30</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-semibold bg-white border-blue-300 text-blue-700">
                  30 min
                </Badge>
              </div>

              {/* Ponto 3 */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm text-blue-900">Museu da Cidade</p>
                    <p className="text-xs text-gray-600">Exposição histórica - 10:15</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-semibold bg-white border-blue-300 text-blue-700">
                  45 min
                </Badge>
              </div>

              {/* Ponto Final */}
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full shrink-0"></div>
                  <div>
                    <p className="font-medium text-sm text-blue-900">Mirante do Centro</p>
                    <p className="text-xs text-gray-600">Vista panorâmica - 11:00</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-semibold bg-white border-red-300 text-red-700">
                  Final
                </Badge>
              </div>
            </div>
          </div>

            {/* Map Actions */}
<div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
  <Button
    variant="outline"
    className="flex-1 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 text-sm sm:text-base flex items-center justify-center whitespace-nowrap"
  >
    <MapPin className="w-4 h-4 mr-2 shrink-0" />
    Ver no Mapa Completo
  </Button>

  <Button
    variant="outline"
    className="flex-1 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 text-sm sm:text-base flex items-center justify-center whitespace-nowrap"
  >
    <Navigation className="w-4 h-4 mr-2 shrink-0" />
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
              <Badge variant="secondary">{selectedRoute.category}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Criado por</span>
              <span className="font-medium">{selectedRoute.author}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              {getStatusBadge(selectedRoute.status)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
