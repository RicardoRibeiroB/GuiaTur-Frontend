import { useState } from "react"
import { ArrowLeft, Edit, Trash2, Shield, Users, CheckCircle, XCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { AppUser, Screen } from "../types"

interface UserManagementScreenProps {
  navigateTo: (screen: Screen) => void
  users: AppUser[]
}

const UserRow = ({
  user,
  onToggleStatus,
}: {
  user: AppUser
  onToggleStatus: (id: string, newStatus: string) => void
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border-b last:border-b-0">
    <div className="flex items-center space-x-3 min-w-0">
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="font-medium text-blue-900 truncate">{user.name}</p>
        <p className="text-sm text-gray-500 truncate">{user.email}</p>
      </div>
    </div>

    <div className="flex items-center justify-between w-full mt-2 sm:w-auto sm:mt-0 sm:space-x-4">
      <div className="text-sm text-gray-600 capitalize min-w-[60px] text-right flex-shrink-0">{user.role}</div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <span className="text-sm text-gray-500">{user.status === "active" ? "Ativo" : "Inativo"}</span>
        <Switch
          checked={user.status === "active"}
          onCheckedChange={(checked) => onToggleStatus(user.id, checked ? "active" : "inactive")}
        />
      </div>
      <div className="hidden sm:flex items-center">
        <Button variant="ghost" size="icon">
          <Edit className="w-4 h-4 text-blue-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </div>
    </div>
  </div>
)

export default function UserManagementScreen({ navigateTo, users }: UserManagementScreenProps) {
  const [userList, setUserList] = useState(users)

  const handleToggleStatus = (id: string, newStatus: string) => {
    setUserList((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-700"
          onClick={() => navigateTo("home")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Gerenciamento de Usuários</h1>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Lista de usuários */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Lista de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {userList.map((user) => (
              <UserRow key={user.id} user={user} onToggleStatus={handleToggleStatus} />
            ))}
          </CardContent>
        </Card>

        {/* Regras de acesso */}
        <div className="mt-6 space-y-4">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Regras de Acesso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">Administrador</p>
                <p className="text-sm text-gray-600 text-right">
                  Acesso total ao sistema e gerenciamento de usuários.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Publicador</p>
                <p className="text-sm text-gray-600 text-right">
                  Pode criar, editar e publicar rotas.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Morador Local</p>
                <p className="text-sm text-gray-600 text-right">
                  Pode visualizar rotas e deixar avaliações.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Botão adicionar novo usuário */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Novo Usuário
          </Button>
        </div>
      </div>
    </div>
  )
}
