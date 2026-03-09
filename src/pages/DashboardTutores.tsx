import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, ChevronDown, Search, Menu, Users2, Target, 
  AlertTriangle, MessageCircle, Activity, Calendar,
  TrendingUp, BookOpen, Clock, Award, CheckCircle,
  AlertCircle, XCircle, Plus, Settings
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TutorSidebar } from '@/components/TutorSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface Student {
  id: string;
  name: string;
  age: number;
  institution: string;
  status: 'verde' | 'amarelo' | 'vermelho';
  overallProgress: number;
  subjects: Array<{
    name: string;
    progress: number;
    hasAlert?: boolean;
  }>;
  todayActivity: string;
  streak: number;
  lastActivity: string;
}

interface Alert {
  id: string;
  student: string;
  subject: string;
  status: 'amarelo' | 'vermelho';
  performance: number;
  target: number;
  analysis: {
    recentScores: number[];
    studyTime: string;
    difficultTopics: string[];
  };
  recommendations: string[];
}

const DashboardTutores = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data
  const students: Student[] = [
    {
      id: '1',
      name: 'João Silva',
      age: 14,
      institution: 'Escola Técnica A',
      status: 'verde',
      overallProgress: 85,
      subjects: [
        { name: 'Programação', progress: 80 },
        { name: 'Matemática', progress: 90 },
        { name: 'Inglês', progress: 70 }
      ],
      todayActivity: '2 horas',
      streak: 12,
      lastActivity: 'Há 1 hora'
    },
    {
      id: '2',
      name: 'Maria Silva',
      age: 12,
      institution: 'Escola Técnica A',
      status: 'verde',
      overallProgress: 78,
      subjects: [
        { name: 'Inglês', progress: 75 },
        { name: 'Matemática', progress: 80 },
        { name: 'Ciências', progress: 60 }
      ],
      todayActivity: '1.5 horas',
      streak: 8,
      lastActivity: 'Há 3 horas'
    },
    {
      id: '3',
      name: 'Pedro Silva',
      age: 15,
      institution: 'Escola Técnica B',
      status: 'amarelo',
      overallProgress: 62,
      subjects: [
        { name: 'Programação', progress: 55, hasAlert: true },
        { name: 'Inglês', progress: 70 },
        { name: 'Matemática', progress: 80 }
      ],
      todayActivity: '30 min',
      streak: 2,
      lastActivity: 'Há 1 dia'
    }
  ];

  const activeAlert: Alert = {
    id: '1',
    student: 'Pedro Silva',
    subject: 'Programação',
    status: 'amarelo',
    performance: 55,
    target: 70,
    analysis: {
      recentScores: [40, 50, 65],
      studyTime: '30 min/dia (Recomendado: 45 min)',
      difficultTopics: ['Funções', 'Loops']
    },
    recommendations: [
      'Aumentar tempo de estudo em 15 minutos',
      'Revisar tópicos de Funções',
      'Contactar professor para suporte adicional'
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verde': return 'text-[#10b981]';
      case 'amarelo': return 'text-[#fbbf24]';
      case 'vermelho': return 'text-destructive';
      default: return 'text-[#10b981]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verde': return <CheckCircle className="w-4 h-4" />;
      case 'amarelo': return <AlertCircle className="w-4 h-4" />;
      case 'vermelho': return <XCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verde': return 'No Ritmo';
      case 'amarelo': return 'Atenção';
      case 'vermelho': return 'Crítico';
      default: return 'No Ritmo';
    }
  };

  const studentsOnTrack = students.filter(s => s.status === 'verde').length;
  const studentsWithAttention = students.filter(s => s.status === 'amarelo').length;

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background geometric-bg font-sans w-full flex">
        {/* Background Elements */}
        <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10" />
        <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[hsl(45_95%_56%)]/5 blur-[120px] pointer-events-none -z-10" />

        {/* Sidebar */}
        <TutorSidebar students={students} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-white/5 bg-background/40 backdrop-blur-xl sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-8 py-4">
              <div className="flex items-center justify-between">
                
                {/* Left section */}
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="hover:bg-white/5 rounded-full p-2 transition-colors" />
                  
                  {/* Logo */}
                  <div className="flex items-center gap-3 relative group cursor-pointer">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center relative">
                      <span className="text-primary font-medium text-lg">M</span>
                    </div>
                    <span className="text-xl font-medium tracking-wide">Mentor<span className="text-primary">IA</span></span>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex items-center relative w-full max-w-md mx-8">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
                  <input 
                    type="text"
                    placeholder="Buscar aluno, disciplina..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="relative hover:bg-white/5 rounded-full">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[hsl(45_95%_56%)] rounded-full glow-dot" />
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
                          <span className="text-[10px] text-primary mt-1">Tutor</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-white/10">
                      <DropdownMenuItem className="cursor-pointer hover:bg-white/5">Meu Perfil</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-white/5">Configurações</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer hover:bg-destructive/10 hover:text-destructive">
                        <Settings className="w-4 h-4 mr-2" />
                        Encerrar Sessão
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  📊 Resumo: {students.length} Alunos
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  {studentsOnTrack} No Ritmo
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                  {studentsWithAttention} Atenção
                </span>
                <span>📅 Última Atualização: Há 2 horas</span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 space-y-8">
            {/* Welcome Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden glass-card border-white/10 p-8 md:p-12"
            >
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-light mb-2 text-foreground tracking-tight">
                    👋 Bem-vindo de Volta, {user.name.split(' ')[0]}!
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Tudo sob controle com seus filhos 👨‍👩‍👧
                  </p>
                </div>

                {/* Daily Summary */}
                <Card className="glass-card border-white/5 bg-black/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      📊 RESUMO DO DIA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className={`font-medium flex items-center gap-2 ${getStatusColor(student.status)}`}>
                              {getStatusIcon(student.status)}
                              {student.name}: {getStatusText(student.status)} ({student.overallProgress}%)
                            </h4>
                            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                              {student.subjects.map((subject, idx) => (
                                <span key={idx} className={subject.hasAlert ? 'text-[#fbbf24]' : ''}>
                                  {subject.name}: {subject.progress}%{subject.hasAlert && ' (Revisar)'}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Última atividade: {student.lastActivity}
                        </p>
                        {student.status === 'amarelo' && (
                          <p className="text-xs text-[#fbbf24] mt-2">
                            ⚠️ Recomendação: Aumentar tempo de estudo
                          </p>
                        )}
                      </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" className="border-white/20 hover:bg-white/5">
                        Comunicar com Professores
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Insights */}
                <div className="mt-6 space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-[#10b981]">✓</span> Todos os alunos estão engajados esta semana
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-[#fbbf24]">⚠</span> Pedro precisa de reforço em Programação
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-[#10b981]">✓</span> João está acima da média em todas as disciplinas
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Active Alerts Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🚨 ALERTAS ATIVOS
                    <Badge variant="secondary" className="ml-2">1</Badge>
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">Sistema Inteligente de Monitoramento</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Active Alert */}
                  <div className="p-6 rounded-xl border border-[#fbbf24]/20 bg-[#fbbf24]/5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-[#fbbf24] flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4" />
                          ATENÇÃO: {activeAlert.student} - {activeAlert.subject}
                        </h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Status: Desempenho Abaixo da Meta</p>
                          <p>Disciplina: {activeAlert.subject}</p>
                          <p>Desempenho: {activeAlert.performance}% (Meta: {activeAlert.target}%)</p>
                          <p>Faltam: {activeAlert.target - activeAlert.performance} pontos percentuais</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Análise:</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Últimas 3 exercícios: {activeAlert.analysis.recentScores.join('%, ')}% (Tendência ↑)</li>
                          <li>• Tempo de estudo: {activeAlert.analysis.studyTime}</li>
                          <li>• Tópicos com dificuldade: {activeAlert.analysis.difficultTopics.join(', ')}</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Recomendações:</h5>
                        <ol className="space-y-1 text-sm text-muted-foreground">
                          {activeAlert.recommendations.map((rec, idx) => (
                            <li key={idx}>{idx + 1}. {rec}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          Contactar Professor
                        </Button>
                        <Button variant="outline" className="border-white/20 hover:bg-white/5">
                          Ver Detalhes
                        </Button>
                        <Button variant="ghost" className="text-muted-foreground hover:bg-white/5">
                          Descartar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Alert History */}
                  <div>
                    <h5 className="font-medium mb-3">Histórico de Alertas:</h5>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">• 15 Mar: <span className="text-[#fbbf24]">🟡</span> Atenção - Matemática (Resolvido)</p>
                      <p className="text-muted-foreground">• 10 Mar: <span className="text-[#10b981]">🟢</span> Volta ao Ritmo - Inglês</p>
                      <p className="text-muted-foreground">• 05 Mar: <span className="text-destructive">🔴</span> Crítico - Programação (Resolvido)</p>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex gap-3">
                    <Button variant="outline" className="border-white/20 hover:bg-white/5">
                      Ver Todos os Alertas
                    </Button>
                    <Button variant="ghost" className="text-muted-foreground hover:bg-white/5">
                      Configurar Notificações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Students Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light tracking-tight flex items-center gap-3">
                  👨‍👩‍👧 MEUS ALUNOS
                </h2>
                <p className="text-muted-foreground">Monitoramento de {students.length} Alunos em 2 Instituições</p>
              </div>
              
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {students.map((student) => (
                  <motion.div
                    key={student.id}
                    className="p-6 rounded-2xl glass-card border-white/5 hover:border-white/10 group cursor-pointer relative overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <div className="space-y-4">
                      {/* Student Info */}
                      <div>
                        <h4 className="text-lg font-medium">{student.name} ({student.age} anos)</h4>
                        <p className="text-sm text-muted-foreground">Instituição: {student.institution}</p>
                        <div className={`flex items-center gap-2 mt-2 ${getStatusColor(student.status)}`}>
                          {getStatusIcon(student.status)}
                          <span className="text-sm font-medium">Status: {getStatusText(student.status)}</span>
                        </div>
                      </div>

                      {/* Overall Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Progresso Geral</span>
                          <span className="text-lg font-light">{student.overallProgress}%</span>
                        </div>
                        <Progress value={student.overallProgress} className="h-2 bg-white/10" />
                      </div>

                      {/* Subjects */}
                      <div>
                        <h5 className="text-sm font-medium mb-3">Disciplinas:</h5>
                        <div className="space-y-2">
                          {student.subjects.map((subject, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className={`text-sm ${subject.hasAlert ? 'text-[#fbbf24]' : 'text-muted-foreground'}`}>
                                • {subject.name}: {subject.progress}%
                                {subject.hasAlert && ' ⚠️'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Activity Stats */}
                      <div className="pt-2 border-t border-white/5">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Atividade: {student.todayActivity} hoje</span>
                          <span>Série: {student.streak} dias</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Última atualização: {student.lastActivity}</p>
                        
                        {student.status === 'amarelo' && (
                          <p className="text-xs text-[#fbbf24] mt-2">
                            ⚠️ Recomendação: Aumentar tempo de estudo
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                          Ver Detalhes
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-white/20 hover:bg-white/5">
                          Comunicar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Add Student Card */}
                <motion.div
                  className="p-6 rounded-2xl border border-dashed border-white/20 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[400px]"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground">+ Adicionar Aluno</p>
                  <p className="text-sm text-muted-foreground mt-1">Conectar novo estudante</p>
                </motion.div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardTutores;