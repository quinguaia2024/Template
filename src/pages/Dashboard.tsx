import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronDown, BookOpen, TrendingUp, Target, Plus, LogOut, Sparkles, Brain, Award, Calendar, Zap, LayoutDashboard, Search, Menu } from 'lucide-react';
import { useAuth } from '@/auth';
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
import { FadeUp, RevealLine, AnimatedCounter, ScrambleText } from '@/components/landing/ScrollAnimations';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const subjects = [
    { name: 'Programação', progress: 80, icon: <Brain className="w-6 h-6 text-primary" />, color: 'var(--primary)' },
    { name: 'Matemática', progress: 60, icon: <Zap className="w-6 h-6 text-glow-amber" />, color: 'var(--glow-amber)' },
    { name: 'Inglês', progress: 30, icon: <Sparkles className="w-6 h-6 text-secondary" />, color: 'var(--secondary)' }
  ];

  const nextSteps = [
    { title: 'Variáveis em Python', desc: 'Faltam 2 exercícios práticos', time: '15 min' },
    { title: 'Revisão de Lógica', desc: 'Reforço sugerido pela IA', time: '10 min' },
    { title: 'Quiz Semanal', desc: 'Avalie seus conhecimentos', time: '20 min' }
  ];

  return (
    <div className="min-h-screen bg-background geometric-bg font-sans overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10" />
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-glow-amber/5 blur-[120px] pointer-events-none -z-10" />

      {/* Modern Header */}
      <header className="border-b border-white/5 bg-background/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
                <Menu className="w-5 h-5" />
              </Button>
              
              {/* Logo */}
              <div className="flex items-center gap-3 relative group cursor-pointer">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center relative">
                  <span className="text-primary font-medium text-lg">M</span>
                </div>
                <span className="text-xl font-medium tracking-wide">Mentor<span className="text-primary">IA</span></span>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center relative w-full max-w-md mx-8">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
              <input 
                type="text"
                placeholder="Buscar temas, exercícios ou módulos..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-white/5 rounded-full">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full glow-dot" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 hover:bg-white/5 rounded-full pl-2 pr-4 py-2 h-auto border border-transparent hover:border-white/5 transition-all">
                    <Avatar className="w-8 h-8 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium leading-none">{user.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-primary mt-1">{user.role}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-white/10">
                  <DropdownMenuItem className="cursor-pointer hover:bg-white/5">Meu Perfil</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-white/5">Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer hover:bg-destructive/10 hover:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Encerrar Sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Progress & Stats Bar */}
        <FadeUp>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-6 mb-12 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3 w-full md:w-auto md:flex-1">
              <Target className="w-5 h-5 text-primary" />
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progresso Geral</span>
                  <span className="font-medium text-primary"><AnimatedCounter target={65} />%</span>
                </div>
                <Progress value={65} className="h-1.5 bg-white/5" />
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <div className="flex items-center gap-8 px-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Série Atual</p>
                <p className="font-medium text-glow-amber flex items-center gap-1">
                  🔥 <AnimatedCounter target={7} /> dias
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pontos (XP)</p>
                <p className="font-medium text-primary flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> <AnimatedCounter target={2450} />
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Dynamic Welcome Hero */}
        <FadeUp delay={0.1}>
          <div className="relative mb-12 rounded-3xl overflow-hidden glass-card border-white/10 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                  <LayoutDashboard className="w-3 h-3" /> Fase 4: Exercícios Adaptativos
                </div>
                <h1 className="text-4xl md:text-5xl font-light mb-4 text-foreground tracking-tight">
                  De volta à jornada, <br />
                  <ScrambleText text={user.name.split(' ')[0]} className="font-medium text-gradient-primary" />!
                </h1>
                <p className="text-muted-foreground mb-8 text-lg font-light leading-relaxed">
                  A IA preparou uma trilha de aprendizagem baseada no seu desempenho recente.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">Programação {'>'} Variáveis</h4>
                        <p className="text-sm text-muted-foreground mt-1">Nível Intermediário • Tempo: 15 min</p>
                      </div>
                      <span className="flex text-glow-amber text-xs">★★★☆☆</span>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <Button className="rounded-full px-8 btn-wave bg-primary text-primary-foreground hover:bg-primary/90">
                        Continuar Exercício
                      </Button>
                      <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-foreground">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights Card */}
              <div className="h-full flex flex-col justify-center">
                <div className="p-6 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 glow-line" />
                  <h3 className="flex items-center gap-2 font-medium text-lg mb-4">
                    <Brain className="w-5 h-5 text-primary" /> Insights do seu Mentor
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                      <span className="text-muted-foreground">Você está <span className="text-foreground">15% acima da média</span> em Lógica de Programação.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                      <span className="text-muted-foreground">Seu pico de aprendizado costuma ser <span className="text-foreground">entre 19h e 21h</span>.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-glow-amber/20 flex items-center justify-center text-glow-amber">!</div>
                      <span className="text-muted-foreground">Matemática Discreta precisa de um pouco mais de atenção esta semana.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        <RevealLine className="my-12 opacity-20" />

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <FadeUp delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light tracking-tight flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary" /> Suas Disciplinas
                </h2>
                <Button variant="link" className="text-sm text-primary hover:text-primary/80">
                  Ver Todas
                </Button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    className="p-6 rounded-2xl glass-card border-white/5 hover:border-white/10 group cursor-pointer relative overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {subject.icon}
                      </div>
                      <span className="text-2xl font-light">{subject.progress}%</span>
                    </div>
                    
                    <h4 className="text-lg font-medium mb-2">{subject.name}</h4>
                    <Progress value={subject.progress} className="h-1 bg-white/10 mb-2" />
                    <p className="text-xs text-muted-foreground mt-3">
                      Última atividade há 2 horas
                    </p>
                  </motion.div>
                ))}
                
                <motion.div
                  className="p-6 rounded-2xl border border-dashed border-white/20 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[200px]"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground">Nova Disciplina</p>
                  <p className="text-sm text-muted-foreground mt-1">Explorar catálogo</p>
                </motion.div>
              </div>
            </FadeUp>
          </div>

          {/* Sidebar / Secondary Content Area */}
          <div className="space-y-8">
            <FadeUp delay={0.3}>
              <Card className="glass-card border-white/5 bg-black/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" /> Próximos Passos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nextSteps.map((step, idx) => (
                    <div key={idx} className="group flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-medium text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{step.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
                            {step.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full mt-4 bg-white/5 hover:bg-white/10 text-foreground" variant="secondary">
                    Ver Roteiro Completo
                  </Button>
                </CardContent>
              </Card>
            </FadeUp>

            <FadeUp delay={0.4}>
              <Card className="glass-card border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2 text-primary">
                    <Award className="w-5 h-5" /> Meta da Semana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Complete 5 exercícios de Lógica para ganhar a badge <strong className="text-foreground">Lógico Mestre</strong>.</p>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="text-primary font-medium">3/5</span>
                  </div>
                  <Progress value={60} className="h-2 bg-black/20" />
                </CardContent>
              </Card>
            </FadeUp>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
