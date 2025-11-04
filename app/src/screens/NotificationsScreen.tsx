import { ArrowLeft, Bell, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Screen } from "../types"

interface NotificationsScreenProps {
  navigateTo: (screen: Screen) => void
}

const mockNotifications = [
  {
    id: 1,
    type: "success",
    message: "Sua rota 'Tour a Pé' foi publicada com sucesso!",
    time: "5 minutos atrás",
  },
  {
    id: 2,
    type: "info",
    message: "Novo usuário 'João Silva' se registrou como Administrador.",
    time: "1 hora atrás",
  },
  {
    id: 3,
    type: "warning",
    message: "A rota 'Trilha do Pôr do Sol' atingiu 90% da capacidade máxima.",
    time: "Ontem",
  },
  {
    id: 4,
    type: "error",
    message: "Falha ao processar o upload da imagem da rota 'Mercado Local'.",
    time: "2 dias atrás",
  },
  {
    id: 5,
    type: "success",
    message: "Nova avaliação na rota 'Tour a Pé'.",
    time: "3 dias atrás",
  },
]

const NotificationItem = ({ notification }: { notification: typeof mockNotifications[0] }) => {
  const icon =
    notification.type === "success" ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : notification.type === "warning" ? (
      <XCircle className="w-5 h-5 text-yellow-500" />
    ) : notification.type === "error" ? (
      <XCircle className="w-5 h-5 text-red-500" />
    ) : (
      <Bell className="w-5 h-5 text-blue-500" />
    )

  return (
    <div className="flex items-start space-x-3 p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="pt-1">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-blue-900">{notification.message}</p>
        <p className="text-xs text-gray-500">{notification.time}</p>
      </div>
      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
        <XCircle className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default function NotificationsScreen({ navigateTo }: NotificationsScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700" onClick={() => navigateTo("home")}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Notificações</h1>
      </div>

      <div className="px-4 py-6 flex justify-center">
  <Card className="w-full max-w-2xl shadow-md border border-blue-100">
    <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-blue-100">
      <CardTitle className="text-blue-900 flex items-center text-base">
        <Bell className="w-5 h-5 mr-2" />
        Suas Notificações
      </CardTitle>
    </CardHeader>

    <CardContent className="p-0">
      <ScrollArea className="max-h-[60vh] overflow-y-auto">
        {mockNotifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
</div>

    </div>
  )
}
