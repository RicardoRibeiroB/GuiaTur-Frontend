import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRole } from "../types"

interface LoginScreenProps {
  handleLogin: (role: UserRole) => void
}

export default function LoginScreen({ handleLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center p-6">
      <div className="text-center mb-8">
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
}
