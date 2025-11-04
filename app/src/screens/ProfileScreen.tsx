import { ArrowLeft, Edit, Settings, Users, Shield, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Screen, UserRole } from "../types"

interface ProfileScreenProps {
  navigateTo: (screen: Screen) => void
  userRole: UserRole
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export default function ProfileScreen({ navigateTo, userRole, setIsLoggedIn }: ProfileScreenProps) {
  const handleLogout = () => {
    setIsLoggedIn(false)
    navigateTo("login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700" onClick={() => navigateTo("home")}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Meu Perfil</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Informações do Usuário */}
        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-blue-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Informações Pessoais
            </CardTitle>
            <Button variant="ghost" size="icon">
              <Edit className="w-5 h-5 text-blue-600" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold text-blue-900">Usuário de Demonstração</p>
                <p className="text-sm text-gray-600 capitalize">{userRole}</p>
              </div>
            </div>
            <Input placeholder="Nome Completo" defaultValue="Usuário de Demonstração" />
            <Input placeholder="E-mail" defaultValue="demo@guiatur.com" type="email" />
            <Input placeholder="Telefone" defaultValue="(99) 99999-9999" />
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Configurações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">Notificações por E-mail</p>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Modo Escuro</p>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Idioma</p>
              <p className="text-sm text-gray-600">Português (Brasil)</p>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  )
}
