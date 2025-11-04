import { ArrowLeft, Star, MessageSquare, ThumbsUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Route, Screen, Review } from "../types"

interface ReviewsScreenProps {
  navigateTo: (screen: Screen) => void
  selectedRoute: Route | null
  reviews: Review[]
  renderStarRating: (rating: number, size?: "sm" | "md" | "lg") => JSX.Element
  reviewFilter: string
  setReviewFilter: (filter: string) => void
}

const ReviewItem = ({ review, renderStarRating }: { review: Review, renderStarRating: (rating: number, size?: "sm" | "md" | "lg") => JSX.Element }) => (
  <div className="p-4 border-b last:border-b-0">
    <div className="flex items-start space-x-3">
      <Avatar className="w-10 h-10">
        <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
        <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-blue-900">{review.userName}</span>
          {review.verified && (
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              Verificado
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 mb-2">
          {renderStarRating(review.overallRating, "md")}
          <span className="text-xs text-gray-500">
            {new Date(review.date).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <p className="text-sm text-gray-700">{review.comment}</p>
        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
            <ThumbsUp className="w-4 h-4" />
            <span>Útil ({review.helpful})</span>
          </div>
          <span className="text-xs">Responder</span>
        </div>
      </div>
    </div>
  </div>
)

export default function ReviewsScreen({
  navigateTo,
  selectedRoute,
  reviews,
  renderStarRating,
  reviewFilter,
  setReviewFilter,
}: ReviewsScreenProps) {
  if (!selectedRoute) {
    return (
      <div className="p-4 text-center">
        <p>Rota não selecionada.</p>
        <Button onClick={() => navigateTo("home")}>Voltar para Home</Button>
      </div>
    )
  }

  const routeReviews = reviews.filter((r) => r.routeId === selectedRoute.id)
  const filteredReviews =
    reviewFilter === "all"
      ? routeReviews
      : routeReviews.filter((r) => r.overallRating === parseInt(reviewFilter))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-700"
          onClick={() => navigateTo("route-details", selectedRoute)}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Avaliações de {selectedRoute.title}</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Filtros */}
        <Card className="border-blue-100">
          <CardContent className="flex items-center space-x-3 p-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Filtrar por:</span>
            <Select value={reviewFilter} onValueChange={setReviewFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todas as Avaliações" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Avaliações ({routeReviews.length})</SelectItem>
                <SelectItem value="5">5 Estrelas ({routeReviews.filter(r => r.overallRating === 5).length})</SelectItem>
                <SelectItem value="4">4 Estrelas ({routeReviews.filter(r => r.overallRating === 4).length})</SelectItem>
                <SelectItem value="3">3 Estrelas ({routeReviews.filter(r => r.overallRating === 3).length})</SelectItem>
                <SelectItem value="2">2 Estrelas ({routeReviews.filter(r => r.overallRating === 2).length})</SelectItem>
                <SelectItem value="1">1 Estrela ({routeReviews.filter(r => r.overallRating === 1).length})</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Lista de Avaliações */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              {filteredReviews.length} Avaliações Encontradas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh]">
              {filteredReviews.map((review) => (
                <ReviewItem key={review.id} review={review} renderStarRating={renderStarRating} />
              ))}
              {filteredReviews.length === 0 && (
                <p className="p-4 text-center text-gray-500">Nenhuma avaliação encontrada com este filtro.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
