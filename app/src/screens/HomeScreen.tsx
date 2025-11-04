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
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Route, Screen, UserRole } from "../types"

interface HomeScreenProps {
  userRole: UserRole
  navigateTo: (screen: Screen, route?: Route) => void
  routes: Route[]
  renderStarRating: (rating: number, size?: "sm" | "md" | "lg") => JSX.Element
}

// Componente de Card de Rota
const RouteCard = ({ route, navigateTo, renderStarRating }: { route: Route, navigateTo: (screen: Screen, route?: Route) => void, renderStarRating: (rating: number, size?: "sm" | "md" | "lg") => JSX.Element }) => (
  <Card
    key={route.id}
    className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    onClick={() => navigateTo("route-details", route)}
  >
    <img
      src={route.image}
      alt={route.title}
      className="w-full h-40 object-cover"
    />
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-2">
        <CardTitle className="text-lg font-bold text-blue-900 line-clamp-1">{route.title}</CardTitle>
        <Badge variant="secondary" className="capitalize">
          {route.category}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{route.description}</p>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>{route.duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>{route.difficulty}</span>
        </div>
        <div className="flex items-center space-x-1">
          {renderStarRating(route.rating, "md")}
          <span className="font-medium">{route.rating}</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function HomeScreen({ userRole, navigateTo, routes, renderStarRating }: HomeScreenProps) {
  return (
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
              onClick={() => navigateTo("notifications")}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
              onClick={() => navigateTo("profile")}
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
              onClick={() => navigateTo("create-route")}
              className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Rota
            </Button>
            <Button
              onClick={() => navigateTo("user-management")}
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
              <RouteCard key={route.id} route={route} navigateTo={navigateTo} renderStarRating={renderStarRating} />
            ))}
          </TabsContent>

          <TabsContent value="events" className="space-y-4 mt-4">
            <p className="text-center text-gray-500">Nenhum evento próximo encontrado.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
