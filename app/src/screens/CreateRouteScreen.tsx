import { ArrowLeft, Plus, MapPin, Clock, Star, Camera, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Screen } from "../types"

interface CreateRouteScreenProps {
  navigateTo: (screen: Screen) => void
}

export default function CreateRouteScreen({ navigateTo }: CreateRouteScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700" onClick={() => navigateTo("home")}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Criar Nova Rota</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Informações Básicas */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Detalhes da Rota
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Título da Rota" />
            <Textarea placeholder="Descrição Detalhada da Rota" rows={4} />
            <div className="grid grid-cols-2 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="historia">História</SelectItem>
                  <SelectItem value="aventura">Aventura</SelectItem>
                  <SelectItem value="comida">Comida</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facil">Fácil</SelectItem>
                  <SelectItem value="medio">Médio</SelectItem>
                  <SelectItem value="dificil">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Duração (ex: 2 horas)" />
              <Input placeholder="Máx. Participantes" type="number" />
            </div>
          </CardContent>
        </Card>

        {/* Mídia */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Mídia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-blue-300 p-6 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
              <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-blue-600 font-medium">Clique para adicionar imagem principal</p>
              <p className="text-xs text-gray-500">JPG, PNG, até 5MB</p>
            </div>
          </CardContent>
        </Card>

        {/* Pontos de Interesse */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Pontos de Interesse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Adicione os pontos de parada e o cronograma da rota.</p>
            <Button variant="outline" className="w-full border-blue-600 text-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Ponto
            </Button>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1 border-blue-600 text-blue-600">
            Salvar Rascunho
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Publicar Rota
          </Button>
        </div>
      </div>
    </div>
  )
}
