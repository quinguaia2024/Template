import { motion } from 'framer-motion';
import { Brain, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthGate = () => {
  const navigate = useNavigate();

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Fundo geométrico animado */}
      <div className="absolute inset-0 geometric-bg opacity-30">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path 
                d="M 60 0 L 0 0 0 60" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1" 
                opacity="0.1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <motion.polygon
            points="200,100 300,200 200,300 100,200"
            fill="hsl(var(--primary))"
            fillOpacity="0.05"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.circle
            cx="900"
            cy="200"
            r="80"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="2"
            strokeOpacity="0.1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.rect
            x="700"
            y="500"
            width="100"
            height="100"
            fill="hsl(var(--accent))"
            fillOpacity="0.03"
            rx="10"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Botão voltar */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="text-foreground/70 hover:text-foreground hover:bg-card/40"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Brain className="w-16 h-16 text-primary" />
                <motion.div
                  className="absolute inset-0 w-16 h-16"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full border-2 border-secondary/30 rounded-full border-dashed" />
                </motion.div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-4">
              Bem-vindo ao Mentor IA
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light">
              Transforme sua jornada educacional com inteligência artificial
            </p>
          </motion.div>

          {/* Cards de seleção */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Card Login */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.2 }}
            >
              <Link to="/login">
                <div className="glass-card group cursor-pointer">
                  <div className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <LogIn className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      Já tem conta?
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 text-sm">
                      Faça login para continuar sua aprendizagem personalizada
                    </p>
                    
                    <Button className="w-full btn-wave">
                      ENTRAR
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Card Cadastro */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.4 }}
            >
              <Link to="/register">
                <div className="glass-card group cursor-pointer">
                  <div className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <UserPlus className="w-8 h-8 text-secondary" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      Novo por aqui?
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 text-sm">
                      Crie sua conta e comece a aprender com inteligência artificial
                    </p>
                    
                    <Button 
                      variant="secondary"
                      className="w-full btn-wave"
                    >
                      CADASTRAR-SE
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Separador "OU" */}
          <motion.div
            className="flex items-center justify-center my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="h-px bg-border flex-1 max-w-16" />
            <span className="mx-4 text-muted-foreground text-sm font-medium">
              OU
            </span>
            <div className="h-px bg-border flex-1 max-w-16" />
          </motion.div>

          {/* Texto de rodapé */}
          <motion.p
            className="text-center text-xs text-muted-foreground/70 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Ao continuar, você concorda com nossos{" "}
            <Link to="/terms" className="underline hover:text-primary">
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link to="/privacy" className="underline hover:text-primary">
              Política de Privacidade
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default AuthGate;