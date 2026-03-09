import { 
  Users2, Target, AlertTriangle, BarChart3, MessageCircle, 
  TrendingUp, School, Settings, LogOut, ChevronRight,
  Bell, FileText, Eye, User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

interface TutorSidebarProps {
  students: Student[];
}

export function TutorSidebar({ students }: TutorSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { logout } = useAuth();
  
  const alertsCount = students.filter(s => s.status === 'amarelo' || s.status === 'vermelho').length;
  const messagesCount = 2;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verde': return 'bg-[#10b981]';
      case 'amarelo': return 'bg-[#fbbf24]';
      case 'vermelho': return 'bg-destructive';
      default: return 'bg-[#10b981]';
    }
  };

  const mainNavItems = [
    { 
      title: 'Visão Geral', 
      url: '/dashboard-tutores', 
      icon: Target,
      description: 'Dashboard principal'
    },
    { 
      title: 'Alertas', 
      url: '/dashboard-tutores/alertas', 
      icon: AlertTriangle,
      badge: alertsCount > 0 ? alertsCount : undefined,
      description: 'Monitoramento ativo'
    },
    { 
      title: 'Progresso Detalhado', 
      url: '/dashboard-tutores/progresso', 
      icon: BarChart3,
      description: 'Análises e métricas'
    },
    { 
      title: 'Comunicação', 
      url: '/dashboard-tutores/comunicacao', 
      icon: MessageCircle,
      badge: messagesCount > 0 ? messagesCount : undefined,
      description: 'Mensagens e contatos'
    },
    { 
      title: 'Relatórios', 
      url: '/dashboard-tutores/relatorios', 
      icon: TrendingUp,
      description: 'Relatórios e exportações'
    },
    { 
      title: 'Instituições', 
      url: '/dashboard-tutores/instituicoes', 
      icon: School,
      description: 'Escolas e contatos'
    }
  ];

  const configItems = [
    { 
      title: 'Configurações', 
      url: '/dashboard-tutores/configuracoes', 
      icon: Settings,
      description: 'Preferências do sistema'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5">
      <SidebarContent className="bg-background/60 backdrop-blur-xl">
        
        {/* Students Section */}
        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-4">
            👨‍👩‍👧 MEUS ALUNOS ({students.length})
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {students.map((student) => (
                <SidebarMenuItem key={student.id}>
                  <SidebarMenuButton 
                    asChild
                    className="hover:bg-white/5 rounded-lg p-3 transition-colors group"
                  >
                    <div className="flex items-center justify-between w-full cursor-pointer">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(student.status)} flex-shrink-0`} />
                        {!collapsed && (
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">
                              {student.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {student.status === 'verde' ? 'Ativo' : 
                               student.status === 'amarelo' ? 'Atenção' : 'Crítico'}
                            </p>
                          </div>
                        )}
                      </div>
                      {!collapsed && (
                        <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-white/10 my-2" />

        {/* Main Navigation */}
        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-4">
            NAVEGAÇÃO
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/dashboard-tutores'}
                      className="hover:bg-white/5 rounded-lg p-3 transition-colors group flex items-center gap-3" 
                      activeClassName="bg-primary/10 text-primary border-l-2 border-primary"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant={item.title === 'Alertas' ? 'destructive' : 'secondary'} 
                              className="text-xs px-1.5 py-0.5 h-auto"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sub-sections (when not collapsed) */}
        {!collapsed && (
          <>
            {/* Alerts Subsection */}
            <SidebarGroup className="py-2">
              <SidebarGroupLabel className="text-xs text-muted-foreground/60 ml-4">
                🚨 ALERTAS
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between w-full">
                        <span>Ativos</span>
                        {alertsCount > 0 && (
                          <Badge variant="destructive" className="text-xs px-1.5 py-0.5 h-auto">
                            {alertsCount}
                          </Badge>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Histórico
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Configurar Notificações
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Progress Subsection */}
            <SidebarGroup className="py-2">
              <SidebarGroupLabel className="text-xs text-muted-foreground/60 ml-4">
                📊 PROGRESSO DETALHADO
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Por Aluno
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Por Disciplina
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Comparação
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Communication Subsection */}
            <SidebarGroup className="py-2">
              <SidebarGroupLabel className="text-xs text-muted-foreground/60 ml-4">
                💬 COMUNICAÇÃO
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between w-full">
                        <span>Mensagens</span>
                        {messagesCount > 0 && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-auto">
                            {messagesCount}
                          </Badge>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Professores
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Instituições
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Reports Subsection */}
            <SidebarGroup className="py-2">
              <SidebarGroupLabel className="text-xs text-muted-foreground/60 ml-4">
                📈 RELATÓRIOS
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Desempenho
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Tendências
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Exportar
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Institutions Subsection */}
            <SidebarGroup className="py-2">
              <SidebarGroupLabel className="text-xs text-muted-foreground/60 ml-4">
                🏫 INSTITUIÇÕES
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Escola A (2 alunos)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="hover:bg-white/5 rounded-lg ml-4 text-sm text-muted-foreground">
                      Escola B (1 aluno)
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        <Separator className="bg-white/10 my-4" />

        {/* Settings and Logout */}
        <SidebarGroup className="py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className="hover:bg-white/5 rounded-lg p-3 transition-colors group flex items-center gap-3" 
                      activeClassName="bg-primary/10 text-primary"
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} className="hover:bg-destructive/10 hover:text-destructive rounded-lg p-3 transition-colors group flex items-center gap-3 text-muted-foreground">
                  <LogOut className="w-4 h-4" />
                  {!collapsed && <span className="text-sm font-medium">🚪 SAIR</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}