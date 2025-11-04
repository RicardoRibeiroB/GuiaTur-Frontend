import { ArrowLeft, Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Route, Screen } from "../types"

interface AddReviewScreenProps {
  navigateTo: (screen: Screen, route?: Route) => void
  selectedRoute: Route | null
  overallRating: number
  setOverallRating: (rating: number) => void
  guideRating: number
  setGuideRating: (rating: number) => void
  organizationRating: number
  setOrganizationRating: (rating: number) => void
  valueRating: number
  setValueRating: (rating: number) => void
  comment: string
  setComment: (comment: string) => void
}

const RatingSelector = ({
  title,
  rating,
  setRating,
}: {
  title: string
  rating: number
  setRating: (rating: number) => void
}) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{title}</span>
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  </div>
)

export default function AddReviewScreen({
  navigateTo,
  selectedRoute,
  overallRating,
  setOverallRating,
  guideRating,
  setGuideRating,
  organizationRating,
  setOrganizationRating,
  valueRating,
  setValueRating,
  comment,
  setComment,
}: AddReviewScreenProps) {
  if (!selectedRoute) {
    return (
      <div className="p-4 text-center">
        <p>Rota não selecionada.</p>
        <Button onClick={() => navigateTo("home")}>Voltar para Home</Button>
      </div>
    )
  }

  const handleSubmit = () => {
    // Lógica de submissão da avaliação (mock)
    console.log("Avaliação submetida:", {
      routeId: selectedRoute.id,
      overallRating,
      guideRating,
      organizationRating,
      valueRating,
      comment,
    })
    // Resetar estados e voltar para a tela de detalhes
    setOverallRating(0)
    setGuideRating(0)
    setOrganizationRating(0)
    setValueRating(0)
    setComment("")
    navigateTo("route-details", selectedRoute)
  }

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
        <h1 className="text-xl font-bold ml-4">Avaliar: {selectedRoute.title}</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Classificação Geral */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Classificação Geral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RatingSelector
              title="Avaliação Geral"
              rating={overallRating}
              setRating={setOverallRating}
            />
            <RatingSelector
              title="Qualidade do Guia"
              rating={guideRating}
              setRating={setGuideRating}
            />
            <RatingSelector
              title="Organização"
              rating={organizationRating}
              setRating={setOrganizationRating}
            />
            <RatingSelector
              title="Custo-Benefício"
              rating={valueRating}
              setRating={setValueRating}
            />
          </CardContent>
        </Card>

        {/* Comentário */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Seu Comentário</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Compartilhe sua experiência detalhada..."
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Ação */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={overallRating === 0}>
          <Send className="w-4 h-4 mr-2" />
          Enviar Avaliação
        </Button>
      </div>
    </div>
  )
}
