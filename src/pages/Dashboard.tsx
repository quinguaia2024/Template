import { motion } from 'framer-motion';
import { Bell, ChevronDown, BookOpen, TrendingUp, Target, Plus, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Carregando...</div>;
  }

  const subjects = [
    { name: 'Programação', progress: 80, color: 'bg-primary' },
    { name: 'Matemática', progress: 60, color: 'bg-secondary' },
    { name: 'Inglês', progress: 30, color: 'bg-accent' }
  ];

  const nextSteps = [
    'Complete seu perfil',
    'Selecione suas disciplinas',
    'Comece com o primeiro exercício'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">M</span>
              </div>
              <span className="text-lg font-bold">Mentor IA</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              
              {/* Notificações */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>

              {/* Menu do Perfil */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.role}</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-['Clash_Display']">
            Bem-vindo, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Você está registado como <span className="font-medium text-primary">{user.role}</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Minhas Disciplinas */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Minhas Disciplinas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={subject.name}
                      className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    >
                      <div className="text-center">
                        <h4 className="font-medium mb-2">{subject.name}</h4>
                        <div className={`w-12 h-12 mx-auto rounded-full ${subject.color}/20 flex items-center justify-center mb-2`}>
                          <BookOpen className={`w-6 h-6 ${subject.color.replace('bg-', 'text-')}`} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {subject.progress}% completo
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Botão Adicionar */}
                  <motion.div
                    className="p-4 rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center min-h-[120px]"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <div className="text-center">
                      <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Adicionar Disciplina
                      </p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Próximos Passos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  Próximos Passos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nextSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/30 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Meu Progresso */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Meu Progresso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={subject.name}
                      className="space-y-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{subject.name}</h4>
                        <span className="text-sm font-medium">{subject.progress}%</span>
                      </div>
                      <Progress 
                        value={subject.progress} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        Continue praticando para melhorar!
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;